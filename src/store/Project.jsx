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

  projectListinWorkspace = [];

  totalElements = 0;

  systemProjectList = [];

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
          // this.projectDetail = this.loadProject(list[0].projectName);
          //this.projectDetail = list[0];
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
          this.resource = res.data.data.DetailInfo[0].resource;
          this.labels = res.data.data.DetailInfo[0].labels;
          this.annotations = res.data.data.DetailInfo[0].annotations;
          if (res.data.data.DetailInfo[0].events !== null) {
            this.events = res.data.data.DetailInfo[0].events;
          } else {
            this.events = null;
          }
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
          console.log(this.systemProjectList);
          this.totalElements = res.data.data.length;
        });
      });
  };
}

const projectStore = new Project();
export default projectStore;
