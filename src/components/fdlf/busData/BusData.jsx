import { useEffect, useState } from 'react';
import styles from './BusData.module.css';
import { autofillFiveBusNetwork, autofillFourteenBusNetwork, initializeBusData } from '../../../utils/fdlf/busData';
import { useDispatch, useSelector } from 'react-redux';
import { setBusesMatrix } from '../../../redux/slices/busesSlice';
import FileInput from '../../fileInput/FileInput';

const BusData = () => {

  const [buses, setBuses] = useState(useSelector(state=>state.buses));
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [whichData, setWhichData] = useState(1);
  const [busNo, setBusNo] = useState(5);
  const [inputValue, setInputValue] = useState(5);
  const title = "Bus Data";
  const dispatch = useDispatch();
  
  // console.log(buses);

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
  }

  const handleBusNoChange = (e) => {
    setInputValue(Number(e.target.value));
    // console.log(busNo);
  }

  const handleGenerateBusTable = (event) => { 
    event.preventDefault();
    setFlag(e => !e);
    setBusNo(inputValue);
    let temp = initializeBusData(inputValue);
    setBuses(temp);
    dispatch(setBusesMatrix(temp));
    setWhichData(3);
    // console.log(temp);
    // console.log(inputValue);
  };

  const handleInputChange = (index, key, value) => {
    const updatedBuses = [...buses];
    updatedBuses[index] = { ...updatedBuses[index], [key]: value };
    dispatch(setBusesMatrix(updatedBuses));
    setBuses(updatedBuses);
    // console.log(updatedBuses);
};

const handleFileUpload = () => {
  setFlag2(true);
}

  return (
    <div className={styles.container}>
        {flag && <div className={styles.cover}></div>}

        <div className={styles.headerr}>
          <div className={styles.title}>{title}</div>
          <div className={styles.btns}>
            <button className={`${styles.blu} btn`} onClick={handleAutofillFiveBusNetwork}>IEEE 5-BUS</button>
            <button className={`${styles.blu} btn`} onClick={handelAutofillFourteenBusNetwork}>IEEE 14-BUS</button>
            <button className={`${styles.grn} btn`} onClick={handleFileUpload}>Upload XLSX</button>
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
          {whichData === 1 && (
              <>
                {buses.map((bus, index) => (
                  <tr key={index}>
                    <td>{index + 1}.</td>   
                    <td>{bus.type}</td>
                    <td>{bus.V}</td>
                    <td>{bus.angle}</td>
                    <td>{bus.Pg}</td>
                    <td>{bus.Qg}</td>
                    <td>{bus.PL}</td>
                    <td>{bus.QL}</td>
                    <td>{bus.Qmin}</td>
                    <td>{bus.Qmax}</td>
                  </tr>
                ))}
              </>
            )}
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
      {flag2 && 
      <>
        <FileInput setFlag2={setFlag2} type={1} setMatrix={setBuses}/>
      </>
      }

    </div>
  );
};

export default BusData;