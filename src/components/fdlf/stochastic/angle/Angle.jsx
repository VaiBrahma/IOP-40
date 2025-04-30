import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BoxPlot from "../boxPlot/BoxPlot";

const Angle = () => {
  const stochasticFDLFresult = useSelector(state => state.stochasticResults);
  const [series, setSeries] = useState([]);
  const [yLimits, setYLimits] = useState({ min: 0, max: 0 });

  const calculateBoxValues = (values) => {
    if (!Array.isArray(values) || values.length === 0) return [0, 0, 0, 0, 0];

    const sorted = [...values].sort((a, b) => a - b);
    const getPercentile = (arr, p) => {
      const index = (p / 100) * (arr.length - 1);
      const lower = Math.floor(index);
      const upper = Math.ceil(index);
      return lower === upper ? arr[lower] : arr[lower] + (arr[upper] - arr[lower]) * (index - lower);
    };

    const min = sorted[0];
    const q1 = getPercentile(sorted, 25);
    const median = getPercentile(sorted, 50);
    const q3 = getPercentile(sorted, 75);
    const max = sorted[sorted.length - 1];

    return [
      parseFloat(min.toFixed(2)),
      parseFloat(q1.toFixed(2)),
      parseFloat(median.toFixed(2)),
      parseFloat(q3.toFixed(2)),
      parseFloat(max.toFixed(2)),
    ];
  };

  useEffect(() => {
    const samples = stochasticFDLFresult?.delta_samples;
    if (samples?.length > 0) {
      const boxPlotData = samples.map((angleSamples, i) => ({
        x: `Bus ${i + 1}`,
        y: calculateBoxValues(angleSamples),
      }));

      setSeries([{ name: "Angle", type: "boxPlot", data: boxPlotData }]);

      const allValues = samples.flat();
      const minVal = Math.min(...allValues);
      const maxVal = Math.max(...allValues);
      const buffer = 0.01;
      setYLimits({
        min: parseFloat((minVal - buffer).toFixed(2)),
        max: parseFloat((maxVal + buffer).toFixed(2)),
      });
    }
  }, [stochasticFDLFresult]);

  return (
    <div>
      <BoxPlot series={series} yMin={yLimits.min} yMax={yLimits.max} text="Angle Distribution (Stochastic FDLF)"/>
    </div>
  );
};

export default Angle;