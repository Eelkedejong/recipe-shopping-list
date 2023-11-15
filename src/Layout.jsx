import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RecipeList from "./pages/recipe/RecipeList";
import RecipeDetail from "./pages/recipe/RecipeDetail";
import CreateRecipe from "./pages/recipe/CreateRecipe";
import EditRecipe from "./pages/recipe/EditRecipe";
import Aside from "./components/Aside";
import Navigation from "./components/Navigation";
import Header from "./components/Header";

const Layout = () => {
  const { t } = useTranslation();

  return (
    <main className="main h-100 w-100 bg-grey">
      <Navigation />
      <section className={`bg-grey w-100 rounded-top-l`}>
        <Routes>
          <Route
            path="/recipes"
            element={
              <>
                <Header title={t("Your recipes")} />
                <RecipeList />
              </>
            }
          />
          <Route
            path="/recipe/:id"
            element={
              <>
                <Header
                  returnUrl={"/recipes"}
                  returnText={t("All recipes")}
                  hiddenMobile={true}
                />
                <RecipeDetail />
              </>
            }
          />
          <Route path="/recipe/new" element={<CreateRecipe />} />
          <Route path="/recipe/edit/:id" element={<EditRecipe />} />
          <Route
            path="/"
            element={
              <>
                <Header />
                <RecipeList />
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
