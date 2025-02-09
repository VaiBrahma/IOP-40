import { useState } from 'react';
import styles from './BusData.module.css';

const BusData = () => {

  const [flag, setFlag] = useState(false);
  const title = "Bus Data";

  const generateBusTable = () => { setFlag(e => !e) };

  return (
    <div className={styles.container}>
        {flag && <div className={styles.cover}></div>}
        <div className={styles.headerr}>
          <div className={styles.title}>{title}</div>
          <div className={styles.btns}>
            <button className={`${styles.blu} btn`} onClick="autofillFiveBusNetwork()">IEEE 5-Bus</button>
            <button className={`${styles.blu} btn`} onClick="autofillFourteenBusNetwork()">IEEE 14-Bus</button>
            <button className={`${styles.rd} btn`} onClick={()=>{setFlag(e=>!e)}}>Manually Add Data</button>
          </div>
          
        </div>

        {flag && 
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <input type="number" id="numBuses" className={styles.busno} placeholder='Enter the number of buses'/>
            <button className={`${styles.sub} btn`} onClick={generateBusTable}>Sumbit</button>
          </div>
        </div>}

        <div className={styles.busTableContainer}>
        <table>
          <thead>
            <tr>
              <th>Bus No.</th>
              <th>Bus Type</th>
              <th>Voltage (pu)</th>
              <th>Angle (degree)</th>
              <th>P<sub>gen</sub> (pu)</th>
              <th>Q<sub>gen</sub> (pu)</th>
              <th>P<sub>load</sub> (pu)</th>
              <th>Q<sub>load</sub> (pu)</th>
              <th>Q<sub>min</sub> (pu)</th>
              <th>Q<sub>max</sub> (pu)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1.</td>
              <td>1</td>
              <td>1</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>2.</td>
              <td>2</td>
              <td>1</td>
              <td>0</td>
              <td>0.5</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>-5</td>
              <td>5</td>
            </tr>
            <tr>
              <td>3.</td>
              <td>2</td>
              <td>1</td>
              <td>0</td>
              <td>1.0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>-0.5</td>
              <td>0.5</td>
            </tr>
            <tr>
              <td>4.</td>
              <td>3</td>
              <td>1</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>1.15</td>
              <td>0.6</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>5.</td>
              <td>3</td>
              <td>1</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0.85</td>
              <td>0.4</td>
              <td>0</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default BusData;