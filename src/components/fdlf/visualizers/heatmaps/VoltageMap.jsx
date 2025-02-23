import React from "react";
import Chart from "react-apexcharts";

const VoltageMap = () => {
  const Vmag = [1.1, 0.95, 0.96, 1.09, 0.92, 0.95, 1.05, 0.91, 0.95, 1.05, 1.05, 1.05, 0.97, 1.09, 0.92, 1.0, 0.91, 0.93, 0.94, 0.95];
  const series = [
    {
      name: "Voltage Magnitude",
      data: Vmag.map((v, index) => ({ x: `Bus ${index + 1}`, y: v })),
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
        text: "Voltage Magnitude (p.u.)",
      },
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          gradient: {
            shade: "light",
            type: "horizontal",
            shadeIntensity: 0.5,
            inverse: false,
            stops: [
              { offset: 0, color: "#8B0000" }, // Deep Red (low voltage)
              { offset: 25, color: "#D73027" }, // Reddish
              { offset: 50, color: "#4575B4" }, // Blue (nominal voltage)
              { offset: 75, color: "#D73027" }, // Reddish
              { offset: 100, color: "#8B0000" }, // Deep Red (high voltage)
            ],
          },
        },
      },
    },
  };

  return <Chart options={options} series={series} type="heatmap" height={350} />;
};

export default VoltageMap;
