import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaUserFriends, FaPen, FaClock, FaTag } from "react-icons/fa";
import { PiForkKnifeFill } from "react-icons/pi";
import styles from "./recipe.module.scss";

const Recipe = (props) => {
  const { t } = useTranslation();
  const { name, description, persons, carb, time, ingredients, id, tag } =
    props;

  return (
    <div className="bg-grey-blue rounded-m p-5 mb-5 fs-14 pos-relative">
      <div className="">
        <span className="df jcsb">
          <h2 className="fs-18 mb-2">{name}</h2>
          <Link to={`/recipe/${id}`}>
            <FaPen fontSize="16px" />
          </Link>
        </span>

        {description ? <div>{description}</div> : null}

        <div className="df gap-3 my-4 fww">
          {persons ? (
            <div className="df aic gap-2 bg-light-blue py-2 px-3 rounded-m">
              <FaUserFriends fontSize="18px" /> {persons}
            </div>
          ) : null}

          {time ? (
            <div className="df aic gap-2 bg-light-blue py-2 px-3 rounded-m">
              <FaClock fontSize="16px" /> {time}
            </div>
          ) : null}

          {tag ? (
            <div className="df aic gap-2 bg-light-blue py-2 px-3 rounded-m">
              <FaTag fontSize="16px" /> {tag}
            </div>
          ) : null}

          {carb ? (
            <div className="df aic gap-2 bg-light-blue py-2 px-3 rounded-m">
              <PiForkKnifeFill fontSize="18px" /> {carb}
            </div>
          ) : null}
        </div>
      </div>

      <h4 className="mb-4 fs-16 border-bottom pb-2">{t("Ingredients")}</h4>
      <div className={`dg gap-2 column-gap-4 ${styles.ingredientGrid}`}>
        {ingredients.map((ingredient) => {
          if (ingredient) {
            return (
              <>
                <span>{ingredient.ingredient}</span>
                <span>
                  {ingredient.amount} {ingredient.unit}
                </span>
              </>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Recipe;
