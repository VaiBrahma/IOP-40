import { Link } from "react-routergit ";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Power System Analysis</h1>
      <div className={styles.buttonContainer}>
        <Link to="/fdlf" className={styles.btn}>FDLF</Link>
        <Link to="/tsa" className={styles.btn}>TSA</Link>
      </div>
    </div>
  );
};

export default Home;