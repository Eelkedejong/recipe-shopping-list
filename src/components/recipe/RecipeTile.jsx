import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { FaUserFriends, FaPen, FaClock, FaTag } from "react-icons/fa";
import { PiForkKnifeFill } from "react-icons/pi";
import styles from "./recipe.module.scss";

const RecipeTile = (props) => {
  // Create a Cloudinary instance
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dr8avu1nv",
    },
  });

  const { t } = useTranslation();
  const {
    name,
    image,
    description,
    persons,
    carb,
    time,
    ingredients,
    id,
    tag,
  } = props;

  const recipeImage = cld.image(image);

  // Resize to fit in the recipe tile
  recipeImage.resize(fill().width(700).height(300));

  return (
    <div className="bg-grey-blue rounded-m mb-5 fs-14 pos-relative">
      <AdvancedImage cldImg={recipeImage} className="rounded-top-m" />

      <div className="p-5">
        <span className="df jcsb">
          <h2 className="fs-18 mb-2">{name}</h2>
          <Link to={`/recipe/${id}`}>
            <FaPen fontSize="16px" />
          </Link>
        </span>

        {description ? <div>{description}</div> : null}

        <div className="df gap-3 my-4 fww">
          {persons ? (
            <div className="df aic gap-2 bg-light-blue py-2 px-3 rounded-m">
              <FaUserFriends fontSize="18px" /> {persons}
            </div>
          ) : null}

          {time ? (
            <div className="df aic gap-2 bg-light-blue py-2 px-3 rounded-m">
              <FaClock fontSize="16px" /> {time}
            </div>
          ) : null}

          {tag ? (
            <div className="df aic gap-2 bg-light-blue py-2 px-3 rounded-m">
              <FaTag fontSize="16px" /> {tag}
            </div>
          ) : null}

          {carb ? (
            <div className="df aic gap-2 bg-light-blue py-2 px-3 rounded-m">
              <PiForkKnifeFill fontSize="18px" /> {carb}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RecipeTile;
