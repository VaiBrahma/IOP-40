import { useSelector } from 'react-redux';
import styles from './YMatrix.module.css';
import { convertFromReduxCompatible } from '../../../../utils/fdlf/reduxConversion';
import { formatComplexNumber } from '../../../../utils/fdlf/calculation';
// import Ybuss from '../visualizers/heatmaps/Ybus.jsx'

const YMatrix = () => {
  let { Ybus } = useSelector(state => state.yMatrix);
  const title = "Y-Bus";

  Ybus = convertFromReduxCompatible(Ybus);

  return (
    <div className={styles.container}>
      {/* <Ybuss Ybu= {Ybus}/> */}
      <h2>{title}</h2>

      <div className={`tableContainer`}>
      <table>
        <thead>
            <tr>
              <th></th>
              {Ybus[0]?.map((_, colIndex) => (
                <th key={colIndex}>{colIndex + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Ybus.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td><strong>{rowIndex + 1}</strong></td>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>{formatComplexNumber(cell, 2)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YMatrix;
