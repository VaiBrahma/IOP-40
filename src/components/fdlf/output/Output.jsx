import LineFlowTable from './LineFlowTable';
import styles from './Output.module.css'
import PowerFlowTable from './PowerFlowTable';
import YMatrix from '../yMatrix/YMatrix'
import VoltageChart from '../visualizers/barcharts/VoltageChart';
import Ybuss from '../visualizers/heatmaps/Ybus'
import { useSelector } from 'react-redux';
import { convertFromReduxCompatible } from '../../../utils/fdlf/reduxConversion';

const Output = ({ iter, Vmag, delta, buses, lines, Pij, Qij, Pji, Qji, P_loss, Q_loss, TotalP_loss, TotalQ_loss }) => {

    const PgenSum = buses.reduce((acc, obj) => acc + obj.Pg, 0);

    const calcEff = (ploss, pgen) => {
        return ( (1 - ploss/ pgen) * 100).toFixed(2);
    }

    let { Ybus } = useSelector(state => state.yMatrix);
    Ybus = convertFromReduxCompatible(Ybus);

    return (
        <>  
            <h2 className={styles.block}>Y-Bus Output</h2>
            <YMatrix/>
            <h2 className={styles.block}>Power Flow Output</h2>
            <p className={styles.block}>Number of iterations: {iter}</p>
            <PowerFlowTable Vmag={Vmag} delta={delta} buses={buses} />
            <LineFlowTable lines={lines} Pij={Pij} Qij={Qij} Pji={Pji} Qji={Qji} P_loss={P_loss} Q_loss={Q_loss} />
            <p className={styles.block}>Total real power losses (pu): {TotalP_loss.toFixed(4)}</p>
            <p className={styles.block}>Total reactive power losses (pu): {TotalQ_loss.toFixed(4)}</p>
            <p className={styles.block}>Efficiency: {calcEff(TotalP_loss, PgenSum)}%</p>
            <div className={styles.charts}>
                <VoltageChart Vmag={Vmag}/> 
                <Ybuss Ybus={Ybus}/>
            </div>
        </>
    );
  };
  
  export default Output

