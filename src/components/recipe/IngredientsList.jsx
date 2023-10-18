import { useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import IngredientContext from "./utils/ingredientContext";
import { FaPlusCircle } from "react-icons/fa";
import IngredientsRow from "./IngredientsRow";
import styles from "./recipe.module.scss";

const IngredientsList = ({ ingredients }) => {
  const { t } = useTranslation();
  const [ingredientRows, setIngredientRows] = useContext(IngredientContext);

  useEffect(() => {
    if (!ingredientRows) {
      if (ingredients !== null) {
        setIngredientRows(ingredients);
      } else {
        setIngredientRows([
          {
            unit: "",
            amount: "",
            ingredient: "",
          },
        ]);
      }
    }
  }, [ingredientRows, setIngredientRows, ingredients]);

  const emptyIngredients = {
    unit: "",
    amount: "",
    ingredient: "",
  };

  return (
    <div className="dg gap-3">
      <div className={`dg gap-4 fs-16 ${styles.grid}`}>
        <div>{t("Ingredient name")}</div>
        <div>{t("Amount")}</div>
        <div>{t("Unit")}</div>
      </div>
      <div className="df fdc gap-3 fs-14">
        {ingredientRows
          ? ingredientRows.map((ingredient, index) => {
              return (
                <IngredientsRow
                  index={index}
                  ingredient={ingredient}
                  key={index}
                />
              );
            })
          : null}
      </div>
      <button
        className="df aic jcfe gap-3 my-2 fs-16"
        onClick={(e) => {
          e.preventDefault;
          setIngredientRows([...ingredientRows, emptyIngredients]);
        }}
      >
        <span>{t("Add ingredient")}</span>
        <FaPlusCircle />
      </button>
    </div>
  );
};

export default IngredientsList;
