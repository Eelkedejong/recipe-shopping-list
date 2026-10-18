import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useShoppingListView } from '@/hooks/useShoppingListView';
import GroceryListGroup from '@/components/groceryList/GroceryListGroup';
import AddGroceryItem from '@/components/groceryList/AddGroceryItem';

// Aisles are stacked, so a horizontal drag means nothing - pinning x keeps the
// row inside the card instead of sliding it out over the navigation.
const verticalOnly = ({ transform }) => ({ ...transform, x: 0 });

/**
 * The grocery list, in the order you walk the shop.
 *
 * Lines come from the recipes on the list: amounts scaled to the servings
 * chosen, summed per ingredient where that can be done honestly, grouped into
 * aisles. Ticking something off hides it, so what is left is what is still to
 * find - and a button brings the ticked ones back, as a check before leaving.
 */
const GroceryList = () => {
  const { t } = useTranslation();
  const { groups, tickedCount, isLoading, toggleTicked, addExtra, moveExtra } =
    useShoppingListView();
  const [showTicked, setShowTicked] = useState(false);

  // This list is used one-handed in a shop, so scrolling and ticking must keep
  // working: a touch drag only starts after a short hold, and a mouse drag
  // after a little travel.
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
    useSensor(KeyboardSensor)
  );

  /** Dropping a hand-added item on an aisle moves it there. */
  const handleDragEnd = ({ active, over }) => {
    if (!over || !String(active.id).startsWith('extra:')) return;

    const extraId = String(active.id).slice('extra:'.length);
    const current = groups.find((group) =>
      group.items.some((item) => item.key === active.id)
    );
    if (current?.categorySlug === over.id) return;

    moveExtra(extraId, over.id);
  };

  const visibleGroups = groups
    .map((group) => ({
      ...group,
      items: showTicked ? group.items : group.items.filter((item) => !item.ticked),
    }))
    .filter((group) => group.items.length > 0);

  const total = groups.reduce((count, group) => count + group.items.length, 0);

  return (
    <div className="bg-white p-6 rounded-20 max-m:rounded-[0_0_20px_20px]">
      {isLoading ? null : (
        <>
          <div className="text-14 flex flex-wrap items-center justify-between gap-3 pb-4">
            {tickedCount > 0 ? (
              <button
                type="button"
                onClick={() => setShowTicked((current) => !current)}
                className="text-main underline"
              >
                {showTicked
                  ? t('Hide ticked items')
                  : t('Show {{count}} ticked items', { count: tickedCount })}
              </button>
            ) : (
              <span className="text-dark-grey">
                {total > 0 ? t('Grouped by where you find them in the shop.') : null}
              </span>
            )}
            <Link className="text-main" to="/shopping-list">
              {t('Edit shopping list')}
            </Link>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[verticalOnly]}
            onDragEnd={handleDragEnd}
          >
            {visibleGroups.map((group) => (
              <GroceryListGroup
                key={group.categorySlug}
                group={group}
                onToggle={toggleTicked}
              />
            ))}
          </DndContext>

          {total === 0 ? (
            <>
              <h3 className="pb-2">{t('Your grocery list is empty')}</h3>
              <span className="flex items-center gap-1">
                <Link className="text-main" to="/recipes">
                  {t('Add recipes')}
                </Link>
                {t('or')}
                <Link className="text-main" to="/shopping-list">
                  {t('add items manually')}
                </Link>
              </span>
            </>
          ) : null}

          {total > 0 && visibleGroups.length === 0 ? (
            <p className="text-dark-grey pb-4">{t('Everything is ticked off.')}</p>
          ) : null}

          <AddGroceryItem onAdd={addExtra} />
        </>
      )}
    </div>
  );
};

export default GroceryList;
