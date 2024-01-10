import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RecipeList from "./pages/recipe/RecipeList";
import RecipeDetail from "./pages/recipe/RecipeDetail";
import CreateRecipe from "./pages/recipe/CreateRecipe";
import EditRecipe from "./pages/recipe/EditRecipe";
import Overview from "./pages/overview/Overview";
import Filters from "./components/Filters";
import Navigation from "./components/Navigation";
import Header from "./components/Header";

const Layout = () => {
  const { t } = useTranslation();

  return (
    <main className="main w-100 bg-light-grey">
      <Navigation />
      <Routes>
        <Route
          path="/recipes"
          element={
            <>
              <section className={`section w-100 rounded-top-l`}>
                <Header title={t("Your recipes")} />
                <RecipeList />
              </section>
              <Filters />
            </>
          }
        />
        <Route
          path="/recipe/:id"
          element={
            <>
              <section className={`section w-100 rounded-top-l`}>
                <Header
                  returnUrl={"/recipes"}
                  returnText={t("All recipes")}
                  hiddenMobile={true}
                />
                <RecipeDetail />
              </section>
            </>
          }
        />
        <Route
          path="/recipe/new"
          element={
            <>
              <section className={`section`}>
                <Header title={t("New recipe")} />
                <CreateRecipe />
              </section>
            </>
          }
        />
        <Route
          path="/recipe/edit/:id"
          element={
            <>
              <section className={`section`}>
                <Header title={t("Edit recipe")} />
                <EditRecipe />
              </section>
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <section className={`section w-100 rounded-top-l`}>
                <Header />
                <Overview />
              </section>
            </>
          }
        />
      </Routes>
    </main>
  );
};

export default Layout;
