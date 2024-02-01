import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import RecipeTile from "../../components/recipe/RecipeTile";
import TypesList from "../../components/recipe/TypesList";
import getRecipes from "../recipe/api/getRecipe";
import styles from "./overview.module.scss";
import bannerImage from "../../assets/img/cookbook.jpeg?w=2000&format=webp";

const Overview = () => {
  const searchParams = { limit: "3", tags: [] };
  const user = useSelector((state) => state.user.value);
  const results = useQuery({
    queryKey: ["recipes", user.token, "", searchParams],
    queryFn: getRecipes,
    ...{
      enabled: !!user.token,
    },
  });

  const recipes = results?.data?.data ?? [];

  return (
    <>
      <div
        className={`rounded-m mb-5 ${styles.banner}`}
        style={{ backgroundImage: `url(${bannerImage})` }}
      ></div>
      <div className="bg-white p-5 rounded-m">
        <TypesList />
        <div className={`recipe-list ${styles.grid}`}>
          {recipes
            ? recipes.map((recipe) => {
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
            : null}
        </div>
      </div>
    </>
  );
};

export default Overview;
