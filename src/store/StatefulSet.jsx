import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL2 } from "../config";

class StatefulSet {
  statefulSetList = [];
  statefulSetDetail = {};
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
  totalElements = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadStatefulSetList = async (type) => {
    await axios
      .get(`${SERVER_URL2}/statefulsets`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          const list = res.data.data.filter(
            (item) => item.projectType === type
          );
          this.statefulSetList = list;
          // this.statefulSetDetail = list[0];
          this.totalElements = list.length;
        });
      });
    this.loadStatefulSetDetail(
      this.statefulSetList[0].name,
      this.statefulSetList[0].cluster,
      this.statefulSetList[0].project
    );
  };

  loadStatefulSetDetail = async (name, cluster, project) => {
    await axios
      .get(
        `${SERVER_URL2}/statefulsets/${name}?cluster=${cluster}&project=${project}`,
        {
          auth: BASIC_AUTH,
        }
      )
      .then((res) => {
        runInAction(() => {
          this.statefulSetDetail = res.data.data;
          this.label = res.data.data.label;
          this.annotations = res.data.data.annotations;
          if (res.data.data.events !== null) {
            this.events = res.data.data.events;
          } else {
            this.events = null;
          }
        });
      });
  };
}

const statefulSetStore = new StatefulSet();
export default statefulSetStore;
