import logError from '@/utils/errorLogger';

const createRecipe = async ([recipeData, token]) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(recipeData),
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await fetch(
      import.meta.env.VITE_API_KEY + 'api/recipe/',
      requestOptions
    );

    if (!res.ok) {
      console.log('error in getRecipe');
      throw new Error(`recipe/ get not ok`);
    }

    const responseData = await res.json();

    return responseData?.data?.id;
  } catch (e) {
    logError(e, `createRecipe with ${recipeData}`);
  }
};

export default createRecipe;
