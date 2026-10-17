import logError from '@/utils/errorLogger';

/**
 * Fetches the whole ingredient catalog in one request.
 *
 * The endpoint is public and sends an ETag, so revalidation is cheap: an
 * unchanged catalog comes back as a 304 with no body. The catalog is small enough
 * (~40 KB) to keep in memory and search client-side, which is why
 * autocomplete costs no requests at all.
 */
const getIngredients = async () => {
  try {
    const res = await fetch(import.meta.env.VITE_API_KEY + 'public/ingredient', {
      // Always revalidate rather than trusting the browser's copy. Without
      // this, max-age=300 means an admin adding an ingredient would not see
      // it for five minutes, because the refetch never reaches the server.
      // The ETag keeps that cheap: unchanged catalogs come back as a 304.
      cache: 'no-cache',
    });

    if (!res.ok) {
      throw new Error(`Can't get the ingredient catalog`);
    }

    return res.json();
  } catch (e) {
    logError(e, 'Get ingredient catalog');
  }
};

export default getIngredients;
