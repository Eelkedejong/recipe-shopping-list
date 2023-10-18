const updateRecipe = async ([recipeData, token, id]) => {
  const requestOptions = {
    method: "PUT",
    body: JSON.stringify(recipeData),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };

  await fetch(`http://localhost:3001/api/recipe/${id}`, requestOptions);
};

export default updateRecipe;
