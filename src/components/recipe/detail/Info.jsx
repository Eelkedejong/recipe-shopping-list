import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaClockRotateLeft, FaUtensils, FaPen } from 'react-icons/fa6';
import styles from '../recipe.module.scss';
import easy from '../../../assets/icons/easy.svg';
import medium from '../../../assets/icons/medium.svg';
import difficult from '../../../assets/icons/difficult.svg';

const RecipeDetail = ({ recipe }) => {
  const { t } = useTranslation();

  const difficultyicon = () => {
    const icons = {
      [t('Easy')]: easy,
      [t('Medium')]: medium,
      [t('Difficult')]: difficult,
    };
    return icons[t(recipe.difficulty)] || difficult;
  };

  return (
    <>
      <div>
        <div className="df aic jcsb">
          <h1 className="fs-32 fw-bold">{recipe.name}</h1>
          <Link to={`/recipe/edit/${recipe.id}`}>
            <FaPen />
          </Link>
        </div>
        <div className="df gap-1 text-grey fw-light fs-14">
          {recipe.tags
            ? recipe.tags.map((label, index) => {
                return (
                  <span key={label}>
                    {label}
                    {index !== recipe.tags.length - 1 ? ', ' : ''}
                  </span>
                );
              })
            : null}
        </div>
        <div className="my-5">{recipe.description}</div>
        <div className="df fww gap-5 py-3">
          {recipe.time ? (
            <div
              className={`df fdc aic jcc f1 p-2 bg-main-lighter rounded-s ${styles.detailBlock}`}
            >
              <div className="df aic gap-2 text-main fs-14">
                <FaClockRotateLeft /> {recipe.time} {t('min')}
              </div>
              <span className="fs-12">{t('Cooking time')}</span>
            </div>
          ) : null}

          {recipe.type ? (
            <div
              className={`df fdc aic jcc f1 p-2 bg-main-lighter rounded-s ${styles.detailBlock}`}
            >
              <div className="df aic gap-2 text-main fs-14">
                <FaUtensils /> {recipe.type}
              </div>
              <span className="fs-12">{t('Type')}</span>
            </div>
          ) : null}

          {recipe.difficulty ? (
            <div
              className={`df fdc aic jcc f1 p-2 py-3 bg-main-lighter rounded-s ${styles.detailBlock}`}
            >
              <div className="df aic gap-2 text-main fs-14">
                <img src={difficultyicon()} alt="recipe difficulty" />
                {recipe.difficulty}
              </div>
              <span className="fs-12">{t('Difficulty')}</span>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
