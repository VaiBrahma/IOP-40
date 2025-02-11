import styles from './ImageInput.module.css';

const ImageInput = () => {
  return (
    <div className={styles.container}>
        <div className={styles.card}>
            <img src="/images/Withoutfault.png" alt="circuit" />
        </div>
    </div>
  );
};

export default ImageInput;