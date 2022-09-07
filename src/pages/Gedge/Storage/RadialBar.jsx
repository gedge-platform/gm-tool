import React, { Component } from "react";
import Chart from "react-apexcharts";
import { observer } from "mobx-react";

const RadialBar = observer((props) => {
  const { label, value } = props;
  console.log("label : ", label)
  console.log("value : ", value)
  const options = {
    labels: label,
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,

      horizontalAlign: "center",
      floating: false,
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      width: undefined,
      height: undefined,
      formatter: undefined,
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors: undefined,
        useSeriesColors: false
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: "#fff",
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0
      },

      onItemClick: {
        toggleDataSeries: true
      },
      onItemHover: {
        highlightDataSeries: true
      }
    },
    plotOptions: {
      radialBar: {
        size: undefined,
        inverseOrder: false,
        startAngle: 0,
        endAngle: 275,
        offsetX: 0,
        offsetY: 0,
        hollow: {
          margin: 5,
          size: "50%",
          background: "transparent",
          image: undefined,
          imageWidth: 150,
          imageHeight: 150,
          imageOffsetX: 0,
          imageOffsetY: 0,
          imageClipped: true,
          position: "front",
          dropShadow: {
            enabled: false,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5
          }
        },
        track: {
          show: true,
          startAngle: undefined,
          endAngle: undefined,
          background: "#f2f2f2",
          strokeWidth: "97%",
          opacity: 1,
          margin: 5,
          dropShadow: {
            enabled: false,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5
          }
        },
        dataLabels: {
          show: true,
          name: {
            show: true,
            fontSize: "22px",
            fontFamily: undefined,
            color: undefined,
            offsetY: -10
          },
          value: {
            show: true,
            fontSize: "16px",
            fontFamily: undefined,
            color: undefined,
            offsetY: 16,
            formatter: function (val) {
              return val + "%";
            }
          },
          total: {
            show: true,
            label: "Total",
            color: "#373d3f",
            formatter: function (w) {
              return (
                w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0) /
                w.globals.series.length +
                "%"
              );
            }
          }
        }
      }
    }
  };
  const series = value

  return (
    < div className="donut" >
      <Chart
        options={options}
        series={series}
        type="radialBar"
        width="300"
      />
    </div >)
    ;

});
export default RadialBar;
