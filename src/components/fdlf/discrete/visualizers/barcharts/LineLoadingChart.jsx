import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import styles from '../../../../tsa/charts/Chart.module.css'

const LineLoadingChart = ({ lines }) => {
  const linesData = useSelector(state => state.lines);

  const chartData = lines.map((line, index) => ({
    name: `L${index + 1}`,
    loading: parseFloat(linesData[index].loading) || 0,
  }));

  const getGradientId = (value) => {
    if (value < 50) return "greenGradient";
    if (value < 80) return "yellowGradient";
    return "redGradient";
  };

  return (

    <div className={styles.container} style={{height: "auto"}}>
        <div className={styles.title}>
            <h2>Percentage Loading</h2>
        </div>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} layout="vertical" barSize={40}>
        
        <defs>
          <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4CAF50" />
            <stop offset="100%" stopColor="#81C784" />
          </linearGradient>
          
          <linearGradient id="yellowGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFC107" />
            <stop offset="100%" stopColor="#FFD54F" />
          </linearGradient>

          <linearGradient id="redGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F44336" />
            <stop offset="100%" stopColor="#E57373" />
          </linearGradient>
        </defs>

        <XAxis type="number" domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
        <YAxis type="category" dataKey="name" width={50} />
        <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />

        <Bar dataKey="loading" radius={[0, 10, 10, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`url(#${getGradientId(entry.loading)})`} />
          ))}
        </Bar>
        
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};

export default LineLoadingChart;