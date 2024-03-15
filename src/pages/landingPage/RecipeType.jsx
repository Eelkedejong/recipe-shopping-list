import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PublicRecipeList from '../../pages/recipe/PublicRecipeList';
import Header from '../../components/elements/Header';
import PublicFilters from '../../components/elements/Filters/Public';
import dishTypes from '../../utils/dishTypes';

const RecipeType = () => {
  const { t } = useTranslation();

  return (
    <>
      <Route
        path="/recipes/test"
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
    </>
  );
};

export default RecipeType;
