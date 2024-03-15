import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHouse,
  FaBasketShopping,
  FaBook,
  FaFileCirclePlus,
  FaUtensils,
  FaXmark,
} from 'react-icons/fa6';
import styles from './sticky-navigation.module.scss';

const StickyNavigation = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const location = useLocation();

  // Detect clicks outside of the navigation so we can close it.
  useEffect(() => {
    function handleClickOutsideNav(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutsideNav);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutsideNav);
    };
  }, [wrapperRef]);

  // Reset the open state when the location changes.
  useEffect(() => {
    setOpen(false);
  }, [location]);

  const locationPath = location.pathname;

  // On the recipe form the sticky nav is different.
  // @TODO: Find a better way to do this.
  const formPage =
    locationPath === '/recipe/new' || locationPath.includes('/recipe/edit');

  return (
    <div ref={wrapperRef} className="desktop-hidden">
      <div
        className={`
          bg-white dg aic gap-5 w-100 text-dark-grey ta-center px-5 
          ${styles.stickyNav}
          ${formPage ? styles.formPage : null}
          ${open ? styles.open : null}
        `}
      >
        <Link
          className={`jse pr-5 ${locationPath === '/' ? styles.active : null}`}
          to={'/'}
        >
          <div className="df fdc aic gap-1">
            <FaHouse className="fs-18" />
            <span className="fs-14">{t('Home')}</span>
          </div>
        </Link>

        <button
          type="button"
          className={`df fdc aic jcc h-100 gap-1 px-5 ${locationPath === '/recipes' ? styles.active : null}`}
          onClick={() => setOpen(!open)}
        >
          {!open ? <FaBook className="fs-18" /> : <FaXmark className="fs-18" />}
          <span className="fs-14">{t('Recipes')}</span>
        </button>

        <Link
          className={`jss ${locationPath === '/shopping-list' ? styles.active : null}`}
          to={'/shopping-list'}
        >
          <div className="df fdc aic gap-1">
            <FaBasketShopping className="fs-18" />
            <span className="fs-14">{t('Shopping list')}</span>
          </div>
        </Link>
      </div>

      <div
        className={`
          bg-main aic dg gap-5 w-100 text-white ta-center px-5 
          ${styles.stickySubNav} 
          ${formPage ? styles.formPage : null}
          ${open ? styles.open : null}
        `}
      >
        <Link className="jse" to="/recipe/new">
          <div className="df fdc aic gap-1">
            <FaFileCirclePlus className="fs-18" />
            <span className="fs-14">{t('New recipe')}</span>
          </div>
        </Link>

        <Link className="p-3" to="/recipes">
          <div className="df fdc aic gap-1">
            <FaBook className="fs-18" />
            <span className="fs-14">{t('My Recipes')}</span>
          </div>
        </Link>

        <Link className="jss" to="/recipes/all">
          <div className="df fdc aic gap-1">
            <FaUtensils className="fs-18" />
            <span className="fs-14">{t('Find Recipes')}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default StickyNavigation;
