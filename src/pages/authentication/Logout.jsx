import { removeUserData } from "./utils/storage"
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from "react-i18next";
import Button from "../../components/ui/Button";

const Logout = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation()

  const handleLogout = () => {
    queryClient.removeQueries('user')
    removeUserData()
    window.location.reload(true)
  };

  return (
    <Button
      onClick={handleLogout}
      text={t('Logout')}
      type="ghost"
    />
  )
}

export default Logout