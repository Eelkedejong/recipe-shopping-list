import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import getShoppingList from './api/getShoppingList';
import GroceryListColumn from '../../components/groceryList/GroceryListColumn';

const GroceryList = () => {
  const user = useSelector((state) => state.user.value);
  const { t } = useTranslation();

  // Get the shopping list.
  const shopplingList = useQuery({
    queryKey: ['Groceries', user.token],
    queryFn: getShoppingList,
    ...{
      // The query will not execute until the userToken exists.
      enabled: !!user.token,
    },
  });

  let items = []; // Track the items in the shopping list.
  const list = shopplingList?.data?.data;

  console.log('list', list);

  // @TODO: Check if this is still necessary. Else remove the entire extraItems logic
  // if (list !== undefined) {
  //   // merge the list.items and list.extraItems arrays.
  //   items = list.items.concat(list.extraItems);
  // }

  items = list.items;

  console.log('items', items);

  const [groceries, setGroceries] = useState([]);

  // If the shoppingList query is finished or items change, set the groceries state.
  useEffect(() => {
    setGroceries(
      items.map((item, index) => {
        return { id: index + 1, title: item };
      })
    );
  }, [shopplingList.isSuccess]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getGroceryPos = (id) => groceries.findIndex((item) => item.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setGroceries((items) => {
      const originalPos = getGroceryPos(active.id);
      const newPos = getGroceryPos(over.id);

      return arrayMove(items, originalPos, newPos);
    });
  };

  return (
    <div className="bg-white p-5 rounded-m">
      {!shopplingList.isLoading ? (
        <>
          <DndContext
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <GroceryListColumn groceries={groceries} />
          </DndContext>
        </>
      ) : null}

      {shopplingList.isSuccess && items.length === 0 ? (
        <p>{t('Your grocery list is empty')}</p>
      ) : null}
    </div>
  );
};

export default GroceryList;
