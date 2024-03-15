import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import logo from '../../../assets/logo-white.svg';
import styles from '../recipe.module.scss';

const Image = ({ image }) => {
  // Create a Cloudinary instance
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dr8avu1nv',
    },
  });

  const recipeImage = cld.image(image);

  // Resize to fit in the recipe tile
  recipeImage.resize(fill().width(560).height(300));

  return (
    <>
      {image ? (
        <AdvancedImage cldImg={recipeImage} className={styles.detailsImage} />
      ) : (
        <div
          className={`df jcc bg-main rounded-top-m f1 ${styles.placeholderImage}`}
        >
          <img src={logo} alt="Chef" />
        </div>
      )}
    </>
  );
};

export default Image;
