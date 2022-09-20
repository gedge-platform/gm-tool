import React, { useState, useEffect } from "react";
import Layout from "@/layout";
import { Title } from "@/pages";
import { PanelBox } from "@/components/styles/PanelBox";
import styled from "styled-components";
import { FormControl, MenuItem, Select } from "@mui/material";
import serviceAdminDashboardStore from "../../../store/ServiceAdminDashboard";
import { observer } from "mobx-react";
import { ResponsiveLine } from "@nivo/line";
import ServiceAdminChart from "./ServiceAdminChart";
import {
  unixStartTime,
  stepConverter,
  unixCurrentTime,
  unixToTime,
} from "@/pages/Gedge/Monitoring/Utils/MetricsVariableFormatter";
import monitoringStore from "../../../store/Monitoring";

const ServiceAdminWrap = styled.div`
  padding: 0 10px;
  .panel_summary {
    width: 100%;
    margin-bottom: 12px;
    background: #202842;
    border: 0;
    border-radius: 8px;
    &::before {
      display: none;
    }
  }
`;

const ButtonStyle = styled.button`
  width: 100%;
  height: 16%;
  font-size: 16px;
  font-weight: bold;
  position: relative;
  border: #6765bf;
  background-color: #6765bf;
  color: #ffff;
  border-radius: 5px;
`;

