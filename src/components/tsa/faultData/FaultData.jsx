import { useDispatch, useSelector } from "react-redux";
import styles from "./FaultData.module.css";
import { updateFormData } from "../../../redux/slices/formSlice";

const FaultData = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);

  const handleChange = (e) => {
    dispatch(updateFormData({ [e.target.name]: parseFloat(e.target.value) }));
  };

  return (
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
  );
};

export default FaultData;