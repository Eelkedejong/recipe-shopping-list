import logError from '@/utils/errorLogger';

const getShoppingListRecipes = async ({ queryKey }) => {
  const token = queryKey[1];
  const ids = queryKey[2];

  let url = import.meta.env.VITE_API_KEY + `api/recipe/?ids=${ids}`;

  console.log('get shopping list recipes', url);

  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const res = await fetch(url, requestOptions);

    if (!res.ok) {
      console.log('error in getShoppingListRecipe');
      throw new Error(`getShoppingListRecipe not ok`);
    }

    return res.json();
  } catch (e) {
    logError(e, `getShoppingListRecipes with ${ids}`);
  }
};

export default getShoppingListRecipes;
