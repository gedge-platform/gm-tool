import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL, SERVER_URL2 } from "../config";
import { getItem } from "@/utils/sessionStorageFn";
import { swalError } from "../utils/swal-utils";
import { ThirtyFpsRounded } from "@mui/icons-material";

class Workspace {
  workSpaceList = [];
  workSpaceDetail = {};
  totalElements = 0;
  events = [
    {
      kind: "",
      name: "",
      namespace: "",
      cluster: "",
      mesage: "",
      reason: "",
      type: "",
      eventTime: "",
    },
  ];
  //clusterList = [];
  detailInfo = [{}];
  selectProject = "";
  selectCluster = "";
  dataUsage = {};

  constructor() {
    makeAutoObservable(this);
  }

  loadWorkSpaceList = async (type = "user") => {
    await axios
      .get(`${SERVER_URL}/workspaces`, {
        auth: BASIC_AUTH,
      })
      .then(({ data: { data } }) => {
        runInAction(() => {
          this.workSpaceList = data;
          this.workspaceDetail = data[0];
          this.totalElements = data.length;
        });
      });
      this.loadWorkspaceDetail(this.workSpaceList[0].workspaceName);
  };

  loadWorkspaceDetail = async (workspaceName) => {
    await axios
    .get(`${SERVER_URL}/workspaces/${workspaceName}`, {
      auth: BASIC_AUTH,
    })
    .then(({ data: { data } }) => {
      runInAction(() => {
        this.workSpaceDetail = data;
        this.dataUsage = this.workSpaceDetail.resourceUsage;
        if (data.events !== null) {
          this.events = this.workSpaceDetail.events;
        } else {
          this.events = null;
        }
        this.detailInfo = data.projectList;
        this.projectList = this.detailInfo.map(
          (project) => project.projectName
        );
        this.selectProject = this.projectList[0];
        //this.clusterList = data.selectCluster;
        // this.selectCluster = this.clusterList[0];
      });
    });
  };

  setWorkSpaceList = (workSpaceList = []) => {
    runInAction(() => {
      this.workSpaceList = workSpaceList;
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

  changeCluster = (cluster) => {
    runInAction(() => {
      this.selectCluster = cluster;
    });
  };

  changeProject = (project) => {
    runInAction(() => {
      this.selectProject = project;
    });
  };

  deleteWorkspace = (workspaceName, callback) => {
    axios
      .delete(`${SERVER_URL2}/workspace/${workspaceName}`)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));

    axios
      .delete(`${SERVER_URL}/workspaces/${workspaceName}`, {
        auth: BASICAUTH,
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

const workspacestore = new Workspace();
export default workspacestore;
