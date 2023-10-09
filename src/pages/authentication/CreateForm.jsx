import { useState, useContext } from "react"
import { useTranslation } from "react-i18next";
import LoginContext from "./utils/loginContext";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const LoginForm = ({refetch}) => {
  const { t } = useTranslation()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [, setLoginData] = useContext(LoginContext)

  return (
    <>
    <h2>Create new account</h2>
    <form
      className="mb-5"
      onSubmit={e => {
        e.preventDefault()
        refetch()
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
        id="password"
        label={t('Password')}
        required={true}
        onChange={(e) => setPassword(e.target.value)}
        key="password"
      />
    
      <Button 
        onClick={() => {
          setLoginData({
            "username": username,
            "password": password,
          })
        }}
        text={t('Create account')}
      />
    </form>
  </>
  )
}

export default LoginForm