import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useShoppingListDraft } from '@/hooks/useShoppingListDraft';
import ShoppingListRecipe from '@/components/shoppingList/ShoppingListRecipe';
import ShoppingListExtras from '@/components/shoppingList/ShoppingListExtras';
import Button from '@/components/ui/Button';
import styles from './shoppinglist.module.scss';

/**
 * Where the shopping list is refined before going to the shop.
 *
 * Every recipe that was added is listed with its ingredients, ticked as they
 * were when it was added. Untick what is not needed, change the servings, drop
 * a recipe, and add the things no recipe covers. Nothing is saved until the
 * button at the bottom is pressed.
 */
const ShoppingList = () => {
  const { t } = useTranslation();
  const {
    recipes,
    extras,
    isLoading,
    isSaving,
    isDirty,
    setPersons,
    toggleRow,
    removeRecipe,
    addExtra,
    removeExtra,
    save,
  } = useShoppingListDraft();

  return (
    <>
      <div className="bg-white text-14 rounded-10 max-m:rounded-[0_0_20px_20px] px-6 py-3">
        {t(
          'Update recipe ingredients and click save to update items on the grocery list.'
        )}
      </div>

      <form
        className={`gap-6 grid ${styles.shoppingListGrid}`}
        onSubmit={(event) => {
          event.preventDefault();
          save();
        }}
      >
        <div>
          {isLoading ? (
            <div className="h-full w-full pt-6 flex items-center justify-center">
              <div className="loader"></div>
            </div>
          ) : recipes.length === 0 ? (
            <div className="bg-white rounded-20 p-6">
              <h4 className="pb-2">{t('No recipes in your shopping list')}</h4>
              <span>
                <Link className="text-main" to="/recipes">
                  {t('Add recipes')}
                </Link>
              </span>
            </div>
          ) : (
            recipes.map(({ recipe, entry }) => (
              <ShoppingListRecipe
                key={recipe.id}
                recipe={recipe}
                entry={entry}
                onSetPersons={setPersons}
                onToggleRow={toggleRow}
                onRemove={removeRecipe}
              />
            ))
          )}
        </div>

        <div>
          <ShoppingListExtras
            extras={extras}
            onAdd={addExtra}
            onRemove={removeExtra}
          />

          <div className={`w-full ${styles.submitButtonWrapper}`}>
            <Button
              text={t('Save shopping list')}
              loading={isSaving}
              type="submit"
              className={`w-full ${styles.submitButton}`}
            />
            {isDirty ? (
              <p className="text-14 text-dark-grey mt-2 text-center">
                {t('You have unsaved changes')}
              </p>
            ) : null}
          </div>
        </div>
      </form>
    </>
  );
};

export default ShoppingList;
