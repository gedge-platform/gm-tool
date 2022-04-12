import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class WorkSpace {
  workSpaceList = [];
  WorkSpaceDetail = {};
  totalElements = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadWorkSpaceList = async () => {
    await axios
      .get(`${SERVER_URL}/workspaces`, {
        auth: BASIC_AUTH,
      })
      .then(({ data: { data } }) => {
        runInAction(() => {
          this.workSpaceList = data;
          this.WorkSpaceDetail = data[0];
          this.totalElements = data.length;
        });
      });
  };
}

const workspacesStore = new WorkSpace();
export default workspacesStore;
