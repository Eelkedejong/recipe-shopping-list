import { useState } from "react"
import { useQuery } from "@tanstack/react-query";
import getUser from "../components/api/getUser"
import getRecipe from "../components/api/getRecipe"
import RecipeList from "../components/recipe/RecipeList"
import Logout from "../components/user/Logout"
import { getStoredUserData, removeUserData, saveUserData } from "../components/user/storage";

const Start = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Get the user token from a signin.
  const {data, isSuccess, refetch} = useQuery(
    ["signin", username, password, "signin"],
    getUser,
    {
      // useQuery will only trigger on refetch.
      enabled: false,
      initialData: getStoredUserData(),
      onError: () => {
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

  // Get recipes if there is a user token.
  const results = useQuery(
    ["recipes", userToken], 
    getRecipe,
    {
      // The query will not execute until the userToken exists.
      enabled: !!userToken,
    }
  )
  
  const recipes = results?.data?.data ?? [];

  return (
    <>
      {recipes.length ? (
          <>
          <RecipeList recipes={recipes} />
          <Logout />
        </>
      ) : (null)}

      {showLoginForm ? (
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
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </label>
            <label htmlFor="password">
              Password
              <input 
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </label>
            
            <button>Submit</button>
          </form>
        </>
      ) : (null)}
    </>
  )
}

export default Start