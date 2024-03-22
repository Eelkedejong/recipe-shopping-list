import { Cloudinary } from '@cloudinary/url-gen';
import { Delivery } from '@cloudinary/url-gen/actions/delivery';
import {
  AdvancedImage,
  responsive,
  lazyload,
  placeholder,
} from '@cloudinary/react';
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

  console.log('image', image);
  console.log('recipeImage', recipeImage);

  // Set the delivery format to WebP
  recipeImage.delivery(Delivery.format('webp'));

  // Resize to fit in the recipe tile
  recipeImage.quality('auto');
  recipeImage.resize(fill().width(900).height(350));

  console.log('recipeImage final', recipeImage);

  return (
    <>
      {image ? (
        <AdvancedImage
          cldImg={recipeImage}
          className={styles.detailsImage}
          plugins={[lazyload()]}
        />
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
