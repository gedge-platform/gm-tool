import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";
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

  createWorkspace = (
    workspaceName,
    workspaceDescription,
    selectCluster,
    callback
  ) => {
    const body = {
      workspaceName,
      workspaceDescription,
      selectCluster: selectCluster.join(","),
      workspaceOwner: getItem("user"),
      workspaceCreator: getItem("user"),
    };
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
  duplicateCheck = async (workspaceName) => {
    return await axios
      .get(`${SERVER_URL}/duplicateCheck/${workspaceName}?type=workspace`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        if (res.status === 200) {
          return true;
        }
      })
      .catch((err) => {
        return false;
      });
  };
}

const workspacesStore = new WorkSpace();
export default workspacesStore;
