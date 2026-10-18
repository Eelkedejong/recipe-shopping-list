import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import getShoppingListView from '@/pages/shoppingList/api/getShoppingListView';
import updateShoppingListState from '@/pages/shoppingList/api/updateShoppingListState';

const EMPTY_STATE = { ticked: {}, extras: [] };

/**
 * The grocery list as used in the shop.
 *
 * Ticking something off is saved straight away - this is used one-handed in a
 * supermarket, and a save button would be one tap too many. Refinement
 * happened on the shopping list page; here it is only ticking and the
 * occasional thing remembered in an aisle.
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
    // The response is the rebuilt view, so it goes straight into the cache
    // rather than triggering another round trip.
    onSuccess: (body) => queryClient.setQueryData(['shoppingListView', token], body),
  });

  const save = (next) => mutation.mutate({ token, state: next });

  return {
    groups: view?.groups ?? [],
    tickedCount: view?.tickedCount ?? 0,
    isLoading: query.isLoading,
    isSaving: mutation.isPending,

    /** Tick a line off, or put it back. */
    toggleTicked: (item) =>
      item.manual
        ? save({
            ...state,
            extras: state.extras.map((extra) =>
              `extra:${extra.id}` === item.key
                ? { ...extra, ticked: !item.ticked }
                : extra
            ),
          })
        : save({
            ...state,
            ticked: { ...state.ticked, [item.key]: !item.ticked },
          }),

    /** Something remembered in the shop. */
    addExtra: (name, categorySlug) =>
      save({
        ...state,
        extras: [...state.extras, { name, categorySlug: categorySlug || null }],
      }),
  };
};

export default useShoppingListView;
