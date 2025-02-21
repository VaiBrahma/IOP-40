import { useState } from 'react';
import styles from './FileInput.module.css';
import * as XLSX from 'xlsx';
import { useDispatch } from 'react-redux';
import { setBusesMatrix } from '../../redux/slices/busesSlice';
import { setLinesMatrix } from '../../redux/slices/linesSlice';

const FileInput = ({setFlag2, type}) => {

  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file first');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);

      setData(sheetData);
      dispatch(type==1 ? setBusesMatrix(sheetData) : setLinesMatrix(sheetData));
      // console.log(data);
    };


    if(file) setFlag2(false);
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <form onSubmit={handleSubmit}>
            <div className={styles.empty}>
              <button onClick={()=> setFlag2(false)} className={styles.close}>  X </button>
            </div>
            <div className={styles.flx}>
              <input placeholder='select file' type="file" onChange={handleFileChange} className={styles.inp}/>
              <button type="submit" className={`${styles.sub} btn`}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FileInput;