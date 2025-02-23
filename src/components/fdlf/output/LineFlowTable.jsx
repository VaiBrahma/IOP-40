import styles from './Output.module.css'

const LineFlowTable = ({ lines, Pij, Qij, Pji, Qji, P_loss, Q_loss }) => {

    const totalPower = (P, Q) => {
      let p = parseFloat(P);
      let q = parseFloat(Q);

      return parseFloat(Math.sqrt(p * p + q * q) * 100).toFixed(4);
    }

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
                <th>S<sub>loss</sub> (MVA)</th>
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
                  <td>{totalPower(P_loss[index], Q_loss[index])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  export default LineFlowTable;