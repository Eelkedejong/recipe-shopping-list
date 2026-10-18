import { useTranslation } from 'react-i18next';
import { FaXmark } from 'react-icons/fa6';
import Checkbox from '@/components/ui/Checkbox';
import PersonSelector from '../elements/PersonSelector';
import { useIngredientCatalog } from '@/hooks/useIngredientCatalog';

/**
 * One recipe on the shopping list, with its ingredients.
 *
 * Unticking a row leaves it off the grocery list without removing it from the
 * recipe. Changing the servings rescales what gets added. Both are edits to
 * the draft the page holds, saved only when the save button is pressed.
 */
const ShoppingListRecipe = ({
  recipe,
  entry,
  onSetPersons,
  onToggleRow,
  onRemove,
}) => {
  const { t } = useTranslation();
  const { byId } = useIngredientCatalog();
  const persons = entry.persons ?? recipe.persons;

  return (
    <div className="bg-white p-6 rounded-20 mb-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-20 font-semibold">{recipe.name}</h3>
        <button
          type="button"
          onClick={() => onRemove(recipe.id)}
          aria-label={t('Remove recipe from shopping list')}
          title={t('Remove recipe from shopping list')}
          className="text-dark-grey shrink-0 hover:text-black"
        >
          <FaXmark />
        </button>
      </div>

      <PersonSelector
        personsState={persons}
        setPersonsState={(next) => onSetPersons(recipe.id, next)}
      />

      <div className="flex flex-wrap mt-3">
        {(recipe.ingredients ?? []).map((ingredient, index) => {
          const rowId = ingredient.id ?? index + 1;
          const amount = ingredient.amount * (persons / recipe.persons);
          const catalogEntry = ingredient.ingredientId
            ? byId.get(ingredient.ingredientId)
            : undefined;
          // Recipes saved before the catalog existed store the text as
          // `ingredient`; everything since stores it as `name`.
          const name =
            (amount > 1 && catalogEntry?.nameNlPlural) ||
            catalogEntry?.nameNl ||
            ingredient.name ||
            ingredient.ingredient ||
            '';

          const label = [
            amount > 0 ? parseFloat(amount.toFixed(2)) : null,
            ingredient.unit,
            name,
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <div className="flex w-1/2 gap-4 mb-4 pb-1" key={rowId}>
              <label className="mr-3 flex gap-4 label cursor-pointer">
                <Checkbox
                  checked={!entry.excludedRows.includes(rowId)}
                  onCheckedChange={() => onToggleRow(recipe.id, rowId)}
                />
                <span>{label}</span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShoppingListRecipe;
