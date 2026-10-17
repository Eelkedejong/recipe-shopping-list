import Logout from '@/pages/authentication/Logout';
import styles from './aside.module.scss';

const Aside = () => {
  return (
    <aside className={`${styles.aside} p-6`}>
      <div className={styles.top}>
        <Logout />
      </div>
      <div className={`bg-white ${styles.content}`}>Filters</div>
    </aside>
  );
};

export default Aside;
