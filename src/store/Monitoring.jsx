import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { BASIC_AUTH, LOCAL_CLUSTER_URL, MONITORING_URL } from "../config";
import {
    ClusterMetricTypes,
    TargetTypes,
} from "@/pages/Gedge/Monitoring/Utils/MetricsVariables";

import { unixToTime } from "@/pages/Gedge/Monitoring/Utils/MetricsVariableFormatter";
class Monitoring {
    clusterNames = [];
    clusterMetrics = [];

    constructor() {
        makeAutoObservable(this);
    }

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

    convertResponseToMonit = (res) => {
        runInAction(() => {
            this.clusterMetrics = [];
            Object.entries(res.data?.items).map(([key, value]) => {
                const clusterMetric = {
                    metricType: "",
                    metrics: [],
                };
                clusterMetric.metricType = key;
                value[0]?.values.forEach((element) => {
                    clusterMetric.metrics.push({
                        time: unixToTime(element[0]),
                        // time: element[0],
                        value: element[1],
                    });
                });
                this.clusterMetrics.push(clusterMetric);
            });
        });
    };

    loadClusterNames = async () => {
        await axios
            .get(`${LOCAL_CLUSTER_URL}/clusters`, {
                auth: BASIC_AUTH,
            })
            .then((res) => {
                runInAction(() => {
                    this.clusterNames = res.data.data.map(
                        (item) => item.clusterName
                    );
                });
            });
    };

    loadMetrics = async (
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
                this.convertResponseToMonit(res);
            });
    };
}

const monitoringStore = new Monitoring();
export default monitoringStore;
