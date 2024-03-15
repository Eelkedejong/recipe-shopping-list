const forgotPassword = async ({ queryKey }) => {
  const email = queryKey[1];

  if (email) {
    console.log('start reset request', email);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
      }),
    };

    const res = await fetch(
      import.meta.env.VITE_API_KEY + `forgot-password/`,
      requestOptions
    );

    if (!res.ok) {
      const message = await res.json();
      throw new Error(message?.message);
    }

    return res.json();
  } else {
    throw new Error('please enter a valid email address');
  }
};

export default forgotPassword;
