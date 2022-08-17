import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { BASIC_AUTH, SERVER_URL2, SERVER_URL4 } from "../config";
import { getItem } from "@/utils/sessionStorageFn";
import { swalError } from "../utils/swal-utils";

class ServiceAdminDashboard {
  dashboardData = {};
  workspaceNameList = [];
  workspaceName = "";
  projectList = [];
  podCpuTop = [];
  podMemTop = [];
  projectCpuTop = [];
  projectMemTop = [];

  setWorkspaceName = (value) => {
    runInAction(() => {
      this.workspaceName = value;
    });
  };

  setWorkspaceNameList = (value) => {
    runInAction(() => {
      this.workspaceNameList = value;
    });
  };

  constructor() {
    makeAutoObservable(this);
  }

  loadWorkspaceName = async () => {
    const { id } = getItem("user");
    await axios
      .get(`${SERVER_URL4}/workspaces?user=${id}`)
      .then(({ data: { data } }) => {
        runInAction(() => {
          this.workspaceNameList = data.map((item) => item.workspaceName);
          const tmp = this.workspaceNameList.map((name) => name);
          this.workspaceName = tmp.map((workspaceName) => workspaceName);
        });
      })
      .then(() => {
        this.loadServiceAdminDashboard(this.workspaceName[0]);
      });
  };

  loadServiceAdminDashboard = async (workspaceName) => {
    const { id } = getItem("user");
    await axios
      .get(
        `${SERVER_URL4}/serviceDashboard?user=${id}&workspace=${workspaceName}`
      )
      .then((res) => {
        runInAction(() => {
          this.dashboardData = res.data;
          this.projectList = Object.values(this.dashboardData).map(
            (item) => item.projectList
          );
          this.podCpuTop = Object.values(this.dashboardData).map(
            (item) => item.podCpuTop5
          );
          this.podMemTop = Object.values(this.dashboardData).map(
            (item) => item.podMemTop5
          );
          this.projectCpuTop = Object.values(this.dashboardData).map(
            (item) => item.projectCpuTop5
          );
          this.projectMemTop = Object.values(this.dashboardData).map(
            (item) => item.projectMemTop5
          );
        });
      });
  };

  //   loadServiceAdminDashboard = async () => {
  //     const { id } = getItem("user");
  //     const urls = axios.get(`${SERVER_URL4}/workspaces?user=${id}`);
  //     const result = await Promise.all([urls]).then((res) => {
  //       return res;
  //     });

  //     const workspaceData = result.map((item) => item.data.data);
  //     this.workspaceNameList = workspaceData[0].map((item) => item.workspaceName);

  //     await this.workspaceNameList.map((item) => {
  //       let workspaceName = item;
  //       axios
  //         .get(
  //           `${SERVER_URL4}/serviceDashboard?user=${id}&workspace=${workspaceName}`
  //         )

  //         .then((res) => {
  //           runInAction(() => {
  //             console.log(res);
  //             this.dashboardData = res.data;
  //           });
  //         });
  //     });
  //   };
}

const serviceAdminDashboardStore = new ServiceAdminDashboard();
export default serviceAdminDashboardStore;
