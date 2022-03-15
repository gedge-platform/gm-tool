import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class Project {
  projectList = [];
  projectDetail = {};
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
          this.projectDetail = this.loadProject(list[0].projectName);
          this.totalElements = list.length;
        });
      });
  };

  loadProject = async (projectName) => {
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
}

const projectStore = new Project();
export default projectStore;
