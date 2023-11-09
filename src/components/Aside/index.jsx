import styles from "./aside.module.scss";
import Logout from "../../pages/authentication/Logout";

const Aside = () => {
  return (
    <aside className={`${styles.aside} p-5`}>
      <Logout />
    </aside>
  );
};

export default Aside;
