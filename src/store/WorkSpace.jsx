import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";
import { getItem } from "@/utils/sessionStorageFn";

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

  createWorkspace = (
    workspaceName,
    workspaceDescription,
    selectCluster,
    callback
  ) => {
    axios
      .post(
        `${SERVER_URL}/workspaces`,
        {
          auth: BASIC_AUTH,
        },
        {
          workspaceName,
          workspaceDescription,
          selectCluster,
          workspaceOwner: getItem("user"),
          workspaceCreator: getItem("user"),
        }
      )
      .then(({ data }) => {
        callback();
      });
  };
  duplicateCheck = async (workspaceName) => {
    await axios
      .get(`${SERVER_URL}/duplicateCheck/${workspaceName}?type=workspace`, {
        auth: BASIC_AUTH,
      })
      .then((res) => console.log(res));
  };
}

const workspacesStore = new WorkSpace();
export default workspacesStore;
