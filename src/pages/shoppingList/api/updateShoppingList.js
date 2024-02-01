const updateShoppingListRecipes = async ({ queryKey }) => {
  const token = queryKey[1];
  const type = queryKey[2];

  let url = `http://localhost:3001/api/list/${type}`;

  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const res = await fetch(url, requestOptions);

    if (!res.ok) {
      console.log("error in updateShoppingList");
      throw new Error(`updateShoppingList not ok`);
    }

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

const updateShoppingListItems = async ([items, token]) => {
  const requestOptions = {
    method: "PUT",
    body: JSON.stringify(items),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await fetch(
      `http://localhost:3001/api/list/items`,
      requestOptions,
    );

    if (!res.ok) {
      console.log("Did not update list, please try again later");
      throw new Error(`updateShoppingListItems not ok`);
    }

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

export { updateShoppingListRecipes, updateShoppingListItems };
