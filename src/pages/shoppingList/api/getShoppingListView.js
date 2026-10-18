import logError from '@/utils/errorLogger';

/**
 * The shopping list as it should be rendered: generated lines merged with
 * the edits made on top of them, grouped by supermarket aisle.
 */
const getShoppingListView = async ({ queryKey }) => {
  const token = queryKey[1];

  try {
    const res = await fetch(import.meta.env.VITE_API_KEY + 'api/list/view', {
      headers: { Authorization: 'Bearer ' + token },
    });

    if (!res.ok) {
      throw new Error(`Can't get the shopping list`);
    }

    return res.json();
  } catch (e) {
    logError(e, 'Get shopping list view');
  }
};

export default getShoppingListView;
