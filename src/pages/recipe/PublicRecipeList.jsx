import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  resetSearchParams,
  updateTypeOfMeal,
} from '@store/publicSearchParamsSlice';
import getPublicRecipes from './api/getPublicRecipes';
import RecipeTile from '@/components/recipe/RecipeTile';
import styles from './recipe.module.scss';
import { dishTypes } from '@/utils/dishTypes';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa6';

const PublicRecipeList = () => {
  const [page, setPage] = useState(1);
  const searchParams = useSelector((state) => state.publicSearchParams.value);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { type } = useParams();
  const navigate = useNavigate();

  // If there is a type in the URL, update the type in the search params.
  useEffect(() => {
    dispatch(resetSearchParams());
    type
      ? dispatch(updateTypeOfMeal(type.charAt(0).toUpperCase() + type.slice(1)))
      : dispatch(updateTypeOfMeal(''));
  }, [dispatch, type]);

  const { data, error, isLoading } = useQuery({
    queryKey: ['publicRecipes', searchParams, '', page],
    queryFn: getPublicRecipes,
    ...{ enabled: !!searchParams },
  });

  const recipes = data?.data ?? [];
  const totalPages = data?.totalPages;
  const currentPage = data?.page;
  const totalRecipes = data?.count;

  return (
    <>
      <div className="bg-white p-5 rounded-m">
        <div className="df gap-3 mb-5 fww">
          {dishTypes.map((recipeType) => (
            <button
              onClick={() => {
                // If there is a type in the search params, update the type in the URL.
                if (type) {
                  // @TODO: Make translations work properly
                  navigate(`/recipes/all/${t(recipeType.label)}`);
                } else {
                  navigate(`${t(recipeType.label)}`);
                }
              }}
              className={`py-2 px-4 text-main bg-main-light rounded-s fs-12 fw-semibold 
              ${
                (type === '' && type === 'All') || type === t(recipeType.label)
                  ? styles.activeType
                  : ''
              }
              `}
              key={recipeType.label}
            >
              {t(`${recipeType.value}`)}
            </button>
          ))}
        </div>

        <div className={`recipe-list ${styles.grid}`}>
          {!recipes.length && !isLoading ? (
            <div>
              <div>{t('No recipes found')}</div>
              <button
                className="text-main td-underline mt-3"
                onClick={() => {
                  dispatch(resetSearchParams());
                  // If there is a type, immediately update the type in the search params.
                  dispatch(
                    updateTypeOfMeal(
                      type.charAt(0).toUpperCase() + type.slice(1)
                    )
                  );
                }}
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
                  isPublic={true}
                />
              );
            })
          )}
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
    </>
  );
};

export default PublicRecipeList;
