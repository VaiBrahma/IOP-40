import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import styles from './Chart.module.css'

const Chart2 = ({ result }) => {

    const data = result.tt.map((value, index) => ({
        speed: (result.wr[index]).toFixed(4),
        time: value.toFixed(2)
    }));

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>Speed Vs Time</h2>
            </div>
            <ResponsiveContainer width="100%" height={400} className={styles.con}>
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
                    <CartesianGrid strokeDasharray="0" opacity={0.5} vertical={false} />
                    <XAxis dataKey="time" tickLine={false}  label={{ value: "Time (sec)", position: "insideBottom", offset: -10 }} />
                    <YAxis tickLine={false} tickCount={8} label={{ value: "Speed (rad/s)", angle: -90, position: "insideLeft" }} domain={[-0.014, 0.014]}/>
                    <Tooltip labelFormatter={(label) => `Time: ${label}`} position={{y:-70}} wrapperStyle={{color: "var(--black)"}}/>
                    <Legend wrapperStyle={{ bottom: -10, right: 0 }} />
                    <Line type="monotone" dataKey="speed" stroke="#7F5A83" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart2;