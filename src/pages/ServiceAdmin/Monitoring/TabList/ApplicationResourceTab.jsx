import React, { useState, useEffect, PureComponent } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { PanelBoxM } from "@/components/styles/PanelBoxM";
import { AppAreaChart } from "./ApplicationResourceChart";
import {
  CCreateButton,
  CSelectButton,
  CSelectButtonM,
} from "@/components/buttons";
import { observer } from "mobx-react";
import moment from "moment";
import monitoringStore from "@/store/Monitoring";
import {
  stepConverter,
  unixCurrentTime,
  unixStartTime,
  combinationMetrics,
  LastTimeList,
  IntervalList,
} from "@/pages/Gedge/Monitoring/Utils/MetricsVariableFormatter";

import {
  ClusterMetricTypes,
  TargetTypes,
  AppMetricValues,
} from "@/pages/Gedge/Monitoring/Utils/MetricsVariables";

const ApplicationResource = observer(() => {
  const [tabvalue, setTabvalue] = useState(0);
  const [open, setOpen] = useState(false);
  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const {
    clusterName,
    clusterNames,
    lastTime,
    interval,
    setLastTime,
    setInterval,
    setClusterName,
    loadAllMetrics,
    loadClusterNames,
    loadAppMetrics,
  } = monitoringStore;

  const clusterNameActionList = clusterNames.map((item) => {
    return {
      name: item,
      onClick: () => {
        setClusterName(item);
        calledMetrics();
      },
    };
  });

  const lastTimeActionList = LastTimeList.map((item) => {
    return {
      name: item.name,
      onClick: () => {
        setLastTime(item);
        calledMetrics();
      },
    };
  });

  const intervalTimeActionList = IntervalList.map((item) => {
    return {
      name: item.name,
      onClick: () => {
        setInterval(item);
        calledMetrics();
      },
    };
  });

  const calledMetrics = () => {
    calledClusterMetrics();
    calledAppMetrics();
  };

  const calledClusterMetrics = () => {
    loadAllMetrics(
      TargetTypes.CLUSTER,
      unixCurrentTime(),
      combinationMetrics(
        ClusterMetricTypes.CPU_USAGE,
        ClusterMetricTypes.MEMORY_USAGE
      )
    );
  };

  const calledAppMetrics = () => {
    loadAppMetrics(
      TargetTypes.APPLICATION,
      unixCurrentTime(),
      combinationMetrics(AppMetricValues.ALL)
    );
  };

  useEffect(() => {
    if (clusterName === "") {
      loadClusterNames(calledMetrics);
    } else {
      calledMetrics();
    }
  }, []);

  return (
    <PanelBoxM>
      <div className="panelTitBar panelTitBar_clear">
        <div className="tit">
          <span style={{ marginRight: "10px", color: "white " }}>
            Select Cluster
          </span>
          <CSelectButtonM
            className="none_transform"
            items={clusterNameActionList}
          >
            {clusterName}
          </CSelectButtonM>
        </div>
        <div className="date">{moment(new Date()).format("YYYY-MM-DD")}</div>
      </div>
      <PanelBox
        className="panel_graph"
        style={{ height: "100%", margin: "5px 0 5px 0" }}
      >
        <div className="panelTitBar panelTitBar_clear">
          <div className="tit" style={{ color: "white " }}>
            <span style={{ marginRight: "10px", color: "white " }}>Last :</span>
            <CSelectButtonM
              className="none_transform"
              items={lastTimeActionList}
            >
              {lastTime.name}
            </CSelectButtonM>
            <span
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                color: "white ",
              }}
            >
              Interval :
            </span>
            <CSelectButtonM
              className="none_transform"
              items={intervalTimeActionList}
            >
              {interval.name}
            </CSelectButtonM>
            <div></div>
          </div>
        </div>
        <div className="tabN-chart-div-area">
          <PanelBox className="panel_graph tabN-chart-area">
            <div className="tab2-chart-area">
              <div className="tab2-chart">
                <AppAreaChart value={ClusterMetricTypes.CPU_USAGE} />
              </div>
            </div>
          </PanelBox>
          <PanelBox className="panel_graph tabN-chart-area">
            <div className="tab2-chart-area">
              <div className="tab2-chart">
                <AppAreaChart value={ClusterMetricTypes.MEMORY_USAGE} />
              </div>
            </div>
          </PanelBox>
        </div>
      </PanelBox>
      <PanelBox
        className="panel_graph"
        style={{ height: "100%", margin: "5px 0 5px 0" }}
      >
        <div className="panelTitBar panelTitBar_clear">
          <div className="tit" style={{ color: "white " }}>
            <span style={{ marginRight: "10px", color: "white " }}>
              Application Resource
            </span>
          </div>
        </div>
        <div className="tabN-chart-div-area">
          <PanelBox className="panel_graph tabN-chart-area">
            <div className="tab2-chart-area">
              <div className="tab2-chart">
                <AppAreaChart value={AppMetricValues.POD_COUNT} />
              </div>
            </div>
          </PanelBox>
          <PanelBox className="panel_graph tabN-chart-area">
            <div className="tab2-chart-area">
              <div className="tab2-chart">
                <AppAreaChart value={AppMetricValues.SERVICE_COUNT} />
              </div>
            </div>
          </PanelBox>
        </div>
        <div className="tabN-chart-div-area">
          <PanelBox className="panel_graph tabN-chart-area">
            <div className="tab2-chart-area">
              <div className="tab2-chart">
                <AppAreaChart value={AppMetricValues.DEVPLOYMENT_COUNT} />
              </div>
            </div>
          </PanelBox>
          <PanelBox className="panel_graph tabN-chart-area">
            <div className="tab2-chart-area">
              <div className="tab2-chart">
                <AppAreaChart value={AppMetricValues.CRONJOB_COUNT} />
              </div>
            </div>
          </PanelBox>
        </div>
        <div className="tabN-chart-div-area">
          <PanelBox className="panel_graph tabN-chart-area">
            <div className="tab2-chart-area">
              <div className="tab2-chart">
                <AppAreaChart value={AppMetricValues.PV_COUNT} />
              </div>
            </div>
          </PanelBox>
          <PanelBox className="panel_graph tabN-chart-area">
            <div className="tab2-chart-area">
              <div className="tab2-chart">
                <AppAreaChart value={AppMetricValues.PVC_COUNT} />
              </div>
            </div>
          </PanelBox>
        </div>
        <div className="tabN-chart-div-area">
          <PanelBox className="panel_graph tabN-chart-area">
            <div className="tab2-chart-area">
              <div className="tab2-chart">
                <AppAreaChart value={AppMetricValues.NAMESPACE_COUNT} />
              </div>
            </div>
          </PanelBox>
        </div>
      </PanelBox>
    </PanelBoxM>
  );
});
export default ApplicationResource;
