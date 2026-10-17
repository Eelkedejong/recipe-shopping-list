import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  FaClockRotateLeft,
  FaUtensils,
  FaPen,
  FaLeaf,
  FaChildReaching,
} from 'react-icons/fa6';
import styles from '../recipe.module.scss';
import easy from '../../../assets/icons/easy.svg';
import medium from '../../../assets/icons/medium.svg';
import difficult from '../../../assets/icons/difficult.svg';

const RecipeDetail = ({ recipe }) => {
  console.log('recipe', recipe);
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
        <div className="flex items-center justify-between">
          <h1 className="text-32 font-bold">{recipe.name}</h1>
          <Link to={`/recipe/edit/${recipe.id}`}>
            <FaPen />
          </Link>
        </div>
        <div className="flex gap-1 text-grey font-light text-16">
          {recipe.typeOfDish
            ? recipe.typeOfDish.map((type, index) => {
                return (
                  <span key={type}>
                    {type}
                    {index !== recipe.typeOfDish.length - 1 ? ', ' : ''}
                  </span>
                );
              })
            : null}
        </div>
        <div className="my-4">{recipe.description}</div>

        <div className="flex gap-3 flex-wrap">
          {recipe.typeOfMeal
            ? recipe.typeOfMeal.map((type, index) => {
                return (
                  <div
                    className={`
                  py-2 px-4 text-main bg-main-bg rounded-10 text-12 font-semibold 
                `}
                    key={type}
                  >
                    {t(`${type.charAt(0).toUpperCase() + type.slice(1)}`)}
                  </div>
                );
              })
            : null}
        </div>

        <div className="flex gap-6 flex-wrap mt-4">
          {recipe.isVegetarian ? (
            <div className="flex items-center gap-2 text-14">
              <FaLeaf style={{ color: '#5c8d89' }} />
              <span style={{ color: '#5c8d89' }}>{t('Vegetarian')}</span>
            </div>
          ) : null}

          {recipe.isChildFriendly ? (
            <div className="flex gap-2 text-14">
              <FaChildReaching />
              {t('Child friendly')}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
