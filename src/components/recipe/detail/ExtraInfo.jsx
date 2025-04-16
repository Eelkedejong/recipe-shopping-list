import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaClockRotateLeft, FaUtensils } from 'react-icons/fa6';
import styles from '../recipe.module.scss';

const RecipeDetail = ({ recipe }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="df  gap-5 pt-5">
        {recipe.time ? (
          <div
            className={`df fdc aic jcc p-4 px-5 bg-white rounded-s ${styles.detailBlock}`}
          >
            <div className="df aic gap-2 text-main fs-14">
              <FaClockRotateLeft /> {recipe.time} {t('min')}
            </div>
            <span className="fs-12">{t('Cooking time')}</span>
          </div>
        ) : null}

        {recipe.cuisine && recipe.cuisine.length != 0 ? (
          <div
            className={`df fdc aic jcc p-4 px-5 bg-white rounded-s ${styles.detailBlock}`}
          >
            <div className="df aic gap-2 text-main fs-14">
              <FaUtensils /> {recipe.cuisine[0]}
            </div>
            <span className="fs-12">{t('Cuisine')}</span>
          </div>
        ) : null}

        {recipe.tags && recipe.tags.length > 0 ? (
          <div
            className={`df fdc aic jcc p-4 px-5 bg-white rounded-s ${styles.detailBlock}`}
          >
            <div className="df aic gap-1 text-main fs-14">
              {recipe.tags
                ? recipe.tags.map((tag, index) => {
                    return (
                      <span key={tag}>
                        {tag}
                        {index !== recipe.tags.length - 1 ? ',' : ''}
                      </span>
                    );
                  })
                : null}
            </div>
            <span className="fs-12">{t('Characteristics')}</span>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default RecipeDetail;
