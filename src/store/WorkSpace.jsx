import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL2 } from "../config";
import { getItem } from "@/utils/sessionStorageFn";
import { swalError } from "../utils/swal-utils";
import { ThirtyFpsRounded } from "@mui/icons-material";

class Workspace {
  workSpaceList = [];
  workSpaceDetail = [];
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
  projectList = [{}];
  clusterList = [];
  detailInfo = [{}];
  selectProject = "";
  selectCluster = "";
  dataUsage = {};
  selectClusterInfo = [];
  workspace = [];

  constructor() {
    makeAutoObservable(this);
  }

  // loadWorkSpaceList = async (type = "user") => {
  //   await axios
  //     .get(`${SERVER_URL2}/workspace`)
  //     .then((res) => {
  //       runInAction(() => {
  //         this.workSpaceList = res.data;
  //         // this.workSpaceDetail = res.data[0];
  //         this.totalElements = res.data.length;
  //       });
  //     })
  //     .then(() => {
  //       this.loadWorkspaceDetail(this.workSpaceList[0].workspaceName);
  //     });
  // };

  loadWorkSpaceList = async (type = false) => {
    await axios
      .get(`${SERVER_URL2}/workspaces`)
      .then((res) => {
        runInAction(() => {
          this.workSpaceList = res.data;
          // this.workSpaceDetail = res.data[0];
          this.totalElements = res.data.length;
          this.workspace = this.workSpaceList.map((item) => item.workspaceName);
        });
      })
      .then(() => {
        type
          ? null
          : this.loadWorkspaceDetail(this.workSpaceList[0].workspaceName);
      });
  };

  // 워크스페이스에서 클러스터 불러오면 된다
  loadWorkspaceDetail = async (workspaceName) => {
    await axios
      .get(`${SERVER_URL2}/workspaces/${workspaceName}`)
      .then((res) => {
        runInAction(() => {
          this.workSpaceDetail = res.data;
          this.dataUsage = this.workSpaceDetail.resourceUsage;
          if (res.data.events !== null) {
            this.events = this.workSpaceDetail.events;
          } else {
            this.events = null;
          }
          this.detailInfo = res.data.projectList;
          this.selectClusterInfo = res.data.selectCluster;
          this.projectList = res.data.projectList;
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
    // const body2 = {
    //   workspaceName,
    //   workspaceDescription,
    //   memberName: getItem("user"),
    //   clusterName: selectCluster,
    // };
    // axios
    //   .post(`${SERVER_URL2}/workspaces`, body2)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.error(err));
    // return
    axios
      .post(`${SERVER_URL2}/workspaces`, body)
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

  setWorkspace = (workspace) => {
    runInAction(() => {
      this.workspace = workspace;
    });
  };

  setProjectList = (value) => {
    runInAction(() => {
      this.projectList = value;
    });
  };

  deleteWorkspace = (workspaceName, callback) => {
    axios
      .delete(`${SERVER_URL2}/workspaces/${workspaceName}`)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));

    axios
      .delete(`${SERVER_URL2}/workspaces/${workspaceName}`)
      .then((res) => {
        if (res.status === 200)
          swalError("워크스페이스가 삭제되었습니다.", callback);
      })
      .catch((err) => {
        swalError("삭제에 실패하였습니다.");
      });
  };

  setSelectClusterInfo = (selectClusterInfo) => {
    runInAction(() => {
      this.selectClusterInfo = selectClusterInfo;
    });
  };
}

const workspacestore = new Workspace();
export default workspacestore;
