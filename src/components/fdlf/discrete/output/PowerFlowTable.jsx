import styles from './Output.module.css'

const PowerFlowTable = ({ Vmag, delta, buses }) => {
  return (
    <div className={styles.container}>
      <h2>Power Flow Data</h2>
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Bus No.</th>
              <th>Voltage (pu)</th>
              <th>Angle (degree)</th>
              <th>P<sub>gen</sub> (pu)</th>
              <th>Q<sub>gen</sub> (pu)</th>
              <th>P<sub>load</sub> (pu)</th>
              <th>Q<sub>load</sub> (pu)</th>
            </tr>
          </thead>
          <tbody>
            {Vmag.map((v, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{parseFloat(v).toFixed(5)}</td>
                <td>{((parseFloat(delta[index]) * 180) / Math.PI).toFixed(5)}</td>
                <td>{parseFloat(buses[index].Pg).toFixed(4)}</td>
                <td>{parseFloat(buses[index].Qg).toFixed(4)}</td>
                <td>{parseFloat(buses[index].PL).toFixed(4)}</td>
                <td>{parseFloat(buses[index].QL).toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default PowerFlowTable