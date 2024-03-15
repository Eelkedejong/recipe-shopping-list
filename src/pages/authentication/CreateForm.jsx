import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import LoginContext from './utils/loginContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const LoginForm = ({ refetch }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [, setLoginData] = useContext(LoginContext);

  return (
    <>
      <h2 className="my-5 ta-center">
        {t('Create your account and start collecting recipes right away!')}
      </h2>
      <form
        className="mb-5 df fdc gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          refetch();
        }}
      >
        <Input
          id="username"
          label={t('Username')}
          required={true}
          onChange={(e) => setUsername(e.target.value)}
          key="username"
        />

        <Input
          id="email"
          label={t('E-mail')}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
          key="email"
        />

        <Input
          id="password"
          type="password"
          label={t('Password')}
          required={true}
          onChange={(e) => setPassword(e.target.value)}
          key="password"
          autocomplete="on"
        />

        <Button
          className={'mt-4'}
          onClick={() => {
            setLoginData({
              username: username,
              password: password,
              email: email,
            });
          }}
          text={t('Create account')}
        />
      </form>
    </>
  );
};

export default LoginForm;
