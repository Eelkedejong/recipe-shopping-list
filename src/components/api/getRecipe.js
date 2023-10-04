const Recipe = async ({ queryKey }) => {
  const token = queryKey[1]
  console.log('token API', token)

  const requestOptions = {
    method: 'GET',
    headers: { 
      'Authorization': 'Bearer ' + token
    },
  }

  console.log('requestOptions', requestOptions)

  try {
    const res = await fetch(
      `http://localhost:3001/api/recipe/`, requestOptions
    )


    if (!res.ok) {
      console.log('error in getRecipe')
      throw new Error(`recipe/ get not ok`)
    }

    return res.json()

  } catch (e) {
    console.log(e)
  }
}

export default Recipe
