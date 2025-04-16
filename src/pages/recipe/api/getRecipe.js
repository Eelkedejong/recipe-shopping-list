import logError from '@/utils/errorLogger';

const getRecipe = async ({ queryKey }) => {
  const token = queryKey[1];
  const id = queryKey[2];
  const searchParams = queryKey[3];
  const page = queryKey[4];

  let url = import.meta.env.VITE_API_KEY + `api/recipe/${id}`;

  if (searchParams) {
    // Deconstruct the searchParams object
    const {
      typeOfMeal,
      typeOfDish,
      cuisine,
      tags,
      time,
      isChildFriendly,
      isVegetarian,
      search,
      limit,
    } = searchParams;

    // Build query parameters in a more DRY way
    const queryParams = [];

    // Handle array parameters
    if (typeOfMeal && typeOfMeal.length > 0) {
      queryParams.push(`typeOfMeal=${typeOfMeal.join(',')}`);
    }

    if (typeOfDish && typeOfDish.length > 0) {
      queryParams.push(`typeOfDish=${typeOfDish.join(',')}`);
    }

    if (cuisine && cuisine.length > 0) {
      queryParams.push(`cuisine=${cuisine.join(',')}`);
    }

    if (tags && tags.length > 0) {
      queryParams.push(`tags=${tags.join(',')}`);
    }

    // Handle simple parameters
    if (time) {
      queryParams.push(`time=${time}`);
    }

    if (isChildFriendly !== undefined) {
      queryParams.push(`isChildFriendly=${isChildFriendly}`);
    }

    if (isVegetarian !== undefined) {
      queryParams.push(`isVegetarian=${isVegetarian}`);
    }

    if (page) {
      queryParams.push(`page=${page}`);
    }

    if (limit) {
      queryParams.push(`limit=${limit}`);
    }

    if (search) {
      queryParams.push(`search=${search}`);
    }

    // Add all query parameters to URL
    if (queryParams.length > 0) {
      url += '?' + queryParams.join('&');
    }
  }

  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const res = await fetch(url, requestOptions);

    if (!res.ok) {
      throw new Error(`recipe/ get not ok`);
    }

    return res.json();
  } catch (e) {
    logError(e, `Get user recipes with ${JSON.stringify(searchParams)}`);
  }
};

export default getRecipe;
