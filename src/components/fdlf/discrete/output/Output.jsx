import LineFlowTable from './LineFlowTable';
import styles from './Output.module.css'
import PowerFlowTable from './PowerFlowTable';
import YMatrix from '../yMatrix/YMatrix'
import VoltageChart from '../visualizers/barcharts/VoltageChart';
import Ybuss from '../visualizers/heatmaps/Ybus'
import { useSelector } from 'react-redux';
import { convertFromReduxCompatible } from '../../../../utils/fdlf/reduxConversion';
import LineLoadingChart from '../visualizers/barcharts/LineLoadingChart';

const Output = ({ iter, Vmag, delta, buses, lines, Pij, Qij, Pji, Qji, P_loss, Q_loss, TotalP_loss, TotalQ_loss }) => {

    const PgenSum = buses.reduce((acc, obj) => acc + obj.Pg, 0);

    const loadingData = [45.2, 62.8, 37.5, 78.1, 91.3, 54.7]; 

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

            <div className={`${styles.eff} ${styles.iter}`}>
                <p><span>Number of iterations:</span><span>{iter}</span></p>
            </div>

            <PowerFlowTable Vmag={Vmag} delta={delta} buses={buses} />
            <LineFlowTable lines={lines} Pij={Pij} Qij={Qij} Pji={Pji} Qji={Qji} P_loss={P_loss} Q_loss={Q_loss} />

            <div className={styles.eff}>
                <p><span>Total real power losses (pu):</span> <span>{TotalP_loss.toFixed(4)}</span></p>
                <p><span>Total reactive power losses (pu):</span> <span>{TotalQ_loss.toFixed(4)}</span></p>
                <p><span>Efficiency:</span> <span>{calcEff(TotalP_loss, PgenSum)}%</span></p>
            </div>

            <div className={`${styles.charts} grid grid-cols-1 sm:grid-cols-3`}>
                <VoltageChart Vmag={Vmag}/> 
                <Ybuss Ybus={Ybus}/>
                <LineLoadingChart lines={lines}/>
            </div>
        </>
    );
  };
  
  export default Output

