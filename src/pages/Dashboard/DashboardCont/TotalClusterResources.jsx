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

  const availCpuTB = availCpu / 1024;
  const availMemTB = availMem / 1024;
  const availDiskTB = availDisk / 1024;

  const usageTotalCpuTB = usageTotalCpu / 1024;
  const usageTotalMemTB = usageTotalMem / 1024;
  const usageTotalDiskTB = usageTotalDisk / 1024;

  const cpuTemp = (usageTotalCpu / totalCpu) * 100;
  const clusterTotalCpu = cpuTemp.toFixed(2);

  const memTemp = (usageTotalMem / totalMem) * 100;
  const clusterTotalMem = memTemp.toFixed(2);

  const diskTemp = (usageTotalDisk / totalDisk) * 100;
  const clusterTotalDisk = diskTemp.toFixed(2);

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
      className="totalClusterResourcesWrap"
      style={{
        display: "flex",
      }}
    >
      <div className="stotalClusterResourcesCircleBox">
        <div className="totalClusterResourcesBoxTitle">Total CPU</div>
        <div
          className="chart"
          style={{
            marginTop: "10px",
            marginLeft: "20px",
            width: "200px",
          }}
        >
          <PieChart
            total={true}
            label={["avail", "used"]}
            value={[availCpuTB, usageTotalCpuTB]}
          />
          <div className="totalClusterResourcesContTxt">
            <ul>
              <li className="used">
                <span className="tit">Used</span>
                <span>{usageTotalCpuTB.toFixed(2)} TB</span>
              </li>
              <li className="avail">
                <span className="tit">Avail</span>
                <span>{availCpuTB.toFixed(2)} TB</span>
              </li>
              <li className="total">
                <span className="tit">Total</span>
                <span>{totalCpuTB.toFixed(2)} TB</span>
              </li>
              <li className="none"></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="stotalClusterResourcesCircleBox">
        <div className="totalClusterResourcesBoxTitle">Total Memory</div>
        <div
          className="chart"
          style={{
            marginTop: "10px",
            marginLeft: "20px",
            width: "200px",
          }}
        >
          <PieChart
            total={true}
            label={["avail", "used"]}
            value={[availMemTB, usageTotalMemTB]}
          />
          <div className="totalClusterResourcesContTxt">
            <ul>
              <li className="used">
                <span className="tit">Used</span>
                <span>{usageTotalMemTB.toFixed(2)} TB</span>
              </li>
              <li className="avail">
                <span className="tit">Avail</span>
                <span>{availMemTB.toFixed(2)} TB</span>
              </li>
              <li className="total">
                <span className="tit">Total</span>
                <span>{totalMemTB.toFixed(2)} TB</span>
              </li>
              <li className="none"></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="stotalClusterResourcesCircleBox">
        <div className="totalClusterResourcesBoxTitle">Total Disk</div>
        <div
          className="chart"
          style={{
            marginTop: "10px",
            marginLeft: "20px",
            width: "200px",
          }}
        >
          <PieChart
            total={true}
            label={["avail", "used"]}
            value={[Math.round(availDiskTB), Math.round(usageTotalDiskTB)]}
          />
          <div className="totalClusterResourcesContTxt">
            <ul>
              <li className="used">
                <span className="tit">Used</span>
                <span>{usageTotalDiskTB.toFixed(2)} TB</span>
              </li>
              <li className="avail">
                <span className="tit">Avail</span>
                <span>{availDiskTB.toFixed(2)} TB</span>
              </li>
              <li className="total">
                <span className="tit">Total</span>
                <span>{totalDiskTB.toFixed(2)} TB</span>
              </li>
              <li className="none"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

export default TotalClusterResources;
