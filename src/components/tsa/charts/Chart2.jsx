import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import styles from './Chart.module.css'

const Chart2 = ({ result }) => {

    let maxVal = Math.max(...result.del) + 3 || 120;

    const data = result.del.map((value, index) => ({
        Delta: value.toFixed(4),
        time: result.tt[index].toFixed(2)
    }));

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>Swing Curve</h2>
            </div>
            <ResponsiveContainer width="100%" height={400}>
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
                    <XAxis dataKey="time" tickFormatter={(number) => {return `${Number.parseFloat(number).toFixed(2)}`}} tickLine={false} label={{ value: "Time (sec)", position: "insideBottom", offset: -10 }} />
                    <YAxis tickFormatter={(value) => (value === maxVal ? "" : value.toFixed(0))}  tickLine={false} tickCount={10} label={{ value: "Load Angle (degree)", angle: -90, position: "insideLeft" }} domain={[0, maxVal]}/>
                    <Tooltip position={{y:-70}} wrapperStyle={{color: "var(--black)"}}/>
                    <Legend wrapperStyle={{ bottom: -10, right: 0 }} />
                    <Line type="monotone" dataKey="Delta" stroke="#F39C12" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart2;