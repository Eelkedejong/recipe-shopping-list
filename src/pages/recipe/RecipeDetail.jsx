import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getRecipe from "./api/getRecipe";
import Info from "../../components/recipe/detail/Info";
import Image from "../../components/recipe/detail/Image";
import Ingredients from "../../components/recipe/detail/Ingredients";
import Steps from "../../components/recipe/detail/Steps";
import styles from "./recipe.module.scss";

const RecipeDetail = ({ userToken }) => {
  const { id } = useParams();

  // Add and remove class to body when this component is mounted/unmounted
  useEffect(() => {
    document.body.classList.add("detail-page");

    return () => {
      document.body.classList.remove("detail-page");
    };
  }, []);

  const recipeIdentifier = "recipe" + id;
  const results = useQuery([recipeIdentifier, userToken, id], getRecipe, {
    enabled: !!userToken,
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
          <Image image={recipe.image} />
          <Steps steps={recipe.steps} />
        </div>
      ) : null}
    </>
  );
};

export default RecipeDetail;
