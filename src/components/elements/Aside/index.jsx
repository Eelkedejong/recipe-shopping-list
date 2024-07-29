import Logout from '@/pages/authentication/Logout';
import styles from './aside.module.scss';

const Aside = () => {
  return (
    <aside className={`${styles.aside} p-5`}>
      <div className={styles.top}>
        <Logout />
      </div>
      <div className={`bg-white p5 ${styles.content}`}>Filters</div>
    </aside>
  );
};

export default Aside;
