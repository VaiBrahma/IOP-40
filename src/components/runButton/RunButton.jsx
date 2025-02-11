import { useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from './RunButton.module.css';
import { calculateYbus } from "../../utils/fdlf/yBus";
import { setYMatrix } from "../../redux/slices/yMatrixSlice";
import { convertFromReduxCompatible, convertToReduxCompatible } from "../../utils/fdlf/reduxConversion";
import { runLoadFlow } from '../../utils/fdlf/calculation';
import Output from '../output/Output';

const RunButton = () => {
  
  const buses = useSelector(state => state.buses);
  const liness = useSelector(state => state.lines);
  const [maxItr, setMaxItr] = useState(500);
  const [tolerance, setTolerance] = useState(0.0001);
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  const [results, setResults] = useState();
  
  const outputRef = useRef(null); // Reference for the output div

  const handleSubmit = (e) => {
    e.preventDefault();
  
    let { Ybus, Ybus1 } = calculateYbus(buses, liness);
    Ybus = convertToReduxCompatible(Ybus);
    Ybus1 = convertToReduxCompatible(Ybus1);
  
    dispatch(setYMatrix({ Ybus, Ybus1 }));
  
    let busess = structuredClone(buses);
    const powerFlowResults = runLoadFlow(
      busess, 
      liness, 
      tolerance, 
      maxItr, 
      convertFromReduxCompatible(Ybus), 
      convertFromReduxCompatible(Ybus1)
    );
  
    // console.log(powerFlowResults);
  
    setResults(powerFlowResults);
    setFlag(true);
  
    setTimeout(() => {
      if (outputRef.current) {
        slowScrollTo(outputRef.current.offsetTop - 100, 800);
      }
    }, 200);
  };
  
  const slowScrollTo = (targetPosition, duration) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;
  
    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1); // Ensure it doesn't exceed duration
      window.scrollTo(0, startPosition + distance * easeOutQuad(progress));
  
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
  
    requestAnimationFrame(animation);
  };
  
  const easeOutQuad = (t) => t * (2 - t);

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <input type="number" placeholder={`Tolerance: ${tolerance}`} step={0.0001} min={0} onChange={(e) => setTolerance(parseFloat(e.target.value))}/>
          <input type="number" placeholder={`Max. Iteration: ${maxItr}`} min={1} onChange={(e) => setMaxItr(parseInt(e.target.value))}/>
          <div className={styles.line}></div>
          <button type="submit" className={`btn ${styles.runbtn}`}>Run Power Flow</button>
        </form>
      </div>

      <div className={styles.output} ref={outputRef}>
        {flag && results && <Output {...results} />}
      </div>
    </>
  )
}

export default RunButton;