import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Rectangle, LabelList } from 'recharts';
import styles from '../../../../tsa/charts/Chart.module.css'
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
            top: 30,
            right: 30,
            left: 30,
            bottom: 25,
          }}
          barSize={40}
        >

          <defs>
            <linearGradient id="goodGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7B61FF" /> {/* Vibrant Purple */}
              <stop offset="100%" stopColor="#B79DF0" /> {/* Soft Lavender */}
            </linearGradient>

            <linearGradient id="badGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF3B3B" /> {/* Bright Red */}
              <stop offset="100%" stopColor="#FF8E8E" /> {/* Soft Coral */}
            </linearGradient>
          </defs>

          <XAxis dataKey="busNo" tickLine={false} tickFormatter={title=> "bus " + title} label={{ position: "insideBottom", offset: -20 }} domain={[0, 2]}/>
          {/* <YAxis tickLine={false} tickCount={6} label={{ value: "Voltage (p.u.)", angle: -90, position: "insideLeft"}} domain={[0, 1.25]} /> */}
          <Tooltip/>

          <Bar dataKey="Vmag" 
            // background={{ fill: '#eee' }}
            shape={(props) => {
              const { x, y, width, height, value } = props;
              const color = value > 1.05 || value < 0.95 ? "url(#badGradient)" : "url(#goodGradient)";
              return <Rectangle x={x} y={y} width={width} height={height} fill={color} stroke="black" radius={[10, 10, 0, 0]}/>;
            }}
          >
            <LabelList dataKey="Vmag" position="top"/>
          </Bar>

        </BarChart>
        </ResponsiveContainer>

        <VoltageMap Vmag={Vmag}/>
    </div>
  )
}

export default VoltageChart