import { useState } from 'react';
import styles from './BusData.module.css';
import { autofillFiveBusNetwork, autofillFourteenBusNetwork, initializeBusData } from '../../utils/fast-decoupled-power-flow/busData';
import { useDispatch } from 'react-redux';
import { setBusesMatrix } from '../../redux/slices/busesSlice';

const BusData = () => {

  const [buses, setBuses] = useState([]);
  const [flag, setFlag] = useState(false);
  const [whichData, setWhichData] = useState(1);
  const [busNo, setBusNo] = useState(5);
  const [inputValue, setInputValue] = useState(5);
  const title = "Bus Data";
  const dispatch = useDispatch();

  const handleAutofillFiveBusNetwork = () => {
    let tempData = autofillFiveBusNetwork();
    setBuses(tempData);
    dispatch(setBusesMatrix(tempData));
    setWhichData(1);
    // console.log(buses);
  }

  const handelAutofillFourteenBusNetwork = () => {
    let tempData = autofillFourteenBusNetwork();
    setBuses(tempData);
    dispatch(setBusesMatrix(tempData));
    setWhichData(2);
    // console.log(buses);
  }

  const handleBusNoChange = (e) => {
    setInputValue(Number(e.target.value));
    // console.log(busNo);
  }

  const handleGenerateBusTable = (event) => { 
    event.preventDefault();
    setFlag(e => !e);
    setBusNo(inputValue);
    setBuses(initializeBusData(inputValue));
    setWhichData(3);
    // console.log(inputValue);
  };

  const handleInputChange = (index, key, value) => {
    const updatedBuses = [...buses];
    updatedBuses[index] = { ...updatedBuses[index], [key]: value };
    dispatch(setBusesMatrix(updatedBuses));
};

  return (
    <div className={styles.container}>
        {flag && <div className={styles.cover}></div>}

        <div className={styles.headerr}>
          <div className={styles.title}>{title}</div>
          <div className={styles.btns}>
            <button className={`${styles.blu} btn`} onClick={handleAutofillFiveBusNetwork}>IEEE 5-Bus</button>
            <button className={`${styles.blu} btn`} onClick={handelAutofillFourteenBusNetwork}>IEEE 14-Bus</button>
            <button className={`${styles.grn} btn`}>Upload XLSX</button>
            <button className={`${styles.rd} btn`} onClick={()=>{setFlag(e=>!e)}}>Manually Add Data</button>
          </div>
        </div>

        {flag && 
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <form action="" onSubmit={handleGenerateBusTable}>
              <input type="number" id="numBuses" className={styles.busno} onChange={handleBusNoChange} defaultValue={inputValue} min={1} max={11} placeholder='Enter the number of Buses'/>
              <button type="submit" className={`${styles.sub} btn`}>Sumbit</button>
            </form>
          </div>
        </div>}

        <div className={`tableContainer`}>
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
              {[...Array(busNo)].map((_, index) => (
              <tr key={index}>
                <td>{index + 1}.</td>   
                <td><input type="number" min={1} max={3} onChange={(e)=> handleInputChange(index, "type", parseInt(e.target.value))} /></td>
                <td><input type="number" step="0.001" onChange={(e)=> handleInputChange(index, "V", parseFloat(e.target.value))} /></td>
                <td><input type="number" step="0.001" onChange={(e)=> handleInputChange(index, "angle", parseFloat(e.target.value))} /></td>
                <td><input type="number" step="0.001" onChange={(e)=> handleInputChange(index, "Pg", parseFloat(e.target.value))} /></td>
                <td><input type="number" step="0.001" onChange={(e)=> handleInputChange(index, "Qg", parseFloat(e.target.value))} /></td>
                <td><input type="number" step="0.001" onChange={(e)=> handleInputChange(index, "PL", parseFloat(e.target.value))} /></td>
                <td><input type="number" step="0.001" onChange={(e)=> handleInputChange(index, "QL", parseFloat(e.target.value))} /></td>
                <td><input type="number" step="0.001" onChange={(e)=> handleInputChange(index, "Qmin", parseFloat(e.target.value))} /></td>
                <td><input type="number" step="0.001" onChange={(e)=> handleInputChange(index, "Qmax", parseFloat(e.target.value))} /></td>
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