/**
 * RecipeForm - the FormData coupling.
 *
 * The form is read with `new FormData(e.target)` and then taken apart by
 * inspecting *key names* and comparing values to the string `'on'`:
 *
 *   responseData.isVegetarian = values.isVegetarian === 'on';
 *   Object.keys(values).filter((k) => k.includes('mealtype') && values[k] === 'on')
 *                      .map((k) => k.replace('mealtype-', ''));
 *
 * Two things follow, and both look like noise until they break something:
 *
 * - A checkbox **must keep its `name`**, because the name carries the data.
 *   `mealtype-main` is how "main" gets into typeOfMeal; rename it and the meal
 *   type silently disappears from the saved recipe.
 * - A checkbox **must not set `value`**. An unvalued ticked checkbox submits
 *   the native `'on'`. Give it `value="true"` and every `=== 'on'` comparison
 *   turns false, so the recipe saves as not vegetarian with no error anywhere.
 *
 * Neither failure throws. They just quietly save the wrong recipe, which is
 * why they are pinned structurally here rather than left to review.
 */
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, makeStore, stubCatalogFetch } from './helpers';
import RecipeForm from '@components/recipe/RecipeForm';

const renderForm = ({ ingredients, ...props } = {}) => {
  const store = makeStore(
    ingredients
      ? { ingredientList: { value: ingredients } }
      : undefined
  );
  const handleSubmit = vi.fn();
  const utils = renderWithProviders(
    <RecipeForm loading={false} handleSubmit={handleSubmit} {...props} />,
    { store }
  );
  return { ...utils, store, handleSubmit };
};

/**
 * Fills the fields the browser refuses to submit without: name, persons
 * (prefilled with 1) and the first ingredient. Without these, requestSubmit
 * is blocked by constraint validation and the handler never runs - which is
 * correct behaviour, and worth knowing when a test "mysteriously" sees no
 * call.
 */
const fillRequired = async (container) => {
  await userEvent.type(screen.getByLabelText('Recipe name'), 'Flammkuchen');

  // A test that preloaded the store already has a filled first row; typing
  // into it would append to the name it is asserting on.
  const firstIngredient = container.querySelector('input[name="ingredient_0"]');
  if (!firstIngredient.value) {
    await userEvent.type(firstIngredient, 'spek');

    // Typing opens the ingredient combobox, and Base UI marks the rest of the
    // page aria-hidden while a popup is open - so every other control becomes
    // invisible to role queries until it is dismissed. Escape closes it.
    await userEvent.keyboard('{Escape}');
  }
};

/** Submits by clicking the real submit button. */
const submitForm = async (container) => {
  await fillRequired(container);
  await userEvent.click(screen.getByRole('button', { name: 'Save recipe' }));
};

/** Base UI renders the box as the element carrying role="checkbox". */
const tick = (name) => userEvent.click(screen.getByRole('checkbox', { name }));

beforeEach(() => {
  stubCatalogFetch();
});

describe('RecipeForm - the checkbox contract', () => {
  test('THE COUPLING: every checkbox has a name and no value attribute', () => {
    const { container } = renderForm();

    const checkboxes = [...container.querySelectorAll('input[type="checkbox"]')];
    expect(checkboxes.length).toBeGreaterThan(0);

    checkboxes.forEach((box) => {
      expect(box.getAttribute('name'), 'the name carries the data').toBeTruthy();
      expect(
        box.getAttribute('value'),
        `${box.getAttribute('name')} must submit the native 'on', so it cannot set value`
      ).toBeNull();
    });
  });

  test('the meal type checkboxes are named so the slug can be read off the key', () => {
    const { container } = renderForm();

    const names = [...container.querySelectorAll('input[name^="mealtype-"]')].map(
      (el) => el.getAttribute('name')
    );

    // The handler does key.replace('mealtype-', '') to get the slug, so the
    // prefix and the slug after it are both load-bearing.
    expect(names).toContain('mealtype-main');
    expect(names.every((n) => n.startsWith('mealtype-'))).toBe(true);
  });

  test('a ticked checkbox submits the string "on"', async () => {
    const { container } = renderForm();

    await tick('Vegetarian');

    // Read straight off the form, before any of the handler's own mapping.
    const data = new FormData(container.querySelector('form'));
    expect(data.get('isVegetarian')).toBe('on');
  });
});

