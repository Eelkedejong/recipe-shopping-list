import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FaChevronLeft } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Search from '../../elements/Search';
import styles from './header.module.scss';

const Header = ({
  title,
  returnUrl,
  returnText,
  hiddenMobile,
  hideSearch,
  useParamTitle,
  withBanner,
  searchOnBanner,
}) => {
  const userName = useSelector((state) => state.user.value.username);
  const [open, setOpen] = useState(false);
  const { type } = useParams();
  const { t } = useTranslation();

  if (hideSearch === undefined) {
    hideSearch = false;
  }

  return (
    <header
      className={`
        pl-5 df aic 
        ${styles.header} ${hiddenMobile ? styles.hiddenMobile : null}
        ${withBanner ? styles.withBanner : null}
        ${open ? styles.open : null}
      `}
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
          <h2 className="fs-32 fw-bold pt-5">{title}</h2>
        ) : useParamTitle ? (
          <h2 className="fs-32 fw-bold pt-5">
            {t(`${type.charAt(0).toUpperCase() + type.slice(1)}`)}
          </h2>
        ) : (
          <div className={styles.greeting}>
            <div className="fs-16 fw-light text-grey">
              {t('Welcome')}, {userName}
            </div>
            <h2 className="fs-28 fw-bold">{t("What's on the menu today?")}</h2>
          </div>
        )}
        {!hideSearch && (
          <button
            className={`desktop-hidden p-3 ${styles.searchButton}`}
            onClick={() => setOpen(!open)}
          >
            {/* <FaSearch className="fs-24 text-white mobile-hidden asdasd" /> */}
            <span
              className={`desktop-hidden ${styles.searchIcon} ${open ? styles.close : null}`}
            ></span>
          </button>
        )}
      </div>

      {!hideSearch && (
        <Search
          openState={open}
          setOpenState={setOpen}
          searchOnBanner={searchOnBanner}
        />
      )}

      <button
        className={styles.overlay}
        onClick={() => setOpen(false)}
      ></button>
    </header>
  );
};

export default Header;
