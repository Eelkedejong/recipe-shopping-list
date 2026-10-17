import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import getCurrentUser from '@/pages/recipe/api/getCurrentUser';

/**
 * The signed-in user and whether they are an admin.
 *
 * The role is read from the API rather than from the stored token, so a role
 * change takes effect without anyone having to sign in again - and so that
 * tokens issued before roles existed still work.
 */
export const useCurrentUser = () => {
  const token = useSelector((state) => state.user.value?.token);

  const { data } = useQuery({
    queryKey: ['current-user', token],
    queryFn: getCurrentUser,
    enabled: Boolean(token),
    staleTime: 1000 * 60 * 5,
  });

  const user = data?.data ?? null;

  return { user, isAdmin: user?.role === 'ADMIN' };
};

export default useCurrentUser;
