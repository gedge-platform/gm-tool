import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class PlatformProject {
  platformProjectList = [
    {
      clusterName: "",
    },
  ];
  clusterList = [];
  platformDetail = [{}];
  labels = {};
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
  resource = {
    deployment_count: 0,
    daemonset_count: 0,
    Statefulset_count: 0,
    pod_count: 0,
    service_count: 0,
    cronjob_count: 0,
    job_count: 0,
    volume_count: 0,
  };
  resourceUsage = {
    namespace_cpu: "",
    namespace_memory: "",
    namespace_pod_count: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  loadPlatformProjectList = async (type) => {
    await axios
      .get(`${SERVER_URL}/systemProjects`, {
        auth: BASIC_AUTH,
      })
      .then(({ data: { data } }) => {
        runInAction(() => {
          this.platformProjectList = data;
          // const temp = new Set(
          //   res.data.data.map((cluster) => cluster.clusterName)
          // );
          // this.clusterList = [...temp];
          this.totalElements = data.length;
        });
      });
    this.loadPlatformDetail(this.platformProjectList[0].projectName);
    this.loadCluster(
      this.platformProjectList[0].projectName,
      this.platformProjectList[0].clusterName
    );
  };

  loadPlatformDetail = async (projectName) => {
    await axios
      .get(`${SERVER_URL}/systemProjects/${projectName}`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {});
      });
  };

  loadCluster = async (projectName, clusterName) => {
    await axios
      .get(
        `${SERVER_URL}/systemProjects/${projectName}?cluster=${clusterName}`,
        {
          auth: BASIC_AUTH,
        }
      )
      .then(({ data: { data } }) => {
        runInAction(() => {
          this.platformDetail = data;
          this.labels = data.labels;
          this.annotations = data.annotations;
          this.resource = data.resource;
          if (data.events !== null) {
            this.events = data.events;
          } else {
            this.events = null;
          }
          this.resourceUsage = data.resourceUsage;
        });
      });
  };
}

const platformProjectStore = new PlatformProject();
export default platformProjectStore;
