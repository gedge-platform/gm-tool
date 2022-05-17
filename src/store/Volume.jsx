import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { BASIC_AUTH, LOCAL_VOLUME_URL, SERVER_URL } from "../config";

class Volume {
  pVolumes = [];
  pVolume = {};
  viewList = [];
  currentPage = 1;
  totalPages = 0;
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

  constructor() {
    makeAutoObservable(this);
  }

  convertList = (apiList, setFunc) => {
    runInAction(() => {
      let cnt = 0;
      let totalCnt = 0;
      let tempList = [];
      let cntCheck = true;
      this.resultList = {};

      Object.entries(apiList).map(([_, value]) => {
        tempList.push(toJS(value));
        cnt = cnt + 1;
        if (cnt > 9) {
          cntCheck = false;
          cnt = 0;
          this.resultList[totalCnt] = tempList;
          totalCnt = totalCnt + 1;
          tempList = [];
        }
      });

      if (cntCheck) {
        this.resultList[totalCnt] = tempList;
      }

      totalCnt = totalCnt + 1;
      console.log(apiList);
      console.log(this.resultList);

      this.setTotalPages(totalCnt);
      setFunc(this.resultList);
      this.setViewList(0);
      console.log(this.viewList);
    });
  };

  goPrevPage = () => {
    runInAction(() => {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.setViewList(this.currentPage - 1);
      } else {
        console.log(this.currentPage);
      }
    });
  };

  goNextPage = () => {
    runInAction(() => {
      if (this.totalPages > this.currentPage) {
        this.currentPage = this.currentPage + 1;
        this.setViewList(this.currentPage);
      } else {
        console.log(this.currentPage);
      }
    });
  };

  setMetricsLastTime = (time) => {
    runInAction(() => {
      this.lastTime = time;
    });
  };

  setViewList = (n) => {
    runInAction(() => {
      this.viewList = this.pVolumes[n];
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

  setPVolumes = (list) => {
    runInAction(() => {
      this.pVolumes = list;
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
      .get(`${LOCAL_VOLUME_URL}/pvs`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          this.pVolumes = res.data.data;
          this.totalElements = this.pVolumes.length;
        });
      })
      .then(() => {
        this.convertList(this.pVolumes, this.setPVolumes);
      })
      .then(() => {
        this.loadPVolume(this.viewList[0].name, this.viewList[0].cluster);
      });
  };

  loadPVolume = async (volumeName, cluster) => {
    await axios
      .get(`${LOCAL_VOLUME_URL}/pvs/${volumeName}?cluster=${cluster}`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
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
