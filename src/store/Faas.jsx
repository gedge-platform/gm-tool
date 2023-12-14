import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { FAAS_URL } from "../config";
import { getItem } from "../utils/sessionStorageFn";
import { swalError } from "../utils/swal-utils";

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

  envNameList = "";
  setEnvNameList = (value) => {
    runInAction(() => {
      this.envNameList = value;
    });
  };

  functionName = "";
  setFunctionName = (value) => {
    runInAction(() => {
      this.functionName = value;
    });
  };

  functionFileContent = "";
  setFunctionFileContent = (value) => {
    runInAction(() => {
      this.funcionFileContent = value;
    });
  };

  triggerHttpInputs = {
    trig_name: "",
    trig_type: "",
    url: "",
    method: "",
    function: "",
  };

  triggerKatkaQueue = {
    trig_name: "",
    trig_type: "",
    function: "",
    mqtype: "",
    mqtkind: "",
    topic: "",
    resptopic: "",
    errortopic: "",
    maxretries: 0,
    metadata: [],
    cooldownperiod: 0,
    pollinginterval: 0,
    secret: "",
  };

  packageSource = {
    pack_name: "",
    env_name: "",
    sourcearchive: "",
    build: "",
  };

  packageCode = {
    pack_name: "",
    env_name: "",
    code: "",
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

  setTriggerHttpInputs = (e) => {
    runInAction(() => {
      this.triggerHttpInputs = e;
    });
  };

  setTriggerKatkaQueue = (e) => {
    runInAction(() => {
      this.triggerKatkaQueue = e;
    });
  };

  setPackageSource = (e) => {
    runInAction(() => {
      this.packageSource = e;
    });
  };

  setPackageCode = (e) => {
    runInAction(() => {
      this.packageCode = e;
    });
  };

  loadEnvListAPI = async () => {
    await axios
      .get(`${FAAS_URL}/environments`)
      .then((res) => {
        runInAction(() => {
          console.log(res);
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

  PostFuncionsAPI = async (callback) => {
    const body = {
      func_name: this.functionName,
      env_name: this.envNameList,
      func_content: JSON.stringify(this.functionFileContent),
    };
    await axios
      .post(`${FAAS_URL}/functions`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          swalError("Environment가 생성되었습니다.");
        } else {
          swalError("Environment  생성 실패", callback);
        }
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

  postPackageFileApi = async (data, callback) => {
    console.log("data: ", data);
    const body = {
      ...data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    console.log("body: ", body);
    await axios.post(`${FAAS_URL}/packages/upload`, body).then((res) => {
      runInAction(() => {
        console.log("res: ", res.data);
        if (res.status === 200) {
          swalError("파일이 업로드 되었습니다.", callback);
          return true;
        }
      });
    });
  };

  deletePackageAPI = async (envName, callback) => {
    await axios.delete(`${FAAS_URL}/packages/${envName}`).then((res) => {
      if (res.status === 200) {
        swalError("Package가 삭제되었습니다.");
      } else {
        swalError("Package 삭제 실패", callback);
      }
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

  createTrigger = async (data, callback) => {
    const body = { ...data };
    console.log(body);
    await axios.post(`${FAAS_URL}/triggers`, body).then((res) => {
      runInAction(() => {
        console.log("res: ", res);
      });
    });
  };

  deleteTriggerAPI = async (trigName, callback) => {
    await axios.delete(`${FAAS_URL}/triggers/${trigName}`).then((res) => {
      if (res.status === 200) {
        swalError("Package가 삭제되었습니다.");
      } else {
        swalError("Package 삭제 실패", callback);
      }
    });
  };

  createPackage = async (data, callback) => {
    const body = { ...data };
    // await axios.post(`${FAAS_URL}/packages`, body).then((res) => {
    //   console.log("res: ", res);
    //   console.log("callback: ", callback);
    //   runInAction(() => {
    //     console.log("res: ", res);
    //     console.log("callback: ", callback);
    //   });
    // });
    try {
      const response = await axios.post(`${FAAS_URL}/packages`, body);
      console.log("Server Response: ", response);

      if (typeof callback === "function") {
        callback(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
      // 에러 처리 로직 추가
    }
  };
}

const FaasStore = new FaasStatus();
export default FaasStore;
