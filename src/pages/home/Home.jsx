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
          <table>
            <tbody>
              <tr><td><li>Palak Tripathi</li></td><td>---------------</td></tr>
              <tr><td><li>Vaibhav Singh</li></td><td>22112111</td></tr>
              <tr><td><li>Garv</li></td><td>---------------</td></tr>
              <tr><td><li>Vaibhav Kumar</li></td><td>22115157</td></tr>
            </tbody>
          </table>
            {/* <li>Palak Tripathi</li>
            
            <li>Garv</li>
            <li>Vaibhav Kumar</li> */}
        </div>

        <div className={styles.proff}>
          <h2>Under the Guidance of: </h2>
          <a href="https://www.iitr.ac.in/~EE/Abdul_Saleem_Mir">Dr. Abdul Saleem Mir</a>
          <p></p>
          <div className={styles.role}>Assistant Professor</div>
          <div>Department of Electrical Engineering</div>
          <div>Indian Institute of Technology Roorkee</div>
        </div>
      </div>
    </div>
  );
};

export default Home;