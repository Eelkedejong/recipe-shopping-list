import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import getRecipe from "./api/getRecipe";
import Info from "../../components/recipe/detail/Info";
import Image from "../../components/recipe/detail/Image";
import Ingredients from "../../components/recipe/detail/Ingredients";
import Steps from "../../components/recipe/detail/Steps";
import styles from "./recipe.module.scss";
import { updateShoppingListRecipes } from "../shoppingList/api/updateShoppingList";

const RecipeDetail = () => {
  const userToken = useSelector((state) => state.user.value.token);
  const queryClient = useQueryClient();
  const { id } = useParams();

  const editMutation = useMutation({
    mutationFn: updateShoppingListRecipes,
    onSuccess: (data) => {
      console.log("mutation data", data?.data);
      queryClient.invalidateQueries({ queryKey: ["shoppingList"] });
      console.log("success");
    },
  });

  // Add and remove class to body when this component is mounted/unmounted
  useEffect(() => {
    document.body.classList.add("detail-page");

    return () => {
      document.body.classList.remove("detail-page");
    };
  }, []);

  const recipeIdentifier = "recipe" + id;
  const results = useQuery({
    queryKey: [recipeIdentifier, userToken, id],
    queryFn: getRecipe,
    ...{ enabled: !!userToken },
  });

  const recipe = results?.data?.data ?? [];

  return (
    <>
      {results.isSuccess ? (
        <div className={`dg bg-white rounded-m gap-5 ${styles.detailPage}`}>
          <div className={styles.detailsInfoWrapper}>
            <Info recipe={recipe} />
            <Ingredients
              ingredients={recipe.ingredients}
              persons={recipe.persons}
            />
          </div>
          <div>
            <Image image={recipe.image} />
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
              Add to shopping list
            </button>
          </div>
          <Steps steps={recipe.steps} />
        </div>
      ) : null}
    </>
  );
};

export default RecipeDetail;
