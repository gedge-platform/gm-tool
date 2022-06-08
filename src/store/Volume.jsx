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

class Volume {
  pVolumesList = [];
  pVolume = {};
  viewList = [];
  currentPage = 1;
  totalPages = 1;
  totalElements = 0;
  pVolumeYamlFile = "";
  pVolumeMetadata = {};
  pvClaims = [];
  pvClaim = {};
  pvClaimList = [];
  pvClaimYamlFile = "";
  pvClaimAnnotations = {};
  pvClaimLables = {};
  pvClaimEvents = [];
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

  currentPage = 1;
  totalPages = 1;
  resultList = {};

  constructor() {
    makeAutoObservable(this);
  }

  goPrevPage = () => {
    runInAction(() => {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.setViewList(this.currentPage - 1);
        this.loadPVolume(this.viewList[0].name, this.viewList[0].cluster);
      }
    });
  };

  goNextPage = () => {
    runInAction(() => {
      if (this.totalPages > this.currentPage) {
        this.currentPage = this.currentPage + 1;
        this.setViewList(this.currentPage - 1);
        this.loadPVolume(this.viewList[0].name, this.viewList[0].cluster);
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

  setPVolumesList = (list) => {
    runInAction(() => {
      this.pVolumesList = list;
    });
  };

  setPVClaimList = (list) => {
    runInAction(() => {
      this.pvClaimList = list;
    })
  }

  setViewList = (n) => {
    runInAction(() => {
      this.viewList = this.pVolumesList[n];
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

  // 볼륨 관리
  loadPVolumes = async () => {
    await axios
      .get(`${SERVER_URL2}/pvs`)
      .then((res) => {
        runInAction(() => {
          this.pVolumesList = res.data.data;
          this.totalElements = this.pVolumesList.length;
        });
      })
      .then(() => {
        this.convertList(this.pVolumesList, this.setPVolumesList);
      })
      .then(() => {
        this.loadPVolume(this.viewList[0].name, this.viewList[0].cluster);
      });
  };

  loadPVolume = async (name, cluster) => {
    await axios
      .get(`${SERVER_URL2}/pvs/${name}?cluster=${cluster}`)
      .then(({ data: { data } }) => {
        runInAction(() => {
          this.pVolume = data;
          this.pVolumeYamlFile = "";
          this.pVolumeMetadata = {};
          this.events = data.events;
          Object.entries(this.pVolume?.annotations).forEach(([key, value]) => {
            try {
              const YAML = require("json-to-pretty-yaml");
              this.pVolumeYamlFile = YAML.stringify(JSON.parse(value));
            } catch (e) {
              if (key && value) {
                this.pVolumeMetadata[key] = value;
              }
            }
          });
        });
      });
  };

  // 클레임 관리
  loadPVClaims = async () => {
    await axios.get(`${SERVER_URL2}/pvcs`).then(({ data: { data } }) => {
      runInAction(() => {
        this.pvClaims = data;
        this.totalElements = data.length;
      });
    }).then(() => {
      this.convertList(this.pvClaimList, this.setPVClaimList);
    });
    this.loadPVClaim(
      this.pvClaims[0].name,
      this.pvClaims[0].clusterName,
      this.pvClaims[0].namespace
    );
  };

  loadPVClaim = async (name, clusterName, namespace) => {
    await axios
      .get(
        `${SERVER_URL2}/pvcs/${name}?cluster=${clusterName}&project=${namespace}`
      )
      .then(({ data: { data } }) => {
        runInAction(() => {
          this.pvClaim = data;
          this.pvClaimYamlFile = "";
          this.pvClaimAnnotations = {};
          this.pvClaimLables = {};
          this.events = data.events;
          this.label = data.label;
          Object.entries(this.pvClaim?.label).map(([key, value]) => {
            this.pvClaimLables[key] = value;
          });

          Object.entries(this.pvClaim?.annotations).forEach(([key, value]) => {
            try {
              const YAML = require("json-to-pretty-yaml");
              this.pvClaimYamlFile = YAML.stringify(JSON.parse(value));
            } catch (e) {
              if (key && value) {
                this.pvClaimAnnotations[key] = value;
              }
            }
          });
        });
      });
  };

  loadStorageClasses = async () => {
    await axios
      .get(`${SERVER_URL2}/storageclasses`)
      .then(({ data: { data } }) => {
        this.storageClasses = data;
        this.totalElements = data.length;
      })
      .then(() => {
        this.convertList(this.storageClasses, this.setStorageClasses);
      })
      .then(() => {
        this.loadStorageClass(
          this.viewList[0].name, this.viewList[0].cluster
       );
      });

    //  this.loadStorageClass(
    //    this.storageClasses[0].name,
    //  this.storageClasses[0].cluster
    // );
  };

  loadStorageClass = async (name, cluster) => {
    await axios
      .get(`${SERVER_URL2}/storageclasses/${name}?cluster=${cluster}`)
      .then(({ data: { data } }) => {
        console.log(data);
        this.storageClass = data;
        this.scYamlFile = "";
        this.scAnnotations = {};
        this.scLables = {};
        this.scParameters = data.parameters;
        this.label = data.labels;

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
}

const volumeStore = new Volume();
export default volumeStore;
