import React, { Component } from "react";
import Chart from "react-apexcharts";
import { observer } from "mobx-react";

const PieChart = observer((props) => {
  const { label, value } = props;
  console.log("label : ", label)
  console.log("value : ", value)
  const options = {
    labels: label,
    chart: {
      type: 'donut',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 275
        },
        legend: {
          position: 'bottom',

        }
      }
    }],
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        horizontal: true,
        barHeight: "70%",
        borderRadius: 5, // Here is the issue ...
        donut: {
          size: "70%",
          background: "transparent",
          borderRadius: 25,
          labels: {
            show: true,
            borderRadius: 25,
            name: {
              show: true,
              fontSize: "22px",
              color: "#fff",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 600,
              // color: undefined,
              offsetY: -10,
              borderRadius: 100,
              formatter: function (val) {
                return val;
              }
            },
            value: {
              show: true,
              label: "Total",
              borderRadius: 25,
              fontSize: "16px",
              color: "#fff",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 400,
              // color: undefined,
              offsetY: 16,
              formatter: function (val) {
                return val;
              }
            },
            total: {
              show: true,
              showAlways: false,
              borderRadius: 25,
              label: "Total",
              fontSize: "22px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 600,
              color: "#fff",
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);
              }
            }
          }
        }
      }
    },
  };
  const series = value

  return (
    < div className="donut" >
      <Chart
        options={options}
        series={series}
        type="donut"
        width="275"
      />
    </div >)
    ;

});
export default PieChart;
