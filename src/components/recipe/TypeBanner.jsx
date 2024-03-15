import { useParams } from 'react-router-dom';
import { dishTypes } from '../../utils/dishTypes';
import defaultImage from '../../assets/bg/default.jpg';
import styles from './recipe.module.scss';

const TypeBanner = () => {
  const { type } = useParams();

  let backgroundImage;
  let backgroundPosition;

  // match the type to the dishTypes array of objects, get the background image from the dishTypes array and set it as the background image for the recipe list.
  dishTypes.find((dishType) => {
    if (dishType.label === type) {
      backgroundImage = dishType.background;
      backgroundPosition = dishType.backgroundPosition;
    }
  });

  //if the type is not found in the dishTypes array, set the default image as the background image.
  if (!backgroundImage) {
    backgroundImage = defaultImage;
    backgroundPosition = '0 10%';
  }

  return (
    <div
      className={`rounded-m mb-5 ${styles.banner}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: backgroundPosition,
      }}
    ></div>
  );
};

export default TypeBanner;
