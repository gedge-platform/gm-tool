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

  DetailInfo = [{}];

  constructor() {
    makeAutoObservable(this);
  }

  loadProjectList = async (type) => {
    await axios
      .get(`${SERVER_URL2}/userProjects`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          const list = res.data.data.filter(
            (item) => item.projectType === type
          );
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
      .then((res) => {
        runInAction(() => {
          this.projectDetail = res.data.data;
          this.labels = res.data.data.DetailInfo[0].labels;
          this.annotations = res.data.data.DetailInfo[0].annotations;
          if (res.data.data.DetailInfo[0]?.events !== null) {
            this.events = res.data.data.DetailInfo[0]?.events;
          } else {
            this.events = null;
          }
          this.DetailInfo = res.data.data.DetailInfo;

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
      .then((res) => {
        runInAction(() => {
          this.projectListinWorkspace = res.data.data.filter(
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
      .then((res) => {
        runInAction(() => {
          this.systemProjectList = res.data.data;
          this.totalElements = res.data.data.length;
        });
      });
  };

  setProjectListinWorkspace = (projectList = []) => {
    runInAction(() => {
      this.projectListinWorkspace = projectList;
    });
  };
}

const projectStore = new Project();
export default projectStore;
