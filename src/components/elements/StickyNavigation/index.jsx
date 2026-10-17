import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router';
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
    <div ref={wrapperRef} className="m:hidden!">
      <div
        className={`
          bg-white grid items-center gap-6 w-full text-dark-grey text-center px-6 
          ${styles.stickyNav}
          ${formPage ? styles.formPage : null}
          ${recipeOpen || shoppingOpen ? styles.open : null}
          ${recipeOpen ? styles.openRecipe : null}
          ${shoppingOpen ? styles.openShopping : null}
        `}
      >
        <Link
          className={`justify-self-end pr-6 ${locationPath === '/' ? styles.active : null}`}
          to={'/'}
        >
          <div className="flex flex-col items-center justify-center gap-1">
            <FaHouse className="text-16" />
            <span className="text-13">{t('Home')}</span>
          </div>
        </Link>

        <button
          type="button"
          className={`flex flex-col items-center justify-center h-full gap-1 px-6 ${locationPath === '/recipes' ? styles.active : null} ${styles.recipe}`}
          onClick={() => {
            setRecipeOpen(!recipeOpen);
            setShoppingOpen(false);
          }}
        >
          {!recipeOpen ? (
            <FaBook className="text-16" />
          ) : (
            <FaXmark className="text-16" />
          )}
          <span className="text-13">{t('Recipes')}</span>
        </button>

        <button
          type="button"
          className={`shopping flex flex-col justify-center justify-self-start items-center h-full gap-1 ${locationPath === '/shopping-list' ? styles.active : null} ${styles.shopping}`}
          onClick={() => {
            setShoppingOpen(!shoppingOpen);
            setRecipeOpen(false);
          }}
        >
          {!shoppingOpen ? (
            <FaBasketShopping className="text-16" />
          ) : (
            <FaXmark className="text-16" />
          )}
          <span className="text-13 s:hidden!">{t('Shopping')}</span>
          <span className="text-13 max-s:hidden!">{t('Shopping list')}</span>
        </button>
      </div>

      <div
        className={`
          bg-main items-center grid gap-6 w-full text-white text-center px-6 whitespace-nowrap
          ${styles.stickySubNav} 
          ${styles.recipeSubNav}
          ${formPage ? styles.formPage : null}
          ${recipeOpen ? styles.open : null}
        `}
      >
        <Link className="justify-self-end" to="/recipe/new">
          <div className="flex flex-col items-center gap-1">
            <FaFileCirclePlus className="text-18" />
            <span className="text-13">{t('New recipe')}</span>
          </div>
        </Link>

        <Link className="p-3" to="/recipes">
          <div className="flex flex-col items-center gap-1">
            <FaBook className="text-18" />
            <span className="text-13">{t('My Recipes')}</span>
          </div>
        </Link>

        <Link className="justify-self-start" to="/recipes/all">
          <div className="flex flex-col items-center gap-1">
            <FaUtensils className="text-18" />
            <span className="text-13">{t('Find Recipes')}</span>
          </div>
        </Link>
      </div>

      <div
        className={`
          bg-main items-center grid gap-6 w-full text-white text-center px-6 whitespace-nowrap
          ${styles.stickySubNav} 
          ${styles.shoppingSubNav}
          ${formPage ? styles.formPage : null}
          ${shoppingOpen ? styles.open : null}
        `}
      >
        <Link className="justify-self-end pr-3" to="/list">
          <div className="flex flex-col items-center gap-1">
            <FaBasketShopping className="text-18" />
            <span className="text-13">{t('Shopping list')}</span>
          </div>
        </Link>

        <Link className="justify-self-start pl-3" to="/shopping-list">
          <div className="flex flex-col items-center gap-1">
            <IoReceipt className="text-18" />
            <span className="text-13">{t('Edit Shopping List')}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default StickyNavigation;
