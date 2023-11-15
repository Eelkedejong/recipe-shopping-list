import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { FaChevronLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Search from "../Search";
import styles from "./header.module.scss";

const Header = ({ title, returnUrl, returnText, hiddenMobile }) => {
  const userName = useSelector((state) => state.user.value.username);
  const { t } = useTranslation();

  return (
    <header
      className={`pl-5 df jcsb aic ${styles.header} ${
        hiddenMobile ? styles.hiddenMobile : null
      }`}
    >
      {returnUrl && returnText ? (
        <Link to={returnUrl} className="df aic gap-3">
          <div className="bg-white rounded-full p-2 df aic">
            <FaChevronLeft />
          </div>
          <span className="fs-16 ff-text fw-light text-medium-grey">
            {returnText}
          </span>
        </Link>
      ) : title ? (
        <h2 className="fs-28 ff-header fw-bold pt-5">{title}</h2>
      ) : (
        <div className={styles.greeting}>
          <div className="fs-16 ff-text fw-light text-medium-grey">
            {t("Welcome")}, {userName}
          </div>
          <h2 className="fs-28 ff-header fw-bold">
            {t("What's on the menu today?")}
          </h2>
        </div>
      )}
      <Search />
    </header>
  );
};

export default Header;
