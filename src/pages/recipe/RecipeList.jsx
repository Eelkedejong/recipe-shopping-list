import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { resetSearchParams } from '../../store/searchParamsSlice';
import { FaPlus } from 'react-icons/fa6';
import getRecipes from './api/getRecipe';
import RecipeTile from '../../components/recipe/RecipeTile';
import TypesList from '../../components/recipe/TypesList';
import styles from './recipe.module.scss';

const RecipeList = () => {
  const user = useSelector((state) => state.user.value);
  const searchParams = useSelector((state) => state.searchParams.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Reset the search params when the component unmounts.
  useEffect(() => {
    return () => {
      dispatch(resetSearchParams());
    };
  }, [dispatch]);

  const results = useQuery({
    queryKey: ['recipes', user.token, '', searchParams],
    queryFn: getRecipes,
    ...{
      // The query will not execute until the userToken exists.
      enabled: !!user.token && !!searchParams,
    },
  });

  const recipes = results?.data?.data ?? [];

  return (
    <div className="bg-white p-5 rounded-m">
      <TypesList />
      <div className={`recipe-list ${styles.grid}`}>
        {!recipes.length && !results.isLoading ? (
          <div>
            <div>{t('No recipes found')}</div>
            <button
              className="text-main td-underline mt-3"
              onClick={() => dispatch(resetSearchParams())}
            >
              {t('Reset filters')}
            </button>
          </div>
        ) : (
          recipes.map((recipe) => {
            return (
              <RecipeTile
                id={recipe.id}
                name={recipe.name}
                image={recipe.image}
                labels={recipe.tags}
                time={recipe.time}
                type={recipe.type}
                key={recipe.id}
              />
            );
          })
        )}
      </div>

      <div className="df fdc aic p-4 mt-5 desktop-hidden">
        <Link to="/recipe/new">
          <button className="p-4 df aic jcc bg-main text-white rounded-s mb-3">
            <FaPlus />
          </button>
        </Link>
        <button onClick={() => navigate('/recipe/new')}>
          <span>{t('Add recipe')}</span>
        </button>
      </div>
    </div>
  );
};

export default RecipeList;
