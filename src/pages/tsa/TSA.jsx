import Navbar from "../../components/navbar/Navbar"
import FormInput from "../../components/tsa/formInput/FormInput"
import ImageInput from "../../components/tsa/imageInput/ImageInput"
import styles from "./TSA.module.css"

const TSA = () => {
  return (
    <div>
        <Navbar title1 = {"IOP-40: Transient Stability Analysis"} title2 = {"IOP-40: TSA"}/>
        <div className={styles.grid}>
            <FormInput/>
            <ImageInput/>
        </div>
    </div>
  )
}

export default TSA