import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './Chart.module.css';

const Chart4 = ({ result }) => {

    const data = result.del.map((value, index) => ({
        Delta: value.toFixed(2),  
        Speed: result.wr[index].toFixed(4)
    }));

    const minX = Math.min(...data.map(d => d.Delta)) - 10;
    const maxX = Math.max(...data.map(d => d.Delta)) + 10;
    const minY = Math.min(...data.map(d => d.Speed)) - 0.005;
    const maxY = Math.max(...data.map(d => d.Speed)) + 0.005;

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>Phasor Plot</h2>
            </div>
            <ResponsiveContainer width="100%" height={400} className={styles.con}>
                <ScatterChart width={500} height={400} margin={{ top: 0, right: 30, left: 30, bottom:25 }}>
                    <CartesianGrid strokeDasharray="0" opacity={0.5} vertical={false} />
                    <XAxis 
                        type="number" 
                        dataKey="Delta" 
                        domain={[minX, maxX]} 
                        tickLine={false}  
                        tickCount={15}
                        label={{ value: "Delta (degree)", position: "insideBottom", offset: -20 }} 
                        tickFormatter={(tick) => tick.toFixed(2)}
                    />
                    <YAxis 
                        type="number" 
                        dataKey="Speed" 
                        domain={[minY, maxY]} 
                        tickLine={false} 
                        tickCount={8}
                        label={{ value: "Speed (rad/s)", angle: -90, position: "insideLeft", offset: -15 }} 
                        tickFormatter={(tick) => tick.toFixed(4)}
                    />
                    <Tooltip />
                    <Scatter name="Data Points" data={data} fill="#FF8C00" size={1}/>
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart4;