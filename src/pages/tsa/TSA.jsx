import { useSelector } from "react-redux"
import Navbar from "../../components/navbar/Navbar"
import FaultData from "../../components/tsa/faultData/FaultData"
import ImageData from "../../components/tsa/imageData/ImageData"
import SystemData from "../../components/tsa/systemData/systemData"
import styles from "./TSA.module.css"
import { tsa } from "../../utils/tsa/tsa"

const TSA = () => {

    const formData = useSelector(state=>state.form);

    const handleClick = ()=>{
        // console.log(formData);
        const {Pme, P, PeFault, PePost, del} = tsa(formData);
        console.log({Pme, P, PeFault, PePost, del});
    }

  return (
    <div className={styles.container}>
        <Navbar title1 = {"IOP-40: Transient Stability Analysis"} title2 = {"IOP-40: TSA"}/>
        <div className={styles.con}>
            <SystemData/>
            <FaultData/>
        </div>
        <button className={`${styles.bttn} btn`} onClick={handleClick}>Calculate</button>
    </div>
  )
}

export default TSA