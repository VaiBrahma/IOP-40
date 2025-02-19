import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import styles from './Chart.module.css'

const Chart2 = ({ result }) => {

    let mapping = new Map();
    result.del.forEach((value, index) => {
        mapping.set(value, result.wr[index]);
    });

    let sortedDelta = [...mapping.keys()].sort((x, y) => x - y);
    let sortedSpeed = sortedDelta.map(key => mapping.get(key));

    const data = sortedDelta.map((value, index) => ({
        speed: sortedSpeed[index].toFixed(4),
        del: value.toFixed(4)
    }));

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>Speed Vs Delta</h2>
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
                    <XAxis dataKey="del" tickLine={false} label={{ value: "Delta (degree)", position: "insideBottom", offset: -10 }} />
                    <YAxis tickLine={false} label={{ value: "Speed (rad/s)", angle: -90, position: "insideLeft" }} domain={[-0.014, 0.014]}/>
                    <Tooltip />
                    <Legend wrapperStyle={{ bottom: -10, right: 0 }} />
                    <Line type="monotone" dataKey="speed" stroke="#7F5A83" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart2;