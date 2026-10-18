import logError from '@/utils/errorLogger';

/**
 * Saves shopping-time edits: what is ticked off, what was removed because it
 * is already at home, and items added by hand.
 *
 * The whole state is sent, not a patch, so the server never has to merge
 * concurrent edits from one person on one list.
 */
const updateShoppingListState = async ({ token, state }) => {
  try {
    const res = await fetch(import.meta.env.VITE_API_KEY + 'api/list/state', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(state),
    });

    if (!res.ok) {
      throw new Error(`Can't save the shopping list`);
    }

    return res.json();
  } catch (e) {
    logError(e, 'Update shopping list state');
    throw e;
  }
};

export default updateShoppingListState;
