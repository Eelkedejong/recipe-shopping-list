import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RecipeList from "./pages/recipe/RecipeList";
import RecipeDetail from "./pages/recipe/RecipeDetail";
import CreateRecipe from "./pages/recipe/CreateRecipe";
import EditRecipe from "./pages/recipe/EditRecipe";
import Aside from "./components/Aside";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Button from "./components/ui/Button";

const Layout = ({ userToken, userName }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <main className="main h-100 w-100 bg-grey">
      <Navigation userName={userName} />
      <section className={`bg-grey w-100 rounded-top-l`}>
        <Routes>
          <Route
            path="/recipes"
            element={
              <>
                <Header userName={userName} title={t("Your recipes")} />
                <RecipeList userToken={userToken} />
              </>
            }
          />
          <Route
            path="/recipe/:id"
            element={
              <>
                <Header
                  userName={userName}
                  returnUrl={"/recipes"}
                  returnText={t("All recipes")}
                  hiddenMobile={true}
                />
                <RecipeDetail userToken={userToken} />
              </>
            }
          />
          <Route
            path="/recipe/new"
            element={<CreateRecipe userToken={userToken} />}
          />
          <Route
            path="/recipe/edit/:id"
            element={<EditRecipe userToken={userToken} />}
          />
          <Route
            path="/"
            element={
              <>
                <Header userName={userName} />
                <RecipeList userToken={userToken} />
              </>
            }
          />
        </Routes>
      </section>
      <Aside />
    </main>
  );
};

export default Layout;
