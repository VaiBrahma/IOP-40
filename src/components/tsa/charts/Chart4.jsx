import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, PointElement, Tooltip } from "chart.js";
import styles from "./Chart.module.css";

ChartJS.register(LinearScale, PointElement, Tooltip);

const Chart4 = ({ result }) => {
    const data = {
        datasets: [
            {
                label: "Phasor Data",
                data: result.del.map((value, index) => ({
                    x: parseFloat(value.toFixed(2)),  
                    y: parseFloat(result.wr[index].toFixed(4))
                })),
                backgroundColor: "#FF8C00",
                pointRadius: 11,
                pointHoverRadius: 5, 
                pointHoverBorderColor: "#000", 
                pointHoverBorderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: "linear",
                title: {
                    display: true,
                    text: "Delta (degree)",
                },
                ticks: {
                    callback: (tick) => tick.toFixed(2),
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Speed (rad/s)",
                },
                ticks: {
                    callback: (tick) => tick.toFixed(4),
                },
            },
        },
        plugins: {
            tooltip: {
                enabled: true,
                mode: "nearest",
                position: "nearest",
                yAlign: "bottom",
                xAlign: "center",
                caretPadding: 25,
                caretSize: 10,
                padding: 15,
            },
        },
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>Phasor Plot</h2>
            </div>
            <div className={styles.chart} style={{cursor: "crosshair"}}>
                <Scatter data={data} options={options} height={400} width={800} />
            </div>
        </div>
    );
};

export default Chart4;