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
const RecipeList = lazy(() => import('./pages/recipe/RecipeList'));
const PublicRecipeList = lazy(() => import('./pages/recipe/PublicRecipeList'));
const RecipeDetail = lazy(() => import('./pages/recipe/RecipeDetail'));
const CreateRecipe = lazy(() => import('./pages/recipe/CreateRecipe'));
const EditRecipe = lazy(() => import('./pages/recipe/EditRecipe'));
const Overview = lazy(() => import('./pages/overview/Overview'));
const ShoppingList = lazy(() => import('./pages/shoppingList/ShoppingList'));
const TypeBanner = lazy(() => import('./components/recipe/TypeBanner'));
const Filters = lazy(() => import('./components/elements/Filters'));
const PublicFilters = lazy(
  () => import('./components/elements/Filters/Public')
);
import Navigation from './components/elements/Navigation';
import StickyNavigation from './components/elements/StickyNavigation';
import Header from './components/elements/Header';

const Layout = () => {
  const { t } = useTranslation();

  return (
    <main className="main w-100 bg-medium-grey">
      <Navigation />
      <StickyNavigation />
      <Suspense
        fallback={
          <div className="h-100 w-100 df aic jcc">
            <div className="loader"></div>
          </div>
        }
      >
        <Routes>
          <Route
            path="/recipes"
            element={
              <>
                <section className="w-100 rounded-top-l">
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
                <section className="grid w-100 rounded-top-l">
                  <Header title={t('Discover new tastes')} withBanner={true} />
                  <TypeBanner />
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
                <section className="grid w-100 rounded-top-l">
                  <Header useParamTitle={true} withBanner={true} />
                  <TypeBanner />
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
                <section className="full-page w-100 rounded-top-l">
                  <Header
                    returnUrl={'/recipes'}
                    returnText={t('All recipes')}
                    hiddenMobile={true}
                  />
                  <RecipeDetail />
                </section>
                {/* <RecipeActions /> */}
              </>
            }
          />
          <Route
            path="/recipe/new"
            element={
              <>
                <section className="full-page">
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
                <section className="full-page">
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
                <section className="full-page">
                  <Header title={t('Shopping list')} />
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
                <section className="full-page w-100 rounded-top-l">
                  <Header searchOnBanner={true} />
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
