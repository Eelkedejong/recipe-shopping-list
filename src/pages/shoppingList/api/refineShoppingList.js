import logError from '@/utils/errorLogger';

/**
 * Saves the refined shopping list: which recipes are on it, how many people
 * each is for, which of their ingredients are unticked, and the extra items.
 *
 * Sends the whole thing rather than a patch, because the page holds a draft
 * until the save button is pressed.
 */
const refineShoppingList = async ({ token, state }) => {
  try {
    const res = await fetch(import.meta.env.VITE_API_KEY + 'api/list/refine', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ recipes: state.recipes, extras: state.extras }),
    });

    if (!res.ok) {
      throw new Error(`Can't save the shopping list`);
    }

    return res.json();
  } catch (e) {
    logError(e, 'Refine shopping list');
    throw e;
  }
};

export default refineShoppingList;
