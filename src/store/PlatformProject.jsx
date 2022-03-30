import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL2 } from "../config";

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
      .get(`${SERVER_URL2}/systemProjects`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          this.platformProjectList = res.data.data;
          // const temp = new Set(
          //   res.data.data.map((cluster) => cluster.clusterName)
          // );
          // this.clusterList = [...temp];
          this.totalElements = res.data.data.length;
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
      .get(`${SERVER_URL2}/systemProjects/${projectName}`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          //this.platformDetail = res.data.data[0];
          //this.labels = res.data.data[0].labels;
          // this.annotations = res.data.data[0].annotations;
          // this.resource = res.data.data[0].resource;
        });
      });
  };

  loadCluster = async (projectName, clusterName) => {
    await axios
      .get(
        `${SERVER_URL2}/systemProjects/${projectName}?cluster=${clusterName}`,
        {
          auth: BASIC_AUTH,
        }
      )
      .then((res) => {
        runInAction(() => {
          this.platformDetail = res.data.data;
          this.labels = res.data.data.labels;
          this.annotations = res.data.data.annotations;
          this.resource = res.data.data.resource;
          if (res.data.data.events !== null) {
            this.events = res.data.data.events;
          } else {
            this.events = null;
            // this.events = [];
          }
          this.resourceUsage = res.data.data.resourceUsage;
        });
      });
  };
}

const platformProjectStore = new PlatformProject();
export default platformProjectStore;
