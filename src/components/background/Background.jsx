import styles from './Background.module.css';

const Background = () => {
  return (
    <div className={styles.backgroundContainer}>
        {/* <div className={styles.topbar}></div> */}
        <div className={styles.imgWrapper}>
            <img src='/images/circuit.png' className={styles.fixedImg} />
        </div>
    </div>
  );
};

export default Background;