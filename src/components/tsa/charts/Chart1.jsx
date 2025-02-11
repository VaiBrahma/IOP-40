import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './Chart.module.css'

const Chart1 = ({reff, result}) => {

    const data = result.Pme.map((value, index) => ({
        Pmechanical: value.toFixed(4),
        PreFault: (result.P[index]).toFixed(4),
        DuringFault: (result.PeFault[index]).toFixed(4),
        PostFault: (result.PePost[index]).toFixed(4),
        LoadAngle: (result.d[index] * 180 / Math.PI).toFixed(1)
    }));
    
    // console.log(data);
  return (
    <div className={styles.container} ref={reff}>
        <div className={styles.title}>
            <h2>P-{'\u03B4'} curve</h2>
        </div>
        <ResponsiveContainer width="100%" height="80%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="LoadAngle" label={{ value: "Load Angle (degree)", position: "insideBottom", offset: -10 }}/>
          <YAxis label={{ value: "Power (p.u.)", angle: -90, position: "insideLeft"}}/>
          <Tooltip />
          <Legend wrapperStyle={{ bottom: -10, right: 0}}/>
          <Line type="monotone" dataKey="Pmechanical" stroke="#1E1E1E" dot={false} />
          <Line type="monotone" dataKey="PreFault" stroke="#3478F6" dot={false} />
          <Line type="monotone" dataKey="DuringFault" stroke="#E63946" dot={false} />
          <Line type="monotone" dataKey="PostFault" stroke="#2A9D8F" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart1