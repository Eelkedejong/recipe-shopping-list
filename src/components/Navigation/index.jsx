import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import styles from "./navigation.module.scss";
import {
  FaHouse,
  FaUtensils,
  FaFileCirclePlus,
  FaFileLines,
} from "react-icons/fa6";

const Navigation = ({ userName }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const openClass = open ? styles.open : "";

  const home = "/";
  const locationPath = location.pathname;
  console.log("locations", locationPath, home, locationPath === home);

  return (
    <div className={`bg-white navigation ${styles.wrapper}`}>
      <button
        className={`
          ${styles.openNav} 
          ${openClass} 
          desktop-hidden`}
        onClick={() => setOpen(!open)} // Toggle the open state.
      >
        <span className={styles.burger}></span>
        <span className={styles.burgerText}>Menu</span>
      </button>
      <div className={`px-5 pt-3 text-white ${styles.logoWrapper}`}>
        <h1 className={`${styles.logo} df ff-logo`}>
          <span className="pr-3 pb-2">Cookbook</span>
        </h1>
      </div>
      <nav
        className={`df px-5 py-3 text-medium-grey ff-text fw-light fs-18 ${styles.navigation} ${openClass}`}
      >
        <ul className="df fdc gap-3 mt-5 mr-3 w-100">
          <h4 className="mobile-hidden mb-1">
            {`${userName}'s`} {t("Cookbook")}
          </h4>
          <li
            className={`
              ${locationPath === home ? styles.active : null} ${styles.one}`}
          >
            <Link className="link" to={home}>
              <div className="df aic gap-4 py-3">
                <FaHouse /> {t("Overview")}
              </div>
            </Link>
          </li>
          <li className={`${styles.two}`}>
            <Link className="link two" to="/recipes">
              <div className="df aic gap-4 py-3">
                <FaFileLines />
                {t("My Recipes")}
              </div>
            </Link>
          </li>
          <li className={`mb-5 ${styles.three}`}>
            <Link className="link" to="/recipes/all">
              <div className="df aic gap-4 py-3">
                <FaUtensils /> {t("Public Recipes")}
              </div>
            </Link>
          </li>
          <hr />
          <h4 className="mt-5 mobile-hidden">{t("Quick actions")}</h4>
          <li className="mobile-hidden">
            <Link className="link" to="/recipe/new">
              <div className="df aic gap-4 py-3">
                <FaFileCirclePlus /> {t("New recipe")}{" "}
              </div>
            </Link>
          </li>
        </ul>
      </nav>

      {/* <div className={`${styles.bottomNav} df p-4`}>
        <button
          className={`
            ${styles.openNav} 
            ${openClass} 
            desktop-hidden`}
          onClick={() => setOpen(!open)} // Toggle the open state.
        >
          <span className={styles.burger}></span>
          <span className={styles.burgerText}>Menu</span>
        </button>
        <Link to="/recipes">{t("My Recipes")}</Link>
      </div> */}
    </div>
  );
};

export default Navigation;
