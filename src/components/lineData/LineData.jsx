import { useState } from 'react';
import styles from './LineData.module.css';

const LineData = () => {

  const [flag, setFlag] = useState(false);
  const title = "Line Data";

  const generateLineTable = () => { setFlag(e => !e) };

  return (
    <div className={styles.container}>
        {flag && <div className={styles.cover}></div>}
        <div className={styles.headerr}>
          <div className={styles.title}>{title}</div>
          <div className={styles.btns}>
            <button className={`${styles.blu} btn`} onClick="autofillFiveBusNetwork()">IEEE 6-Line</button>
            <button className={`${styles.blu} btn`} onClick="autofillFourteenBusNetwork()">IEEE 20-Line</button>
            <button className={`${styles.grn} btn`}>Upload XLSX</button>
            <button className={`${styles.rd} btn`} onClick={()=>{setFlag(e=>!e)}}>Manually Add Data</button>
          </div>
          
        </div>

        {flag && 
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <input type="number" id="numLines" className={styles.lineno} placeholder='Enter the number of Lines'/>
            <button className={`${styles.sub} btn`} onClick={generateLineTable}>Sumbit</button>
          </div>
        </div>}

        <div className={styles.busTableContainer}>
        <table>
          <thead>
            <tr><th>Line No.</th><th>From Bus</th><th>To Bus</th><th>R (pu)</th><th>X (pu)</th><th>B (pu)</th><th>Tx. Tap</th></tr>
          </thead>
          <tbody>
            <tr><td>1.</td><td>1</td><td>2</td><td>0.042</td><td>0.168</td><td>0.082</td><td>0</td></tr>
            <tr><td>2.</td><td>1</td><td>5</td><td>0.031</td><td>0.126</td><td>0.062</td><td>0</td></tr>
            <tr><td>3.</td><td>2</td><td>3</td><td>0.031</td><td>0.126</td><td>0.062</td><td>0</td></tr>
            <tr><td>4.</td><td>3</td><td>4</td><td>0.024</td><td>0.136</td><td>0.164</td><td>0</td></tr>
            <tr><td>5.</td><td>3</td><td>5</td><td>0.053</td><td>0.21</td><td>0.102</td><td>0</td></tr>
            <tr><td>6.</td><td>4</td><td>5</td><td>0.063</td><td>0.252</td><td>0.122</td><td>0</td></tr>
         </tbody>
        </table>
      </div>

    </div>
  );
};

export default LineData;