import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import RecipeList from "./pages/recipe/RecipeList";
// import RecipeDetail from "./pages/recipe/RecipeDetail";
// import CreateRecipe from "./pages/recipe/CreateRecipe";
// import EditRecipe from "./pages/recipe/EditRecipe";
// import Overview from "./pages/overview/Overview";
// import ShoppingList from "./pages/shoppingList/ShoppingList";
// import Filters from "./components/elements/Filters";
import GroceryList from './pages/shoppingList/GroceryList';
import RecipeActions from './components/recipe/detail/Actions';
const RecipeList = lazy(() => import('./pages/recipe/RecipeList'));
const PublicRecipeList = lazy(() => import('./pages/recipe/PublicRecipeList'));
const RecipeDetail = lazy(() => import('./pages/recipe/RecipeDetail'));
const CreateRecipe = lazy(() => import('./pages/recipe/CreateRecipe'));
const EditRecipe = lazy(() => import('./pages/recipe/EditRecipe'));
const Overview = lazy(() => import('./pages/overview/Overview'));
const ShoppingList = lazy(() => import('./pages/shoppingList/ShoppingList'));
const RecipeType = lazy(() => import('./pages/landingPage/RecipeType'));
const Filters = lazy(() => import('./components/elements/Filters'));
const PublicFilters = lazy(() => import('./components/elements/Filters/Public'));
import Navigation from './components/elements/Navigation';
import StickyNavigation from './components/elements/StickyNavigation';
import Header from './components/elements/Header';

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
                  <Header title={t('Your recipes')} />
                  <RecipeList />
                </section>
                <Filters />
              </>
            }
          />
          <Route
            path="/recipes/all"
            element={
              <>
                <section className={`section w-100 rounded-top-l`}>
                  <Header title={t('Discover new tastes')} />
                  <PublicRecipeList />
                </section>
                <PublicFilters />
              </>
            }
          />

          <Route
            path="/recipes/all/:type"
            element={
              <>
                <section className={`section w-100 rounded-top-l`}>
                  <Header returnUrl={'/recipes/all'} returnText={t('All recipes')} hiddenMobile={true} />
                  <PublicRecipeList />
                </section>
                <PublicFilters />
              </>
            }
          />

          <Route
            path="/recipe/:id"
            element={
              <>
                <section className={`section w-100 rounded-top-l`}>
                  <Header returnUrl={'/recipes'} returnText={t('All recipes')} hiddenMobile={true} />
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
                <section className={`full-page`}>
                  <Header title={t('New recipe')} hideSearch={true} />
                  <CreateRecipe />
                </section>
              </>
            }
          />
          <Route
            path="/recipe/edit/:id"
            element={
              <>
                <section className={`full-page`}>
                  <Header title={t('Edit recipe')} hideSearch={true} />
                  <EditRecipe />
                </section>
              </>
            }
          />
          <Route
            path="/shopping-list"
            element={
              <>
                <section>
                  <Header title={t('My Shopping list')} />
                  <ShoppingList />
                </section>
              </>
            }
          />
          <Route
            path="/list"
            element={
              <>
                <section>
                  <Header title={t('Grocery list')} />
                  <GroceryList />
                </section>
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <section className={`w-100 rounded-top-l`}>
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
