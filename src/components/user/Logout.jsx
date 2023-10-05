import { removeUserData } from "./utils/storage"
import { useQueryClient } from '@tanstack/react-query';

const Logout = () => {
  const queryClient = useQueryClient();

  const handleLogout = () => {
    queryClient.removeQueries('user')
    removeUserData()
    window.location.reload(true)
  };

  return (
    <button
      onClick={handleLogout}
    >
      Logout
    </button>
  )
}

export default Logout