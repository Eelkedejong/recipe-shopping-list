import logError from '@/utils/errorLogger';

/** Creates a catalog ingredient. Admin only; the API enforces that. */
const createIngredient = async ({ token, ingredient }) => {
  try {
    const res = await fetch(import.meta.env.VITE_API_KEY + 'api/ingredient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(ingredient),
    });

    const body = await res.json();

    if (!res.ok) {
      throw new Error(body?.message ?? `Can't create the ingredient`);
    }

    return body;
  } catch (e) {
    logError(e, 'Create ingredient');
    throw e;
  }
};

export default createIngredient;
