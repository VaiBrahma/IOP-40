import React from "react";
import Chart from "react-apexcharts";
import styles from "./VoltageMap.module.css"; // Import CSS Module
import { rotate } from "mathjs";

const VoltageMap = ({Vmag}) => {
  // const Vmag = [1.1, 0.95, 0.96, 1.09, 0.92, 0.95, 1.05, 0.91, 0.95, 1.05, 1.05, 1.05, 0.97, 1.09, 0.92, 1.0, 0.91, 0.93, 0.94, 0.95];

  const series = [
    {
      name: "",
      data: Vmag.map((v, index) => ({ x: `Bus ${index + 1}`, y: v.toFixed(2) })),
    },
  ];

  const options = {
    chart: {
      type: "heatmap",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "category",
    },
    yaxis: {
      title: {
        text: "Voltage (p.u.)",
      },
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            { from: 0.000, to: 0.909, color: "#7B3294" },
            { from: 0.910, to: 0.919, color: "#9551A4" },
            { from: 0.920, to: 0.929, color: "#AE70B4" },
            { from: 0.930, to: 0.939, color: "#C790C4" },
            { from: 0.940, to: 0.949, color: "#E1B0D4" },
            { from: 0.950, to: 0.959, color: "#1D6996" },
            { from: 0.960, to: 0.969, color: "#2680B2" },
            { from: 0.970, to: 0.979, color: "#3296CD" },
            { from: 0.980, to: 0.989, color: "#48ADE7" },
            { from: 0.990, to: 1.009, color: "#6DC4F1" },
            { from: 1.010, to: 1.019, color: "#48ADE7" },
            { from: 1.020, to: 1.029, color: "#3296CD" },
            { from: 1.030, to: 1.039, color: "#2680B2" },
            { from: 1.040, to: 1.049, color: "#1D6996" },
            { from: 1.050, to: 1.059, color: "#F46D43" },
            { from: 1.060, to: 1.069, color: "#E75A3A" },
            { from: 1.070, to: 1.079, color: "#D84830" },
            { from: 1.080, to: 1.089, color: "#C63626" },
            { from: 1.090, to: 2.000, color: "#B3241C" },
          ],
        },
      },
    },
  };

  return (
    <div className={styles.voltageMapContainer}>
      <Chart options={options} series={series} type="heatmap" style={{width: "90%"}} height={120} />
      <div className={styles.legendContainer}>
        <div className={styles.legendItem}>
          <div className={styles.legendColor + " " + styles.lowVoltage}></div>
          <span>Low Voltage</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendColor + " " + styles.nominalVoltage}></div>
          <span>Nominal Voltage</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendColor + " " + styles.highVoltage}></div>
          <span>High Voltage</span>
        </div>
      </div>
    </div>
  );
};

export default VoltageMap;