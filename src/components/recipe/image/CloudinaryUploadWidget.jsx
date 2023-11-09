import { createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import styles from "./image.module.scss";
import { TbCameraPlus } from "react-icons/tb";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({ uwConfig, image }) {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const [imageId, setImageId] = useState(image ? image : null);
  console.log("loaded", loaded);

  // Cloudinary cloud name
  const [cloudName] = useState("dr8avu1nv");

  // Create a Cloudinary instance
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setImageId(result.info.public_id);
          }
        }
      );

      myWidget.open();

      document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className={`bg-input rounded-s df fdc aic jcc fs-16 w-100 pos-relative ${
          styles.uploadButton
        } ${imageId ? styles.uploaded : ""} `}
        onClick={initializeCloudinaryWidget}
        type="button"
      >
        <div className={`df fdc aic ${styles.uploadIcon}`}>
          <TbCameraPlus />
          {imageId ? t("Change picture") : t("Add a picture")}
        </div>
        <AdvancedImage
          classes={styles.image}
          cldImg={cld.image(imageId)}
          plugins={[responsive(), placeholder()]}
        />
      </button>

      {image ? <input type="hidden" name="image" value={image} /> : null}
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
