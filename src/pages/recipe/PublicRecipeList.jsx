import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  resetSearchParams,
  updateType,
} from '../../store/publicSearchParamsSlice';
import getPublicRecipes from './api/getPublicRecipes';
import RecipeTile from '../../components/recipe/RecipeTile';
import styles from './recipe.module.scss';
import { dishTypes } from '../../utils/dishTypes';

const PublicRecipeList = () => {
  const searchParams = useSelector((state) => state.publicSearchParams.value);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { type } = useParams();
  const navigate = useNavigate();

  // If there is a type in the URL, update the type in the search params.
  useEffect(() => {
    dispatch(resetSearchParams());
    type
      ? dispatch(updateType(type.charAt(0).toUpperCase() + type.slice(1)))
      : dispatch(updateType(''));
  }, [dispatch, type]);

  const results = useQuery({
    queryKey: ['publicRecipes', searchParams],
    queryFn: getPublicRecipes,
    ...{ enabled: !!searchParams },
  });

  const recipes = results?.data?.data ?? [];

  return (
    <>
      <div className="bg-white p-5 rounded-m">
        <div className="df gap-3 mb-5 fww">
          {dishTypes.map((recipeType) => (
            <button
              onClick={() => {
                // If there is a type in the search params, update the type in the URL.
                if (type) {
                  navigate(`/recipes/all/${recipeType.label}`);
                } else {
                  navigate(`${recipeType.label}`);
                }
              }}
              className={`py-2 px-4 text-main bg-main-light rounded-s fs-12 fw-semibold 
              ${
                (type === '' && type === 'All') || type === recipeType.label
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
          {!recipes.length && !results.isLoading ? (
            <div>
              <div>{t('No recipes found')}</div>
              <button
                className="text-main td-underline mt-3"
                onClick={() => {
                  dispatch(resetSearchParams());
                  // If there is a type, immediately update the type in the search params.
                  dispatch(
                    updateType(type.charAt(0).toUpperCase() + type.slice(1))
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
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default PublicRecipeList;
