import { Routes, Route } from "react-router-dom"
import Logout from "./pages/authentication/Logout";
import RecipeList from "./pages/recipe/RecipeList";
import CreateRecipe from "./pages/recipe/CreateRecipe";
import EditRecipe from "./pages/recipe/EditRecipe";

const Layout = ({userToken}) => {
  return (
    <>
      {/* <h1> Cookbook </h1> */}
      <div className={`bg-white rounded-top-l p-5 mt-5 full-height`} style={{ marginTop: 100 }}>
        <Routes>
          <Route path="/recipes" element={<h1> Recipe overview </h1>} />
          <Route path="/recipe/create" element={<CreateRecipe userToken={userToken} />} />
          <Route path="/recipe/:id" element={<EditRecipe userToken={userToken} />} />
          <Route path="/" element={<RecipeList userToken={userToken} />} />
        </Routes>
        <Logout />
      </div>
    </>  
  )
}

export default Layout