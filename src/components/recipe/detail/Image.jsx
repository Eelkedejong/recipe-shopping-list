import logo from '../../../assets/logo-white.svg';
import styles from '../recipe.module.scss';

const Image = ({ image }) => {
  const imageUrl = `https://res.cloudinary.com/dr8avu1nv/image/upload/c_crop,g_custom/${image}.jpg`;

  return (
    <>
      {image ? (
        <>
          <div
            className={`flex justify-center bg-main rounded-t-20 flex-1 ${styles.detailsImage}`}
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
        </>
      ) : (
        <div
          className={`flex justify-center bg-main rounded-t-20 flex-1 ${styles.placeholderDetailsImage}`}
        >
          <img src={logo} alt="Chef" />
        </div>
      )}
    </>
  );
};

export default Image;
