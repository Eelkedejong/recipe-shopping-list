import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  resetSearchParams,
  updateType,
} from "../../store/publicSearchParamsSlice";
import getPublicRecipes from "./api/getPublicRecipes";
import { useState } from "react";
import RecipeTile from "../../components/recipe/RecipeTile";
// import TypesList from "../../components/recipe/TypesList";
import styles from "./recipe.module.scss";
import { dishTypes } from "../../utils/dishTypes";
import defaultImage from "../../assets/bg/default.jpg";

const PublicRecipeList = () => {
  const searchParams = useSelector((state) => state.publicSearchParams.value);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { type } = useParams();

  // If there is a type in the URL, update the type in the search params.
  useEffect(() => {
    dispatch(resetSearchParams());
    type
      ? dispatch(updateType(type.charAt(0).toUpperCase() + type.slice(1)))
      : dispatch(updateType(""));
  }, [dispatch, type]);

  // type
  //   ? dispatch(updateType(type.charAt(0).toUpperCase() + type.slice(1)))
  //   : dispatch(updateType(""));

  // Reset the search params when the component unmounts.
  // useEffect(() => {
  //   return () => {
  //     dispatch(resetSearchParams());
  //     type
  //       ? dispatch(updateType(type.charAt(0).toUpperCase() + type.slice(1)))
  //       : dispatch(updateType(""));
  //   };
  // }, [dispatch, type]);

  console.log("type", type);

  const results = useQuery({
    queryKey: ["publicRecipes", searchParams],
    queryFn: getPublicRecipes,
    ...{ enabled: !!searchParams },
  });

  const recipes = results?.data?.data ?? [];

  let backgroundImage;

  if (!results.isLoading) {
    console.log("dishTypes", dishTypes);

    // match the type to the dishTypes array of objects, get the background image from the dishTypes array and set it as the background image for the recipe list.
    dishTypes.find((dishType) => {
      if (dishType.label === type) {
        backgroundImage = dishType.background;
      }
    });

    //if the type is not found in the dishTypes array, set the default image as the background image.
    if (!backgroundImage) {
      backgroundImage = defaultImage;
    }
  }

  console.log("backgroundImage", backgroundImage);

  return (
    <>
      <div
        className={`rounded-m mb-5 ${styles.banner}`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="bg-white p-5 rounded-m">
        {/* @TODO: ADD types tiles for all dishTypes as all exist in the public recipes so we don't need an APi call here. */}
        <div className={`recipe-list ${styles.grid}`}>
          {!recipes.length && !results.isLoading ? (
            <div>
              <div>{t("No recipes found")}</div>
              <button
                onClick={() => {
                  dispatch(resetSearchParams());
                  // If there is a type, immediately update the type in the search params.
                  dispatch(
                    updateType(type.charAt(0).toUpperCase() + type.slice(1)),
                  );
                }}
              >
                {t("Reset filters")}
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
