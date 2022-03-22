import React, { useState, useEffect, PureComponent } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter } from "@/utils/common-utils";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import {
    CCreateButton,
    CSelectButton,
    BtnCellRenderer,
} from "@/components/buttons";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import moment from "moment";
import axios from "axios";
import monitoringStore from "../../../../store/Monitoring";
import {
    stepConverter,
    unixCurrentTime,
    unixStartTime,
    combinationMetrics,
} from "../Utils/MetricsVariableFormatter";

import { ClusterMetricTypes, TargetTypes } from "../Utils/MetricsVariables";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const ClusterOverview = observer(() => {
    const [tabvalue, setTabvalue] = useState(0);
    const [open, setOpen] = useState(false);
    const handleTabChange = (event, newValue) => {
        setTabvalue(newValue);
    };

    const test = (a, b, ...c) => {
        console.log(c.length);
    };

    test("abc", "b");

    const { clusterNames, loadClusterNames, loadMetrics } = monitoringStore;

    loadMetrics(
        TargetTypes.CLUSTER,
        unixStartTime(1),
        unixCurrentTime(),
        stepConverter(0.5),
        clusterNames[0],
        combinationMetrics(
            ClusterMetricTypes.CPU_TOTAL,
            ClusterMetricTypes.CPU_USAGE,
            ClusterMetricTypes.CPU_UTIL
        )
    );

    useEffect(() => {
        loadClusterNames();
    }, []);

    return <PanelBox>{clusterNames}</PanelBox>;
});
export default ClusterOverview;
