import Logout from "../../pages/authentication/Logout";
import styles from "./aside.module.scss";

const Aside = () => {
  return (
    <aside className={`${styles.aside} p-5`}>
      <Logout />
      <div className={`bg-white p5 ${styles.content}`}></div>
    </aside>
  );
};

export default Aside;
