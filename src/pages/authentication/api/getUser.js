const getUser = async ({ queryKey }) => {
  const password = queryKey[1][0].password;
  const loginname = queryKey[1][0].loginname;
  const email = queryKey[1][0].email;
  const username = queryKey[1][0].username;
  const type = queryKey[2];

  if ((loginname && password) || (email && username && password)) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        username: username,
        loginname: loginname,
        password: password,
      }),
    };

    const res = await fetch(
      import.meta.env.VITE_API_KEY + `${type}`,
      requestOptions
    );

    if (!res.ok) {
      const message = await res.json();
      throw new Error(message?.message);
    }

    return await res.json();
  } else {
    throw new Error('Please enter an email and password');
  }
};

export default getUser;
