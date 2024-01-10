import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { FaChevronLeft } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from "../Search";
import styles from "./header.module.scss";

const Header = ({ title, returnUrl, returnText, hiddenMobile }) => {
  const userName = useSelector((state) => state.user.value.username);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header
      className={`pl-5 df aic ${styles.header} ${
        hiddenMobile ? styles.hiddenMobile : null
      }`}
    >
      <div className="df jcsb w-100">
        {returnUrl && returnText ? (
          <Link to={returnUrl} className="df aic gap-3">
            <div className="bg-white rounded-full p-2 df aic">
              <FaChevronLeft />
            </div>
            <span className="fs-16 fw-light text-grey">{returnText}</span>
          </Link>
        ) : title ? (
          <h2 className="fs-28 fw-bold pt-5">{title}</h2>
        ) : (
          <div className={styles.greeting}>
            <div className="fs-16 fw-light text-grey">
              {t("Welcome")}, {userName}
            </div>
            <h2 className="fs-28 fw-bold">{t("What's on the menu today?")}</h2>
          </div>
        )}
        <button className="desktop-hidden p-3" onClick={() => setOpen(!open)}>
          <FaSearch />
        </button>
      </div>

      <Search openState={open} />
    </header>
  );
};

export default Header;
