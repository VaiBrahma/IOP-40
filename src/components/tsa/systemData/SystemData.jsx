import { useDispatch, useSelector } from "react-redux";
import styles from "./SystemData.module.css";
import { updateFormData } from "../../../redux/slices/formSlice";
import { SiNetflix } from "react-icons/si";
import { useState } from "react";
import ImageData from "../imageData/ImageData";

const SystemData = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);
  const [flag, setFlag] = useState(false);

  const handleChange = (e) => {
    dispatch(updateFormData({ [e.target.name]: parseFloat(e.target.value) }));
  };

  return (
    <div className={styles.card}>
      <div className={styles.headerr}>
          <div className={styles.title}>System Data</div>
          <div className={styles.btns}>
            <button className={`${styles.blu} btn`} onClick={()=>setFlag(e=>!e)}>{flag ? "Figure Input" : "Table Input"}</button>
          </div>
      </div>
      {flag ? 
        <>
          <div className={styles.grid}>
            <div className={styles.item1}>
              <label htmlFor="E">Generator Voltage (E, pu):</label>
              <input type="number" id="E" name="E" min="1" max="2" step="0.0001" value={formData.E} onChange={handleChange} required />
            </div>

            <div className={styles.item2}>
              <label htmlFor="V">Bus Voltage (V, pu):</label>
              <input type="number" id="V" name="V" min="0.1" max="2" step="0.0001" value={formData.V} onChange={handleChange} required />
            </div>

            <div className={styles.item1}>
              <label htmlFor="Pmec">Mechanical Power (Pm, pu):</label>
              <input type="number" id="Pmec" name="Pmec" min="0.1" max="5" step="0.0001" value={formData.Pmec} onChange={handleChange} required />
            </div>

            <div className={styles.item2}>
              <label htmlFor="Xt">Transformer Line Reactance (Xt, pu):</label>
              <input type="number" id="Xt" name="Xt" min="0.1" max="5" step="0.0001" value={formData.Xt} onChange={handleChange} required />
            </div>

            <div className={styles.item1}>
              <label htmlFor="X1">Transmission Line 1 Reactance (X1, pu):</label>
              <input type="number" id="X1" name="X1" min="0.1" max="5" step="0.0001" value={formData.X1} onChange={handleChange} required />
            </div>

            <div className={styles.item2}>
              <label htmlFor="X2">Transmission Line 2 Reactance (X2, pu):</label>
              <input type="number" id="X2" name="X2" min="0.1" max="5" step="0.0001" value={formData.X2} onChange={handleChange} required />
            </div>

            <div className={styles.item1}>
              <label htmlFor="H">Inertia Constant (H):</label>
              <input type="number" id="H" name="H" min="1" max="10" step="0.0001" value={formData.H} onChange={handleChange} required />
            </div>

            <div className={styles.item2}>
              <label htmlFor="f">System Frequency (Hz):</label>
              <input type="number" id="f" name="f" min="50" max="65" step="0.0001" value={formData.f} onChange={handleChange} required />
            </div>
          </div>
        </>
        :
        <div className={styles.centre}>
          <ImageData/>
        </div>
      }
    </div>
  );
};

export default SystemData;