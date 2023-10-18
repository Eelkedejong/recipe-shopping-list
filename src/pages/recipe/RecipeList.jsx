import Recipe from "../../components/recipe/RecipeTile";
import { useQuery } from "@tanstack/react-query";
import getRecipes from "./api/getRecipe";

const RecipeList = ({ userToken }) => {
  const results = useQuery(["recipes", userToken, ""], getRecipes, {
    // The query will not execute until the userToken exists.
    enabled: !!userToken,
  });

  const recipes = results?.data?.data ?? [];

  return (
    <>
      <h2 className="fs-24 mb-4">Your recipes</h2>
      <div className="recipe-list">
        {!recipes.length
          ? null
          : recipes.map((recipe) => {
              return (
                <Recipe
                  name={recipe.name}
                  description={recipe.description}
                  persons={recipe.persons}
                  carb={recipe.carb}
                  time={recipe.time}
                  ingredients={recipe.ingredients}
                  id={recipe.id}
                  key={recipe.id}
                />
              );
            })}
      </div>
    </>
  );
};

export default RecipeList;
