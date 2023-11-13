import { useEffect, useContext, useId } from "react";
import { useTranslation } from "react-i18next";
import IngredientContext from "./utils/ingredientContext";
import { FaPlusCircle } from "react-icons/fa";
import IngredientsRow from "./IngredientsRow";
import styles from "../recipe.module.scss";

const IngredientsList = () => {
  const { t } = useTranslation();
  const [ingredientRows, setIngredientRows] = useContext(IngredientContext);
  const emptyIngredientRow = { unit: "", amount: "", ingredient: "" };

  return (
    <div className="dg gap-3">
      <div className={`dg gap-4 fs-16 ${styles.ingredientGrid}`}>
        <div>{t("Ingredient name")}</div>
        <div>{t("Amount")}</div>
        <div>{t("Unit (optional)")}</div>
      </div>
      <div className="df fdc gap-3 fs-14">
        {ingredientRows
          ? ingredientRows.map((ingredient, index) => {
              return (
                <IngredientsRow
                  index={index}
                  ingredient={ingredient}
                  key={index} // TODO: Change this to a unique key.
                />
              );
            })
          : null}
      </div>
      <div className="df jcfe">
        <button
          type="button"
          className="df aic jcfe gap-3 py-2 fs-16"
          onClick={(e) => {
            e.preventDefault;
            setIngredientRows([...ingredientRows, emptyIngredientRow]);
          }}
        >
          <span>{t("Add ingredient")}</span>
          <FaPlusCircle />
        </button>
      </div>
    </div>
  );
};

export default IngredientsList;
