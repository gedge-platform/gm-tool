import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { FAAS_URL } from "../config";
import { getItem } from "../utils/sessionStorageFn";
import { swalError } from "../utils/swal-utils";

class FaasStatus {
  envList = [];
  functionsList = [];

  totalElements = 0;
  currentPage = 1;
  totalPages = 1;
  resultList = {};
  viewList = null;

  envName = "";
  setEnvName = (value) => {
    runInAction(() => {
      this.envName = value;
    });
  };

  envImage = "";
  setEnvImage = (value) => {
    runInAction(() => {
      this.envImage = value;
    });
  };

  constructor() {
    makeAutoObservable(this);
  }

  initViewList = () => {
    runInAction(() => {
      this.viewList = null;
      this.currentPage = 1;
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

  PostEnvAPI = async (envName, envImage, callback) => {
    const body = {
      env_name: envName,
      image: envImage,
    };
    await axios.post(`${FAAS_URL}/environments`, body).then((res) => {
      if (res.status === 201) {
        swalError("Environment가 생성되었습니다.");
      } else {
        swalError("Environment  생성 실패", callback);
      }
    });
  };

  DeleteEnvAPI = async (envName, callback) => {
    await axios.delete(`${FAAS_URL}/environments/${envName}`).then((res) => {
      if (res.status === 200) {
        swalError("Environment가 삭제되었습니다.");
      } else {
        swalError("Environment  삭제 실패", callback);
      }
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

  DeleteFuncionsAPI = async (envName, callback) => {
    await axios.delete(`${FAAS_URL}/functions/${envName}`).then((res) => {
      if (res.status === 200) {
        swalError("Environment가 삭제되었습니다.");
      } else {
        swalError("Environment  삭제 실패", callback);
      }
    });
  };
}

const FaasStore = new FaasStatus();
export default FaasStore;
