import React from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { observer } from "mobx-react";
import ReactApexChart from "react-apexcharts";

const TotalClusterResources = observer(() => {
  const TotalClusterResourcesPieChart = {
    series: [
      {
        data: [400, 430, 448],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
          distributed: true, // bar color 다르게 해줌
          barHeight: "50%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["Total CPU", "Total Memory", "Total Disk"],
      },
    },
  };

  return (
    <div className="TotalClusterResourcesWrap">
      <div className="chart" style={{ marginTop: "5px" }}>
        <ReactApexChart
          options={TotalClusterResourcesPieChart.options}
          series={TotalClusterResourcesPieChart.series}
          type="bar"
          width="450"
          // padding="20px"
        />
      </div>
    </div>
  );
});

export default TotalClusterResources;

{
  /* <div className="ClusterTotalResourceWrap"></div> */
}
