const deleteRecipe = async ([token, id]) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  await fetch(`http://localhost:3001/api/recipe/${id}`, requestOptions);
};

export default deleteRecipe;
