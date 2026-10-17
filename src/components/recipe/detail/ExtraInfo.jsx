import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { FaClockRotateLeft, FaUtensils } from 'react-icons/fa6';
import styles from '../recipe.module.scss';

const RecipeDetail = ({ recipe }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex  gap-6 pt-6">
        {recipe.time ? (
          <div
            className={`flex flex-col items-center justify-center p-4 px-6 bg-white rounded-10 ${styles.detailBlock}`}
          >
            <div className="flex items-center gap-2 text-main text-14">
              <FaClockRotateLeft /> {recipe.time} {t('min')}
            </div>
            <span className="text-12">{t('Cooking time')}</span>
          </div>
        ) : null}

        {recipe.cuisine && recipe.cuisine.length != 0 ? (
          <div
            className={`flex flex-col items-center justify-center p-4 px-6 bg-white rounded-10 ${styles.detailBlock}`}
          >
            <div className="flex items-center gap-2 text-main text-14">
              <FaUtensils /> {recipe.cuisine[0]}
            </div>
            <span className="text-12">{t('Cuisine')}</span>
          </div>
        ) : null}

        {recipe.tags && recipe.tags.length > 0 ? (
          <div
            className={`flex flex-col items-center justify-center p-4 px-6 bg-white rounded-10 ${styles.detailBlock}`}
          >
            <div className="flex items-center gap-1 text-main text-14">
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
            <span className="text-12">{t('Characteristics')}</span>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default RecipeDetail;
