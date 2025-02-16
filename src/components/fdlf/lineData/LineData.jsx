import { useEffect, useState } from 'react';
import styles from './LineData.module.css';
import { autofillSixLines, autofillTwentyLines, initializeLineData } from '../../../utils/fdlf/lineData';
import { useDispatch } from 'react-redux';
import { setLinesMatrix } from '../../../redux/slices/linesSlice';

const LineData = () => {

  const [lines, setLines] = useState([{from: 1}]);
  const [whichData, setWhichData] = useState(1);
  const [numLines, setNumLines] = useState(6);
  const [inputValue, setInputValue] = useState(6);
  const [flag, setFlag] = useState(false);
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
    setWhichData(2);

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
            <button className={`${styles.grn} btn`}>Upload XLSX</button>
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
                  <tr><td>1.</td><td>1</td><td>2</td><td>0.042</td><td>0.168</td><td>0.082</td><td>0</td></tr>
                  <tr><td>2.</td><td>1</td><td>5</td><td>0.031</td><td>0.126</td><td>0.062</td><td>0</td></tr>
                  <tr><td>3.</td><td>2</td><td>3</td><td>0.031</td><td>0.126</td><td>0.062</td><td>0</td></tr>
                  <tr><td>4.</td><td>3</td><td>4</td><td>0.024</td><td>0.136</td><td>0.164</td><td>0</td></tr>
                  <tr><td>5.</td><td>3</td><td>5</td><td>0.053</td><td>0.21</td><td>0.102</td><td>0</td></tr>
                  <tr><td>6.</td><td>4</td><td>5</td><td>0.063</td><td>0.252</td><td>0.122</td><td>0</td></tr>
                </>
              }
              {whichData === 2 &&
                <>
                  <tr><td>1.</td><td>1</td><td>2</td><td>0.0194</td><td>0.0592</td><td>0.1056</td><td>0</td></tr>
                  <tr><td>2.</td><td>1</td><td>5</td><td>0.054</td><td>0.223</td><td>0.984</td><td>0</td></tr>
                  <tr><td>3.</td><td>2</td><td>3</td><td>0.047</td><td>0.1979</td><td>0.0876</td><td>0</td></tr>
                  <tr><td>4.</td><td>2</td><td>4</td><td>0.0581</td><td>0.1763</td><td>0.0748</td><td>0</td></tr>
                  <tr><td>5.</td><td>2</td><td>5</td><td>0.0569</td><td>0.1738</td><td>0.0678</td><td>0</td></tr>
                  <tr><td>6.</td><td>3</td><td>4</td><td>0.067</td><td>0.171</td><td>0.0692</td><td>0</td></tr>
                  <tr><td>7.</td><td>4</td><td>5</td><td>0.0134</td><td>0.0421</td><td>0.0256</td><td>0</td></tr>
                  <tr><td>8.</td><td>4</td><td>7</td><td>0</td><td>0.209</td><td>0</td><td>0.978</td></tr>
                  <tr><td>9.</td><td>4</td><td>9</td><td>0</td><td>0.5562</td><td>0</td><td>0.969</td></tr>
                  <tr><td>10.</td><td>5</td><td>6</td><td>0</td><td>0.2522</td><td>0</td><td>0.932</td></tr>
                  <tr><td>11.</td><td>6</td><td>11</td><td>0.095</td><td>0.1989</td><td>0</td><td>0</td></tr>
                  <tr><td>12.</td><td>6</td><td>12</td><td>0.1229</td><td>0.2557</td><td>0</td><td>0</td></tr>
                  <tr><td>13.</td><td>6</td><td>13</td><td>0.0661</td><td>0.1302</td><td>0</td><td>0</td></tr>
                  <tr><td>14.</td><td>7</td><td>8</td><td>0</td><td>0.1762</td><td>0</td><td>0</td></tr>
                  <tr><td>15.</td><td>7</td><td>9</td><td>0</td><td>0.011</td><td>0</td><td>0</td></tr>
                  <tr><td>16.</td><td>9</td><td>10</td><td>0.0318</td><td>0.0845</td><td>0</td><td>0</td></tr>
                  <tr><td>17.</td><td>9</td><td>14</td><td>0.127</td><td>0.2703</td><td>0</td><td>0</td></tr>
                  <tr><td>18.</td><td>10</td><td>11</td><td>0.082</td><td>0.192</td><td>0</td><td>0</td></tr>
                  <tr><td>19.</td><td>12</td><td>13</td><td>0.2209</td><td>0.1999</td><td>0</td><td>0</td></tr>
                  <tr><td>20.</td><td>13</td><td>14</td><td>0.1709</td><td>0.3479</td><td>0</td><td>0</td></tr>
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

    </div>
  );
};

export default LineData;