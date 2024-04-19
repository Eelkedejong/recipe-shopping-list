const getRecipe = async ({ queryKey }) => {
  const token = queryKey[1];
  const id = queryKey[2];
  const searchParams = queryKey[3];
  const page = queryKey[4];

  console.log('searchParams', searchParams);

  let url = import.meta.env.VITE_API_KEY + `api/recipe/${id}`;

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

  console.log('url', url);

  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const res = await fetch(url, requestOptions);

    if (!res.ok) {
      console.log('error in getRecipe');
      throw new Error(`recipe/ get not ok`);
    }

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

export default getRecipe;
