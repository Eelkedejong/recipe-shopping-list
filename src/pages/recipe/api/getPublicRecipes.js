import logError from '@/utils/errorLogger';

const getRecipe = async ({ queryKey }) => {
  const searchParams = queryKey[1];
  const id = queryKey[2];
  const page = queryKey[3];

  let url = import.meta.env.VITE_API_KEY + `public/recipe/${id}`;

  if (searchParams) {
    // Deconstruct the searchParams object
    const { type, tags, time, search, limit } = searchParams;

    // Add searchParams to URL if they have a value
    let isFirstQueryParam = true;

    // TODO: Refactor this to be more DRY
    if (type) {
      url += `?type=${type}`;
      isFirstQueryParam = false;
    }
    if (tags.length > 0) {
      url += `${isFirstQueryParam ? '?' : '&'}tags=${tags}`;
      isFirstQueryParam = false;
    }
    if (time) {
      url += `${isFirstQueryParam ? '?' : '&'}time=${time}`;
      isFirstQueryParam = false;
    }
    if (page) {
      url += `${isFirstQueryParam ? '?' : '&'}page=${page}`;
      isFirstQueryParam = false;
    }
    if (limit) {
      url += `${isFirstQueryParam ? '?' : '&'}limit=${limit}`;
      isFirstQueryParam = false;
    }
    if (search) {
      url += `${isFirstQueryParam ? '?' : '&'}search=${search}`;
    }
  }

  const requestOptions = {
    method: 'GET',
  };

  try {
    const res = await fetch(url, requestOptions);

    if (!res.ok) {
      console.log('error in public getRecipe');
      throw new Error(`recipe/ get not ok`);
    }

    return res.json();
  } catch (e) {
    logError(e, `Get public recipes with ${searchParams}`);
  }
};

export default getRecipe;
