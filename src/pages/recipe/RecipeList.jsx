import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { resetSearchParams } from '@/store/searchParamsSlice';
import { FaPlus } from 'react-icons/fa6';
import getRecipes from './api/getRecipe';
import RecipeTile from '@/components/recipe/RecipeTile';
import TypesList from '@/components/recipe/TypesList';
import styles from './recipe.module.scss';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa6';

const RecipeList = () => {
  const [page, setPage] = useState(1);
  const user = useSelector((state) => state.user.value);
  const searchParams = useSelector((state) => state.searchParams.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      dispatch(resetSearchParams());
    };
  }, [dispatch]);

  const { data, error, isLoading } = useQuery({
    queryKey: ['recipes', user.token, '', searchParams, page],
    queryFn: getRecipes,
    ...{
      // The query will not execute until the userToken exists.
      enabled: !!user.token && !!searchParams,
      keepPreviousData: true, // keep the old data until the new data comes in
    },
  });

  const recipes = data?.data ?? [];
  const totalPages = data?.totalPages;
  const currentPage = data?.page;
  const totalRecipes = data?.count;

  console.log('recipes', recipes, totalPages, currentPage, totalRecipes);

  return (
    <div className={`bg-white p-5 ${styles.listWrapper}`}>
      <div className="df jcsb aic mb-3 fww gap-3">
        <TypesList />
        {totalRecipes && totalRecipes > 1 ? (
          <span className="mobile-hidden">
            {totalRecipes} {t('recipes')}
          </span>
        ) : totalRecipes & (totalRecipes === 1) ? (
          <span className="mobile-hidden">
            {totalRecipes} {t('recipe')}
          </span>
        ) : null}
      </div>

      {isLoading && (
        <div className="h-100 w-100 mb-5 pt-5 df aic jcc">
          <div className="loader"></div>
        </div>
      )}
      <div className={`recipe-list pt-2 ${styles.grid}`}>
        {!recipes.length && !isLoading ? (
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

      {!isLoading & (totalPages > 1) ? (
        <div className={`df aic jcc mt-5 gap-3 ${styles.pagination}`}>
          {currentPage > 1 && (
            <button
              type="button"
              onClick={() => {
                setPage(currentPage - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-4 df aic gap-5 rounded-s bg-main-light text-main ${styles.prev}`}
            >
              <FaChevronLeft className="text-main fw-bold" />
            </button>
          )}

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (i + 1 === page) {
                  return;
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setPage(i + 1);
              }}
              className={`px-4 py-3  rounded-s ${i + 1 === page ? 'bg-main text-white' : 'bg-main-light text-main'}`}
            >
              {i + 1}
            </button>
          ))}

          {currentPage < totalPages && (
            <button
              type="button"
              onClick={() => {
                setPage(currentPage + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-4 df aic gap-5 rounded-s bg-main-light text-main`}
            >
              <FaChevronRight className="text-main" />
            </button>
          )}
        </div>
      ) : null}

      <div className="df arc jcc mt-5 desktop-hidden">
        {totalRecipes && totalRecipes > 1 ? (
          <>
            {totalRecipes} {t('recipes')}
          </>
        ) : totalRecipes & (totalRecipes === 1) ? (
          <>
            {totalRecipes} {t('recipe')}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default RecipeList;
