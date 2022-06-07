import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL2 } from "../config";

class StatefulSet {
  statefulSetList = [];
  statefulSetDetail = {
    name: "",
    project: "",
    cluster: "",
    status: {
      availableReplicas: 0,
      collisionCount: 0,
      currentReplicas: 0,
      currentRevision: "",
      observedGeneration: 0,
      readyReplicas: 0,
      replicas: 0,
      updateRevision: "",
      updatedReplicas: 0,
    },
    containers: [{ env: [], ports: [], volumeMounts: [] }],
    ownerReferences: [],
    label: {},
    events: [],
    annotations: {},
    createAt: "",
  };
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
    await axios.get(`${SERVER_URL2}/statefulsets`).then((res) => {
      runInAction(() => {
        const list = res.data.data.filter((item) => item.projectType === type);
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
        `${SERVER_URL2}/statefulsets/${name}?cluster=${cluster}&project=${project}`
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
