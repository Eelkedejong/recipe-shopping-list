const getUser = async ({ queryKey }) => {
  const username = queryKey[1][0].username;
  const password = queryKey[1][0].password;
  const email = queryKey[1][0].email;
  const type = queryKey[2];

  if (email && password) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    };

    const res = await fetch(`http://localhost:3001/${type}`, requestOptions);

    if (!res.ok) {
      const message = await res.json();
      throw new Error(message?.message);
    }

    return res.json();
  } else {
    throw new Error("Please enter an email and password");
  }
};

export default getUser;
