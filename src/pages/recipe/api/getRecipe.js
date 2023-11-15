const getRecipe = async ({ queryKey }) => {
  const token = queryKey[1];
  const id = queryKey[2];
  const searchParams = queryKey[3];

  console.log("searchParams", searchParams);

  // Deconstruct the searchParams object
  const { type, tags, time, search, page } = searchParams;

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  let url = `http://localhost:3001/api/recipe/${id}`;

  // Add searchParams to URL if they have a value
  let isFirstQueryParam = true;

  // TODO: Refactor this to be more DRY
  if (type) {
    url += `?type=${type}`;
    isFirstQueryParam = false;
  }
  if (tags.length > 0) {
    url += `${isFirstQueryParam ? "?" : "&"}tags=${tags}`;
    isFirstQueryParam = false;
  }
  if (time) {
    url += `${isFirstQueryParam ? "?" : "&"}time=${time}`;
    isFirstQueryParam = false;
  }
  if (page) {
    url += `${isFirstQueryParam ? "?" : "&"}page=${page}`;
    isFirstQueryParam = false;
  }
  if (search) {
    url += `${isFirstQueryParam ? "?" : "&"}search=${search}`;
  }

  console.log("url", url);

  try {
    const res = await fetch(url, requestOptions);

    if (!res.ok) {
      console.log("error in getRecipe");
      throw new Error(`recipe/ get not ok`);
    }

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

export default getRecipe;
