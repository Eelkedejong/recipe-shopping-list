import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import getUser from "../api/getUser";
import { useQuery } from "@tanstack/react-query";
import { getStoredUserData, removeUserData, saveUserData } from "./storage";

const NewUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { isError, isSuccess, data, error, refetch } = useQuery(
    ["user", username, password, 'user'],
    getUser,
    { 
      enabled: false,
      initialData: getStoredUserData(),
      onError: () => {
        removeUserData
      }
    }
  )

  if (isError) {
    console.log("Error:", error)
  }

  if (isSuccess) {
    let savedToken = getStoredUserData()
  
    if (!savedToken) {
      saveUserData(data.token)
      savedToken = data.token
    }
  
    console.log('create account success', savedToken)

    // Handle the redirect differently
    useEffect(() => {
      navigate('/')
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
  }


  return (
    <>
      <h2>Create new user</h2>
      <form
        onSubmit={e => {
          e.preventDefault()
          refetch()
        }}
      >
        <label htmlFor="username">
          Username
          <input
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </label>
        
        <button>Create new account</button>
        <Link to="/">Sign in</Link>
      </form>
    </>
  )
}

export default NewUser