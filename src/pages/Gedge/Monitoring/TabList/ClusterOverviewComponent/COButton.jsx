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
} from "../MonitChart/ClusterOverviewChart";
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
import monitoringStore from "@/store/Monitoring";
import {
    stepConverter,
    unixCurrentTime,
    unixStartTime,
    combinationMetrics,
} from "../../Utils/MetricsVariableFormatter";

const COButton = observer(({ isOn }) => {
    return (
        <div className={isOn ? "on-tab1-button" : "off-tab1-button"}>
            <div className="tab1-button-circle-graph-area">
                <ChartPie />
            </div>
            <div className="tab1-button-key-value-area">
                <div className="tab1-button-key-area">CPU(Core)</div>
                <div className="tab1-button-value-area">
                    <p className="tab1-button-value-majer">
                        1.61
                        <span className="tab1-button-value-minor">/4</span>
                    </p>
                </div>
            </div>
        </div>
    );
});

export { COButton };
