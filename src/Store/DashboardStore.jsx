import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { SERVER_URL_3, SERVER_URL_4 } from "@/config.jsx";
import { getItem } from "../utils/sessionStorageFn";

class DashboardStore {
  network = [29, 11];
  users = [40, 22];
  contracts = [21, 5];

  master = [1, 1];
  worker = [1, 1];
  total = [1, 1];

  cpu = [0.63, 7.37];
  memory = [5, 11];
  storage = [22, 78];
  pod = [3, 37];

  networkData = [];
  contractData = [20, 60, 40];
  userData = [40, 40, 50];

  networkList = [];
  selectNetwork = {};

  constructor() {
    makeAutoObservable(this);
    // this.CallApi = new CallApi();
  }

  // async getWorkspaceList(param) {
  //     runInAction(() => {
  //         this.workspaceList = apiList.data;
  //         // this.dataCheck = false
  //     });
  // }

  loadNetworkList = async () => {
    await axios
      .get(`${SERVER_URL_3}/namespaces`, {
        auth: getItem("auth"),
      })
      .then(({ data: { data } }) =>
        runInAction(() => {
          this.networkList = data;
          this.selectNetwork = data[0];
        })
      )
      .catch((e) => console.log(e));
  };

  loadMonitoringInfo = async () => {
    await axios
      .get(`${SERVER_URL_4}/monitoring`, {
        auth: getItem("auth"),
      })
      .then(
        ({
          data: {
            items: {
              cpu_total,
              cpu_usage,
              disk_total,
              disk_usage,
              memory_total,
              memory_usage,
              pod_running,
              pod_quota,
            },
          },
        }) => {
          runInAction(() => {
            this.cpu = [
              parseInt(cpu_usage[0].values[0][1]),
              cpu_total[0].value[1],
            ];
            this.memory = [memory_usage[0].value[1], memory_total[0].value[1]];
            this.storage = [disk_usage[0].value[1], disk_total[0].value[1]];
            this.pod = [pod_running[0].value[1], pod_quota[0].value[1]];
          });
        }
      )
      .catch((e) => console.log(e));
  };

  loadClusterInfo = async () => {
    await axios
      .get(`${SERVER_URL_3}/dashboard/clusterinfo`, {
        auth: getItem("auth"),
      })
      .then(
        ({
          data: {
            data: {
              masterCnt,
              masterRunning,
              workerCnt,
              workerRunning,
              totalCnt,
              totalRunning,
            },
          },
        }) => {
          runInAction(() => {
            this.master = [parseInt(masterRunning), parseInt(masterCnt)];
            this.worker = [parseInt(workerRunning), parseInt(workerCnt)];
            this.total = [parseInt(totalRunning), parseInt(totalCnt)];
          });
        }
      )
      .catch((e) => console.log(e));
  };

  setNetwork = (name) => {
    runInAction(() => {
      this.selectNetwork = this.networkList.find((net) => net.name === name);
    });
  };
}
const dashboardStore = new DashboardStore();
export default dashboardStore;
