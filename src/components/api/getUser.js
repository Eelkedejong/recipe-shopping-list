const getUser = async ({queryKey}) => {
  console.log('in get User',queryKey )
  const username = queryKey[1]
  const password = queryKey[2]
  const type = queryKey[3]

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
      console.log('error')
      throw new Error(`signin/ post not ok`)
    }

    return res.json()
  } else {
    console.log('no username/password')
  }
}

export default getUser