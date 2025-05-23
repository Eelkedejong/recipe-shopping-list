import { removeUserData } from './utils/storage';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import Button from '../../components/ui/Button';
import { FaRightFromBracket } from 'react-icons/fa6';

const Logout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    queryClient.invalidateQueries();
    removeUserData();

    // @TODO: find a different solution to redirect after logging out.
    navigate('/');
    window.location.reload(true);
  };

  return (
    <>
      <button onClick={handleLogout} className="df aic gap-4 py-3">
        <FaRightFromBracket />
        <span className="pr-3">{t('Logout')}</span>
      </button>
    </>
  );
};

export default Logout;
