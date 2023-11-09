import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Textarea } from "../../ui/Fields";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import styles from "../recipe.module.scss";

const StepsList = ({ steps }) => {
  const { t } = useTranslation();
  const [stepsRows, setStepsRows] = useState(steps ? steps : [""]);

  return (
    <>
      {stepsRows.map((step, index) => {
        const isLastStep = index === stepsRows.length - 1;
        return (
          <div
            className={`dg aic gap-3 mb-4 ${styles.stepsGrid} `}
            key={index} // TODO: Change this to a unique key.
          >
            <div>{index + 1}</div>
            <Textarea
              id={`step-${index + 1}`}
              label={t("Enter step details")}
              value={step ? step : null}
              className="w-100"
              key={index} // TODO: Change this to a unique key.
            />
            {isLastStep && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const newRows = [...stepsRows];
                  newRows.pop();
                  setStepsRows(newRows);
                }}
              >
                <FaMinusCircle />
              </button>
            )}
          </div>
        );
      })}
      <div className="df jcfe">
        <button
          type="button"
          className="df aic jcfe gap-3 py-2 fs-16"
          onClick={(e) => {
            e.preventDefault;
            setStepsRows([...stepsRows, ""]);
          }}
        >
          <span>{t("Add Step")}</span>
          <FaPlusCircle />
        </button>
      </div>
    </>
  );
};

export default StepsList;
