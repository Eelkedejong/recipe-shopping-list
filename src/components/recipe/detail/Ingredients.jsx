import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import styles from "../recipe.module.scss";

const Ingredients = ({ ingredients, persons }) => {
  const [personsState, setPersonsState] = useState(persons);
  const { t } = useTranslation();

  return (
    <>
      <div className={`w-100 df jcc py-2 my-5 ${styles.persons} `}>
        <div className="df aic gap-5">
          <button
            onClick={() =>
              personsState > 1 ? setPersonsState(personsState - 1) : null
            }
          >
            <FaCircleMinus style={{ color: "#6291F4", fontSize: "22px" }} />
          </button>
          <div className="df fdc aic">
            <span className="fs-14">{t("Persons")}</span>
            <span className="text-blue fw-semibold">{personsState}</span>
          </div>
          <button onClick={() => setPersonsState(personsState + 1)}>
            <FaCirclePlus style={{ color: "#6291F4", fontSize: "22px" }} />
          </button>
        </div>
      </div>

      <div className="df pt-3">
        <div
          className={`bg-light-bg rounded-m p-5 df fdc ${styles.ingredientsBlock}`}
        >
          <h3 className="ff-header fs-18 fw-semibold pb-4 mb-2">
            {t("Ingredients")}
          </h3>
          {ingredients
            ? ingredients.map((ingredient, index) => {
                const amount = ingredient.amount * (personsState / persons);

                return (
                  <div
                    className="df gap-4 mb-4 pb-1"
                    key={ingredient.ingredient}
                  >
                    {/* @TODO: Change recipe index number with filled checkboxes */}
                    <span
                      className={`df aic jcc bg-light-blue text-blue fw-semibold rounded-full fs-14 ${styles.indicator}`}
                    >
                      {index + 1}
                    </span>
                    <span>
                      {/* Show max 2 decimals */}
                      {parseFloat(amount.toFixed(2))} {ingredient.unit}{" "}
                      {ingredient.ingredient}
                    </span>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default Ingredients;
