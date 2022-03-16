import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class Cluster {
  clusterList = [];
  clusterDetail = {};
  totalElements = 0;

  clusters = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadClusterList = async (type = "") => {
    await axios
      .get(`${SERVER_URL}/clusters`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          const list =
            type === ""
              ? res.data.data
              : res.data.data.filter((item) => item.clusterType === type);
          this.clusterList = list;
          this.clusterDetail = list[0];
          this.totalElements = list.length;
        });
      });
  };

  loadCluster = async (name) => {
    await axios
      .get(`${SERVER_URL}/clusters/${name}`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          this.clusterDetail = {
            master: res.data.master,
            worker: res.data.worker,
          };
        });
      });
  };

  loadClusterInProject = async (project) => {
    await axios
      .get(`http://101.79.1.173:8010/clusterInfo?project=${project}`)
      .then((res) => runInAction(() => (this.clusters = res.data.data)));
  };

  setDetail = (num) => {
    runInAction(() => {
      this.clusterDetail = this.clusterList.find(
        (item) => item.clusterNum === num
      );
    });
  };
}

const clusterStore = new Cluster();
export default clusterStore;
