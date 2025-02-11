import styles from './Background.module.css';

const Background = () => {
  return (
    <div className={styles.container}>
        {/* <div className={styles.topbar}></div> */}
        <div className={`${styles.imgg} centralizeContent`}>
            <img src='/src/assets/images/circuit.png' className={styles.centreImg}/>
        </div>
    </div>
  );
};

export default Background;