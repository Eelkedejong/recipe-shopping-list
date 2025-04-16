import { Link } from 'react-router-dom';
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
      className={`df fdc rounded-m ${styles.recipeTile}`}
    >
      {image ? (
        <div
          className={`df jcc bg-main rounded-top-m f1 ${styles.tileImage}`}
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      ) : (
        <div
          className={`df jcc bg-main rounded-top-m f1 ${styles.placeholderImage}`}
        >
          <img src={logo} alt="Chef" />
        </div>
      )}

      <div className="p-3 py-2">
        <h2 className="fs-18 fw-bold">{name}</h2>

        <div className="df gap-1 text-grey fw-light fs-14">
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

        <div className={`df gap-4 mt-5 mb-2 mr-5 fww`}>
          {time ? (
            <div className="df aic gap-2 fs-14">
              <FaClockRotateLeft fontSize="14px" /> {time} {t('min')}
            </div>
          ) : null}

          {cuisine && cuisine.length > 0 ? (
            <div
              className={`df aic gap-1 fs-12 ${styles.cuisineLabel} bg-white rounded-s p-1 px-2`}
            >
              {/* <FaUtensils fontSize="14px" /> */}
              {cuisine[0]}
            </div>
          ) : null}

          {typeOfMeal && typeOfMeal.length > 0 ? (
            <div className="df aic gap-1 fs-14">
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
