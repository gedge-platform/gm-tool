import axios from "axios";
import { add, intersection } from "lodash";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { BASIC_AUTH, SERVER_URL2 } from "../config";

class Dashboard {
  viewList = [];
  dashboardDetail = {};
  clusterCnt = 0;
  // coreClusterCnt = 0;
  credentialCnt = 0;
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

  connectionconfig = [];
  ConfigName = [];
  ProviderName = [];
  ConfigNameCnt = 0;

  VMCnt = 0;

  Paused = 0;
  Running = 0;
  Stop = 0;

  VMList = [
  {
    configName: "",
    vmCnt: 0,
    paused: 0,
    running: 0,
    stop: 0,
  },
];

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
        // this.coreClusterCnt = data.coreClusterCnt;
        this.credentialCnt = data.credentialCnt;
        this.edgeClusterCnt = data.edgeClusterCnt;
        this.workspaceCnt = data.workspaceCnt;
        this.projectCnt = data.projectCnt;
      });
      console.log(this.credentialCnt);
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

  loadCredentialName = async () => {
    await axios.get(`http://210.207.104.188:1024/spider/connectionconfig`)
    .then((res) => {
      runInAction(() => {
        console.log("step1");
        this.connectionconfig = res.data.connectionconfig;
        this.ConfigName = this.connectionconfig.map(name => name.ConfigName);
        console.log(this.ConfigName);
        this.ProviderName = this.connectionconfig.map(provider => provider.ProviderName);
      });
    }).then(() => {
      console.log("step2");
      // console.log(this.ConfigName);
      for (let i=1; i<=this.ConfigName.length; i++) {
        this.loadVMCnt(this.ConfigName[i]);
      };
      // this.ConfigName.map(name => this.loadVMCnt(name));
      // this.ConfigName.map(val => this.loadVMStatusCnt(val));
    });
  };

  // ConfigName = this.ConfigName.map(name => this.loadVMCnt(name));


  loadVMCnt = async (ConfigName) => {
    await axios.post(`http://192.168.160.216:8010/gmcapi/v2/spider/vm/vmCount`,
    {ConnectionName: ConfigName})
    .then((res) => {
      runInAction(() => {
        console.log("step3");
        console.log(res.data);
        this.VMCnt = res.data.VMCnt;
        this.VMList.vmCnt.push(this.VMCnt);
      })
      console.log(this.VMList);
    })
    // .then((res) => {
    //   console.log("step4");
    //   console.log(res);
    //   this.VMList.configName = ConfigName;
    //   this.VMList.vmCnt = this.VMCnt;
    //   console.log(this.VMList);
    //   // this.ConfigName.map(val => this.loadVMStatusCnt(val));
    // })
    // .then(() => {
    //   console.log("step5");
    //   console.log(res);
    //   this.loadVMStatusCnt(ConfigName, this.VMList);
    // })
  };

  // loadVMStatusCnt = async (ConfigName, VMList) => {
  //   await axios.post(`http://192.168.160.216:8010/gmcapi/v2/spider/vm/vmstatus/vmstatusCount`,
  //   {ConnectionName: ConfigName})
  //   .then((res) => {
  //     runInAction(() => {
  //       console.log("step6");
  //       console.log(res);
  //       this.Paused = res.data.Paused;
  //       this.Running = res.data.Running;
  //       this.Stop = res.data.Stop;
  //     })
  //   })
  //   .then(() => {
  //     // if(ConfigName === VMList.ConfigName) {
  //       console.log("step7");
  //       console.log(res);
  //       VMList.paused = this.Paused;
  //       VMList.running = this.Running;
  //       VMList.stop = this.Stop;
  //       console.log(VMList);
  //     // }
  //   })
  // };

}
const dashboardStore = new Dashboard();
export default dashboardStore;