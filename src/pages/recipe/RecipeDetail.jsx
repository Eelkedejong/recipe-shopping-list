import { useEffect, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import getRecipe from './api/getRecipe';
import Info from '../../components/recipe/detail/Info';
const Image = lazy(() => import('../../components/recipe/detail/Image'));
import Ingredients from '../../components/recipe/detail/Ingredients';
import Steps from '../../components/recipe/detail/Steps';
import styles from './recipe.module.scss';
import { updateShoppingListRecipes } from '../shoppingList/api/updateShoppingList';

const RecipeDetail = () => {
  const userToken = useSelector((state) => state.user.value.token);
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { t } = useTranslation();

  const editMutation = useMutation({
    mutationFn: updateShoppingListRecipes,
    onSuccess: () => {
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
        <div className={`dg gap-5 ${styles.detailPage}`}>
          <div
            className={`bg-white rounded-m p-5 ${styles.detailsInfoWrapper}`}
          >
            <Info recipe={recipe} />
          </div>
          <div className={`bg-white rounded-m p-5`}>
            <Ingredients
              ingredients={recipe.ingredients}
              persons={recipe.persons}
            />
            <button
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
              {t('Add to shopping list')}
            </button>
          </div>

          <Image image={recipe.image} />

          <div>
            <Steps steps={recipe.steps} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RecipeDetail;
