import styles from './YMatrix.module.css';

const YMatrix = ({ YBus }) => {
  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th></th>
              {YBus.map((_, index) => (
                <th key={index}>{index + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {YBus.map((row, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                {row.map((cell, j) => (
                  <td key={j}>{formatComplexNumber(cell, 4)}</td>
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
