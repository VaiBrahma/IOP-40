import Navbar from "../../components/navbar/Navbar"
import FormInput from "../../components/tsa/formInput/FormInput"
import ImageInput from "../../components/tsa/imageInput/ImageInput"
import styles from "./TSA.module.css"

const TSA = () => {
  return (
    <div className={styles.container}>
        <Navbar title1 = {"IOP-40: Transient Stability Analysis"} title2 = {"IOP-40: TSA"}/>
        <div className={styles.grid}>
            <FormInput/>
            <ImageInput/>
        </div>
        <button type="submit" className={`${styles.bttn} btn`}>Calculate</button>
    </div>
  )
}

export default TSA