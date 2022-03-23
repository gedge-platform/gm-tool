import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL2 } from "../config";

class DaemonSet {
  daemonSetList = [];
  daemonSetDetail = {
    NodeSelector: {},
    status: {},
    strategy: {},
    containers: {},
    label: {},
    events: "",
    annotations: {},
  };
  totalElements = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadDaemonSetList = async (type) => {
    await axios
      .get(`${SERVER_URL2}/daemonsets`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          const list = res.data.data.filter(
            (item) => item.projectType === type
          );
          this.daemonSetList = list;
          // this.daemonSetDetail = list[0];
          this.totalElements = list.length;
        });
      });
    this.loadDaemonSetDetail(
      this.daemonSetList[0].name,
      this.daemonSetList[0].cluster,
      this.daemonSetList[0].project
    );
  };

  loadDaemonSetDetail = async (name, cluster, project) => {
    await axios
      .get(
        `${SERVER_URL2}/daemonsets/${name}?cluster=${cluster}&project=${project}`,
        {
          auth: BASIC_AUTH,
        }
      )
      .then((res) => {
        runInAction(() => {
          this.daemonSetDetail = res.data.data;
          this.daemonSetMetadata = {};

          Object.entries(this.daemonSetDetail?.label).map(([key, value]) => {
            this.daemonSetMetadata[key] = value;
          });

          Object.entries(this.daemonSetDetail?.annotations).map(
            ([key, value]) => {
              this.daemonSetMetadata[key] = value;
            }
          );
        });
      });
  };
}

const daemonSetStore = new DaemonSet();
export default daemonSetStore;
