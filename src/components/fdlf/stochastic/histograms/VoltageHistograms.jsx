import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

// Helper: Create histogram + PDF data
const createHistogramData = (samples, bins = 30) => {
  const valid = samples.filter(v => !isNaN(v));
  if (valid.length === 0) return [];

  const min = Math.min(...valid);
  const max = Math.max(...valid);
  const binWidth = (max - min) / bins;
  const binCounts = Array(bins).fill(0);

  valid.forEach(v => {
    const index = Math.min(Math.floor((v - min) / binWidth), bins - 1);
    binCounts[index]++;
  });

  const mean = valid.reduce((sum, x) => sum + x, 0) / valid.length;
  const std = Math.sqrt(valid.reduce((sum, x) => sum + (x - mean) ** 2, 0) / valid.length);

  return binCounts.map((count, i) => {
    const x = min + binWidth * (i + 0.5);
    const pdf = (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mean) / std) ** 2);
    return {
      bin: x.toFixed(3),
      count,
      pdf: pdf * valid.length * binWidth, // Scale PDF to histogram area
    };
  });
};

const VoltageHistograms = () => {
  const stochasticFDLFresult = useSelector(state => state.stochasticResults);
  const V_samples = stochasticFDLFresult?.V_samples || [];

  const histogramData = useMemo(() => {
    return V_samples.map(samples => createHistogramData(samples));
  }, [V_samples]);

  if (V_samples.length === 0) {
    return <div className="p-4 text-center">No voltage samples available.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {histogramData.map((data, index) => (
        <div key={index} className="bg-white shadow-md rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-2 text-center">
            V<sub>Bus {index + 1}</sub>
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bin" tick={{ fontSize: 10 }} />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="count"
                fill="#8884d8"
                barSize={12}
                name="Histogram"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="pdf"
                stroke="#ff7300"
                dot={false}
                strokeWidth={2}
                name="PDF"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default VoltageHistograms;