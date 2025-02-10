import { useState } from 'react';
import styles from './BusData.module.css';

const BusData = () => {

  const [flag, setFlag] = useState(false);
  const [whichData, setWhichData] = useState(3);
  const [numRows, setNumRows] = useState(5);
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
            <button className={`${styles.grn} btn`}>Upload XLSX</button>
            <button className={`${styles.rd} btn`} onClick={()=>{setFlag(e=>!e)}}>Manually Add Data</button>
          </div>
          
        </div>

        {flag && 
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <input type="number" id="numBuses" className={styles.busno} placeholder='Enter the number of Buses'/>
            <button className={`${styles.sub} btn`} onClick={generateBusTable}>Sumbit</button>
          </div>
        </div>}

        <div className={styles.busTableContainer}>
        <table>
          <thead>
            <tr><th>Bus No.</th><th>Bus Type</th><th>Voltage (pu)</th><th>Angle (degree)</th><th>P<sub>gen</sub> (pu)</th><th>Q<sub>gen</sub> (pu)</th><th>P<sub>load</sub> (pu)</th><th>Q<sub>load</sub> (pu)</th><th>Q<sub>min</sub> (pu)</th><th>Q<sub>max</sub> (pu)</th></tr>
          </thead>
          <tbody>
            {whichData === 1 &&
            <>
              <tr><td>1.</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
              <tr><td>2.</td><td>2</td><td>1</td><td>0</td><td>0.5</td><td>0</td><td>0</td><td>0</td><td>-5</td><td>5</td></tr>
              <tr><td>3.</td><td>2</td><td>1</td><td>0</td><td>1.0</td><td>0</td><td>0</td><td>0</td><td>-0.5</td><td>0.5</td></tr>
              <tr><td>4.</td><td>3</td><td>1</td><td>0</td><td>0</td><td>0</td><td>1.15</td><td>0.6</td><td>0</td><td>0</td></tr>
              <tr><td>5.</td><td>3</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0.85</td><td>0.4</td><td>0</td><td>0</td></tr>
            </>
            }
            {whichData === 2 &&
            <>
              <tr><td>1.</td><td>1</td><td>1.06</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
              <tr><td>2.</td><td>2</td><td>1.045</td><td>0</td><td>0.183</td><td>0.05857</td><td>0</td><td>0</td><td>-5</td><td>5</td></tr>
              <tr><td>3.</td><td>3</td><td>1</td><td>0</td><td>0</td><td>0</td><td>1.19</td><td>0.08762</td><td>0</td><td>0</td></tr>
              <tr><td>4.</td><td>3</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0.4779</td><td>0.039</td><td>0</td><td>0</td></tr>
              <tr><td>5.</td><td>3</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0.07599</td><td>0.01599</td><td>0</td><td>0</td></tr>
              <tr><td>6.</td><td>2</td><td>1.07</td><td>0</td><td>0.112</td><td>0.442</td><td>0</td><td>0</td><td>-5</td><td>5</td></tr>
              <tr><td>7.</td><td>3</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
              <tr><td>8.</td><td>3</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0.129</td><td>0</td><td>0</td></tr>
              <tr><td>9.</td><td>3</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0.29499</td><td>0.16599</td><td>0</td><td>0</td></tr>
              <tr><td>10.</td><td>3</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0.09</td><td>0.05799</td><td>0</td><td>0</td></tr>
              <tr><td>11.</td><td>3</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0.03501</td><td>0.018</td><td>0</td><td>0</td></tr>
              <tr><td>12.</td><td>3</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0.06099</td><td>0.01599</td><td>0</td><td>0</td></tr>
              <tr><td>13.</td><td>3</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0.135</td><td>0.05799</td><td>0</td><td>0</td></tr>
              <tr><td>14.</td><td>3</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0.14901</td><td>0.05001</td><td>0</td><td>0</td></tr>
            </>
            }
            {whichData === 3 &&
            <>
              {[...Array(numRows)].map((_, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td><input type="number" /></td>
                <td><input type="number" step="0.001" /></td>
                <td><input type="number" step="0.001" /></td>
                <td><input type="number" step="0.001" /></td>
                <td><input type="number" step="0.001" /></td>
                <td><input type="number" step="0.001" /></td>
                <td><input type="number" step="0.001" /></td>
                <td><input type="number" step="0.001" /></td>
                <td><input type="number" step="0.001" /></td>
              </tr>
            ))}
            </>
            }
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default BusData;