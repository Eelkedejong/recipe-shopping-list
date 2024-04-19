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
import { IoReceipt } from 'react-icons/io5';
import styles from './sticky-navigation.module.scss';

const StickyNavigation = () => {
  const { t } = useTranslation();
  const [recipeOpen, setRecipeOpen] = useState(false);
  const [shoppingOpen, setShoppingOpen] = useState(false);
  const wrapperRef = useRef(null);
  const location = useLocation();

  // Detect clicks outside of the navigation so we can close it.
  useEffect(() => {
    function handleClickOutsideNav(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setRecipeOpen(false);
        setShoppingOpen(false);
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
    setRecipeOpen(false);
    setShoppingOpen(false);
  }, [location]);

  const locationPath = location.pathname;

  // On the recipe form the sticky nav is different.
  // @TODO: Find a better way to do this.
  const formPage =
    locationPath === '/recipe/new' ||
    locationPath.includes('/recipe/edit') ||
    locationPath === '/shopping-list';

  return (
    <div ref={wrapperRef} className="desktop-hidden">
      <div
        className={`
          bg-white dg aic gap-5 w-100 text-dark-grey ta-center px-5 
          ${styles.stickyNav}
          ${formPage ? styles.formPage : null}
          ${recipeOpen || shoppingOpen ? styles.open : null}
          ${recipeOpen ? styles.openRecipe : null}
          ${shoppingOpen ? styles.openShopping : null}
        `}
      >
        <Link
          className={`jse pr-5 ${locationPath === '/' ? styles.active : null}`}
          to={'/'}
        >
          <div className="df fdc aic jcc gap-1">
            <FaHouse className="fs-16" />
            <span className="fs-13">{t('Home')}</span>
          </div>
        </Link>

        <button
          type="button"
          className={`df fdc aic jcc h-100 gap-1 px-5 ${locationPath === '/recipes' ? styles.active : null} ${styles.recipe}`}
          onClick={() => {
            setRecipeOpen(!recipeOpen);
            setShoppingOpen(false);
          }}
        >
          {!recipeOpen ? (
            <FaBook className="fs-16" />
          ) : (
            <FaXmark className="fs-16" />
          )}
          <span className="fs-13">{t('Recipes')}</span>
        </button>

        <button
          type="button"
          className={`shopping df fdc jcc jss aic h-100 gap-1 ${locationPath === '/shopping-list' ? styles.active : null} ${styles.shopping}`}
          onClick={() => {
            setShoppingOpen(!shoppingOpen);
            setRecipeOpen(false);
          }}
        >
          {!shoppingOpen ? (
            <FaBasketShopping className="fs-16" />
          ) : (
            <FaXmark className="fs-16" />
          )}
          <span className="fs-13 desktop-hidden-s">{t('Shopping')}</span>
          <span className="fs-13 mobile-hidden-s">{t('Shopping list')}</span>
        </button>

        {/* <Link
          className={`jss ${locationPath === '/shopping-list' ? styles.active : null}`}
          to={'/shopping-list'}
        >
          <div className="df fdc aic jcc gap-1">
            <FaBasketShopping className="fs-16" />
            <span className="fs-13 desktop-hidden-s">{t('Shopping')}</span>
            <span className="fs-13 mobile-hidden-s">{t('Shopping list')}</span>
          </div>
        </Link> */}
      </div>

      <div
        className={`
          bg-main aic dg gap-5 w-100 text-white ta-center px-5 ws-nowrap
          ${styles.stickySubNav} 
          ${styles.recipeSubNav}
          ${formPage ? styles.formPage : null}
          ${recipeOpen ? styles.open : null}
        `}
      >
        <Link className="jse" to="/recipe/new">
          <div className="df fdc aic gap-1">
            <FaFileCirclePlus className="fs-18" />
            <span className="fs-13">{t('New recipe')}</span>
          </div>
        </Link>

        <Link className="p-3" to="/recipes">
          <div className="df fdc aic gap-1">
            <FaBook className="fs-18" />
            <span className="fs-13">{t('My Recipes')}</span>
          </div>
        </Link>

        <Link className="jss" to="/recipes/all">
          <div className="df fdc aic gap-1">
            <FaUtensils className="fs-18" />
            <span className="fs-13">{t('Find Recipes')}</span>
          </div>
        </Link>
      </div>

      <div
        className={`
          bg-main aic dg gap-5 w-100 text-white ta-center px-5 ws-nowrap
          ${styles.stickySubNav} 
          ${styles.shoppingSubNav}
          ${formPage ? styles.formPage : null}
          ${shoppingOpen ? styles.open : null}
        `}
      >
        <Link className="jse pr-3" to="/list">
          <div className="df fdc aic gap-1">
            <FaBasketShopping className="fs-18" />
            <span className="fs-13">{t('Shopping list')}</span>
          </div>
        </Link>

        <Link className="jss pl-3" to="/shopping-list">
          <div className="df fdc aic gap-1">
            <IoReceipt className="fs-18" />
            <span className="fs-13">{t('Edit Shopping List')}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default StickyNavigation;
