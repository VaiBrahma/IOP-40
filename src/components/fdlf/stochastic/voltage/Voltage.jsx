import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BoxPlot from "../boxPlot/BoxPlot";

const Voltage = () => {
  const stochasticFDLFresult = useSelector(state => state.stochasticResults);
  const [series, setSeries] = useState([]);

  const calculateBoxValues = (values) => {
    if (!Array.isArray(values) || values.length === 0) {
      return [0, 0, 0, 0, 0];
    }

    const sorted = [...values].sort((a, b) => a - b);

    const getPercentile = (arr, p) => {
      const index = (p / 100) * (arr.length - 1);
      const lower = Math.floor(index);
      const upper = Math.ceil(index);
      if (lower === upper) return arr[lower];
      return arr[lower] + (arr[upper] - arr[lower]) * (index - lower);
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
    if (stochasticFDLFresult?.V_samples?.length > 0) {
      const boxPlotData = stochasticFDLFresult.V_samples.map((samples, i) => ({
        x: `Bus ${i + 1}`,
        y: calculateBoxValues(samples),
      }));

      const newSeries = [
        {
          name: "Voltage",
          type: "boxPlot",
          data: boxPlotData,
        }
      ];

      setSeries(newSeries);
    }
  }, [stochasticFDLFresult]);

  return (
    <div>
      <BoxPlot series={series} text="Voltage Distribution (Stochastic FDLF)"/>
    </div>
  );
};

export default Voltage;