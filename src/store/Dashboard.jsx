import axios from "axios";
import { add, intersection } from "lodash";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { BASIC_AUTH, SERVER_URL2 } from "../config";

class Dashboard {
  viewList = [];
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
  // address = [];
  // pointxy = {};
  edgeInfo = [
    {
      _id: "",
      address: [],
      clusterEndpoint: "",
      clusterName: "",
      clusterType: "",
      // point: {
      //   x: 0,
      //   y: 0,
      // },
      status: "",
      token: "",
    },
  ];

  point = [];
  x = [];
  y = [];

  constructor() {
    makeAutoObservable(this);
  }

  setPointX = (x) => {
    runInAction(() => {
      this.x = x;
    });
  };

  setPointY = (y) => {
    runInAction(() => {
      this.y = y;
    });
  };

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
    .then(({ data: {data} }) => {
      runInAction(() => {
        this.dashboardDetail = data;
        this.edgeInfo = data.edgeInfo;
        this.point = this.edgeInfo.map(point => Object.entries(point.point))
        this.x = this.point.map(x => Object.values(x[0])).map(val => val[1])
        this.y = this.point.map(y => Object.values(y[1])).map(val => val[1])
        // this.xy = 
      });
      // console.log(toJS(this.point))
      console.log(toJS(this.y))
    });
  };

  loadMapInfoList = async () => {
    await axios.get(`http://101.79.1.173:8010/gmcapi/v2/totalDashboard`)
    .then((res) => {
      runInAction(() => {
        const list = res.data.data.edgeInfo;
        this.point = list.point;
        console.log(list);
      });
    }).then(() => {
      this.loadMapInfo(
        this.edgeInfo[0].point,
        console.log(toJS(this.edgeInfo[0].point))
      );
    });
  };


}
const dashboardStore = new Dashboard();
export default dashboardStore;