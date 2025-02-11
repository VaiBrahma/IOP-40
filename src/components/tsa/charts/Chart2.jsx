import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import styles from './Chart.module.css'

const Chart2 = ({ result }) => {
    let dataMax = Math.max(...result.del) * 1.1;

    console.log("Max Data Value:", dataMax);

    const data = result.del.map((value, index) => ({
        Delta: value.toFixed(4),
        time: result.tt[index].toFixed(4)
    }));

    const criticalAngle = result.swingCurve;

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>Swing Curve</h2>
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
                    <XAxis dataKey="time" label={{ value: "Time (sec)", position: "insideBottom", offset: -10 }} />
                    <YAxis label={{ value: "Load Angle (degree)", angle: -90, position: "insideLeft" }} domain={[0, dataMax]} />
                    <Tooltip />
                    <Legend wrapperStyle={{ bottom: -10, right: 0 }} />
                    <Line type="monotone" dataKey="Delta" stroke="#7F5A83" dot={false} />

                    <ReferenceLine 
                        y={criticalAngle} 
                        stroke="red" 
                        label={{ value: `𝛿c: ${criticalAngle.toFixed(2) || 51.55}`, position: "left", fill: "red" }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart2;