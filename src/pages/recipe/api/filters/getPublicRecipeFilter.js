import logError from '@/utils/errorLogger';

const getPublicRecipeFilter = async ({ queryKey }) => {
  const callType = queryKey[1];
  const recipeType = queryKey[2];

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
    logError(e, `Get Public recipe filters for ${recipeType}`);
  }
};

export default getPublicRecipeFilter;
