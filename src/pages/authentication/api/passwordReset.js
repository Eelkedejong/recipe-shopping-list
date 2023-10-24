const passwordReset = async ({ queryKey }) => {
  const password = queryKey[1];
  const id = queryKey[2];
  const token = queryKey[3];

  console.log("start reset request", password);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: password,
    }),
  };

  const res = await fetch(
    `http://localhost:3001/password-reset/${id}?token=${token}`,
    requestOptions
  );

  if (!res.ok) {
    const message = await res.json();
    throw new Error(message?.message);
  }

  return res.json();
};

export default passwordReset;
