import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { useShoppingListView } from '@/hooks/useShoppingListView';
import GroceryListGroup from '@/components/groceryList/GroceryListGroup';
import AddGroceryItem from '@/components/groceryList/AddGroceryItem';

/**
 * The grocery list, in the order you walk the shop.
 *
 * Lines come from the recipes on the list: amounts scaled to the number of
 * people, summed per ingredient where that can be done honestly, grouped
 * into aisles. Ticking something off or hiding what you already have is kept
 * separately, so adding another recipe does not undo it.
 */
const GroceryList = () => {
  const { t } = useTranslation();
  const {
    groups,
    removedCount,
    isLoading,
    isSaving,
    toggleChecked,
    remove,
    restoreRemoved,
    addExtra,
  } = useShoppingListView();

  const itemCount = groups.reduce((total, group) => total + group.items.length, 0);

  return (
    <div className="bg-white p-6 rounded-20 max-m:rounded-[0_0_20px_20px]">
      {isLoading ? null : (
        <>
          <div className="text-14 flex flex-wrap items-center justify-between gap-3 pb-4">
            <p className="text-dark-grey">
              {itemCount > 0
                ? t('Grouped by where you find them in the shop.')
                : null}
            </p>
            <Link className="text-main" to="/shopping-list">
              {t('Edit shopping list')}
            </Link>
          </div>

          {groups.map((group) => (
            <GroceryListGroup
              key={group.categorySlug}
              group={group}
              onToggle={toggleChecked}
              onRemove={remove}
            />
          ))}

          {itemCount === 0 ? (
            <>
              <h3 className="pb-2">{t('Your grocery list is empty')}</h3>
              <span className="flex items-center gap-1">
                <Link className="text-main" to="/recipes">
                  {t('Add recipes')}
                </Link>
                {t('or')}
                {t('add items manually')}
              </span>
            </>
          ) : null}

          {removedCount > 0 ? (
            <p className="text-14 text-dark-grey mb-4">
              {t('{{count}} items hidden', { count: removedCount })}{' '}
              <button
                type="button"
                onClick={restoreRemoved}
                className="text-main underline"
              >
                {t('Show them again')}
              </button>
            </p>
          ) : null}

          <AddGroceryItem onAdd={addExtra} disabled={isSaving} />
        </>
      )}
    </div>
  );
};

export default GroceryList;
