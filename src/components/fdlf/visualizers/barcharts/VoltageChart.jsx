import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Rectangle, LabelList } from 'recharts';
import styles from '../../../tsa/charts/Chart.module.css'
import VoltageMap from '../heatmaps/VoltageMap';

const VoltageChart = ({Vmag}) => {

    const data = Vmag.map((value, index) => ({
        busNo: index + 1,
        Vmag: value.toFixed(3)
    }));

  return (
    <div className={styles.container} style={{height: "auto"}}>
        <div className={styles.title}>
            <h2>Bus Voltage</h2>
        </div>

        <ResponsiveContainer height={400}>

        <BarChart
          width={300}
          height={100}
          data={data}
          margin={{
            top: 0,
            right: 30,
            left: 30,
            bottom: 25,
          }}
          barSize={40}
        >
          <CartesianGrid strokeDasharray="0" opacity={0.5} vertical={false}/>
          <XAxis dataKey="busNo" tickLine={false} label={{ position: "insideBottom", offset: -20 }} />
          <YAxis tickLine={false} tickCount={6} label={{ value: "Voltage (p.u.)", angle: -90, position: "insideLeft"}} domain={[0, 1.25]} />

          <Bar dataKey="Vmag" 
            background={{ fill: '#eee' }}
            shape={(props) => {
              const { x, y, width, height, value } = props;
              const color = value > 1.05 || value < 0.95 ? "#FF6B6B" : "#8884d8";
              return <Rectangle x={x} y={y} width={width} height={height} fill={color} stroke="black" />;
            }}>
            <LabelList dataKey="Vmag" position="top" content={({ x, y, value }) => (<text x={x+18} y={y - 5} fill="black" textAnchor="middle" fontSize={12}>{Number(value).toFixed(2)}</text>)} />
          </Bar>

        </BarChart>
        </ResponsiveContainer>

        <VoltageMap Vmag={Vmag}/>
    </div>
  )
}

export default VoltageChart