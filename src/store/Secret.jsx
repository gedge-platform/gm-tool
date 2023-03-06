import axios from "axios";
import { BASIC_AUTH, SERVER_URL } from "../config";
//Pagenation Import toJS
import { makeAutoObservable, runInAction, toJS } from "mobx";

class Secret {
  secretList = [];
  secretDetail = {};
  adminList = [];
  totalElements = 0;
  secretTabList = [];
  data = [];
  label = [];
  annotations = [];
  events = [
    {
      kind: "",
      name: "",
      namespace: "",
      cluster: "",
      message: "",
      reason: "",
      type: "",
      eventTime: "",
    },
  ];

  //Pagenation Variable
  currentPage = 1;
  totalPages = 1;
  resultList = {};
  viewList = [];

  constructor() {
    makeAutoObservable(this);
  }

  //Pagenation Default Function
  goPrevPage = () => {
    runInAction(() => {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.setViewList(this.currentPage - 1);
        this.loadsecretTabList(
          this.viewList[0].name,
          this.viewList[0].clusterName,
          this.viewList[0].namespace
        );
      }
    });
  };

  goNextPage = () => {
    runInAction(() => {
      if (this.totalPages > this.currentPage) {
        this.currentPage = this.currentPage + 1;
        this.setViewList(this.currentPage - 1);
        this.loadsecretTabList(
          this.viewList[0].name,
          this.viewList[0].clusterName,
          this.viewList[0].namespace
        );
      }
    });
  };

  setCurrentPage = (n) => {
    runInAction(() => {
      this.currentPage = n;
    });
  };

  setTotalPages = (n) => {
    runInAction(() => {
      this.totalPages = n;
    });
  };

  convertList = (apiList, setFunc) => {
    runInAction(() => {
      let cnt = 1;
      let totalCnt = 0;
      let tempList = [];
      let cntCheck = true;
      this.resultList = {};

      Object.entries(apiList).map(([_, value]) => {
        cntCheck = true;
        tempList.push(toJS(value));
        cnt = cnt + 1;
        if (cnt > 10) {
          cntCheck = false;
          cnt = 1;
          this.resultList[totalCnt] = tempList;
          totalCnt = totalCnt + 1;
          tempList = [];
        }
      });

      if (cntCheck) {
        this.resultList[totalCnt] = tempList;
        totalCnt = totalCnt === 0 ? 1 : totalCnt + 1;
      }

      this.setTotalPages(totalCnt);
      this.setCurrentPage(1);
      setFunc(this.resultList);
      this.setViewList(0);
    });
  };

  // Pagenation Custom Function Start
  setSecretList = (list) => {
    runInAction(() => {
      this.secretList = list;
    });
  };

  setViewList = (n) => {
    runInAction(() => {
      this.viewList = this.secretList[n];
    });
  };

  loadsecretList = async () => {
    await axios
      .get(`${SERVER_URL}/secrets`)
      .then(({ data: { data } }) => {
        runInAction(() => {
          this.secretList = data;
          this.secretDetail = data[0];
          this.totalElements = data.length;
        });
      })
      // then(() => this.convertList(defaultList, customFunc))
      .then(() => {
        this.convertList(this.secretList, this.setSecretList);
      })
      // then(() => List Detail Change)
      .then(() => {
        this.loadsecretTabList(
          this.viewList[0].name,
          this.viewList[0].clusterName,
          this.viewList[0].namespace
        );
      });
  };

  loadAdminsecretList = async () => {
    await axios
      .get(`${SERVER_URL}/secrets`)
      .then(({ data: { data } }) => {
        runInAction(() => {
          this.secretList = data;
          this.adminList = this.secretList.filter(
            (data) => data.cluster === "gm-cluster"
          );
          this.secretDetail = this.adminList[0];
          this.totalElements = this.adminList.length;
        });
      })
      .then(() => {
        this.adminList.length === 0
          ? this.secretTabList === null
          : this.loadsecretTabList(
              this.adminList[0].name,
              this.adminList[0].clusterName,
              this.adminList[0].namespace
            );
        this.convertList(this.adminList, this.setSecretList);
      });
  };

  // Pagenation Custom Function End
  //Backup

  // loadsecretList = async () => {
  //   await axios
  //     .get(`${SERVER_URL}/secrets`, {
  //       auth: BASIC_AUTH,
  //     })
  //     .then(({ data: { data } }) => {
  //       runInAction(() => {
  //         this.secretList = data;
  //         this.secretDetail = data[0];
  //         this.totalElements = data.length;
  //       });
  //     });
  //   this.loadsecretTabList(
  //     this.secretList[0].name,
  //     this.secretList[0].clusterName,
  //     this.secretList[0].namespace
  //   );
  // };
  loadsecretTabList = async (name, clusterName, namespace) => {
    await axios
      .get(
        `${SERVER_URL}/secrets/${name}?cluster=${clusterName}&project=${namespace}`
      )
      .then(({ data: { data } }) => {
        runInAction(() => {
          this.secretTabList = data;
          this.data = data.data;
          this.label = data.label;
          this.annotations = data.annotations;
          this.events = data.events;
        });
      });
  };
}

const secretStore = new Secret();
export default secretStore;
