import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class Project {
  projectList = [];
  projectDetail = {
    // selectCluster: "",
    resource: {
      deployment_count: 0,
      pod_count: 0,
      service_count: 0,
      cronjob_count: 0,
      job_count: 0,
      volume_count: 0,
    },
    labels: {},
    events: [
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
    ],
  };
  projectListinWorkspace = [];

  totalElements = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadProjectList = async (type) => {
    await axios
      .get(`${SERVER_URL}/projects`, {
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
      .get(`${SERVER_URL}/projects/${projectName}`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          this.projectDetail = res.data.data;
        });
      });
  };

  loadProjectListInWorkspace = async (workspace) => {
    await axios
      .get(`${SERVER_URL}/projects?workspace=${workspace}`, {
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

  setProjectListinWorkspace = (projectList = []) => {
    runInAction(() => {
      this.projectListinWorkspace = projectList;
    });
  };
}

const projectStore = new Project();
export default projectStore;
