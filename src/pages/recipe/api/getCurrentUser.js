import logError from '@/utils/errorLogger';

/** The signed-in user, including their role. */
const getCurrentUser = async ({ queryKey }) => {
  const token = queryKey[1];
  if (!token) return null;

  try {
    const res = await fetch(import.meta.env.VITE_API_KEY + 'api/me', {
      headers: { Authorization: 'Bearer ' + token },
    });

    if (!res.ok) {
      throw new Error(`Can't get the current user`);
    }

    return res.json();
  } catch (e) {
    logError(e, 'Get current user');
  }
};

export default getCurrentUser;
