import { Link } from 'react-router';
import styles from './SideBar.module.css';

const SideBar = ({isVisible}) => {
  return (
    <div className={`${styles.sidebar} ${isVisible ? styles.slideIn : styles.slideOut}`}>
      <Link to="/" className={styles.btn}>Home</Link>
      <Link to="/fdlf" className={styles.btn}>FDLF</Link>
      <Link to="/tsa" className={styles.btn}>TSA</Link>
    </div>
  );
};

export default SideBar;