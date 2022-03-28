import React, { useState, useEffect, PureComponent } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { PanelBoxM } from "@/components/styles/PanelBoxM";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter } from "@/utils/common-utils";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import {
    ChartCpuUsage,
    ChartPie,
    ChartPie2,
} from "./MonitChart/ClusterOverviewChart";
import {
    CCreateButton,
    CSelectButton,
    CSelectButtonM,
    BtnCellRenderer,
} from "@/components/buttons";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import moment from "moment";
import axios from "axios";
import styled from "styled-components";
import monitoringStore from "../../../../store/Monitoring";
import {
    stepConverter,
    unixCurrentTime,
    unixStartTime,
    combinationMetrics,
} from "../Utils/MetricsVariableFormatter";

import { ClusterMetricTypes, TargetTypes } from "../Utils/MetricsVariables";
import { COButton } from "./ClusterOverviewComponent/COButton";

const ClusterOverview = observer(() => {
    const [tabvalue, setTabvalue] = useState(0);
    const [open, setOpen] = useState(false);
    const [clusterName, setClusterName] = useState("");
    const handleTabChange = (event, newValue) => {
        setTabvalue(newValue);
    };

    const { clusterNames, clusterMetrics, loadClusterNames, loadMetrics } =
        monitoringStore;

    const clusterNameActionList = clusterNames.map((item) => {
        return {
            name: item,
            onClick: () => {
                setClusterName(item);
            },
        };
    });

    useEffect(() => {
        loadClusterNames();
        loadMetrics(
            TargetTypes.CLUSTER,
            unixStartTime(60 * 60),
            unixCurrentTime(),
            stepConverter(30),
            clusterNames[0],
            ClusterMetricTypes.CPU_USAGE
        );
    }, []);

    const a = () => {
        loadMetrics(
            TargetTypes.CLUSTER,
            unixStartTime(60 * 60),
            unixCurrentTime(),
            stepConverter(30),
            clusterNames[0],
            ClusterMetricTypes.CPU_USAGE
        );
    };

    return (
        <PanelBoxM>
            <div className="panelTitBar panelTitBar_clear">
                <div className="tit" onClick={a}>
                    <span style={{ marginRight: "10px", color: "white " }}>
                        Select Cluster
                    </span>
                    <CSelectButtonM
                        className="none_transform"
                        items={clusterNameActionList}
                    >
                        {clusterName === "" ? clusterNames[0] : clusterName}
                    </CSelectButtonM>
                </div>
                <div className="date">
                    {moment(new Date()).format("YYYY-MM-DD HH:mm")}
                </div>
            </div>
            <PanelBox
                className="panel_graph"
                style={{ height: "453px", margin: "5px 0 5px 0" }}
            >
                <div className="panelTitBar panelTitBar_clear">
                    <div className="tit" style={{ color: "white " }}>
                        Cluster Resource Usage
                    </div>
                </div>

                <div className="tab1-panel-area">
                    <div className="tab1-button-area">
                        <COButton isOn={true} />
                        <COButton isOn={false} />
                        <COButton isOn={false} />
                        <COButton isOn={false} />
                    </div>
                    <div
                        style={{
                            width: "1350px",
                            height: "375px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                width: "1340px",
                                height: "370px",
                                backgroundColor: "#141A30",
                            }}
                        >
                            <ChartCpuUsage />
                        </div>
                    </div>
                </div>
            </PanelBox>

            {/* <PanelBox className="panel_graph" style={{ height: "453px" }}>
                <div className="panelTitBar panelTitBar_clear">
                    <div className="tit" style={{ color: "white " }}>
                        Service Component Monitoring
                    </div>
                </div>
                <div className="panelCont"></div>
            </PanelBox> */}
        </PanelBoxM>
    );
});
export default ClusterOverview;
