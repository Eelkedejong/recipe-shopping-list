import logError from '@/utils/errorLogger';

const updateShoppingListRecipes = async ([recipes, token]) => {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify(recipes),
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await fetch(
      import.meta.env.VITE_API_KEY + `api/list/recipes`,
      requestOptions
    );

    if (!res.ok) {
      throw new Error(`Could not add recipe to shopping list`);
    }

    return res.json();
  } catch (e) {
    logError(e, `updateShoppingListItems ${items}`);
  }
};

const updateShoppingListItems = async ([items, token]) => {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify(items),
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await fetch(
      import.meta.env.VITE_API_KEY + `api/list/items`,
      requestOptions
    );

    if (!res.ok) {
      throw new Error(`Could not update items in the shopping list`);
    }

    return res.json();
  } catch (e) {
    logError(e, `updateShoppingListItems ${items}`);
  }
};

export { updateShoppingListRecipes, updateShoppingListItems };
