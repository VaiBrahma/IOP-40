import { useDispatch, useSelector } from 'react-redux';
import styles from './ImageData.module.css';
import { updateFormData } from '../../../redux/slices/formSlice';

const ImageData = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.form);

    const handleChange = (e) => {
        dispatch(updateFormData({ [e.target.name]: parseFloat(e.target.value) }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <img src="/images/Withoutfault.png" alt="circuit" />
                
                <input type="number" id="E" name="E" min="1" max="2" step="0.0001" value={formData.E} onChange={handleChange} placeholder="E" className={styles.E} required />
                <input type="number" id="V" name="V" min="0.1" max="2" step="0.0001" value={formData.V} onChange={handleChange} placeholder="V" className={styles.V} required />
                <input type="number" id="Xt" name="Xt" min="0.1" max="5" step="0.0001" value={formData.Xt} onChange={handleChange} placeholder="Xt" className={styles.Xt} required />
                <input type="number" id="X1" name="X1" min="0.1" max="5" step="0.0001" value={formData.X1} onChange={handleChange} placeholder="X1" className={styles.X1} required />
                <input type="number" id="X2" name="X2" min="0.1" max="5" step="0.0001" value={formData.X2} onChange={handleChange} placeholder="X2" className={styles.X2} required />
                
                <div className={styles.Pmec}>
                    <label htmlFor="Pmec">Pmec: </label>
                    <input type="number" id="Pmec" name="Pmec" min="0.1" max="5" step="0.0001" value={formData.Pmec} onChange={handleChange} required />
                </div>

                <div className={styles.H}>
                    <label htmlFor="H">H: </label>
                    <input type="number" id="H" name="H" min="1" max="10" step="0.0001" value={formData.H} onChange={handleChange} required />
                </div>

                <div className={styles.f}>
                    <label htmlFor="f">f: </label>
                    <input type="number" id="f" name="f" min="50" max="65" step="0.0001" value={formData.f} onChange={handleChange} required />
                </div>
            </div>
        </div>
    );
};

export default ImageData;