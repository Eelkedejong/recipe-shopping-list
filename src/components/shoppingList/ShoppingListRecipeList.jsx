import { useState } from "react";
import { useTranslation } from "react-i18next";
import ShoppingListRecipe from "./ShoppingListRecipe";

const ShoppingListRecipeList = ({ recipeList }) => {
  const { t } = useTranslation();
  const [recipes, setRecipes] = useState(recipeList);

  console.log("RESCEPTA", recipes);

  return (
    <>
      <div className="">
        {recipes.length === 0 ? (
          <div className="bg-white p-5 rounded-m mb-5">
            <div>{t("Your shopping list is empty")}</div>
          </div>
        ) : (
          recipes.map((recipe) => {
            return (
              <ShoppingListRecipe
                setRecipes={setRecipes}
                name={recipe.name}
                ingredients={recipe.ingredients}
                persons={recipe.persons}
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
