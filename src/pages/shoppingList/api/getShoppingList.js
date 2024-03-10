const getShoppingList = async ({ queryKey }) => {
  const token = queryKey[1];

  const url = `http://localhost:3001/api/list/`;

  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const res = await fetch(url, requestOptions);

    if (!res.ok) {
      console.log('error in getShoppingList');
      throw new Error(`shoppinglist/ get not ok`);
    }

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

export default getShoppingList;
