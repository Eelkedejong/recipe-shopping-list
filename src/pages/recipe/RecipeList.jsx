import RecipeTile from "../../components/recipe/RecipeTile";
import { useQuery } from "@tanstack/react-query";
import getRecipes from "./api/getRecipe";
import styles from "./recipe.module.scss";

const RecipeList = ({ userToken }) => {
  const results = useQuery(["recipes", userToken, ""], getRecipes, {
    // The query will not execute until the userToken exists.
    enabled: !!userToken,
  });

  const recipes = results?.data?.data ?? [];

  return (
    <div className="bg-white p-5 rounded-m">
      <div className={`recipe-list ${styles.grid}`}>
        {!recipes.length
          ? null
          : recipes.map((recipe) => {
              return (
                <RecipeTile
                  id={recipe.id}
                  name={recipe.name}
                  image={recipe.image}
                  description={recipe.description}
                  persons={recipe.persons}
                  carb={recipe.carb}
                  time={recipe.time}
                  ingredients={recipe.ingredients}
                  key={recipe.id}
                />
              );
            })}
      </div>
    </div>
  );
};

export default RecipeList;
