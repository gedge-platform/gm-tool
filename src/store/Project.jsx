import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class Project {
  projectList = [];
  projectDetail = {};
  totalElements = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadProjectList = async () => {
    await axios
      .get(`${SERVER_URL}/projects`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          const list = res.data.data;
          this.projectList = list;
          this.projectDetail = list[0];
          this.totalElements = list.length;
        });
      });
  };
}

const projectStore = new Project();
export default projectStore;
