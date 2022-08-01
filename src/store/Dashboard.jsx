import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { BASIC_AUTH, SERVER_URL2 } from "../config";

class Dashboard {
  dashboardDetail = {};
  clusterCnt = 0;
  coreClusterCnt = 0;
  edgeClusterCnt = 0;
  workspaceCnt = 0;
  projectCnt = 0;
  // clusterCpuTop5 = [];
  clusterCpuTop5 = [
    {
    cluster: "",
    value: "",
  },
];
  podCpuTop5 = [
    {
      cluster: "",
      name: "",
      namespace: "",
      value: "",
    },
  ];
  clusterMemTop5 = [
    {
      cluster: "",
      value: "",
    },
  ];
  podMemTop5 = [
    {
      cluster: "",
      name: "",
      namespace: "",
      value: "",
    },
  ];
  edgeInfo = [
    {
      _id: "",
      address: "",
      clusterEndpoint: "",
      clusterName: "",
      clusterType: "",
      point: {
        x: "",
        y: "",
      },
      status: "",
      token: "",
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  loadDashboardCnt = async () => {        
    await axios
      .get(`http://101.79.1.173:8010/gmcapi/v2/totalDashboard`)
      // .get(`${SERVER_URL2}/totalDashboard`)
      .then(({ data: { data, involvesData } }) => {
      runInAction(() => {
        this.dashboardDetail = data;
        this.clusterCnt = data.clusterCnt;
        this.coreClusterCnt = data.coreClusterCnt;
        this.edgeClusterCnt = data.edgeClusterCnt;
        this.workspaceCnt = data.workspaceCnt;
        this.projectCnt = data.projectCnt;
      });
    });
  };

  loadClusterRecent = async () => {
    await axios
    .get(`http://101.79.1.173:8010/gmcapi/v2/totalDashboard`)
    .then(({ data: { data, involvesData } }) => {
      runInAction(() => {
        this.dashboardDetail = data;
        this.clusterCpuTop5 = data.clusterCpuTop5;
        this.podCpuTop5 = data.podCpuTop5;
        this.clusterMemTop5 = data.clusterMemTop5;
        this.podMemTop5 = data.podMemTop5;
      });
      // console.log(toJS(this.clusterCpuTop5))
    });
  };

  loadMapInfo = async () => {
    await axios
    .get(`http://101.79.1.173:8010/gmcapi/v2/totalDashboard`)
    .then(({ data: { data, involvesData} }) => {
      runInAction(() => {
        this.dashboardDetail = data;
        this.edgeInfo = data.edgeInfo;
      });
    });
  };


}
const dashboardStore = new Dashboard();
export default dashboardStore;