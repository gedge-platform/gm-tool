import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import {
  BASIC_AUTH,
  LOCAL_VOLUME_URL,
  SERVER_URL,
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

  currentPage = 1;
  totalPages = 1;
  resultList = {};
  viewList = [];

  constructor() {
    makeAutoObservable(this);
  }

  goPrevPage = () => {
    runInAction(() => {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.setViewList(this.currentPage - 1);
        this.loadPVolume(this.viewList[0].volumeName, this.viewList[0].cluster);
      }
    });
  };

  goNextPage = () => {
    runInAction(() => {
      if (this.totalPages > this.currentPage) {
        this.currentPage = this.currentPage + 1;
        this.setViewList(this.currentPage - 1);
        this.loadPVolume(this.viewList[0].volumeName, this.viewList[0].cluster);
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
        `${SERVER_URL}/view/${name}?cluster=${clusterName}&project=${projectName}&kind=${kind}`,
        {
          auth: BASIC_AUTH,
        }
      )
      .then((res) => {
        runInAction(() => {
          const YAML = require("json-to-pretty-yaml");
          this.getYamlFile = YAML.stringify(res.data.data);
        });
      });
  };

  loadPVolumes = async () => {
    await axios
      .get(`${LOCAL_VOLUME_URL}/pvs`)
      .then((res) => {
        runInAction(() => {
          console.log(res);
          this.pVolumesList = res.data.data;
          this.totalElements = this.pVolumes.length;
        });
      })
      .then(() => {
        this.convertList(this.pVolumesList, this.setPVolumesList);
      })
      .then(() => {
        this.loadPVolume(this.viewList[0].volumeName, this.viewList[0].cluster);
      });
  };

  loadPVolume = async (volumeName, cluster) => {
    await axios
      .get(`${LOCAL_VOLUME_URL}/pvs/${volumeName}?cluster=${cluster}`)
      .then((res) => {
        runInAction(() => {
          console.log(res);
          this.pVolume = res.data.data;
          this.pVolumeYamlFile = "";
          this.pVolumeMetadata = {};
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

  loadPVClaims = async () => {
    await axios
      .get(`${LOCAL_VOLUME_URL}/pvcs`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          this.pvClaims = res.data.data;
          this.totalElements = this.pvClaims.length;
        });
      });
    this.loadPVClaim(
      this.pvClaims[0].name,
      this.pvClaims[0].clusterName,
      this.pvClaims[0].namespace
    );
  };

  loadPVClaim = async (pvClaimName, cluster, project) => {
    await axios
      .get(
        `${LOCAL_VOLUME_URL}/pvcs/${pvClaimName}?cluster=${cluster}&project=${project}`,
        {
          auth: BASIC_AUTH,
        }
      )
      .then((res) => {
        runInAction(() => {
          this.pvClaim = res.data.data;
          this.pvClaimYamlFile = "";
          this.pvClaimAnnotations = {};
          this.pvClaimLables = {};

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
      .get(`${LOCAL_VOLUME_URL}/storageclasses`, { auth: BASIC_AUTH })
      .then((res) => {
        this.storageClasses = res.data.data;
        this.totalElements = this.storageClasses.length;
      });

    this.loadStorageClass(
      this.storageClasses[0].name,
      this.storageClasses[0].cluster
    );
  };

  loadStorageClass = async (scName, cluster) => {
    await axios
      .get(`${LOCAL_VOLUME_URL}/storageclasses/${scName}?cluster=${cluster}`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        this.storageClass = res.data.data;
        this.scYamlFile = "";
        this.scAnnotations = {};
        this.scLables = {};
        this.scParameters = {};

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
