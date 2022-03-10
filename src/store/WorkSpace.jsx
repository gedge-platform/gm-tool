import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class WorkSpace {
  workSpaceList = [];
  WorkSpaceDetail = {};

  constructor() {
    makeAutoObservable(this);
  }

  loadWorkSpaceList = async () => {
    await axios
      .get(`${SERVER_URL}/workspaces`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          this.workSpaceList = res.data.data;
          this.WorkSpaceDetail = res.data.data[0];
        });
      });
  };
}

const workspacesStore = new WorkSpace();
export default workspacesStore;
