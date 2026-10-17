import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { FaClockRotateLeft, FaUtensils } from 'react-icons/fa6';
import logo from '../../assets/logo-white.svg';
import styles from './recipe.module.scss';

const RecipeTile = ({
  id,
  name,
  image,
  typeOfDish,
  typeOfMeal,
  cuisine,
  time,
  type,
  isPublic,
}) => {
  const { t } = useTranslation();
  // Create a Cloudinary instance for the recipe image.
  // const cld = new Cloudinary({
  //   cloud: {
  //     cloudName: 'dr8avu1nv',
  //   },
  // });

  // const recipeImage = cld.image(image);

  // // Resize to fit in the recipe tile
  // recipeImage.resize(fill().width(600).height(300).gravity('auto'));

  const imageUrl = `https://res.cloudinary.com/dr8avu1nv/image/upload/c_crop,g_custom/${image}.jpg`;

  return (
    <Link
      to={`${isPublic ? `/public/recipe/${id}` : `/recipe/${id}`}`}
      className={`flex flex-col rounded-20 ${styles.recipeTile}`}
    >
      {image ? (
        <div
          className={`flex justify-center bg-main rounded-t-20 flex-1 ${styles.tileImage}`}
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      ) : (
        <div
          className={`flex justify-center bg-main rounded-t-20 flex-1 ${styles.placeholderImage}`}
        >
          <img src={logo} alt="Chef" />
        </div>
      )}

      <div className="p-3 py-2">
        <h2 className="text-18 font-bold">{name}</h2>

        <div className="flex gap-1 text-grey font-light text-14">
          {typeOfDish
            ? typeOfDish.map((type, index) => {
                return (
                  <span key={type}>
                    {type}
                    {index !== typeOfDish.length - 1 ? ', ' : ''}
                  </span>
                );
              })
            : null}
        </div>

        <div className={`flex gap-4 mt-6 mb-2 mr-6 flex-wrap`}>
          {time ? (
            <div className="flex items-center gap-2 text-14">
              <FaClockRotateLeft fontSize="14px" /> {time} {t('min')}
            </div>
          ) : null}

          {cuisine && cuisine.length > 0 ? (
            <div
              className={`flex items-center gap-1 text-12 ${styles.cuisineLabel} bg-white rounded-10 p-1 px-2`}
            >
              {/* <FaUtensils fontSize="14px" /> */}
              {cuisine[0]}
            </div>
          ) : null}

          {typeOfMeal && typeOfMeal.length > 0 ? (
            <div className="flex items-center gap-1 text-14">
              <FaUtensils fontSize="14px" />
              {typeOfMeal
                ? typeOfMeal.map((type, index) => {
                    return (
                      <span key={type}>
                        {t(`${type.charAt(0).toUpperCase() + type.slice(1)}`)}
                        {index !== typeOfMeal.length - 1 ? ', ' : ''}
                      </span>
                    );
                  })
                : null}
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
};

export default RecipeTile;
