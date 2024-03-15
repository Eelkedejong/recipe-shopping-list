const createRecipe = async ([recipeData, token]) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(recipeData),
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };

  await fetch(import.meta.env.VITE_API_KEY + 'api/recipe/', requestOptions);
};

export default createRecipe;
