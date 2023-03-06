import React, { useEffect } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { observer } from "mobx-react";
import ReactApexChart from "react-apexcharts";
import dashboardStore from "../../../store/Dashboard";
import PieChart from "../../Gedge/Storage/PieChart";

const TotalClusterResources = observer(() => {
  const {
    loadDashboardCnt,
    dashboardDetail,
    totalCpu,
    totalMem,
    totalDisk,
    usageTotalCpu,
    usageTotalMem,
    usageTotalDisk,
  } = dashboardStore;

  const availCpu = totalCpu - usageTotalCpu;
  const availMem = totalMem - usageTotalMem;
  const availDisk = totalDisk - usageTotalDisk;

  const totalCpuTB = totalCpu / 1024;
  const totalMemTB = totalMem / 1024;
  const totalDiskTB = totalDisk / 1024;

  const cpuTemp = (usageTotalCpu / totalCpu) * 100;
  const clusterTotalCpu = cpuTemp.toFixed(2);

  const memTemp = (usageTotalMem / totalMem) * 100;
  const clusterTotalMem = memTemp.toFixed(2);

  const diskTemp = (usageTotalDisk / totalDisk) * 100;
  const clusterTotalDisk = diskTemp.toFixed(2);

  const TotalClusterResourcesBarChart = {
    series: [
      {
        data: [
          {
            x: "Total CPU(/ " + totalCpuTB,
            y: clusterTotalCpu,
          },
          {
            x: "Total Memory",
            y: clusterTotalMem,
          },
          {
            x: "Total Disk",
            y: clusterTotalDisk,
          },
        ],
      },
    ],
    // series: [
    //   {
    //     data: [clusterTotalCpu, clusterTotalMem, clusterTotalDisk],
    //   },
    // ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        foreColor: "#fff",
        stacked: true,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
          distributed: true, // bar color 다르게 해줌
          barHeight: "45%",
        },
      },
      dataLabels: {
        enabled: true,
      },
      yaxis: {
        show: true,
        showAlways: true,
        showForNullSeries: true,
        seriesName: undefined,
        logarithmic: false,
        logBase: 10,
        tickAmount: 4,
        min: 0,
        max: 100,
      },
      tooltip: {
        // 상세 박스
      },
    },
  };

  useEffect(() => {
    loadDashboardCnt();
  }, [
    totalCpu,
    totalMem,
    totalDisk,
    usageTotalCpu,
    usageTotalMem,
    usageTotalDisk,
  ]);

  return (
    <div
      className="TotalClusterResourcesWrap"
      style={{
        display: "flex",
      }}
    >
      <div
        className="chart"
        style={{
          marginTop: "10px",
          width: "300px",
        }}
      >
        <PieChart
          total={true}
          label={["avail", "used"]}
          value={[Math.round(availCpu), Math.round(usageTotalCpu)]}
        />
        <div className="TotalClusterResourcesContTxt">
          <ul>
            <li className="used">
              <span className="tit">Used</span> <span>1 GiB</span>
            </li>
            <li className="avail">
              <span className="tit">Avail</span> <span>1 GiB</span>
            </li>
            <li className="total">
              {" "}
              <span className="tit">Total</span> <span>1 GiB</span>
            </li>
            <li className="none"></li>
          </ul>
        </div>
      </div>

      <div
        className="chart"
        style={{
          marginTop: "10px",
          width: "300px",
        }}
      >
        <PieChart
          total={true}
          label={["avail", "used"]}
          value={[Math.round(availMem), Math.round(usageTotalMem)]}
        />
        <div className="TotalClusterResourcesContTxt">
          <ul>
            <li className="used">
              <span className="tit">Used</span> <span>1 GiB</span>
            </li>
            <li className="avail">
              <span className="tit">Avail</span> <span>1 GiB</span>
            </li>
            <li className="total">
              {" "}
              <span className="tit">Total</span> <span>1 GiB</span>
            </li>
            <li className="none"></li>
          </ul>
        </div>
      </div>

      <div
        className="chart"
        style={{
          marginTop: "10px",
          width: "300px",
        }}
      >
        <PieChart
          total={true}
          label={["avail", "used"]}
          value={[Math.round(availDisk), Math.round(usageTotalDisk)]}
        />
        <div className="TotalClusterResourcesContTxt">
          <ul>
            <li className="used">
              <span className="tit">Used</span> <span>1 GiB</span>
            </li>
            <li className="avail">
              <span className="tit">Avail</span> <span>1 GiB</span>
            </li>
            <li className="total">
              {" "}
              <span className="tit">Total</span> <span>1 GiB</span>
            </li>
            <li className="none"></li>
          </ul>
        </div>
      </div>
    </div>
  );
});

export default TotalClusterResources;
