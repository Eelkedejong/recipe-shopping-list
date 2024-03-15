const updateRecipe = async ([recipeData, token, id]) => {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify(recipeData),
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };

  await fetch(
    import.meta.env.VITE_API_KEY + `api/recipe/${id}`,
    requestOptions
  );
};

export default updateRecipe;
