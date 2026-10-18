import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import getShoppingList from '@/pages/shoppingList/api/getShoppingList';
import getShoppingListRecipes from '@/pages/shoppingList/api/getShoppingListRecipes';
import refineShoppingList from '@/pages/shoppingList/api/refineShoppingList';

/**
 * The shopping list while it is being refined, before going to the shop.
 *
 * Edits are local until the save button is pressed, so this holds a draft.
 * The draft starts as null and reads fall through to the server's version;
 * it is only materialised once something is actually changed, and dropped
 * again after a save so the next read comes from fresh server data. That
 * avoids an effect copying server state into local state.
 */
export const useShoppingListDraft = () => {
  const token = useSelector((state) => state.user.value?.token);
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState(null);

  const listQuery = useQuery({
    queryKey: ['shoppingList', token],
    queryFn: getShoppingList,
    enabled: Boolean(token),
  });

  const list = listQuery.data?.data ?? null;

  const ids = (list?.recipes ?? [])
    .map((entry) => entry.id)
    .filter((id) => typeof id === 'number')
    .join(',');

  const recipesQuery = useQuery({
    queryKey: ['shoppingList recipes', token, ids],
    queryFn: getShoppingListRecipes,
    enabled: Boolean(token) && ids.length > 0,
  });

  /** The server's version, used until an edit materialises a draft. */
  const serverState = {
    recipes: (list?.recipes ?? [])
      .filter((entry) => typeof entry?.id === 'number')
      .map((entry) => ({
        id: entry.id,
        persons: entry.persons,
        excludedRows: Array.isArray(entry.excludedRows) ? entry.excludedRows : [],
      })),
    extras: list?.listState?.extras ?? [],
  };

  const state = draft ?? serverState;

  const mutation = useMutation({
    mutationFn: refineShoppingList,
    onSuccess: () => {
      // Dropping the draft makes the next render read the saved version.
      setDraft(null);
      queryClient.invalidateQueries({ queryKey: ['shoppingList'] });
      queryClient.invalidateQueries({ queryKey: ['shoppingListView'] });
    },
  });

  const edit = (next) => setDraft({ ...state, ...next });

  const editRecipe = (recipeId, patch) =>
    edit({
      recipes: state.recipes.map((entry) =>
        entry.id === recipeId ? { ...entry, ...patch } : entry
      ),
    });

  const recipeData = recipesQuery.data?.data ?? [];

  return {
    /** Full recipe records, in the order they sit on the list. */
    recipes: state.recipes
      .map((entry) => ({
        entry,
        recipe: recipeData.find((candidate) => candidate.id === entry.id),
      }))
      // A recipe deleted since it was added has no record to show.
      .filter((pair) => pair.recipe),
    extras: state.extras,
    isLoading: listQuery.isLoading || (ids.length > 0 && recipesQuery.isLoading),
    isSaving: mutation.isPending,
    isDirty: draft !== null,

    setPersons: (recipeId, persons) => editRecipe(recipeId, { persons }),

    /** Untick an ingredient so it is left off the grocery list. */
    toggleRow: (recipeId, rowId) => {
      const entry = state.recipes.find((candidate) => candidate.id === recipeId);
      if (!entry) return;
      const excluded = entry.excludedRows.includes(rowId)
        ? entry.excludedRows.filter((id) => id !== rowId)
        : [...entry.excludedRows, rowId];
      editRecipe(recipeId, { excludedRows: excluded });
    },

    removeRecipe: (recipeId) =>
      edit({ recipes: state.recipes.filter((entry) => entry.id !== recipeId) }),

    addExtra: (name, categorySlug) =>
      edit({
        extras: [...state.extras, { name, categorySlug: categorySlug || null }],
      }),

    removeExtra: (index) =>
      edit({ extras: state.extras.filter((_, i) => i !== index) }),

    save: () => mutation.mutate({ token, state }),
  };
};

export default useShoppingListDraft;
