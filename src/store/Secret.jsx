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
  adminSecretDetail = [];

  //Pagenation Variable
  currentPage = 1;
  totalPages = 1;
  resultList = {};
  viewList = null;

  constructor() {
    makeAutoObservable(this);
  }

  initViewList = () => {
    runInAction(() => {
      this.viewList = null;
      this.currentPage = 1;
    });
  };

  //Pagenation Default Function
  goPrevPage = () => {
    runInAction(() => {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.paginationList();
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
        this.paginationList();
        this.loadsecretTabList(
          this.viewList[0].name,
          this.viewList[0].clusterName,
          this.viewList[0].namespace
        );
      }
    });
  };

  paginationList = () => {
    runInAction(() => {
      if (this.secretList !== null) {
        this.viewList = this.secretList.slice(
          (this.currentPage - 1) * 10,
          this.currentPage * 10
        );
      }
    });
  };

  loadsecretList = async () => {
    await axios
      .get(`${SERVER_URL}/secrets`)
      .then((res) => {
        runInAction(() => {
          this.secretList = res.data.data;
          this.secretDetail = this.secretList[0];
          this.totalElements = this.secretList.length;
          this.totalPages = Math.ceil(this.secretList.length / 10);
        });
      })
      .then(() => {
        this.paginationList();
      })
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
      .then((res) => {
        runInAction(() => {
          if (res.data.data !== null) {
            this.adminList = res.data.data.sort((a, b) => {
              //최신순으로 정렬
              return new Date(b.createAt) - new Date(a.createAt);
            });
            this.secretList = this.adminList.filter(
              (data) => data.clusterName === "gm-cluster"
            );
            if (this.secretList.length !== 0) {
              this.secretDetail = this.secretList[0];
              this.adminSecretDetail = this.secretList[0];
              this.totalElements = this.secretList.length;
              this.totalPages = Math.ceil(this.secretList.length / 10);
            }
          } else {
            this.secretList = [];
          }
        });
      })
      .then(() => {
        this.paginationList();
        this.adminList.length === 0
          ? this.secretTabList === null
          : this.loadsecretTabList(
              this.secretList[0].name,
              this.secretList[0].clusterName,
              this.secretList[0].namespace
            );
      })
      .catch(() => {
        this.secretList = [];
        this.paginationList();
      });
  };

  loadsecretTabList = async (name, clusterName, namespace) => {
    await axios
      .get(
        `${SERVER_URL}/secrets/${name}?cluster=${clusterName}&project=${namespace}`
      )
      .then(({ data: { data } }) => {
        runInAction(() => {
          this.secretTabList = data;
          this.adminSecretDetail = data;
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
