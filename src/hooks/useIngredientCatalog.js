import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import getIngredients from '@/pages/recipe/api/getIngredients';
import { buildSearchable, rankIngredients } from '@/utils/ingredientSearch';

/**
 * The ingredient catalog, fetched once and searched in the browser.
 *
 * React Query owns the caching, so there is no effect syncing server data
 * into state. The catalog only changes when an admin edits it, hence the
 * long staleTime.
 */
export const useIngredientCatalog = () => {
  const { data, isPending } = useQuery({
    queryKey: ['ingredient-catalog'],
    queryFn: getIngredients,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });

  const ingredients = data?.data?.ingredients;
  const categories = data?.data?.categories;

  return useMemo(() => {
    const searchable = buildSearchable(ingredients ?? []);
    const byId = new Map(searchable.map((item) => [item.id, item]));
    const search = (query, limit) => rankIngredients(searchable, query, limit);

    return {
      ingredients: searchable,
      categories: categories ?? [],
      byId,
      search,
      isPending,
    };
  }, [ingredients, categories, isPending]);
};

export default useIngredientCatalog;
