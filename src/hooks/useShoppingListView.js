import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import getShoppingListView from '@/pages/shoppingList/api/getShoppingListView';
import updateShoppingListState from '@/pages/shoppingList/api/updateShoppingListState';

const EMPTY_STATE = { overrides: {}, extras: [] };

/**
 * The grocery list, plus the four edits you can make while shopping.
 *
 * Every edit sends the whole state back and lets the server return the
 * rebuilt view, which React Query then holds. There is no effect copying
 * server data into local state - the query cache is the state.
 */
export const useShoppingListView = () => {
  const token = useSelector((state) => state.user.value?.token);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['shoppingListView', token],
    queryFn: getShoppingListView,
    enabled: Boolean(token),
  });

  const view = query.data?.data ?? null;
  const state = view?.state ?? EMPTY_STATE;

  const mutation = useMutation({
    mutationFn: updateShoppingListState,
    // The response is the rebuilt view, so it is written straight into the
    // cache rather than triggering another round trip.
    onSuccess: (body) => {
      queryClient.setQueryData(['shoppingListView', token], body);
      queryClient.invalidateQueries({ queryKey: ['shoppingList'] });
    },
  });

  const save = (next) => mutation.mutate({ token, state: next });

  const setOverride = (key, patch) =>
    save({
      ...state,
      overrides: {
        ...state.overrides,
        [key]: { ...(state.overrides[key] ?? {}), ...patch },
      },
    });

  return {
    groups: view?.groups ?? [],
    removedCount: view?.removedCount ?? 0,
    unlinkedCount: view?.unlinkedCount ?? 0,
    isLoading: query.isLoading,
    isSaving: mutation.isPending,

    /** Tick a line off, or untick it. */
    toggleChecked: (item) =>
      item.manual
        ? save({
            ...state,
            extras: state.extras.map((extra) =>
              `extra:${extra.id}` === item.key
                ? { ...extra, checked: !item.checked }
                : extra
            ),
          })
        : setOverride(item.key, { checked: !item.checked }),

    /** Hide a line you already have at home. Survives the list rebuilding. */
    remove: (item) =>
      item.manual
        ? save({
            ...state,
            extras: state.extras.filter(
              (extra) => `extra:${extra.id}` !== item.key
            ),
          })
        : setOverride(item.key, { removed: true }),

    /** Bring back everything that was hidden. */
    restoreRemoved: () =>
      save({
        ...state,
        overrides: Object.fromEntries(
          Object.entries(state.overrides)
            .map(([key, value]) => [key, { ...value, removed: false }])
            .filter(([, value]) => value.checked)
        ),
      }),

    /** Add something no recipe covers, into the aisle it belongs in. */
    addExtra: (name, categorySlug) =>
      save({
        ...state,
        extras: [...state.extras, { name, categorySlug: categorySlug || null }],
      }),
  };
};

export default useShoppingListView;
