import { useState } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FaChevronLeft } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router';
import Search from '@/components/elements/Search';
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
        pl-6 flex items-center 
        ${styles.header} ${hiddenMobile ? styles.hiddenMobile : null}
        ${withBanner ? styles.withBanner : null}
        ${open ? styles.open : null}
      `}
    >
      <div className="flex justify-between w-full">
        {returnUrl && returnText ? (
          <Link to={returnUrl} className="flex items-center gap-3">
            <div className="bg-white rounded-[50%] p-2 flex items-center">
              <FaChevronLeft />
            </div>
            <span className="text-16 font-light text-grey">{returnText}</span>
          </Link>
        ) : title ? (
          <h2 className="text-32 font-bold pt-6">{title}</h2>
        ) : useParamTitle ? (
          <h2 className="text-32 font-bold pt-6">
            {t(`${type.charAt(0).toUpperCase() + type.slice(1)}`)}
          </h2>
        ) : (
          <div className={styles.greeting}>
            <div className="text-16 font-light text-grey">
              {t('Welcome')}, {userName}
            </div>
            <h2 className="text-28 font-bold">
              {t("What's on the menu today?")}
            </h2>
          </div>
        )}
        {!hideSearch && (
          <button
            className={`m:hidden! p-3 ${styles.searchButton}`}
            onClick={() => setOpen(!open)}
          >
            <span
              className={`m:hidden! ${styles.searchIcon} ${open ? styles.close : null}`}
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
