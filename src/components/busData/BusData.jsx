import styles from './BusData.module.css';

const BusData = () => {
  const title = "Bus Data";
  return (
    <div className={styles.container}>
        <div className={styles.headerr}>
          <div className={styles.title}>{title}</div>
          <div className={styles.btns}>
            <button className={`${styles.blu} btn`} onClick="autofillFiveBusNetwork()">IEEE 5-Bus</button>
            <button className={`${styles.blu} btn`} onClick="autofillFourteenBusNetwork()">IEEE 14-Bus</button>
            <button className={`${styles.rd} btn`} onClick="generateBusTable()">Manually Add Data</button>
          </div>
          
        </div>
        <label htmlFor="numBuses">Enter the number of buses:</label>
        <input type="number" id="numBuses" />
        <div id="busTableContainer"></div>
    </div>
  );
};

export default BusData;