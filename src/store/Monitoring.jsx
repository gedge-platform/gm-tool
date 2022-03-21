import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { BASIC_AUTH, LOCAL_CLUSTER_URL, MONITORING_URL } from "../config";

class Monitoring {
    clusterNames = [];

    constructor() {
        makeAutoObservable(this);
    }

    loadClusters = async () => {
        await axios
            .get(`${LOCAL_CLUSTER_URL}/clusters`, {
                auth: BASIC_AUTH,
            })
            .then((res) => {
                runInAction(() => {
                    const list = res.data.data;
                    list.forEach((element) => {
                        Object.entries(element).map(([key, value]) => {
                            if (key === "clusterName") {
                                this.clusterNames.push(value);
                            }
                        });
                    });
                });
            });
    };

    loadClusterMetrics = async (
        start,
        end,
        step,
        clusterFilter,
        metricFilter
    ) => {
        await axios
            .get(
                `${MONITORING_URL}/cluster?start=${start}&end=${end}&step=${step}&cluster_filter=${clusterFilter}&metric_filter=${metricFilter}`,
                { auth: BASIC_AUTH }
            )
            .then((res) => {
                runInAction(() => {
                    console.log(res.data.items);
                });
            });
    };
}

const monitoringStore = new Monitoring();
export default monitoringStore;
