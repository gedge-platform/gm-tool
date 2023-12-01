import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { FAAS_URL } from "../config";
import { getItem } from "../utils/sessionStorageFn";

class FaasStatus {
  envList = [];
  functionsList = [];
  packageList = [];
  triggerList = [];

  totalElements = 0;
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
    });
  };

  goPrevPage = () => {
    runInAction(() => {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.paginationList();
      }
    });
  };

  goNextPage = () => {
    runInAction(() => {
      if (this.totalPages > this.currentPage) {
        this.currentPage = this.currentPage + 1;
        this.paginationList();
      }
    });
  };

  paginationList = () => {
    runInAction(() => {
      if (this.envList !== null) {
        this.viewList = this.envList.slice(
          (this.currentPage - 1) * 20,
          this.currentPage * 20
        );
      }
    });
  };

  loadEnvListAPI = async () => {
    await axios
      .get(`${FAAS_URL}/environments`)
      .then((res) => {
        runInAction(() => {
          console.log("environments ???", res.data);
          if (res.data !== null) {
            this.envList = res.data;
            this.totalPages = Math.ceil(res.data.length / 20);
            this.totalElements = res.data.length;
          } else {
            this.envList = [];
          }
        });
      })
      .then(() => {
        this.paginationList();
      })
      .catch((error) => {
        this.envList = [];
        this.paginationList();
      });
  };

  loadFuncionsListAPI = async () => {
    await axios
      .get(`${FAAS_URL}/functions`)
      .then((res) => {
        runInAction(() => {
          console.log("functions ???", res.data);
          if (res.data !== null) {
            this.functionsList = res.data;
            this.totalPages = Math.ceil(res.data.length / 20);
            this.totalElements = res.data.length;
          } else {
            this.functionsList = [];
          }
        });
      })
      .then(() => {
        this.paginationList();
      })
      .catch((error) => {
        this.functionsList = [];
        this.paginationList();
      });
  };

  loadPackageListAPI = async () => {
    await axios
      .get(`${FAAS_URL}/packages`)
      .then((res) => {
        runInAction(() => {
          if (res.data !== null) {
            this.packageList = res.data;
            this.totalPages = Math.ceil(res.data.length / 20);
            this.totalElements = res.data.length;
          } else {
            this.packageList = [];
          }
        });
      })
      .then(() => {
        this.paginationList();
      })
      .catch((error) => {
        this.packageList = [];
        this.paginationList();
      });
  };

  loadTriggerListAPI = async () => {
    await axios
      .get(`${FAAS_URL}/triggers`)
      .then((res) => {
        runInAction(() => {
          if (res.data !== null) {
            this.triggerList = res.data;
            this.totalPages = Math.ceil(res.data.length / 20);
            this.totalElements = res.data.length;
          } else {
            this.packageList = [];
          }
        });
      })
      .then(() => {
        this.paginationList();
      })
      .catch((error) => {
        this.triggerList = [];
        this.paginationList();
      });
  };
}

const FaasStore = new FaasStatus();
export default FaasStore;
