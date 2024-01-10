import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LanguageSelect from "../language/LanguageSelect";
// import styles from "./navigation.module.scss";
import {
  FaHouse,
  FaUtensils,
  FaFileCirclePlus,
  FaFileLines,
  FaBook,
  FaBasketShopping,
} from "react-icons/fa6";

const Navigation = () => {
  const userName = useSelector((state) => state.user.value.username);
  const { t } = useTranslation();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const openClass = open ? "open" : "";

  useEffect(() => {
    if (open) {
      document.body.classList.add("nav-open");
    } else {
      document.body.classList.remove("nav-open");
    }
  }, [open]);

  const home = "/";
  const locationPath = location.pathname;

  return (
    <div className="navigation-wrapper bg-white navigation">
      <button
        className={`
          nav-toggle
          ${openClass} 
          desktop-hidden`}
        onClick={() => setOpen(!open)} // Toggle the open state.
      >
        <span className="burger"></span>
        <span className="burger-text">Menu</span>
      </button>
      <div className={`px-5 pt-3 text-white logo-wrapper`}>
        <h1 className={`logo df ff-logo`}>
          <span className="pr-3 pb-2">Cookbook</span>
        </h1>
      </div>
      <nav className={`navigation df px-5 py-3 fw-light fs-16 ${openClass}`}>
        <button className="overlay" onClick={() => setOpen(false)}></button>
        <ul className="df fdc gap-3 mt-5 mr-3 w-100">
          <h4 className="mobile-hidden mb-1">
            {`${userName}'s`} {t("Cookbook")}
          </h4>
          <li
            className={`
              ${locationPath === home ? "active" : null}`}
          >
            <Link className="link" to={home}>
              <div className="df aic gap-4 py-3">
                <FaHouse className="fs-18" /> {t("Overview")}
              </div>
            </Link>
          </li>
          <li className={locationPath === "/recipes" ? "active" : null}>
            <Link className="link two" to="/recipes">
              <div className="df aic gap-4 py-3">
                <FaBook className="fs-18" />
                {t("My Recipes")}
              </div>
            </Link>
          </li>
          <li
            className={`${locationPath === "/shopping-list" ? "active" : null}`}
          >
            <Link className="link" to="/shopping-list">
              <div className="df aic gap-4 py-3">
                <FaBasketShopping className="fs-18" /> {t("My Shopping List")}
              </div>
            </Link>
          </li>
          <li
            className={`mb-5 ${
              locationPath === "/recipes/all" ? "active" : null
            }`}
          >
            <Link className="link" to="/recipes/all">
              <div className="df aic gap-4 py-3">
                <FaUtensils className="fs-18" /> {t("Public Recipes")}
              </div>
            </Link>
          </li>
          <hr />
          <h4 className="mt-5">{t("Quick actions")}</h4>
          <li className={`${locationPath === "/recipe/new" ? "active" : null}`}>
            <Link className="link" to="/recipe/new">
              <div className="df aic gap-4 py-3">
                <FaFileCirclePlus className="fs-18" /> {t("New recipe")}{" "}
              </div>
            </Link>
          </li>
          <hr className="desktop-hidden" />
          <h4 className="mt-5 desktop-hidden">{t("My Account")}</h4>
          <li className="desktop-hidden">
            <LanguageSelect />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
