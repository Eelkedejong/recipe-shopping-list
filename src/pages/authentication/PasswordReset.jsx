import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import passwordReset from './api/resetPassword';
import { useTranslation } from 'react-i18next';
import ErrorMessage from './utils/ErrorMessage';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const PasswordReset = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { id } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { data, error, isSuccess, refetch } = useQuery({
    queryKey: ['reset', password, id, token],
    queryFn: passwordReset,
    ...{
      // useQuery will only trigger on refetch.
      enabled: false,
      retry: false,
      cache: 0,
    },
  });

  useEffect(() => {
    console.log(error);
    if (error) {
      setErrorMessage(error.message);
    }
  }, [error]);

  return (
    <>
      {isSuccess ? (
        <>
          <h2 className="message success my-5 ta-center">
            {t('Password is successfully reset.')}
          </h2>
          <Button onClick={() => navigate('/')} text={t('Sign in')} />
        </>
      ) : (
        <>
          <h2 className="my-5 ta-center">{t('Reset your password')}</h2>
          {errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : null}
          <form
            className="mb-5 df fdc gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (password === passwordConfirmation) {
                refetch();
              } else {
                setErrorMessage('Passwords do not match.');
              }
            }}
          >
            <Input
              id="password"
              type="password"
              label={t('New Password')}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
              key="password"
              autocomplete={'on'}
            />

            <Input
              id="password-confirmation"
              type="password"
              label={t('Confirm Password')}
              required={true}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              key="password-confirmation"
              autocomplete="on"
            />

            <Button className={'mt-4'} text={t('Confirm new password')} />
          </form>
        </>
      )}
    </>
  );
};

export default PasswordReset;
