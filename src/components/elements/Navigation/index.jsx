import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import LanguageSelect from '../../language/LanguageSelect';
import {
  FaHouse,
  FaUtensils,
  FaFileCirclePlus,
  FaBook,
  FaBasketShopping,
} from 'react-icons/fa6';
import { IoReceipt } from 'react-icons/io5';
import Logout from '../../../pages/authentication/Logout';
import Drawer from '@/components/ui/Drawer';
import { useIsMobile } from '@/hooks/useMediaQuery';
import styles from './navigation.module.scss';

const Navigation = () => {
  const userName = useSelector((state) => state.user.value.username);
  const { t } = useTranslation();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  // Reset the open state when the location changes.
  useEffect(() => {
    setOpen(false);
  }, [location]);

  const home = '/';
  const locationPath = location.pathname;

  const navLinks = [
    { to: home, icon: FaHouse, label: t('Overview') },
    { to: '/recipes', icon: FaBook, label: t('My Recipes') },
    { to: '/list', icon: FaBasketShopping, label: t('My Groceries') },
    { to: '/recipes/all', icon: FaUtensils, label: t('Public Recipes') },
  ];

  const quickActions = [
    { to: '/recipe/new', icon: FaFileCirclePlus, label: t('New recipe') },
    { to: '/shopping-list', icon: IoReceipt, label: t('Edit Shopping List') },
  ];

  const renderItem = ({ to, icon: Icon, label }, isLast) => (
    <li
      key={to}
      className={[
        isLast ? 'mb-6' : null,
        locationPath === to ? styles.active : null,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Link className="link" to={to}>
        <div className="flex items-center gap-4 py-3">
          <Icon className="text-lg" /> {label}
        </div>
      </Link>
    </li>
  );

  // Shared by the desktop sidebar and the mobile drawer.
  const menu = (
    <ul className="flex flex-col gap-3 mt-6 mr-3 w-full">
      <li className="max-m:hidden! mb-1">
        <h4 className="font-semibold">
          {`${userName}'s`} {t('cookbook')}
        </h4>
      </li>
      {navLinks.map((item, i) => renderItem(item, i === navLinks.length - 1))}

      <li>
        <hr />
      </li>
      <li>
        <h4 className="mt-6 font-semibold">{t('Quick actions')}</h4>
      </li>
      {quickActions.map((item, i) =>
        renderItem(item, i === quickActions.length - 1)
      )}

      <li>
        <hr />
      </li>
      <li>
        <h4 className="mt-6 font-semibold">{t('My Account')}</h4>
      </li>
      <li>
        <Logout />
      </li>
      <li className="m:hidden!">
        <LanguageSelect />
      </li>
    </ul>
  );

  return (
    <div className={`bg-white navigation ${styles.navigationWrapper}`}>
      {isMobile ? (
        <button
          className={`${styles.openNav} ${open ? styles.open : ''} m:hidden!`}
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-label={t('Menu')}
        >
          <span className={styles.burger}></span>
          <span className={styles.burgerText}>Menu</span>
        </button>
      ) : null}

      <div className={`px-6 pt-3 text-white ${styles.logoWrapper}`}>
        <h1 className={`${styles.logo} flex font-logo`}>
          <span className="pr-3 pb-2">
            <span className={styles.logoPrefix}>{t('My')} </span>
            {t('Cookbook')}
          </span>
        </h1>
      </div>

      {isMobile ? (
        <Drawer
          open={open}
          onOpenChange={setOpen}
          title={`${userName}'s ${t('cookbook')}`}
          closeLabel={t('Close menu')}
          className={styles.drawer}
        >
          <nav className={`font-light text-lg px-6 pb-6 ${styles.navigation}`}>
            {menu}
          </nav>
        </Drawer>
      ) : (
        <nav
          className={`flex px-6 py-3 font-light text-lg ${styles.navigation}`}
        >
          {menu}
        </nav>
      )}
    </div>
  );
};

export default Navigation;
