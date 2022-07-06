import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import {
  BASIC_AUTH,
  LOCAL_VOLUME_URL,
  SERVER_URL2,
  BEARER_TOKEN,
} from "../config";
import { getItem } from "../utils/sessionStorageFn";
import { setItem } from "../utils/sessionStorageFn";

class StorageClass {
  viewList = [];
  currentPage = 1;
  totalPages = 1;
  totalElements = 0;
  storageClasses = [];
  storageClass = {};
  scYamlFile = "";
  scParameters = {};
  scLables = {};
  scAnnotations = {};
  getYamlFile = "";
  resultList = {};
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
  label = {};
  annotations = {};

  currentPage = 1;
  totalPages = 1;
  resultList = {};
  viewList = [];
  storageClassName = "";
  storageClassNameData = [];

  constructor() {
    makeAutoObservable(this);
  }

  goPrevPage = () => {
    runInAction(() => {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.setViewList(this.currentPage - 1);
        this.loadStorageClass(this.viewList[0].name, this.viewList[0].cluster);
      }
    });
  };

  goNextPage = () => {
    runInAction(() => {
      if (this.totalPages > this.currentPage) {
        this.currentPage = this.currentPage + 1;
        this.setViewList(this.currentPage - 1);
        this.loadStorageClass(this.viewList[0].name, this.viewList[0].cluster);
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
      setFunc(this.resultList);
      this.setViewList(0);
    });
  };

  setStorageClasses = (list) => {
    runInAction(() => {
      this.storageClasses = list;
    });
  };

  setViewList = (n) => {
    runInAction(() => {
      this.viewList = this.storageClasses[n];
    });
  };

  setMetricsLastTime = (time) => {
    runInAction(() => {
      this.lastTime = time;
    });
  };

  loadVolumeYaml = async (name, clusterName, projectName, kind) => {
    await axios
      .get(
        `${SERVER_URL2}/view/${name}?cluster=${clusterName}&project=${projectName}&kind=${kind}`
      )
      .then((res) => {
        runInAction(() => {
          const YAML = require("json-to-pretty-yaml");
          this.getYamlFile = YAML.stringify(res.data.data);
        });
      });
  };

  loadStorageClasses = async () => {
    await axios
      .get(`${SERVER_URL2}/storageclasses`)
      .then((res) => {
        runInAction(() => {
          this.storageClasses = res.data.data;
          this.totalElements = res.data.data.length;
        });
      })
      .then(() => {
        this.convertList(this.storageClasses, this.setStorageClasses);
      })
      .then(() => {
        this.loadStorageClass(this.viewList[0].name, this.viewList[0].cluster);
      })
      .then(() => {
        this.loadStorageClassName(this.viewList[0].cluster);
      });
  };

  loadStorageClass = async (name, cluster) => {
    await axios
      .get(`${SERVER_URL2}/storageclasses/${name}?cluster=${cluster}`)
      .then(({ data: { data } }) => {
        this.storageClass = data;
        this.scYamlFile = "";
        this.scAnnotations = {};
        this.scLables = {};
        this.scParameters = data.parameters;
        this.label = data.labels;
        this.annotations = data.annotations;
        this.storageClassList = data.name;

        Object.entries(this.storageClass?.annotations).forEach(
          ([key, value]) => {
            try {
              const YAML = require("json-to-pretty-yaml");
              if (value === "true" || value === "false") {
                throw e;
              }
              this.scYamlFile = YAML.stringify(JSON.parse(value));
            } catch (e) {
              if (key && value) {
                this.scAnnotations[key] = value;
              }
            }
          }
        );

        Object.entries(this.storageClass?.labels).map(([key, value]) => {
          this.scLables[key] = value;
        });

        Object.entries(this.storageClass?.parameters).map(([key, value]) => {
          this.scParameters[key] = value;
        });
      });
  };

  loadStorageClassName = async (cluster) => {
    await axios
      .get(`${SERVER_URL2}/storageclasses?cluster=${cluster}`)
      .then((res) => {
        runInAction(() => {
          this.storageClassNameData = res.data.data;
        });
      });
  };

  setStorageClassNameData = (value) => {
    runInAction(() => {
      this.storageClassNameData = value;
    });
  };

  setStorageClass = (value) => {
    runInAction(() => {
      this.storageClass = value;
    });
  };

  setStorageClassName = (value) => {
    runInAction(() => {
      this.storageClassName = value;
    });
  };
}

const StorageClassStore = new StorageClass();
export default StorageClassStore;
