import { useTranslation } from 'react-i18next';
import PersonSelector from '../../elements/PersonSelector';
import { useIngredientCatalog } from '@/hooks/useIngredientCatalog';
import styles from '../recipe.module.scss';
import Checkbox from '@/components/ui/Checkbox';

/**
 * Picks the singular or plural spelling from the catalog.
 *
 * Rows that are not linked to the catalog, or whose ingredient has no plural
 * recorded, fall back to the text stored on the recipe itself - which is why
 * a missing or deleted catalog entry never blanks out a recipe.
 */
const displayName = (ingredient, catalogEntry, amount) => {
  if (!catalogEntry) return ingredient.name ?? ingredient.ingredient ?? '';
  if (amount > 1 && catalogEntry.nameNlPlural) return catalogEntry.nameNlPlural;
  return catalogEntry.nameNl;
};

/**
 * A recipe's ingredients, with the servings selector above them.
 *
 * The checkboxes decide what goes onto the shopping list when the recipe is
 * added - they used to be decorative. Both the servings and the unticked rows
 * are owned by the page, since that is what sends them.
 */
const Ingredients = ({
  ingredients,
  persons,
  personsState,
  setPersonsState,
  excludedRows = [],
  onToggleRow,
}) => {
  const { t } = useTranslation();
  const { byId } = useIngredientCatalog();

  return (
    <>
      <h3 className="text-20 font-semibold pb-4 mb-2">{t('Ingredients')}</h3>
      <div className={`w-full flex justify-center py-2 mb-6 ${styles.persons} `}>
        <PersonSelector
          personsState={personsState}
          setPersonsState={setPersonsState}
        />
      </div>

      <div className="flex pt-3">
        <div
          className={`bg-main-bg-light rounded-20 p-6 flex flex-col ${styles.ingredientsBlock}`}
        >
          {ingredients
            ? ingredients.map((ingredient, index) => {
                const amount = ingredient.amount * (personsState / persons);
                const catalogEntry = ingredient.ingredientId
                  ? byId.get(ingredient.ingredientId)
                  : undefined;
                const rowId = ingredient.id ?? index + 1;

                return (
                  <div
                    className={`flex gap-4 mb-4 pb-3 ${styles.ingredient}`}
                    // Keyed by position: two rows can legitimately name the
                    // same ingredient, which made a name-based key collide.
                    key={rowId}
                  >
                    <label className="mr-3 flex gap-4 label cursor-pointer">
                      <Checkbox
                        checked={!excludedRows.includes(rowId)}
                        onCheckedChange={() => onToggleRow?.(rowId)}
                      />
                      <span>
                        {/* Show max 2 decimals */}
                        {amount > 0 && parseFloat(amount.toFixed(2))}{' '}
                        {ingredient.unit}{' '}
                        {displayName(ingredient, catalogEntry, amount)}
                      </span>
                    </label>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default Ingredients;
