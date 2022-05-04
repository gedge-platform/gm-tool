import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class DaemonSet {
  daemonSetList = [];
  daemonSetDetail = {
    status: {},
    strategy: {},
  };
  totalElements = 0;
  label = {};
  annotations = {};
  events = [
    {
      kind: "",
      name: "",
      namespace: "",
      cluster: "",
      message: "",
      reason: "",
      type: "",
      eventTime: "",
    },
  ];
  pods = [
    {
      name: "",
      status: "",
      node: "",
      podIP: "",
      restart: 0,
    },
  ];
  services = {
    name: "",
    port: 0,
  };

  containers = [{}];

  constructor() {
    makeAutoObservable(this);
  }

  loadDaemonSetList = async (type) => {
    await axios
      .get(`${SERVER_URL}/daemonsets`, {
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
        `${SERVER_URL}/daemonsets/${name}?cluster=${cluster}&project=${project}`,
        {
          auth: BASIC_AUTH,
        }
      )
      .then(({ data: { data, involvesData } }) => {
        runInAction(() => {
          this.daemonSetDetail = data;
          this.involvesData = involvesData;
          this.pods = involvesData.pods;
          this.containers = data.containers;
          this.services = involvesData.services;
          this.label = data.label;
          this.annotations = data.annotations;
          if (data.events !== null) {
            this.events = data.events;
          } else {
            this.events = null;
          }
        });
      });
  };
}

const daemonSetStore = new DaemonSet();
export default daemonSetStore;
