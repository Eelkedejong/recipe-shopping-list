import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import RecipeList from "./pages/recipe/RecipeList";
// import RecipeDetail from "./pages/recipe/RecipeDetail";
// import CreateRecipe from "./pages/recipe/CreateRecipe";
// import EditRecipe from "./pages/recipe/EditRecipe";
// import Overview from "./pages/overview/Overview";
// import ShoppingList from "./pages/shoppingList/ShoppingList";
// import Filters from "./components/elements/Filters";
import GroceryList from "./pages/shoppingList/GroceryList";
import RecipeActions from "./components/recipe/detail/Actions";
const RecipeList = lazy(() => import("./pages/recipe/RecipeList"));
const RecipeDetail = lazy(() => import("./pages/recipe/RecipeDetail"));
const CreateRecipe = lazy(() => import("./pages/recipe/CreateRecipe"));
const EditRecipe = lazy(() => import("./pages/recipe/EditRecipe"));
const Overview = lazy(() => import("./pages/overview/Overview"));
const ShoppingList = lazy(() => import("./pages/shoppingList/ShoppingList"));
const Filters = lazy(() => import("./components/elements/Filters"));
import Navigation from "./components/elements/Navigation";
import StickyNavigation from "./components/elements/StickyNavigation";
import Header from "./components/elements/Header";

const Layout = () => {
  const { t } = useTranslation();

  return (
    <main className="main w-100 bg-light-grey">
      <Suspense fallback={<div>Loading...</div>}>
        <Navigation />
        <StickyNavigation />
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
                <RecipeActions />
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
            path="/shopping-list"
            element={
              <>
                <section className={`section`}>
                  <Header title={t("My Shopping list")} />
                  <ShoppingList />
                </section>
              </>
            }
          />
          <Route
            path="/list"
            element={
              <>
                <section className={`section`}>
                  <Header title={t("Grocery list")} />
                  <GroceryList />
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
      </Suspense>
    </main>
  );
};

export default Layout;
