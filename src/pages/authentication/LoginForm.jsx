import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginContext from './utils/loginContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const LoginForm = ({ refetch }) => {
  const { t } = useTranslation();
  const [loginname, setLoginname] = useState('');
  const [password, setPassword] = useState('');

  const [, setLoginData] = useContext(LoginContext);

  return (
    <>
      <h2 className="my-5 ta-center">
        {t('Log in to your personal cookbook!')}
      </h2>
      <form
        className="mb-5 df fdc gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          refetch();
        }}
      >
        <Input
          id="loginname"
          type="text"
          label={t('E-mail or username')}
          onChange={(e) => setLoginname(e.target.value)}
          key="loginname"
        />

        <Input
          id="password"
          type="password"
          label={t('Password')}
          onChange={(e) => setPassword(e.target.value)}
          key="password"
          autocomplete="on"
        />

        <div className="df jcc fs-14">
          <Link to="/forgot-password">{t('Forgot password?')}</Link>
        </div>

        <Button
          className={'fs-14'}
          onClick={() => {
            setLoginData({
              loginname: loginname,
              password: password,
            });
          }}
          text={t('Sign in')}
        />
      </form>
    </>
  );
};

export default LoginForm;
