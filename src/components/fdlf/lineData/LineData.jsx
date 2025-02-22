import { useEffect, useState } from 'react';
import styles from './LineData.module.css';
import { autofillSixLines, autofillTwentyLines, initializeLineData } from '../../../utils/fdlf/lineData';
import { useDispatch, useSelector } from 'react-redux';
import { setLinesMatrix } from '../../../redux/slices/linesSlice';
import FileInput from '../../fileInput/FileInput';

const LineData = () => {

  const [lines, setLines] = useState(useSelector(state=>state.lines));
  const [whichData, setWhichData] = useState(1);
  const [numLines, setNumLines] = useState(6);
  const [inputValue, setInputValue] = useState(6);
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const title = "Line Data";
  const dispatch = useDispatch();


  const handleAutofillSixLines = () => {
    let tempData = autofillSixLines();
    setLines(tempData);
    dispatch(setLinesMatrix(tempData));
    setWhichData(1);
  }

  const handleAutofillTwentyLines = () => {
    let tempData = autofillTwentyLines();
    setLines(tempData);
    dispatch(setLinesMatrix(tempData));
    // setWhichData(2);

  }

  const handleLineNumChange = (e) => {
    setInputValue(Number(e.target.value));
  }

  const generateLineTable = (event) => { 
    event.preventDefault();
    setFlag(e => !e);
    setNumLines(inputValue);
    setLines(initializeLineData(inputValue));
    setWhichData(3);
  };

  const handleLineInputChange = (index, key, value) => {
    const updatedLines = [...lines];
    updatedLines[index] = { ...updatedLines[index], [key]: value };
    setLines(updatedLines);
    dispatch(setLinesMatrix(updatedLines));
  };

  return (
    <div className={styles.container}>
        {flag && <div className={styles.cover}></div>}
        <div className={styles.headerr}>
          <div className={styles.title}>{title}</div>
          <div className={styles.btns}>
            <button className={`${styles.blu} btn`} onClick={handleAutofillSixLines}>IEEE 6-Line</button>
            <button className={`${styles.blu} btn`} onClick={handleAutofillTwentyLines}>IEEE 20-Line</button>
            <button className={`${styles.grn} btn`} onClick={()=> setFlag2(true)}>Upload XLSX</button>
            <button className={`${styles.rd} btn`} onClick={()=>{setFlag(e=>!e)}}>Manually Add Data</button>
          </div>
          
        </div>

        {flag && 
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <form action="" onSubmit={generateLineTable}>
              <input type="number" id="numLines" className={styles.lineno} placeholder='Enter the number of Lines' onChange={handleLineNumChange} min={1} defaultValue={inputValue}/>
              <button className={`${styles.sub} btn`} type='submit'>Sumbit</button>
            </form>
          </div>
        </div>}

        <div className={`tableContainer`}>
          <table>
            <thead>
              <tr><th>Line No.</th><th>From Bus</th><th>To Bus</th><th>R (pu)</th><th>X (pu)</th><th>B (pu)</th><th>Tx. Tap</th></tr>
            </thead>
            <tbody>
              {whichData === 1 &&
                <>
                  {lines.map((line, index) => (
                  <tr key={index}>
                    <td>{index + 1}.</td>   
                    <td>{line.from}</td>
                    <td>{line.to}</td>
                    <td>{line.R}</td>
                    <td>{line.X}</td>
                    <td>{line.charging}</td>
                    <td>{line.Tap}</td>
                  </tr>
                ))}
                </>
              }
              {whichData === 3 &&
                <>
                  {[...Array(numLines)].map((_, index) => (
                    <tr key={index}>
                      <td>{index + 1}.</td>
                      <td><input type="number" min={1} onChange={(e)=> handleLineInputChange(index, "from", parseInt(e.target.value))} /></td>
                      <td><input type="number" min={1} onChange={(e)=> handleLineInputChange(index, "to", parseInt(e.target.value))} /></td>
                      <td><input type="number" step="0.001" onChange={(e)=> handleLineInputChange(index, "R", parseFloat(e.target.value))} /></td>
                      <td><input type="number" step="0.001" onChange={(e)=> handleLineInputChange(index, "X", parseFloat(e.target.value))} /></td>
                      <td><input type="number" step="0.001" onChange={(e)=> handleLineInputChange(index, "charging", parseFloat(e.target.value))} /></td>
                      <td><input type="number" step="0.001" onChange={(e)=> handleLineInputChange(index, "Tap", parseFloat(e.target.value))} /></td>
                    </tr>
                  ))}
                </>
              }
          </tbody>
          </table>
        </div>
        {flag2 && 
          <>
            <FileInput setFlag2={setFlag2} type={2} setMatrix={setLines}/>
          </>
        }
    </div>
  );
};

export default LineData;