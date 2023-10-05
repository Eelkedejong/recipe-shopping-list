const getUser = async ({queryKey}) => {
  console.log('in get User', queryKey[1][0].username )
  const username = queryKey[1][0].username
  const password = queryKey[1][0].password
  const type = queryKey[2]

  if (username && password) {
    console.log('start sigin request', username, password)
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        "username": username,
        "password": password
      })
    }

    const res = await fetch(
      `http://localhost:3001/${type}`, requestOptions
    )

    if (!res.ok) {
      const message = await res.json()
      throw new Error(message?.message)
    }

    return res.json()
  } else {
    throw new Error('please enter a username and password')
  }
}

export default getUser