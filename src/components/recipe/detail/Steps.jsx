import { useTranslation } from 'react-i18next';
import styles from '../recipe.module.scss';

const Steps = ({ steps }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={` ${styles.stepsDetailsWrapper} pb-5`}>
        <h3 className="fs-18 fw-semibold pb-5">{t('Cooking steps')}</h3>
        {steps
          ? steps.map((step, index) => {
              return (
                <div
                  className={`dg gap-4 p-4 rounded-s ${
                    styles.stepsDetailsGrid
                  } ${index % 2 === 0 ? 'bg-main-lighter' : ''}`}
                  key={index}
                >
                  <span
                    className={`df aic jcc bg-main-light text-main fw-semibold rounded-full fs-14 ${styles.indicator}`}
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
