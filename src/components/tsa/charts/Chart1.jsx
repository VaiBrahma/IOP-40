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
        <ResponsiveContainer width="100%" height={400}>

        <LineChart width={500} height={300} data={data} margin={{ top: 5,right: 30,left: 20,bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="0" opacity={0.5} vertical={false}/>
          <XAxis dataKey="LoadAngle" tickLine={false} tickCount={5} tickFormatter={(number)=>{return `${number}°`}} label={{ value: "Load Angle (degree)", position: "insideBottom", offset: -10 }} />
          <YAxis tickLine={false} tickCount={6} label={{ value: "Power (p.u.)", angle: -90, position: "insideLeft"}}/>
          <Tooltip position={{y:-160}} wrapperStyle={{color: "var(--black)"}}/>
          <Legend wrapperStyle={{ bottom: -10, right: 0}}/>
          <Line type="monotone" dataKey="Pmechanical" stroke="#9966FF" dot={false} />
          <Line type="monotone" dataKey="PreFault" stroke="#36A2EB" dot={false} />
          <Line type="monotone" dataKey="DuringFault" stroke="#FF6B6B" dot={false} />
          <Line type="monotone" dataKey="PostFault" stroke="#2ECC71" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart1