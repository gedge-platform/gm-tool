import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { BASIC_AUTH, LOCAL_CLUSTER_URL, MONITORING_URL } from "../config";
import {
    ClusterMetricTypes,
    TargetTypes,
} from "@/pages/Gedge/Monitoring/Utils/MetricsVariables";

import { unixToTime } from "@/pages/Gedge/Monitoring/Utils/MetricsVariableFormatter";
import { unixCurrentTime } from "../pages/Gedge/Monitoring/Utils/MetricsVariableFormatter";
class Monitoring {
    clusterName = "";
    clusterNames = [];
    clusterMetrics = [];
    coPieCPU = [];
    coPieMemory = [];
    coPieDisk = [];
    coPiePod = [];
    coPieAPILatency = [];
    coPieAPIRate = [];
    coPieSchedulerAttempts = [];
    coPieSchedulerRate = [];
    prAllMetrics = {};

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

    checkedNullValue = (res) => {
        console.log(res.data.items.length);
    };

    convertResponseToMonit = (res) => {
        const array = [];
        runInAction(() => {
            Object.entries(res.data?.items).map(([key, value]) => {
                const clusterMetric = {
                    metricType: "",
                    metrics: [],
                };
                clusterMetric.metricType = key;

                if (value.length === 0) {
                    clusterMetric.metrics.push({
                        time: unixToTime(unixCurrentTime()),
                        value: 0,
                    });
                    array.push(clusterMetric);
                    return array;
                }

                value[0]?.values.forEach((element) => {
                    clusterMetric.metrics.push({
                        time: unixToTime(element[0]),
                        value: element[1],
                    });
                });
                array.push(clusterMetric);
            });
        });
        return array;
    };

    loadClusterNames = async (callback) => {
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
            })
            .then(() => callback());
    };

    loadCoCPU = async (target, start, end, step, metricFilter, ...options) => {
        await axios
            .get(
                this.getMonitURL(
                    target,
                    start,
                    end,
                    step,
                    this.clusterName,
                    metricFilter,
                    options
                ),
                { auth: BASIC_AUTH }
            )
            .then((res) => {
                this.coPieCPU = this.convertResponseToMonit(res);
            });
    };

    loadCoMemory = async (
        target,
        start,
        end,
        step,
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
                    this.clusterName,
                    metricFilter,
                    options
                ),
                { auth: BASIC_AUTH }
            )
            .then((res) => {
                this.coPieMemory = this.convertResponseToMonit(res);
            });
    };

    loadCoDisk = async (target, start, end, step, metricFilter, ...options) => {
        await axios
            .get(
                this.getMonitURL(
                    target,
                    start,
                    end,
                    step,
                    this.clusterName,
                    metricFilter,
                    options
                ),
                { auth: BASIC_AUTH }
            )
            .then((res) => {
                runInAction(() => {
                    this.coPieDisk = this.convertResponseToMonit(res);
                });
            });
    };

    loadCoPod = async (target, start, end, step, metricFilter, ...options) => {
        await axios
            .get(
                this.getMonitURL(
                    target,
                    start,
                    end,
                    step,
                    this.clusterName,
                    metricFilter,
                    options
                ),
                { auth: BASIC_AUTH }
            )
            .then((res) => {
                runInAction(() => {
                    this.coPiePod = this.convertResponseToMonit(res);
                });
            });
    };

    loadCoAPILatency = async (
        target,
        start,
        end,
        step,
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
                    this.clusterName,
                    metricFilter,
                    options
                ),
                { auth: BASIC_AUTH }
            )
            .then((res) => {
                runInAction(() => {
                    this.coPieAPILatency = this.convertResponseToMonit(res);
                });
            });
    };

    loadCoAPIRate = async (
        target,
        start,
        end,
        step,
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
                    this.clusterName,
                    metricFilter,
                    options
                ),
                { auth: BASIC_AUTH }
            )
            .then((res) => {
                runInAction(() => {
                    this.coPieAPIRate = this.convertResponseToMonit(res);
                });
            });
    };

    loadCoSchedulerAttempts = async (
        target,
        start,
        end,
        step,
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
                    this.clusterName,
                    metricFilter,
                    options
                ),
                { auth: BASIC_AUTH }
            )
            .then((res) => {
                runInAction(() => {
                    this.coPieSchedulerAttempts =
                        this.convertResponseToMonit(res);
                });
            });
    };

    loadCoSchedulerRate = async (
        target,
        start,
        end,
        step,
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
                    this.clusterName,
                    metricFilter,
                    options
                ),
                { auth: BASIC_AUTH }
            )
            .then((res) => {
                runInAction(() => {
                    this.coPieSchedulerRate = this.convertResponseToMonit(res);
                });
            });
    };

    loadPyAllMetrics = async (
        target,
        start,
        end,
        step,
        metricFilter,
        ...option
    ) => {
        await axios
            .get(
                this.getMonitURL(
                    target,
                    start,
                    end,
                    step,
                    this.clusterName,
                    metricFilter,
                    option
                ),
                {
                    auth: BASIC_AUTH,
                }
            )
            .then((res) => {
                runInAction(() => {
                    this.prAllMetrics = res.data.items;
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
