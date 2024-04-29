import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ShoppingListRecipe from './ShoppingListRecipe';

const ShoppingListRecipeList = ({ recipeList, shoppingListRecipes }) => {
  const { t } = useTranslation();
  const [recipes, setRecipes] = useState(recipeList);

  return (
    <>
      <div className="">
        {recipes.length === 0 ? (
          <div className="bg-white p-5 rounded-m mb-5">
            <div className="pb-3">{t('Your shopping list is empty')}</div>
            <Link className="text-main" to="/recipes">
              {t('Add recipes')}
            </Link>
          </div>
        ) : (
          recipes.map((recipe) => {
            // Get the persons value from the shoppingListRecipes for this recipe
            const shoppingListPersons = shoppingListRecipes.find(
              (item) => item.id === recipe.id
            );

            return (
              <ShoppingListRecipe
                shoppingListRecipes={shoppingListRecipes}
                setRecipes={setRecipes}
                name={recipe.name}
                ingredients={recipe.ingredients}
                persons={recipe.persons}
                shoppingListPersons={shoppingListPersons.persons}
                id={recipe.id}
                key={recipe.id}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default ShoppingListRecipeList;
