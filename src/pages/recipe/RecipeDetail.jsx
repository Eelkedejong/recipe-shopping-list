import { useEffect, lazy, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import getRecipe from './api/getRecipe';
import Info from '../../components/recipe/detail/Info';
const Image = lazy(() => import('../../components/recipe/detail/Image'));
import Ingredients from '../../components/recipe/detail/Ingredients';
import Steps from '../../components/recipe/detail/Steps';
import Button from '../../components/ui/Button';
import { updateShoppingListRecipes } from '../shoppingList/api/updateShoppingList';
import { FaChevronLeft, FaBasketShopping } from 'react-icons/fa6';
import styles from './recipe.module.scss';

const RecipeDetail = () => {
  const userToken = useSelector((state) => state.user.value.token);
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const editMutation = useMutation({
    mutationFn: updateShoppingListRecipes,
    onSuccess: () => {
      setMessage(t('Recipe added to shopping list'));
      queryClient.invalidateQueries({ queryKey: ['shoppingList'] });
    },
  });

  // Add and remove class to body when this component is mounted/unmounted
  useEffect(() => {
    document.body.classList.add('detail-page');

    return () => {
      document.body.classList.remove('detail-page');
    };
  }, []);

  const recipeIdentifier = 'recipe' + id;
  const results = useQuery({
    queryKey: [recipeIdentifier, userToken, id],
    queryFn: getRecipe,
    ...{ enabled: !!userToken },
  });

  const recipe = results?.data?.data ?? [];

  return (
    <>
      {results.isSuccess ? (
        <div className={`dg gap-5 pb-5 ${styles.detailPage}`}>
          <div
            className={`bg-white rounded-m p-5 ${styles.detailsInfoWrapper}`}
          >
            <Info recipe={recipe} />
          </div>
          <div className={styles.detailsIngredientsWrapper}>
            <div className={`bg-white rounded-m p-5 $`}>
              <Ingredients
                ingredients={recipe.ingredients}
                persons={recipe.persons}
              />

              {message ? (
                <Link
                  to="/shopping-list"
                  className="message success mobile my-4 td-underline"
                >
                  {message}
                </Link>
              ) : null}

              <button
                className={`mt-4 df aic gap-3 ${styles.addToShoppingList}`}
                onClick={(e) => {
                  e.preventDefault();
                  const recipes = {
                    recipes: [
                      {
                        id: recipe.id,
                        persons: recipe.persons,
                      },
                    ],
                  };
                  editMutation.mutate([recipes, userToken]);
                }}
              >
                <FaBasketShopping />
                <span>{t('Add to shopping list')}</span>
              </button>
            </div>
          </div>

          <Image image={recipe.image} />

          <div>
            <Steps steps={recipe.steps} />
          </div>
        </div>
      ) : null}

      <button
        className={`df aic rounded-full bg-white p-2 desktop-hidden ${styles.backButton}`}
        onClick={() => {
          navigate(-1);
        }}
      >
        <FaChevronLeft className="fs-20" />
      </button>
    </>
  );
};

export default RecipeDetail;
