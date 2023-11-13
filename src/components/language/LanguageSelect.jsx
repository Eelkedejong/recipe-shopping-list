import { useTranslation } from "react-i18next";
import styles from "./language.module.scss";
import enFlag from "../../assets/flags/en.svg";
import nlFlag from "../../assets/flags/nl.svg";

const LanguageSelect = () => {
  const { i18n } = useTranslation();

  const lngs = {
    en: { nativeName: "English" },
    nl: { nativeName: "Nederlands" },
  };

  const flag = (lng) => {
    if (lng === "en") {
      return enFlag;
    }
    if (lng === "nl") {
      return nlFlag;
    }
  };

  return (
    <div className={`lang ${styles.selector}`}>
      {Object.keys(lngs).map((lng) => (
        <button
          id={lng}
          key={lng}
          onClick={() => {
            i18n.changeLanguage(lng);
          }}
          className={i18n.resolvedLanguage === lng ? "hidden" : ""}
        >
          <img
            src={flag(lng)}
            alt={lngs[lng].nativeName}
            className="rounded-full"
          />
        </button>
      ))}
    </div>
  );
};

export default LanguageSelect;
