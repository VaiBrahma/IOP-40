import { useState } from 'react';
import styles from './FileInput.module.css';
import * as XLSX from 'xlsx';

const FileInput = () => {
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
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit" className={`${styles.sub} btn`}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FileInput;