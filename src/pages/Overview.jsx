import { Link } from "react-router-dom";
import RecipeList from "../components/recipe/RecipeList"
import CreateRecipe from "../components/recipe/CreateRecipe"
import CreateShoppingList from "../components/shopping-list/CreateShoppingList"
import { useQuery } from "@tanstack/react-query";
import getRecipe from "../components/api/getRecipe"
import Logout from "../components/user/Logout";

const Overview = ({ token }) => {
  
  const results = useQuery(["recipes", token], getRecipe);
  const recipes = results?.data?.data ?? [];


  return (
    <>
      <h1>Welkom!</h1>
      <RecipeList recipes={recipes} />
      <Link to="/recipe/create">New recipe</Link>
      <CreateShoppingList />
      <Logout />
    </>
  )
}

export default Overview