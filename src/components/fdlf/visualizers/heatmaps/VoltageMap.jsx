import React from "react";
import Chart from "react-apexcharts";
import styles from "./VoltageMap.module.css";

const VoltageMap = ({Vmag}) => {

  const series = [
    {
      name: "",
      data: Vmag.map((v, index) => ({ x: `Bus ${index + 1}`, y: (0.01 +  Math.abs(1 - v.toFixed(2))) * 1000, value: v.toFixed(2)})),
    },
  ];

  const options = {
    chart: {
      type: "heatmap",
      toolbar: {
        show: false,
      },
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
    colors: ["#8583D4"],
    tooltip: {
      enabled: true,
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const point = w.config.series[seriesIndex].data[dataPointIndex];
        return `<div style="padding:5px; background:#fff; border:1px solid #ddd;">
                  <strong>V[${parseInt(point.x.replace("Bus ", ""), 10)}]: </strong> ${point.value}
                </div>`;
      },
      followCursor: false,
      fixed: {
        enabled: false,
        position: 'topRight',
        offsetX: -150,
        offsetY: 0,
      },
    },
  };

  return (
    <div className={styles.voltageMapContainer}>
      <Chart options={options} series={series} type="heatmap" className={styles.chart} height={150}/>
    </div>
  );
};

export default VoltageMap;