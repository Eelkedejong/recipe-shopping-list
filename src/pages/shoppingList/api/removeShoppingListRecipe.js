const removeShoppingListRecipe = async ([token, id]) => {
  const requestOptions = {
    method: "PUT",
    body: JSON.stringify({ ids: [id] }),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };

  await fetch(`http://localhost:3001/api/list/recipes/remove`, requestOptions);
};

export default removeShoppingListRecipe;
