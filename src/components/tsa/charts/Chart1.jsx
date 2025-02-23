import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './Chart.module.css'
import { BiCrosshair } from 'react-icons/bi';

const Chart1 = ({reff, result}) => {

    const data = result.Pme.map((value, index) => ({
        Pmechanical: value.toFixed(4),
        Pprefault: (result.P[index]).toFixed(4),
        Pduringfault: (result.PeFault[index]).toFixed(4),
        Ppostfault: (result.PePost[index]).toFixed(4),
        LoadAngle: (result.d[index] * 180 / Math.PI).toFixed(1)
    }));
    
    // console.log(data);
  return (
    <div className={styles.container} ref={reff}>
        <div className={styles.title}>
            <h2>P-{'\u03B4'} curve</h2>
        </div>
        <ResponsiveContainer width="100%" height={400} className={styles.con}>

        <LineChart width={500} height={300} data={data} margin={{ top: 0,right: 30,left: 20,bottom: 25,
          }}
        >
          <CartesianGrid strokeDasharray="0" opacity={0.5} vertical={false}/>
          <XAxis dataKey="LoadAngle" tickLine={false} tickCount={5} tickFormatter={(number)=>{return `${number}°`}} label={{ value: "Load Angle (degree)", position: "insideBottom", offset: -20 }} />
          <YAxis tickLine={false} tickCount={6} label={{ value: "Power (p.u.)", angle: -90, position: "insideLeft"}}/>
          <Tooltip  labelFormatter={(label) => `${'\u03B4'}: ${label}`} position={{y:-160}} wrapperStyle={{color: "var(--black)"}}/>
          <Legend wrapperStyle={{ bottom: -10, right: 0}}/>
          <Line type="monotone" dataKey="Pmechanical" stroke="#9966FF" dot={false} />
          <Line type="monotone" dataKey="Pprefault" stroke="#36A2EB" dot={false} />
          <Line type="monotone" dataKey="Pduringfault" stroke="#FF6B6B" dot={false} />
          <Line type="monotone" dataKey="Ppostfault" stroke="#2ECC71" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart1