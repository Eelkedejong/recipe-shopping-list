const createRecipe = async ([recipeData, token]) => {
  console.log("recipeData", recipeData);

  const requestOptions = {
    method: "POST",
    body: JSON.stringify(recipeData),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };

  await fetch(`http://localhost:3001/api/recipe/`, requestOptions);
};

export default createRecipe;
