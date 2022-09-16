import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { SERVER_URL } from "../config";
import { getItem } from "@/utils/sessionStorageFn";
import { swalError } from "../utils/swal-utils";

class ServiceAdminDashboard {
  dashboardData = {};
  workspaceNameList = [];
  workspaceName = "";
  projectList = [];
  podCpuTop = [];
  podMemTop = [];
  projectCpuTop = [
    {
      name: "",
      value: 0,
    },
  ];

  projectMemTop = [];
  resource = {};

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
      .get(`${SERVER_URL}/workspaces?user=${id}`)
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
        `${SERVER_URL}/serviceDashboard?user=${id}&workspace=${workspaceName}`
      )
      .then(({ data: { data } }) => {
        runInAction(() => {
          this.dashboardData = data;
          this.projectList = data?.projectList ? data?.projectList : 0;
          this.projectName = this.projectList
            ? this.projectList?.map((name) => name.projectName)
            : 0;

          this.podCpuTop = data?.podCpuTop5 ? data?.podCpuTop5 : 0;
          this.podMemTop = data?.podMemTop5 ? data?.podMemTop5 : 0;

          this.projectCpuTop = data?.projectCpuTop5 ? data?.projectCpuTop5 : 0;
          this.projectMemTop = data?.projectMemTop5 ? data?.projectMemTop5 : 0;
          this.resource = data?.resource ? data?.resource : 0;
        });
      });
  };

  serviceAdminMonitoring = async () => {
    await axios
      .get(
        `${SERVER_URL}/resourceMonitoring?project=innogrid&start=1662617777&end=1662618777&step=30s`
      )
      .then((res) => {
        runInAction(() => {
          console.log(res.data.items);
        });
      });
  };
}

const serviceAdminDashboardStore = new ServiceAdminDashboard();
export default serviceAdminDashboardStore;
