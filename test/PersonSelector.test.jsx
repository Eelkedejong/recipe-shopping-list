/**
 * PersonSelector.
 *
 * Two constraints are pinned here, both of which have broken before:
 *
 * 1. It must have **no `name` attribute**. It renders inside the shopping
 *    list <form>, whose submit handler collects every named form value into
 *    the items array - a name here puts the person count in the grocery list.
 * 2. Without a `recipeId` it must not dispatch. On a recipe detail page the
 *    selector only scales what is displayed; dispatching anyway wrote
 *    `{ persons }` with no id into the shopping list, breaking the page that
 *    reads it back.
 */
import { describe, test, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, makeStore } from './helpers';
import PersonSelector from '@components/elements/PersonSelector';

const renderSelector = (props = {}) => {
  const store = makeStore();
  const setPersonsState = vi.fn();
  const utils = renderWithProviders(
    <PersonSelector personsState={2} setPersonsState={setPersonsState} {...props} />,
    { store }
  );
  return { ...utils, store, setPersonsState };
};

describe('PersonSelector', () => {
  test('shows the count in a text field', () => {
    renderSelector();

    // Base UI renders the visible field as type="text" with
    // inputmode="numeric", so it is a textbox rather than a spinbutton.
    expect(screen.getByRole('textbox')).toHaveValue('2');
    expect(screen.getByText('Persons')).toBeInTheDocument();
  });

  test('the number input carries the accessible name', () => {
    renderSelector();

    // aria-labelledby used to sit on NumberField.Root, which renders a <div>,
    // so it named the group and left the input itself nameless - a screen
    // reader reached it and announced only "Number field". jsx-a11y does not
    // catch that, because the attribute is present, just on the wrong element.
    expect(screen.getByRole('textbox', { name: 'Persons' })).toHaveValue('2');
  });

  test('THE CONSTRAINT: renders no named form field', () => {
    const { container } = renderSelector({ recipeId: 7 });

    // Base UI also renders a hidden <input type="number"> so the value can
    // take part in form submission. That hidden input is exactly what would
    // leak into the shopping list form's FormData sweep, so the test asserts
    // both that it exists and that nothing here carries a name.
    const hidden = container.querySelector('input[type="number"]');
    expect(hidden, 'Base UI should still render its hidden form input').not.toBeNull();
    expect(hidden).not.toHaveAttribute('name');

    expect(container.querySelectorAll('[name]')).toHaveLength(0);
  });

  test('reports a change upwards', async () => {
    const { setPersonsState } = renderSelector();

    await userEvent.click(screen.getByRole('button', { name: 'More persons' }));

    expect(setPersonsState).toHaveBeenCalledWith(3);
  });

  test('writes to the shopping list when it has a recipeId', async () => {
    const { store } = renderSelector({ recipeId: 7 });

    await userEvent.click(screen.getByRole('button', { name: 'More persons' }));

    expect(store.getState().shoppingListRecipes.value.recipes).toEqual([
      { id: 7, persons: 3 },
    ]);
  });

  test('THE CONSTRAINT: stays out of the shopping list without a recipeId', async () => {
    const { store } = renderSelector();

    await userEvent.click(screen.getByRole('button', { name: 'More persons' }));

    expect(store.getState().shoppingListRecipes.value.recipes).toEqual([]);
  });

  test('will not go below one person', async () => {
    const { setPersonsState } = renderSelector({ personsState: 1 });

    await userEvent.click(screen.getByRole('button', { name: 'Fewer persons' }));

    expect(setPersonsState).not.toHaveBeenCalledWith(0);
  });
});
