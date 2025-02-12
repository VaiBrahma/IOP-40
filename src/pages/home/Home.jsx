import { Link } from "react-router";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div>IOP-40</div>
      </div>

      <div className={styles.buttonContainer}>
        <Link to="/fdlf" className={styles.btn}>FDLF</Link>
        <Link to="/tsa" className={styles.btn}>TSA</Link>
      </div>

      <div className={styles.footer}>
        <div className={styles.teamName}>
          <h2>Submitted By: </h2>
            <li>Palak Tripathi</li>
            <li>Vaibhav Singh</li>
            <li>Garv</li>
            <li>Vaibhav Kumar</li>
        </div>

        <div className={styles.proff}>
          <h2>Under the Guidance of: </h2>
          <p>Dr. Abdul Saleem Mir</p>
          <div className={styles.role}>Assistant Professor</div>
          <div>Department of Electrical Engineering</div>
          <div>Indian Institute of Technology Roorkee</div>
        </div>
      </div>
    </div>
  );
};

export default Home;