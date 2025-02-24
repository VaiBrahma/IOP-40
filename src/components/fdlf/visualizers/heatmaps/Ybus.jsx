import React from "react";
import Chart from "react-apexcharts";
import styles from "./VoltageMap.module.css";

const Ybus = ({Ybus = [
  [complex(0, 5), complex(-1, -3), complex(-2, 1)],
  [complex(-1, -3), complex(0, 4), complex(-1, -2)],
  [complex(-2, 1), complex(-1, -2), complex(0, 3)],
],}) => {

  const series = Ybus.map((row, index) => ({
    name: index + 1,
    data: row.map((value, colIndex) => ({
      x: `${colIndex + 1}`,
      y: Math.sqrt(value.re ** 2 + value.im ** 2),
      complex: `${value.re.toFixed(2)} ${value.im.toFixed(2) < 0 ? '-' : '+'} ${Math.abs(value.im.toFixed(2))}i`
    })),
  }));

  series.reverse();

  const options = {
    chart: {
      type: "heatmap",
      toolbar: false
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "category",
    },
    yaxis: {
      title: {
        text: "",
      },
    },
    colors: ["#008FFB"],
    title: {
      text: "Admittance Matrix",
      align: 'center',
      style: {
        fontSize:  '14px',
        fontWeight:  'bold',
        color:  '#263238'
      },
    },
    tooltip: {
      enabled: true,
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const point = w.config.series[seriesIndex].data[dataPointIndex];
        return `<div style="padding:5px; background:#fff; border:1px solid #ddd;">
                  <strong>Y[${series.length - seriesIndex}, ${parseInt(point.x.replace("Bus ", ""), 10)}]: </strong> ${point.complex}
                </div>`;
      },
    },
  };

  return (
    <div className={styles.voltageMapContainer}>
      <Chart options={options} series={series} type="heatmap" className={styles.chart}/>
    </div>
  );
};

const complex = (re, im) => ({ re, im });

export default Ybus;