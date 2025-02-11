import { useDispatch, useSelector } from "react-redux";
import styles from "./FormInput.module.css";
import { updateFormData } from "../../../redux/slices/formSlice";

const FormInput = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);

  const handleChange = (e) => {
    dispatch(updateFormData({ [e.target.name]: parseFloat(e.target.value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <div className={styles.container}>
      <form id="stabilityForm" onSubmit={handleSubmit} className={styles.frm}>
        <div className={styles.card}>
          <h2>System Data</h2>
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
        </div>

        <div className={styles.card}>
          <h2>Fault Data</h2>
          <div className={styles.grid}>
            <div className={styles.item1}>
              <label htmlFor="tStep">Time Step (s):</label>
              <input type="number" id="tStep" name="tStep" step="0.01" value={formData.tStep} onChange={handleChange} required />
            </div>

            <div className={styles.item2}>
              <label htmlFor="faultTime">Fault Occurrence Time (s):</label>
              <input type="number" id="faultTime" name="faultTime" step="0.01" value={formData.faultTime} onChange={handleChange} required />
            </div>

            <div className={styles.item1}>
              <label htmlFor="clearTime">Fault Clearing Time (s):</label>
              <input type="number" id="clearTime" name="clearTime" step="0.01" value={formData.clearTime} onChange={handleChange} required />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormInput;