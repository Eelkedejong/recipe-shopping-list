import { useTranslation } from 'react-i18next';
import styles from '../recipe.module.scss';

const Steps = ({ steps }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={` ${styles.stepsDetailsWrapper} bg-white p-6 rounded-20`}>
        <h3 className="text-20 font-semibold pb-6">{t('Cooking steps')}</h3>
        {steps
          ? steps.map((step, index) => {
              return (
                <div
                  className={`grid gap-4 p-4 rounded-10 ${
                    styles.stepsDetailsGrid
                  } ${index % 2 === 0 ? 'bg-main-bg-light' : ''}`}
                  key={index}
                >
                  <span
                    className={`flex items-center justify-center bg-main text-white font-semibold rounded-[50%] text-14 ${styles.indicator}`}
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
