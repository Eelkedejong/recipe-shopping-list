const getPublicRecipeFilter = async ({ queryKey }) => {
  const callType = queryKey[1];
  const recipeType = queryKey[2];
  console.log('recipeType', recipeType);

  let url = import.meta.env.VITE_API_KEY + `public/recipe-${callType}`;

  if (recipeType) {
    url += `?type=${recipeType}`;
  }

  const requestOptions = {
    method: 'GET',
  };

  try {
    const res = await fetch(url, requestOptions);

    if (!res.ok) {
      throw new Error(`Can't get recipe types`);
    }

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

export default getPublicRecipeFilter;
