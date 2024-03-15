import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import getShoppingList from './api/getShoppingList';

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

  if (list !== undefined) {
    // merge the list.items and list.extraItems arrays.
    items = list.items.concat(list.extraItems);
  }

  return (
    <>
      <h2>{t('Grocery list')}</h2>
      {!shopplingList.isLoading ? (
        <>
          {items.map((item, index) => (
            <div key={index}>
              <p>{item}</p>
            </div>
          ))}
        </>
      ) : null}
    </>
  );
};

export default GroceryList;
