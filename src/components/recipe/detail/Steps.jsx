import { useTranslation } from "react-i18next";
import styles from "../recipe.module.scss";

const Steps = ({ steps }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.stepsDetailsWrapper}>
        <h3 className="ff-header fs-18 fw-semibold pb-5">
          {t("Cooking steps")}
        </h3>
        {steps
          ? steps.map((step, index) => {
              return (
                <div
                  className={`dg gap-4 mb-4 pb-2 ${styles.stepsDetailsGrid}`}
                  key={index}
                >
                  <span
                    className={`df aic jcc bg-light-blue text-blue fw-semibold rounded-full fs-14 ${styles.indicator}`}
                  >
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};

export default Steps;
