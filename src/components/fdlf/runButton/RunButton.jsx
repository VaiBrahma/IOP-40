import { useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from './RunButton.module.css';
import { calculateYbus } from "../../../utils/fdlf/yBus";
import { setYMatrix } from "../../../redux/slices/yMatrixSlice";
import { convertFromReduxCompatible, convertToReduxCompatible } from "../../../utils/fdlf/reduxConversion";
import { runLoadFlow } from '../../../utils/fdlf/calculation';
import Output from '../discrete/output/Output';
import { stochasticFDLF } from '../../../utils/fdlf/stochasticFDLF';
import BoxPlot from '../stochastic/boxPlot/BoxPlot';
import { setStochasticResults } from '../../../redux/slices/stochasticResultsSlice';
import Results from '../stochastic/Results';

// ShadCN UI imports
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

const RunButton = () => {
  const buses = useSelector(state => state.buses);
  const liness = useSelector(state => state.lines);
  const [maxItr, setMaxItr] = useState(500);
  const [tolerance, setTolerance] = useState(0.0001);
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  const [results, setResults] = useState();
  const [mode, setMode] = useState(null); // "discrete" or "stochastic"
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState("discrete");
  const outputRef = useRef(null);

  const handleRun = () => {
    setMode(selectedMode);
    setDialogOpen(false);

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

    console.log(busess, liness, Ybus);
    const stochasticFDLFresult = stochasticFDLF(
      busess,
      liness,
      500,
      Ybus
    );

    console.log("These are the stochastic FDLF results:", stochasticFDLFresult);

    dispatch(setStochasticResults(stochasticFDLFresult));

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
    <>
      <div className={styles.container}>
        <form onSubmit={(e) => {
          e.preventDefault();
          setDialogOpen(true); // Open dialog to select mode
        }}>
          <input 
            type="number" 
            placeholder={`Tolerance: ${tolerance}`} 
            step={0.0001} 
            min={0} 
            onChange={(e) => setTolerance(parseFloat(e.target.value))}
          />
          <input 
            type="number" 
            placeholder={`Max. Iteration: ${maxItr}`} 
            min={1} 
            onChange={(e) => setMaxItr(parseInt(e.target.value))}
          />
          <div className={styles.line}></div>
          <button type="submit" className={`btn ${styles.runbtn}`}>Run Power Flow</button>
        </form>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Load Flow Mode</DialogTitle>
          </DialogHeader>
          <RadioGroup
            defaultValue="discrete"
            onValueChange={setSelectedMode}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="discrete" id="discrete" />
              <label htmlFor="discrete">Discrete</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="stochastic" id="stochastic" />
              <label htmlFor="stochastic">Stochastic</label>
            </div>
          </RadioGroup>
          <DialogFooter className="pt-4">
            <Button onClick={handleRun}>Run</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className={styles.output} ref={outputRef}>
        {flag && mode === "discrete" && results && <Output {...results} />}
        {flag && mode === "stochastic" && <Results />}
      </div>
    </>
  );
};

export default RunButton;