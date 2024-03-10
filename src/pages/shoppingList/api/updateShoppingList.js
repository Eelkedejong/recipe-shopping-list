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
    const res = await fetch('http://localhost:3001/api/list/recipes', requestOptions);

    if (!res.ok) {
      console.log('Could not add recipe to shopping list');
      throw new Error(`updateShoppingListRecipes not ok`);
    }

    return res.json();
  } catch (e) {
    console.log(e);
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
    const res = await fetch(`http://localhost:3001/api/list/items`, requestOptions);

    if (!res.ok) {
      console.log('Did not update list, please try again later');
      throw new Error(`updateShoppingListItems not ok`);
    }

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

export { updateShoppingListRecipes, updateShoppingListItems };
