const getRecipeFilter = async ({ queryKey }) => {
  const token = queryKey[1];
  const type = queryKey[2];

  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const res = await fetch(
      import.meta.env.VITE_API_KEY + `api/recipe-${type}`,
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

export default getRecipeFilter;
