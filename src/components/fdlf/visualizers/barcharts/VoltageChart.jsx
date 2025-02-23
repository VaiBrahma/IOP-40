import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Rectangle, LabelList } from 'recharts';
import styles from '../../../tsa/charts/Chart.module.css'

const VoltageChart = ({Vmag}) => {

    const data = Vmag.map((value, index) => ({
        busNo: index + 1,
        Vmag: value.toFixed(3)
    }));

  return (
    <div className={styles.container}>
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
          <XAxis dataKey="busNo" tickLine={false} label={{ value: "Bus No.", position: "insideBottom", offset: -20 }} />
          <YAxis tickLine={false} tickCount={6} label={{ value: "Voltage (p.u.)", angle: -90, position: "insideLeft"}} domain={[0, 1.25]}/>
          {/* <Tooltip/> */}
          <Bar dataKey="Vmag" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} background={{ fill: '#eee' }}>
            <LabelList dataKey="Vmag" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VoltageChart