import logError from '@/utils/errorLogger';

/**
 * Fetches the whole ingredient catalog in one request.
 *
 * The endpoint is public and sends an ETag with a long max-age, so repeat
 * visits revalidate rather than re-download. The catalog is small enough
 * (~40 KB) to keep in memory and search client-side, which is why
 * autocomplete costs no requests at all.
 */
const getIngredients = async () => {
  try {
    const res = await fetch(import.meta.env.VITE_API_KEY + 'public/ingredient');

    if (!res.ok) {
      throw new Error(`Can't get the ingredient catalog`);
    }

    return res.json();
  } catch (e) {
    logError(e, 'Get ingredient catalog');
  }
};

export default getIngredients;
