import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Output.module.css';
import { setLinesMatrix } from '../../../../redux/slices/linesSlice';

const LineFlowTable = ({ lines, Pij, Qij, Pji, Qji, P_loss, Q_loss }) => {
  const dispatch = useDispatch();

  const totalPower = (P, Q) => {
    let p = parseFloat(P);
    let q = parseFloat(Q);
    return parseFloat(Math.sqrt(p * p + q * q) * 100).toFixed(4);
  };

  const calc = (a, b, c) => {
    return (Math.max(a, b) / c * 100).toFixed(2);
  };

  const loadingData = lines.map((line, index) => ({
    lineNo: index + 1,
    from: line.from,
    to: line.to,
    loading: calc(totalPower(Pij[index], Qij[index]), totalPower(Pji[index], Qji[index]), line.Smax)
  }));

  useEffect(() => {
    const updatedLines = lines.map((line, index) => ({
      ...line,
      loading: loadingData[index].loading ?? 0
    }));
    dispatch(setLinesMatrix(updatedLines));
  }, [lines, Pij, Qij, Pji, Qji, P_loss, Q_loss, dispatch]);

  return (
    <div className={styles.container}>
      <h2>Line Flow Data</h2>
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Line No.</th>
              <th>From Bus</th>
              <th>To Bus</th>
              <th>P<sub>line(From-To)</sub> (pu)</th>
              <th>Q<sub>line(From-To)</sub> (pu)</th>
              <th>P<sub>line(To-From)</sub> (pu)</th>
              <th>Q<sub>line(To-From)</sub> (pu)</th>
              <th>P<sub>loss</sub> (pu)</th>
              <th>Q<sub>loss</sub> (pu)</th>
              <th>S<sub>line(From-To)</sub> (MVA)</th>
              <th>S<sub>line(To-From)</sub> (MVA)</th>
              <th>S<sub>max</sub> (MVA)</th>
              <th>% Loading</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{line.from}</td>
                <td>{line.to}</td>
                <td>{parseFloat(Pij[index]).toFixed(4)}</td>
                <td>{parseFloat(Qij[index]).toFixed(4)}</td>
                <td>{parseFloat(Pji[index]).toFixed(4)}</td>
                <td>{parseFloat(Qji[index]).toFixed(4)}</td>
                <td>{parseFloat(P_loss[index]).toFixed(4)}</td>
                <td>{parseFloat(Q_loss[index]).toFixed(4)}</td>
                <td>{totalPower(Pij[index], Qij[index])}</td>
                <td>{totalPower(Pji[index], Qji[index])}</td>
                <td>{line.Smax}</td>
                <td>{loadingData[index].loading} %</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LineFlowTable;