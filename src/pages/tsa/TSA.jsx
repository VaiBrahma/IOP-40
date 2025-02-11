import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import Navbar from "../../components/navbar/Navbar";
import FaultData from "../../components/tsa/faultData/FaultData";
import SystemData from "../../components/tsa/systemData/systemData";
import styles from "./TSA.module.css";
import { tsa } from "../../utils/tsa/tsa";
import Chart1 from "../../components/tsa/charts/Chart1";
import Chart2 from "../../components/tsa/charts/Chart2";

const TSA = () => {
    const formData = useSelector(state => state.form);
    const [flag, setFlag] = useState(false);
    const [result, setResult] = useState({});
    const chart1Ref = useRef(null);

    const handleClick = () => {
        let temp = tsa(formData);
        setResult(temp);
        if (temp) {
            setFlag(true);
            setTimeout(() => {
                if (chart1Ref.current) {
                    slowScrollTo(chart1Ref.current.offsetTop - 100, 800);
                }
            }, 200);
        }
    };

    const slowScrollTo = (targetPosition, duration) => {
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition + 50;
        let startTime = null;

        const animation = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            window.scrollTo(0, startPosition + distance * easeOutQuad(progress));

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    const easeOutQuad = (t) => t * (2 - t);

    return (
        <div className={styles.container}>
            <Navbar title1={"IOP-40: Transient Stability Analysis"} title2={"IOP-40: TSA"} />
            <div className={styles.con}>
                <SystemData />
                <FaultData />
            </div>
            <button className={`${styles.bttn} btn`} onClick={handleClick}>
                Calculate
            </button>

            {flag && (
                <>
                    <Chart1 reff={chart1Ref} result={result} />
                    <Chart2 result={result} />
                </>
            )}
        </div>
    );
};

export default TSA;