const ServiceAdminDashboard = observer(() => {
  const {
    loadServiceAdminDashboard,
    dashboardData,
    workspaceNameList,
    loadWorkspaceName,
    setWorkspaceName,
    projectList,
    podCpuTop,
    podMemTop,
    projectCpuTop,
    projectMemTop,
    resource,
    serviceAdminMonitoring,
    loadProjectName,
    setProjectNameInMonitoring,
    deploymentMetrics,
    podMetrics,
    jobMetrics,
    volumeMetrics,
    resourceMetricData,
  } = serviceAdminDashboardStore;

  const cronjob = resourceMetricData.filter(
    (type) => type.metricType === "cronjob_count"
  );
  const cronjobMetrics = cronjob.map((item) => item.metrics[0]);

  // const test = resourceMetricData.filter(
  //   (type) => type.metricType === "cronjob_count"
  // );
  // console.log(test.map((item) => item.metrics));

  // const cronjobCnt = resourceMetricData.filter(
  //   (type) => type.metricType === "cronjob_count"
  // );

  // const daemonsetCnt = resourceMetricData.filter(
  //   (type) => type.metricType === "daemonset_count"
  // );

  // const jobCnt = resourceMetricData.filter(
  //   (type) => type.metricType === "job_count"
  // );

  const { lastTime, interval } = monitoringStore;

  useEffect(() => {
    loadWorkspaceName();
    loadServiceAdminDashboard(setWorkspaceName);
    loadProjectName();
    serviceAdminMonitoring();
  }, []);

  const currentPageTitle = Title.ServiceAdminDashboard;

  const onChange = ({ target: { name, value } }) => {
    if (name === "workspace") {
      setWorkspaceName(value);
      loadServiceAdminDashboard(value);
    }
    if (name === "projectName") {
      setProjectNameInMonitoring(value);
      serviceAdminMonitoring(
        value,
        unixStartTime(60),
        unixCurrentTime(),
        stepConverter(5)
      );
    }
  };

  const [toggleProject, setToggleProject] = useState(false);
  const clickToggleProject = (e) => {
    setToggleProject((current) => !current);
  };

  const [togglePod, setTogglePod] = useState(false);
  const clickTogglePod = (e) => {
    setTogglePod((current) => !current);
  };

  // const searchMetrics = (MetricList, name) => {
  //   let metrics = [];
  //   console.log(MetricList);
  //   if (MetricList?.length === 0) {
  //     for (
  //       let index = unixStartTime(lastTime.value);
  //       index < unixCurrentTime();
  //       index = index + 60 * interval.value
  //     ) {
  //       const tempMetrics = {
  //         time: unixToTime(index),
  //         value: 0,
  //       };
  //       metrics.push(tempMetrics);
  //       console.log(metrics);
  //     }
  //   } else {
  //     MetricList?.forEach((element) => {
  //       const tempMetrics = {
  //         x: unixToTime(element[0]),
  //         y: parseInt(element[1]),
  //       };
  //       metrics.push(tempMetrics);
  //     });
  //     const data = {
  //       name: name,
  //       data: metrics,
  //     };
  //     return data;
  //   }
  // };

  const searchMetrics = (MetricList, name) => {
    let metrics = [];
    if (MetricList?.length > 0) {
      MetricList.forEach((element) => {
        const tempMetrics = {
          x: unixToTime(element[0]),
          y: parseInt(element[1]),
        };
        metrics.push(tempMetrics);
      });
      const data = {
        name: name,
        data: metrics,
      };
      return data;
    } else {
      const tempMetrics = {
        x: unixToTime(new Date()),
        y: 0,
      };
      metrics.push(tempMetrics);
      console.log(metrics);
      const data = {
        name: name,
        data: [],
      };
      console.log(data);
      return data;
    }
  };

  const podCpuTop5 = () => {
    let arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(
        <li>
          <span>{i + 1}</span>
          {podCpuTop[i] ? podCpuTop[i]["name"] : "-"}
        </li>
      );
    }
    return arr;
  };

  const projectMemTop5 = () => {
    let arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(
        <li>
          <span>{i + 1}</span>
          {projectMemTop[i] ? projectMemTop[i]["name"] : "-"}
        </li>
      );
    }
    return arr;
  };

  const projectCpuTop5 = () => {
    let arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(
        <li>
          <span>{i + 1}</span>
          {projectCpuTop[i] ? projectCpuTop[i]["name"] : "-"}
        </li>
      );
    }
    return arr;
  };

  const podMemTop5 = () => {
    let arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(
        <li>
          <span>{i + 1}</span>
          {podMemTop[i] ? podMemTop[i]["name"] : "-"}
        </li>
      );
    }
    return arr;
  };

  return (
    <Layout currentPageTitle={currentPageTitle}>
      <ServiceAdminWrap>
        <div className="ServiceSummaryWrap">
          <div className="ServiceSummary Workspace">
            <div className="SummaryCountTitle">전체 워크스페이스 개수</div>
            <div className="SummaryCount">{dashboardData.workspaceCnt}</div>
          </div>

          <div className="ServiceSummary Project">
            <div className="SummaryCountTitle">전체 프로젝트 개수</div>
            <div className="SummaryCount">{dashboardData.projectCnt}</div>
          </div>
        </div>

        <PanelBox className="panel_summary">
          <div className="monitoringWrap">
            <div className="monitoringTitle">
              Overview
              <div className="ServiceSelect">
                <FormControl className="form_serviceAdmin">
                  <select name="workspace" onChange={onChange}>
                    {workspaceNameList.map((name) => (
                      <option value={name}>{name}</option>
                    ))}
                  </select>
                  {/* <Select inputProps={{ "aria-label": "Without label" }}>
                    <MenuItem value="selct">SELECT</MenuItem>
                  </Select> */}
                </FormControl>
              </div>
            </div>
          </div>
          <div className="ServiceCircleWrap">
            <div className="service_circle_inner">
              <div className="service_circle">
                <span className="count">
                  {projectList ? projectList?.length : 0}
                </span>
                <div className="title">Project</div>
              </div>

              <div className="service_circle">
                <span className="count">{Object.values(resource)[1]}</span>
                <div className="title">Deployment</div>
              </div>

              <div className="service_circle">
                <span className="count">{Object.values(resource)[2]}</span>
                <div className="title">Daemonset</div>
              </div>

              <div className="service_circle">
                <span className="count">{Object.values(resource)[3]}</span>
                <div className="title">Statefulset</div>
              </div>

              <div className="service_circle">
                <span className="count">{Object.values(resource)[4]}</span>
                <div className="title">Pod</div>
              </div>

              <div className="service_circle">
                <span className="count">{Object.values(resource)[5]}</span>
                <div className="title">Service</div>
              </div>

              <div className="service_circle">
                <span className="count">{Object.values(resource)[6]}</span>
                <div className="title">Cronjob</div>
              </div>

              <div className="service_circle">
                <span className="count">{Object.values(resource)[7]}</span>
                <div className="title">Job</div>
              </div>

              <div className="service_circle">
                <span className="count">{Object.values(resource)[8]}</span>
                <div className="title">Volume</div>
              </div>
            </div>
          </div>

          <>
            <div className="ServiceRecentWrap">
              {/* <div className="ServiceRecentTitle"> */}
              {toggleProject ? (
                <div className="ServiceRecentInner">
                  <ButtonStyle
                    variant="contained"
                    onClick={clickToggleProject}
                    toggle={toggleProject}
                  >
                    Project CPU Top 5
                  </ButtonStyle>
                  {/* </div> */}
                  <div className="ServiceRecentListWrap">
                    <ul>{projectCpuTop5()}</ul>
                  </div>
                </div>
              ) : (
                <div className="ServiceRecentInner">
                  <ButtonStyle
                    variant="contained"
                    onClick={clickToggleProject}
                    toggle={toggleProject}
                  >
                    Project Memory Top 5
                  </ButtonStyle>
                  <div className="ServiceRecentListWrap">
                    <ul>{projectMemTop5()}</ul>
                  </div>
                </div>
              )}
              {togglePod ? (
                <div className="ServiceRecentInner">
                  <ButtonStyle
                    variant="contained"
                    onClick={clickTogglePod}
                    toggle={togglePod}
                  >
                    Pod CPU Top 5
                  </ButtonStyle>
                  <div className="ServiceRecentListWrap">
                    <ul>{podCpuTop5()}</ul>
                  </div>
                </div>
              ) : (
                <div className="ServiceRecentInner">
                  <ButtonStyle
                    variant="contained"
                    onClick={clickTogglePod}
                    toggle={togglePod}
                  >
                    Pod Memory Top 5
                  </ButtonStyle>
                  <div className="ServiceRecentListWrap">
                    <ul>{podMemTop5()}</ul>
                  </div>
                </div>
              )}
            </div>
          </>
        </PanelBox>

        <PanelBox className="panel_summary">
          <div className="monitoringWrap">
            <div className="monitoringTitle">
              Monitoring
              <div className="ServiceSelect">
                <FormControl className="form_serviceAdmin">
                  <select name="projectName" onChange={onChange}>
                    {Object.values(projectList).map((val) => (
                      <option value={val.projectName}>{val.projectName}</option>
                    ))}
                  </select>
                </FormControl>
              </div>
            </div>
            <div className="monitoringInner">
              <div className="monitoringBox">
                <div className="monitoringBoxTitle">Workspace 총 개수</div>
                <div className="monitoringBoxCont">
                  <ServiceAdminChart
                    seriesData={
                      searchMetrics([cronjob, "cronjob"])
                      // searchMetrics(
                      //   resourceMetricData.filter(
                      //     (type) => type.metricType === "daemonset_count"
                      //   ),
                      //   "daemonset"
                      // ),
                      // searchMetrics(
                      //   resourceMetricData.filter(
                      //     (type) => type.metricType === "deployment_count"
                      //   ),
                      //   "deployment"
                      // ),
                      // searchMetrics(
                      //   resourceMetricData.filter(
                      //     (type) => type.metricType === "job_count"
                      //   ),
                      //   "job"
                      // ),
                      // searchMetrics(
                      //   resourceMetricData.filter(
                      //     (type) => type.metricType === "service_count"
                      //   ),
                      //   "service"
                      // ),
                      // searchMetrics(
                      //   resourceMetricData.filter(
                      //     (type) => type.metricType === "statefulset_count"
                      //   ),
                      //   "statefulset"
                      // ),
                    }
                  />
                </div>
              </div>

              <div className="monitoringBox">
                <div className="monitoringBoxTitle">Pod 총 개수</div>
                <div className="monitoringBoxCont">
                  <ServiceAdminChart
                  // seriesData={[searchMetrics(podMetrics, "pod")]}
                  />
                </div>
              </div>

              <div className="monitoringBox">
                <div className="monitoringBoxTitle">Volume 총 개수</div>
                <div className="monitoringBoxCont">
                  <ServiceAdminChart
                  // seriesData={[searchMetrics(volumeMetrics, "volume")]}
                  />
                </div>
              </div>
            </div>
          </div>
        </PanelBox>
      </ServiceAdminWrap>
    </Layout>
  );
});
export default ServiceAdminDashboard;
