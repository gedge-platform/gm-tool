import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL2 } from "../config";

class Project {
  projectList = [];
  projectDetail = {};
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

  projectListinWorkspace = [];
  totalElements = 0;
  systemProjectList = [];

  detailInfo = [{}];
  clusterList = [];
  selectCluster = "";

  constructor() {
    makeAutoObservable(this);
  }

  loadProjectList = async (type) => {
    await axios
      .get(`${SERVER_URL2}/userProjects`, {
        auth: BASIC_AUTH,
      })
      .then(({ data: { data } }) => {
        runInAction(() => {
          const list = data.filter((item) => item.projectType === type);
          this.projectList = list;
          this.totalElements = list.length;
        });
      });
    this.loadProjectDetail(this.projectList[0].projectName);
  };

  loadProjectDetail = async (projectName) => {
    await axios
      .get(`${SERVER_URL2}/userProjects/${projectName}`, {
        auth: BASIC_AUTH,
      })
      .then(({ data: { data } }) => {
        runInAction(() => {
          this.projectDetail = data;
          this.labels = data.DetailInfo[0].labels;
          this.annotations = data.DetailInfo[0].annotations;
          if (data.DetailInfo[0]?.events !== null) {
            this.events = data.DetailInfo[0]?.events;
          } else {
            this.events = null;
          }

          this.detailInfo = data.DetailInfo;
          this.clusterList = this.detailInfo.map(
            (cluster) => cluster.clusterName
          );
          this.selectCluster = this.clusterList[0];

          // const temp = new Set(
          //   res.data.data.map((cluster) => cluster.clusterName)
          // );
          // this.clusterList = [...temp];
        });
      });
  };

  loadProjectListInWorkspace = async (workspaceName) => {
    await axios
      .get(`${SERVER_URL2}/userProjects?workspace=${workspaceName}`, {
        auth: BASIC_AUTH,
      })
      .then(({ data: { data } }) => {
        runInAction(() => {
          this.projectListinWorkspace = data.filter(
            (item) => item.projectType === "user"
          );
        });
      });
  };

  loadSystemProjectList = async (type) => {
    await axios
      .get(`${SERVER_URL2}/systemProjects`, {
        auth: BASIC_AUTH,
      })
      .then(({ data: { data } }) => {
        runInAction(() => {
          this.systemProjectList = data;
          this.totalElements = data.length;
        });
      });
  };

  setProjectListinWorkspace = (projectList = []) => {
    runInAction(() => {
      this.projectListinWorkspace = projectList;
    });
  };

  changeCluster = (cluster) => {
    runInAction(() => {
      this.selectCluster = cluster;
    });
  };
}

const projectStore = new Project();
export default projectStore;
