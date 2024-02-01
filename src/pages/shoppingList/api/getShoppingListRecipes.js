const getShoppingListRecipes = async ({ queryKey }) => {
  const token = queryKey[1];
  const ids = queryKey[2];

  let url = `http://localhost:3001/api/recipe/?ids=${ids}`;

  console.log("get shopping list recipes", url);

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const res = await fetch(url, requestOptions);

    if (!res.ok) {
      console.log("error in getShoppingListRecipe");
      throw new Error(`getShoppingListRecipe not ok`);
    }

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

export default getShoppingListRecipes;
