import logo from '../../../assets/logo-white.svg';
import styles from '../recipe.module.scss';

const Image = ({ image }) => {
  const imageUrl = `https://res.cloudinary.com/dr8avu1nv/image/upload/c_crop,g_custom/${image}.jpg`;

  return (
    <>
      {image ? (
        <>
          <div
            className={`df jcc bg-main rounded-top-m f1 ${styles.detailsImage}`}
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
        </>
      ) : (
        <div
          className={`df jcc bg-main rounded-top-m f1 ${styles.placeholderDetailsImage}`}
        >
          <img src={logo} alt="Chef" />
        </div>
      )}
    </>
  );
};

export default Image;