describe('RecipeForm - what reaches the submit handler', () => {
  test('ticked meal types arrive as slugs in typeOfMeal', async () => {
    const { container, handleSubmit } = renderForm();

    await tick('Main');
    await tick('Lunch');
    await submitForm(container);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    const payload = handleSubmit.mock.calls[0][0];
    expect(payload.typeOfMeal.sort()).toEqual(['lunch', 'main']);
  });

  test('the boolean flags arrive as booleans, not strings', async () => {
    const { container, handleSubmit } = renderForm();

    await tick('Vegetarian');
    await submitForm(container);

    const payload = handleSubmit.mock.calls[0][0];
    expect(payload.isVegetarian).toBe(true);
    expect(payload.isChildFriendly).toBe(false);
  });

  test('an unticked checkbox is absent from FormData, not false', async () => {
    const { container, handleSubmit } = renderForm();

    await submitForm(container);

    // This is why the handler compares to 'on' rather than reading a boolean:
    // an unticked box submits nothing at all.
    const data = new FormData(container.querySelector('form'));
    expect(data.get('isVegetarian')).toBeNull();
    expect(handleSubmit.mock.calls[0][0].isVegetarian).toBe(false);
  });

  test('numeric fields are converted to integers', async () => {
    const { container, handleSubmit } = renderForm();

    await userEvent.type(screen.getByLabelText('Cooking time (in minutes)'), '45');
    await submitForm(container);

    const payload = handleSubmit.mock.calls[0][0];
    expect(payload.time).toBe(45);
    expect(typeof payload.persons).toBe('number');
  });

  test('cuisine is wrapped in an array, and left empty when blank', async () => {
    const { container, handleSubmit } = renderForm();

    await submitForm(container);
    expect(handleSubmit.mock.calls[0][0].cuisine).toEqual([]);
  });

  test('ingredients come from the store, not the form', async () => {
    const { container, handleSubmit } = renderForm({
      ingredients: [
        { id: 1, name: 'aubergine', amount: '1', unit: 'stuks', prep: '' },
        { id: 2, name: 'olijfolie', amount: '2', unit: 'el', prep: '' },
      ],
    });

    await submitForm(container);

    expect(handleSubmit.mock.calls[0][0].ingredients).toEqual([
      { id: 1, name: 'aubergine', amount: '1', unit: 'stuks', prep: '' },
      { id: 2, name: 'olijfolie', amount: '2', unit: 'el', prep: '' },
    ]);
  });

  test('the blank trailing ingredient row is dropped', async () => {
    // Picking an ingredient appends an empty row ready for the next one. That
    // row must not be saved, or every recipe gains a nameless ingredient.
    const { container, handleSubmit } = renderForm({
      ingredients: [
        { id: 1, name: 'aubergine', amount: '1', unit: 'stuks', prep: '' },
        { id: 2, name: '', amount: '', unit: '', prep: '' },
      ],
    });

    await submitForm(container);

    const { ingredients } = handleSubmit.mock.calls[0][0];
    expect(ingredients).toHaveLength(1);
    expect(ingredients[0].name).toBe('aubergine');
  });

  test('form field keys never leak into the payload as loose keys', async () => {
    const { container, handleSubmit } = renderForm();

    await submitForm(container);

    const payload = handleSubmit.mock.calls[0][0];
    // The reduce filters these out by substring; a new field whose name
    // contains one of these words would be dropped silently too.
    Object.keys(payload).forEach((key) => {
      expect(key).not.toMatch(/^(mealtype-|dishtype-|label-|step-|amount_|unit_|ingredient_)/);
    });
  });
});
