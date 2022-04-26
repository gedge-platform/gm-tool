import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL, SERVER_URL2 } from "../config";
import { getItem } from "@/utils/sessionStorageFn";
import { swalError } from "../utils/swal-utils";

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

  setWorkspaceList = (workspaceList = []) => {
    runInAction(() => {
      this.workSpaceList = workspaceList;
    });
  };

  createWorkspace = (
    workspaceName,
    workspaceDescription,
    selectCluster,
    callback
  ) => {
    const body = {
      workspaceName,
      workspaceDescription,
      selectCluster,
      workspaceOwner: getItem("user"),
      workspaceCreator: getItem("user"),
    };
    const body2 = {
      workspaceName,
      workspaceDescription,
      memberName: getItem("user"),
      clusterName: selectCluster,
    };
    axios
      .post(`${SERVER_URL2}/workspace`, body2)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    return axios
      .post(`${SERVER_URL}/workspaces`, body, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        if (res.status === 201) {
          swalError("워크스페이스를 생성하였습니다.", callback);
        }
      })
      .catch((err) => {
        swalError("워크스페이스 생성에 실패하였습니다.");
      });
  };

  deleteWorkspace = (workspaceName, callback) => {
    axios
      .delete(`${SERVER_URL}/workspaces/${workspaceName}`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        if (res.status === 200)
          swalError("워크스페이스가 삭제되었습니다.", callback);
      })
      .catch((err) => {
        swalError("삭제에 실패하였습니다.");
      });
  };
}

const workspacesStore = new WorkSpace();
export default workspacesStore;
