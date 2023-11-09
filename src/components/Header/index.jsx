import styles from "./header.module.scss";
import { useTranslation } from "react-i18next";

const Header = ({ userName }) => {
  const { t } = useTranslation();

  return (
    <header className={`${styles.header} my-5 pl-5 df jcsb`}>
      <div>
        <div className="fs-16 ff-text fw-light text-medium-grey">
          {t("Welcome")}, {userName}
        </div>
        <h2 className="fs-28 ff-header fw-bold">
          {t("What's on the menu today?")}
        </h2>
      </div>
      <div>Search bar here</div>
    </header>
  );
};

export default Header;
