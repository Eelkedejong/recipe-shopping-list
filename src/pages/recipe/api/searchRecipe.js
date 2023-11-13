const getSearchResults = async ({ queryKey }) => {
  const token = queryKey[1];
  const searchQuery = queryKey[2];

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const res = await fetch(
      `http://localhost:3001/search?search=${searchQuery}`,
      requestOptions
    );

    if (!res.ok) {
      console.log("error in getRecipe");
      throw new Error(`recipe/ get not ok`);
    }

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

export default getSearchResults;
