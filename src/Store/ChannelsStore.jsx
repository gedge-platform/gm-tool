
import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { SERVER_URL_3, SERVER_URL_4 } from "@/config.jsx";
import { getItem } from "../utils/sessionStorageFn";
class ChannelsStore {
  netList = [];
  network = this.netList[0];

  channelList = [];
  selectChannel = {}
  channelInfo = this.channelList[0];
  filterChannelList = this.channelList;
  channelName = "";
  orderingServiceList = [
    {
      value: "Block-Orderer1",
    },
    {
      value: "Block-Orderer2",
    },
    {
      value: "Block-Orderer3",
    },
    {
      value: "Block-Orderer4",
    },
  ];
  selectOrderingService = this.orderingServiceList[0].value;

  channelMemberList = [
    {
      id: 0,
      orgname: "msp",
      role: "operator",
      peers: "2",
      management: "",
    },
    {
      id: 1,
      orgname: "msp2",
      role: "participant",
      peers: "2",
      management: "",
    },
  ];
  orgList = ["org1", "org2", "org3"];

  totalPages = Math.ceil(this.filterChannelList.length / 10);
  totalElements = this.filterChannelList.length;
  currentPage = 1;

  constructor() {
    makeAutoObservable(this);
    // this.CallApi = new CallApi();
  }

  init() { }

  setDetail = (id) => {
    runInAction(() => {
      this.channelInfo = this.channelList.find((channel) => channel.id === id);
    });
  };

  setOrderingService = (orderingServiceName) => {
    runInAction(() => {
      this.selectOrderingService = orderingServiceName;
    });
  };

  createChannel = (channelName) => {
    console.log(
      channelName,
      this.selectOrderingService,
      this.channelMemberList
    );
  };

  addMember = (orgName, role) => {
    console.log(orgName, role);
    runInAction(() => {
      this.channelMemberList.push({
        id: this.channelMemberList.length,
        orgname: orgName,
        role,
        peers: "2",
      });
      // this.channelMemberList = [
      //   ...this.channelMemberList,
      //   {
      //     id: this.channelMemberList.length - 1,
      //     orgname: orgName,
      //     role,
      //     peers: "2",
      //     management: "",
      //   },
      // ];
    });
  };

  filterNetwork = (network) => {
    runInAction(() => {
      if (network === "전체보기") {
        this.filterChannelList = this.channelList;
      } else {
        this.filterChannelList = this.channelList.filter(
          (channel) => channel.network === network
        );
      }
    });
  };
  filterChannelMember = (id) => {
    runInAction(() => {
      this.channelMemberList = this.channelMemberList.filter(
        (member) => member.id !== id
      );
    });
  };

  deleteChannel = () => {
    runInAction(() => {
      this.filterChannelList = this.channelList.filter(
        (channel) => channel.id !== this.channelInfo.id
      );
      this.channelInfo = this.filterChannelList[0];
      this.totalElements--;
      this.totalPages = Math.ceil(this.filterChannelList.length / 10);
    });
  };

  goPrevPage = () => {
    runInAction(() => {
      if (this.currentPage === 1) {
        alert("첫 페이지입니다!");
        return;
      }
      this.currentPage--;
    });
  };
  goNextPage = () => {
    runInAction(() => {
      if (this.currentPage === this.totalPages) {
        alert("마지막 페이지입니다!");
        return;
      }
      this.currentPage++;
    });
  };
  getChannelList = async () => {
    await axios
      .get(`${SERVER_URL_3}/channels`, {
        auth: getItem("auth"),
      })
      .then(({ data: { data } }) =>
        runInAction(() => {
          this.channelList = data;
          this.filterChannelList = data
          this.selectChannel = data[0];
        })
      )
      .catch((e) => console.log(e));
  };
  getNetworkName = async () => {
    await axios
      .get(`${SERVER_URL_3}/networkname`, {
        auth: getItem("auth"),
      })
      .then(({ data: { data } }) =>
        runInAction(() => {
          this.netList = data;
          this.network = data[0];
        })
      )
      .catch((e) => console.log(e));
  };
  // async getWorkspaceList(param) {
  //     runInAction(() => {
  //         this.workspaceList = apiList.data;
  //         // this.dataCheck = false
  //     });
  // }
}
const channelsStore = new ChannelsStore();
export default channelsStore;
