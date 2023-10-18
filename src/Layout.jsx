import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logout from "./pages/authentication/Logout";
import RecipeList from "./pages/recipe/RecipeList";
import CreateRecipe from "./pages/recipe/CreateRecipe";
import EditRecipe from "./pages/recipe/EditRecipe";
import Button from "./components/ui/Button";

const Layout = ({ userToken }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      {/* <h1> Cookbook </h1> */}
      <div
        className={`bg-white rounded-top-l p-5 mt-5 full-height`}
        style={{ marginTop: 100 }}
      >
        <Routes>
          <Route path="/recipes" element={<h1> Recipe overview </h1>} />
          <Route
            path="/recipe/create"
            element={<CreateRecipe userToken={userToken} />}
          />
          <Route
            path="/recipe/:id"
            element={<EditRecipe userToken={userToken} />}
          />
          <Route
            path="/"
            element={
              <>
                <RecipeList userToken={userToken} />
                <Button
                  onClick={() => {
                    navigate("/recipe/create");
                  }}
                  text={t("Create new recipe")}
                  className="my-4"
                />
              </>
            }
          />
        </Routes>
        <Logout />
      </div>
    </>
  );
};

export default Layout;
