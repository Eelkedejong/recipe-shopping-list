import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { FaClockRotateLeft, FaUtensils } from "react-icons/fa6";
import logo from "../../assets/logo-white.svg";
import styles from "./recipe.module.scss";

const RecipeTile = ({ id, name, image, labels, time, type }) => {
  const { t } = useTranslation();
  // Create a Cloudinary instance
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dr8avu1nv",
    },
  });

  const recipeImage = cld.image(image);

  // Resize to fit in the recipe tile
  recipeImage.resize(fill().width(700).height(300));

  return (
    <Link
      to={`/recipe/${id}`}
      className={`df fdc rounded-m ${styles.recipeTile}`}
    >
      {image ? (
        <AdvancedImage cldImg={recipeImage} className="rounded-top-m" />
      ) : (
        <div
          className={`df jcc bg-blue rounded-top-m f1 ${styles.placeholderImage}`}
        >
          <img src={logo} alt="Chef" />
        </div>
      )}

      <div className="p-3 py-2">
        <h2 className="fs-18 ff-header fw-bold">{name}</h2>

        <div className="df gap-1 text-medium-grey ff-text fw-light fs-14">
          {labels
            ? labels.map((label, index) => {
                return (
                  <span key={label}>
                    {label}
                    {index !== labels.length - 1 ? ", " : ""}
                  </span>
                );
              })
            : null}
        </div>

        <div className="df gap-4 mt-5 mb-2 fww">
          {time ? (
            <div className="df aic gap-2 fs-14">
              <FaClockRotateLeft fontSize="14px" /> {time} {t("min")}
            </div>
          ) : null}

          {type ? (
            <div className="df aic gap-2 fs-14">
              <FaUtensils fontSize="14px" /> {type}
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
};

export default RecipeTile;
