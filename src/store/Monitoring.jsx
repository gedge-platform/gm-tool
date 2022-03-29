import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { BASIC_AUTH, LOCAL_CLUSTER_URL, MONITORING_URL } from "../config";
import {
    ClusterMetricTypes,
    TargetTypes,
} from "@/pages/Gedge/Monitoring/Utils/MetricsVariables";

import { unixToTime } from "@/pages/Gedge/Monitoring/Utils/MetricsVariableFormatter";
class Monitoring {
    clusterName = "";
    clusterNames = [];
    clusterMetrics = [];
    coPieCPU = [];
    coPieMemory = [];
    coPieDisk = [];
    coPiePod = [];

    constructor() {
        makeAutoObservable(this);
    }

    setClusterName = (selectName) => {
        this.clusterName = selectName;
    };
    getMonitURL = (
        target,
        start,
        end,
        step,
        clusterFilter,
        metricFilter,
        options
    ) => {
        switch (target) {
            case TargetTypes.CLUSTER:
            case TargetTypes.APPLICATION:
            case TargetTypes.NODE:
                return `${MONITORING_URL}/${target}?start=${start}&end=${end}&step=${step}&cluster_filter=${clusterFilter}&metric_filter=${metricFilter}`;
            case TargetTypes.NAMESPACE:
                return `${MONITORING_URL}/pod?start=${start}&end=${end}&step=${step}&cluster_filter=${clusterFilter}&namespace_filter=${options[0]}&metric_filter=${metricFilter}`;
            case TargetTypes.POD:
                return `${MONITORING_URL}/pod?start=${start}&end=${end}&step=${step}&cluster_filter=${clusterFilter}&namespace_filter=${options[0]}&pod_filter=${options[1]}&metric_filter=${metricFilter}`;
            default:
                break;
        }
    };

    // convertResponseToMonit = (res, array) => {
    //     runInAction(() => {
    //         array = [];
    //         Object.entries(res.data?.items).map(([key, value]) => {
    //             const clusterMetric = {
    //                 metricType: "",
    //                 metrics: [],
    //             };
    //             clusterMetric.metricType = key;
    //             value[0]?.values.forEach((element) => {
    //                 clusterMetric.metrics.push({
    //                     time: unixToTime(element[0]),
    //                     value: element[1],
    //                 });
    //             });
    //             array.push(clusterMetric);
    //         });
    //     });
    // };

    loadClusterNames = async () => {
        await axios
            .get(`${LOCAL_CLUSTER_URL}/clusters`, {
                auth: BASIC_AUTH,
            })
            .then((res) => {
                runInAction(() => {
                    this.clusterNames = res.data?.data.map(
                        (item) => item.clusterName
                    );
                    this.clusterName = this.clusterNames[0];
                });
            });
    };

    loadCoCPU = async (
        target,
        start,
        end,
        step,
        clusterFilter,
        metricFilter,
        ...options
    ) => {
        await axios
            .get(
                this.getMonitURL(
                    target,
                    start,
                    end,
                    step,
                    clusterFilter,
                    metricFilter,
                    options
                ),
                { auth: BASIC_AUTH }
            )
            .then((res) => {
                runInAction(() => {
                    this.coPieCPU = [];
                    Object.entries(res.data?.items).map(([key, value]) => {
                        const clusterMetric = {
                            metricType: "",
                            metrics: [],
                        };
                        clusterMetric.metricType = key;
                        value[0]?.values.forEach((element) => {
                            clusterMetric.metrics.push({
                                time: unixToTime(element[0]),
                                value: element[1],
                            });
                        });
                        this.coPieCPU.push(clusterMetric);
                    });
                });
            });
    };

    loadCoMemory = async (
        target,
        start,
        end,
        step,
        clusterFilter,
        metricFilter,
        ...options
    ) => {
        await axios
            .get(
                this.getMonitURL(
                    target,
                    start,
                    end,
                    step,
                    clusterFilter,
                    metricFilter,
                    options
                ),
                { auth: BASIC_AUTH }
            )
            .then((res) => {
                runInAction(() => {
                    this.coPieMemory = [];
                    Object.entries(res.data?.items).map(([key, value]) => {
                        const clusterMetric = {
                            metricType: "",
                            metrics: [],
                        };
                        clusterMetric.metricType = key;
                        value[0]?.values.forEach((element) => {
                            clusterMetric.metrics.push({
                                time: unixToTime(element[0]),
                                value: element[1],
                            });
                        });
                        this.coPieMemory.push(clusterMetric);
                    });
                });
            });
    };

    loadCoDisk = async (
        target,
        start,
        end,
        step,
        clusterFilter,
        metricFilter,
        ...options
    ) => {
        await axios
            .get(
                this.getMonitURL(
                    target,
                    start,
                    end,
                    step,
                    clusterFilter,
                    metricFilter,
                    options
                ),
                { auth: BASIC_AUTH }
            )
            .then((res) => {
                runInAction(() => {
                    this.coPieDisk = [];
                    Object.entries(res.data?.items).map(([key, value]) => {
                        const clusterMetric = {
                            metricType: "",
                            metrics: [],
                        };
                        clusterMetric.metricType = key;
                        value[0]?.values.forEach((element) => {
                            clusterMetric.metrics.push({
                                time: unixToTime(element[0]),
                                value: element[1],
                            });
                        });
                        this.coPieDisk.push(clusterMetric);
                    });
                });
            });
    };

    loadCoPod = async (
        target,
        start,
        end,
        step,
        clusterFilter,
        metricFilter,
        ...options
    ) => {
        await axios
            .get(
                this.getMonitURL(
                    target,
                    start,
                    end,
                    step,
                    clusterFilter,
                    metricFilter,
                    options
                ),
                { auth: BASIC_AUTH }
            )
            .then((res) => {
                runInAction(() => {
                    this.coPiePod = [];
                    Object.entries(res.data?.items).map(([key, value]) => {
                        const clusterMetric = {
                            metricType: "",
                            metrics: [],
                        };
                        clusterMetric.metricType = key;
                        value[0]?.values.forEach((element) => {
                            clusterMetric.metrics.push({
                                time: unixToTime(element[0]),
                                value: element[1],
                            });
                        });
                        this.coPiePod.push(clusterMetric);
                    });
                });
            });
    };

    // loadMetrics = async (
    //     target,
    //     start,
    //     end,
    //     step,
    //     clusterFilter,
    //     metricFilter,
    //     ...options
    // ) => {
    //     await axios
    //         .get(
    //             this.getMonitURL(
    //                 target,
    //                 start,
    //                 end,
    //                 step,
    //                 clusterFilter,
    //                 metricFilter,
    //                 options
    //             ),
    //             { auth: BASIC_AUTH }
    //         )
    //         .then((res) => {
    //             this.convertResponseToMonit(res);
    //         });
    // };
}

const monitoringStore = new Monitoring();
export default monitoringStore;
