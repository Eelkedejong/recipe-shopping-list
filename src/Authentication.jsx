import { useState } from "react"
import { useQuery } from "@tanstack/react-query";
import LoginContext from "./components/user/utils/loginContext";
import getUser from "./components/user/api/getUser"
import CreateForm from "./components/user/CreateForm"
import LoginForm from "./components/user/LoginForm";
import { getStoredUserData, removeUserData, saveUserData } from "./components/user/utils/storage";
import Layout from "./Layout";

const Start = () => {
  const loginData = useState(null)
  const [formType, setFormType] = useState('signin')
  const [errorMessage, setErrorMessage] = useState('')

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
        <>
          <LoginContext.Provider value={loginData}>
            {formType === 'signin' 
              ? <LoginForm refetch={refetch}/>
              : <CreateForm refetch={refetch}/>
            }
            {errorMessage ? errorMessage : null}
            <button 
              onClick={() => {
                {formType === 'signin' ? setFormType('user') : setFormType('signin')}
              }}
            >
              {formType === 'signin' ? 'Create account' : 'Sign in'}
            </button>
          </LoginContext.Provider>
        </>
      ) : null }
    </>
  )
}

export default Start