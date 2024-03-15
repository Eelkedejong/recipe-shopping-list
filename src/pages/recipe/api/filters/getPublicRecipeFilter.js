const getPublicRecipeFilter = async ({ queryKey }) => {
  const type = queryKey[1];

  const requestOptions = {
    method: 'GET',
  };

  try {
    const res = await fetch(
      import.meta.env.VITE_API_KEY + `public/recipe-${type}`,
      requestOptions
    );

    if (!res.ok) {
      throw new Error(`Can't get recipe types`);
    }

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

export default getPublicRecipeFilter;
