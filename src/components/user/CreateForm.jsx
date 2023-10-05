import { useState, useContext } from "react"
import LoginContext from "./utils/loginContext";

const LoginForm = ({refetch}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginData, setLoginData] = useContext(LoginContext)

  return (
    <>
    <h2>Create new account</h2>
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
          name="username"
          required
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
      </label>
      <label htmlFor="password">
        Password
        <input 
          id="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </label>
      
      <button
        onClick={() => {
          setLoginData({
            "username": username,
            "password": password,
          })
        }}
      >
        Submit
      </button>
    </form>
  </>
  )
}

export default LoginForm