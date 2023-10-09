import { useState } from "react"
import { useQuery } from "@tanstack/react-query";
import LoginContext from "./pages/authentication/utils/loginContext";
import getUser from "./pages/authentication/api/getUser"
import CreateForm from "./pages/authentication/CreateForm"
import LoginForm from "./pages/authentication/LoginForm";
import { getStoredUserData, removeUserData, saveUserData } from "./pages/authentication/utils/storage";
import Layout from "./Layout";
import Button from "./components/ui/Button";
import styles from "./pages/authentication/authentication.module.scss"
import { useTranslation } from "react-i18next";

const Start = () => {
  const loginData = useState(null)
  const [formType, setFormType] = useState('signin')
  const [errorMessage, setErrorMessage] = useState('')
  const { t } = useTranslation()

  const {data, isSuccess, refetch} = useQuery(
    ["user", loginData, formType],
    getUser,
    {
      // useQuery will only trigger on refetch.
      enabled: false,
      initialData: getStoredUserData(),
      retry: false,
      onError: (error) => {
        setErrorMessage(error.message)
        removeUserData
      }
    }
  )

  let savedToken = getStoredUserData()
  let showLoginForm = false

  if (isSuccess) {
    if (!savedToken) {
      const newToken = data?.token
      saveUserData(newToken)
      savedToken = newToken
    }
  } else {
    // Only show the login form if there is no userToken
    showLoginForm = true
  }

  const userToken = savedToken

  return (
    <>
      {userToken ? (
          <Layout userToken={userToken}/>
      ) : null }

      {showLoginForm ? (
        <section className={`bg-white rounded-l centered p-5 ${styles.authentication}`}>
          <LoginContext.Provider value={loginData}>
            {formType === 'signin' 
              ? <LoginForm refetch={refetch}/>
              : <CreateForm refetch={refetch}/>
            }
            {errorMessage ? `${t('Something went wrong, please try again later')}` : null}
            <Button 
              onClick={() => {
                {formType === 'signin' ? setFormType('user') : setFormType('signin')}
              }}
              text={formType === 'signin' ? `${t('Create account')}` : `${t('Sign in')}`}
              type={'ghost'}
            />
          </LoginContext.Provider>
        </section>
      ) : null }
    </>
  )
}

export default Start