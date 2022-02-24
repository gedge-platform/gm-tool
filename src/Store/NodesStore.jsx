import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { SERVER_URL_3 } from "@/config.jsx";
import { getItem } from "@/utils/sessionStorageFn";

class NodesStore {
  networkList = [];
  selectNetwork = "";
  //Orderes
  MSPList = [
    {
      value: "CA1",
    },
    {
      value: "CA2",
    },
    {
      value: "CA3",
    },
    {
      value: "CA4",
    },
  ];

  selectMSP = "";
  ordererName = "";
  OrderList = [];
  filterOrderList = [];

  peerList = [];
  filterPeerList = [];

  caList = [];
  filterCAList = [];

  selectOrderer = "";
  Raft = "";
  ordererCPU = "";
  ordererMemory = "";
  ordererStorage = "";

  //Peers
  peerName = "";
  CAUserID = "";
  CAUserPASS = "";
  DBList = [
    {
      value: "LevelDB",
    },
    {
      value: "CouchDB",
    },
  ];

  selectDB = "";
  peervCPU = "";
  peerMemory = "";
  peerStorage = "";
  GPUList = [
    {
      value: "Nvidia P100",
    },
    {
      value: "Nvidia P100B",
    },
  ];
  selectGPU = "";
  CSDList = [
    {
      value: "CSD 1",
    },
    {
      value: "CSD 2",
    },
  ];
  selectCSD = "";

  //CAS
  CAName = "";
  CAManageID = "";
  CAManagePASS = "";
  // DBList = []
  selectDB = "";
  CACPU = "";
  CAMemory = "";
  CAStorage = "";

  constructor() {
    makeAutoObservable(this);
    // this.CallApi = new CallApi();
  }

  init() {
    runInAction(() => {
      //Orderes
      this.selectMSP = "";
      this.ordererName = "";
      this.selectOrderer = "";
      this.Raft = "";
      this.ordererCPU = "";
      this.ordererMemory = "";
      this.ordererStorage = "";

      //Peers
      this.peerName = "";
      this.CAUserID = "";
      this.CAUserPASS = "";
      this.selectDB = "";
      this.peervCPU = "";
      this.peerMemory = "";
      this.peerStorage = "";
      this.selectGPU = "";
      this.selectCSD = "";

      //CAS
      this.CAName = "";
      this.CAManageID = "";
      this.CAManagePASS = "";
      this.selectDB = "";
      this.CACPU = "";
      this.CAMemory = "";
      this.CAStorage = "";
    });
  }
  // async getWorkspaceList(param) {
  //     runInAction(() => {
  //         this.workspaceList = apiList.data;
  //         // this.dataCheck = false
  //     });
  // }

  loadOrdererList = async () => {
    await axios
      .get(`${SERVER_URL_3}/orderers`, {
        auth: getItem("auth"),
      })
      .then(({ data: { data } }) =>
        runInAction(() => {
          this.OrderList = data;
          this.filterOrderList = data;
        })
      );
  };

  loadPeerList = async () => {
    await axios
      .get(`${SERVER_URL_3}/peers`, {
        auth: getItem("auth"),
      })
      .then(({ data: { data } }) =>
        runInAction(() => {
          this.peerList = data;
          this.filterPeerList = data;
        })
      );
  };

  loadCAList = async () => {
    await axios
      .get(`${SERVER_URL_3}/cas`, {
        auth: getItem("auth"),
      })
      .then(({ data: { data } }) =>
        runInAction(() => {
          this.caList = data;
          this.filterCAList = data;
        })
      );
  };

  loadNetworkNameList = async () => {
    await axios
      .get(`${SERVER_URL_3}/networkname`, {
        auth: getItem("auth"),
      })
      .then(({ data: { data } }) =>
        runInAction(() => {
          this.networkList = data;
        })
      );
  };

  setNetwork = (name) => {
    runInAction(() => {
      this.selectNetwork = name;
    });
  };

  filterOrder = (network) => {
    runInAction(() => {
      this.filterOrderList = this.OrderList.filter(
        (order) => order.network === network
      );
    });
  };

  filterPeer = (network) => {
    runInAction(() => {
      this.filterPeerList = this.peerList.filter(
        (order) => order.network === network
      );
    });
  };

  filterCA = (network) => {
    runInAction(() => {
      this.filterCAList = this.caList.filter(
        (order) => order.network === network
      );
    });
  };
}
const nodesStore = new NodesStore();
export default nodesStore;
