import { Routes, Route } from "react-router-dom"
import Logout from "./components/user/Logout";
import RecipeListNew from "./components/recipe/RecipeList";
import CreateRecipe from "./components/recipe/CreateRecipe";
import EditRecipe from "./components/recipe/EditRecipe";

const Layout = ({userToken}) => {
  return (
    <>
      <h1> Cookbook </h1>
      <Routes>
        <Route path="/recipes" element={<h1> Recipe overview </h1>} />
        <Route path="/recipe/create" element={<CreateRecipe userToken={userToken} />} />
        <Route path="/recipe/:id" element={<EditRecipe userToken={userToken} />} />
        <Route path="/" element={<RecipeListNew userToken={userToken} />} />
      </Routes>
      <Logout />
    </>  
  )
}

export default Layout