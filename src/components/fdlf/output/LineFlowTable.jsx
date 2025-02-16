import styles from './Output.module.css'

const LineFlowTable = ({ lines, Pij, Qij, Pji, Qji, P_loss, Q_loss }) => {
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  export default LineFlowTable;