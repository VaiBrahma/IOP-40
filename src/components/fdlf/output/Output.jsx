import LineFlowTable from './LineFlowTable';
import styles from './Output.module.css'
import PowerFlowTable from './PowerFlowTable';
import YMatrix from '../yMatrix/YMatrix'

const Output = ({ iter, Vmag, delta, buses, lines, Pij, Qij, Pji, Qji, P_loss, Q_loss, TotalP_loss, TotalQ_loss }) => {
    return (
        <>  
            <h2 className={styles.block}>Y-Bus Output</h2>
            <YMatrix/>
            <h2 className={styles.block}>Power Flow Output</h2>
            <p className={styles.block}>Number of iterations: {iter}</p>
            <PowerFlowTable Vmag={Vmag} delta={delta} buses={buses} />
            <LineFlowTable lines={lines} Pij={Pij} Qij={Qij} Pji={Pji} Qji={Qji} P_loss={P_loss} Q_loss={Q_loss} />
            <p className={styles.block}>Total real power losses (pu): {TotalP_loss.toFixed(6)}</p>
            <p className={styles.block}>Total reactive power losses (pu): {TotalQ_loss.toFixed(6)}</p>
        </>
    );
  };
  
  export default Output

