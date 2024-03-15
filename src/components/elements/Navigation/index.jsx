import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LanguageSelect from '../../language/LanguageSelect';
import styles from './navigation.module.scss';
import {
  FaHouse,
  FaUtensils,
  FaFileCirclePlus,
  FaFileLines,
  FaBook,
  FaBasketShopping,
} from 'react-icons/fa6';
import Logout from '../../../pages/authentication/Logout';

const Navigation = () => {
  const userName = useSelector((state) => state.user.value.username);
  const { t } = useTranslation();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const openClass = open ? styles.open : '';

  useEffect(() => {
    if (open) {
      document.body.classList.add('overlay');
    } else {
      document.body.classList.remove('overlay');
    }
  }, [open]);

  // Reset the open state when the location changes.
  useEffect(() => {
    setOpen(false);
  }, [location]);

  const home = '/';
  const locationPath = location.pathname;

  return (
    <div className={`bg-white navigation ${styles.navigationWrapper}`}>
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
        <button
          className={styles.overlay}
          onClick={() => setOpen(false)}
        ></button>
        <ul className="df fdc gap-3 mt-5 mr-3 w-100">
          <h4 className="mobile-hidden mb-1">
            {`${userName}'s`} {t('Cookbook')}
          </h4>
          <li className={`${locationPath === home ? styles.active : null}`}>
            <Link className="link" to={home}>
              <div className="df aic gap-4 py-3">
                <FaHouse className="fs-18" /> {t('Overview')}
              </div>
            </Link>
          </li>
          <li className={locationPath === '/recipes' ? styles.active : null}>
            <Link className="link two" to="/recipes">
              <div className="df aic gap-4 py-3">
                <FaBook className="fs-18" />
                {t('My Recipes')}
              </div>
            </Link>
          </li>
          <li
            className={`${locationPath === '/shopping-list' ? styles.active : null}`}
          >
            <Link className="link" to="/shopping-list">
              <div className="df aic gap-4 py-3">
                <FaBasketShopping className="fs-18" /> {t('My Shopping List')}
              </div>
            </Link>
          </li>
          <li
            className={`mb-5 ${locationPath === '/recipes/all' ? styles.active : null}`}
          >
            <Link className="link" to="/recipes/all">
              <div className="df aic gap-4 py-3">
                <FaUtensils className="fs-18" /> {t('Public Recipes')}
              </div>
            </Link>
          </li>
          <hr />
          <h4 className="mt-5">{t('Quick actions')}</h4>
          <li
            className={`mb-5 ${locationPath === '/recipe/new' ? styles.active : null}`}
          >
            <Link className="link" to="/recipe/new">
              <div className="df aic gap-4 py-3">
                <FaFileCirclePlus className="fs-18" /> {t('New recipe')}{' '}
              </div>
            </Link>
          </li>
          <hr />
          <h4 className="mt-5 ">{t('My Account')}</h4>
          <li className="">
            <Logout />
          </li>
          <li className="desktop-hidden">
            <LanguageSelect />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
