import { useState, useContext } from "react"
import LoginContext from "./utils/loginContext";

const LoginForm = ({refetch}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginData, setLoginData] = useContext(LoginContext)

  return (
    <>
    <h2>login</h2>
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
          required
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
      </label>
      <label htmlFor="password">
        Password
        <input 
          id="password"
          required
          name="password"
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