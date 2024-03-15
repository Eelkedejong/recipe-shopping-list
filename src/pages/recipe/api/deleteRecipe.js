const deleteRecipe = async ([token, id]) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  await fetch(
    import.meta.env.VITE_API_KEY + `api/recipe/${id}`,
    requestOptions
  );
};

export default deleteRecipe;
