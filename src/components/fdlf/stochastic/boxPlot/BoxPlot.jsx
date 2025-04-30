import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const BoxPlot = ({ series, text = "box plot visualization" }) => {
  const [state] = useState({
    options: {
      chart: {
        type: "boxPlot",
        height: 350,
        toolbar: { show: false },
        background: "transparent"
      },
      title: {
        text: text,
        align: "center",
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          color: "#333"
        }
      },
      plotOptions: {
        boxPlot: {
          colors: {
            upper: "#0d9488", // teal-600
            lower: "#99f6e4"  // teal-200
          }
        }
      },
      xaxis: {
        labels: {
          style: {
            fontSize: "14px"
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "14px"
          }
        }
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              // height: 300
            },
            title: {
              style: {
                fontSize: "16px"
              }
            }
          }
        }
      ]
    }
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 w-full max-w-4xl mx-auto">
      <ReactApexChart
        options={state.options}
        series={series}
        type="boxPlot"
        height={350}
      />
    </div>
  );
};

export default BoxPlot;