import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router';
import { useTranslation } from 'react-i18next';
import GroceryList from '@/pages/shoppingList/GroceryList';
const RecipeList = lazy(() => import('@/pages/recipe/RecipeList'));
const PublicRecipeList = lazy(() => import('@/pages/recipe/PublicRecipeList'));
const RecipeDetail = lazy(() => import('@/pages/recipe/RecipeDetail'));
const PublicRecipeDetail = lazy(
  () => import('@/pages/recipe/PublicRecipeDetail')
);
const CreateRecipe = lazy(() => import('@/pages/recipe/CreateRecipe'));
const EditRecipe = lazy(() => import('@/pages/recipe/EditRecipe'));
const Overview = lazy(() => import('@/pages/overview/Overview'));
const ShoppingList = lazy(() => import('@/pages/shoppingList/ShoppingList'));
const TypeBanner = lazy(() => import('@/components/recipe/TypeBanner'));
const Filters = lazy(() => import('@/components/elements/Filters'));
const PublicFilters = lazy(
  () => import('@/components/elements/Filters/Public')
);
import Navigation from '@/components/elements/Navigation';
import StickyNavigation from '@/components/elements/StickyNavigation';
import Header from '@/components/elements/Header';

/**
 * Renders the main layout of the application.
 *
 * @returns {JSX.Element} The main layout component.
 */
const Layout = () => {
  const { t } = useTranslation();

  return (
    <main className="main w-full bg-medium-grey">
      <Navigation />
      <StickyNavigation />
      <Suspense
        fallback={
          <div className="h-full w-full pt-6 flex items-center justify-center">
            <div className="loader"></div>
          </div>
        }
      >
        <Routes>
          <Route
            path="/recipes"
            element={
              <>
                <section className="w-full rounded-t-30">
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
                <section className="grid w-full rounded-t-30">
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
                <section className="grid w-full rounded-t-30">
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
                <section className="full-page w-full rounded-t-30">
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
            path="/public/recipe/:id"
            element={
              <>
                <section className="full-page w-full rounded-t-30">
                  <Header
                    returnUrl={'/recipes/all'}
                    returnText={t('All recipes')}
                    hiddenMobile={true}
                  />
                  <PublicRecipeDetail />
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
                <section className="full-page w-full rounded-t-30">
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
