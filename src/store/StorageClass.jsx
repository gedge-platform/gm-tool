import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { SERVER_URL } from "../config";
import { swalError } from "../utils/swal-utils";

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
  storageMonit = {};
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
  selectStorageClass = "";
  content = "";
  storageSystem = "";
  volumeExpansion = "";
  reclaimPolicy = "";
  accessMode = "";
  volumeBindingMode = "";
  selectClusters = "";
  parametersData = {};

  cephDashboard = {
    ceph_cluster_total_bytes: 0,
    ceph_cluster_total_used_bytes: 0,
    ceph_cluster_total_avail_bytes: 0,
    ceph_mon_quorum_status: 0,
    ceph_osd_in: 0,
    ceph_osd_out: 0,
    ceph_osd_up: 0,
    ceph_oud_down: 0,
    ceph_pg_active: 0,
    ceph_pg_clean: 0,
    ceph_pg_incomplete: 0,
    ceph_pg_per_osd: 0,
    ceph_pool_num: 0,
    ceph_unclean_pgs: 0,
    clusterStatus: "",
    cluster_avail_capacity: 0,
    read_iops: 0,
    read_throughput: 0,
    write_iops: 0,
    write_throughput: 0
  }

  constructor() {
    makeAutoObservable(this);
  }

  setContent = (content) => {
    runInAction(() => {
      this.content = content;
    });
  };

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

  setSelectStorageClass = (value) => {
    runInAction(() => {
      this.selectStorageClass = value;
    });
  };

  setStorageClassName = (value) => {
    runInAction(() => {
      this.storageClassName = value;
    });
  };

  setStorageSystem = (value) => {
    runInAction(() => {
      this.storageSystem = value;
    });
  };

  setVolumeExpansion = (value) => {
    runInAction(() => {
      this.volumeExpansion = value;
    });
  };

  setReclaimPolicy = (value) => {
    runInAction(() => {
      this.reclaimPolicy = value;
    });
  };

  setAccessMode = (value) => {
    runInAction(() => {
      this.accessMode = value;
    });
  };

  setVolumeBindingMode = (value) => {
    runInAction(() => {
      this.volumeBindingMode = value;
    });
  };

  setResponseData = (data) => {
    runInAction(() => {
      this.responseData = data;
    });
  };

  setSelectClusters = (value) => {
    runInAction(() => {
      this.selectClusters = value;
    });
  };

  loadStorageClassYaml = async (name, clusterName, projectName, kind) => {
    await axios
      .get(
        `${SERVER_URL}/view/${name}?cluster=${clusterName}&project=${projectName}&kind=${kind}`
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
      .get(`${SERVER_URL}/storageclasses`)
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
      .get(`${SERVER_URL}/storageclasses/${name}?cluster=${cluster}`)
      .then(({ data: { data } }) => {
        runInAction(() => {
          this.storageClass = data;
          this.scYamlFile = "";
          this.scAnnotations = {};
          this.scLables = {};
          this.scParameters = data.parameters ? data.parameters : "-";
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
      });
  };

  loadStorageClassName = async (cluster) => {
    await axios
      .get(`${SERVER_URL}/storageclasses?cluster=${cluster}`)
      .then((res) => {
        runInAction(() => {
          this.storageClassNameData = res.data.data;
        });
      });
  };

  postStorageClass = (callback) => {
    const YAML = require("yamljs");
    axios
      .post(
        `${SERVER_URL}/storageclasses?cluster=${this.selectClusters}`,

        YAML.parse(this.content)
      )
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          swalError("StorageClass가 생성되었습니다", callback);
        }
      })
      .catch((err) => {
        swalError("StorageClass 생성에 실패하였습니다.", callback);
        console.log(err);
      });
  };
  loadStorageMonit = async () => {
    await axios
      .get(`${SERVER_URL}/ceph/monit`)
      .then((res) => {
        runInAction(() => {
          this.cephDashboard = res.data.data;
          console.log("loadStorageMonit")
        });
      });
  };
}


const StorageClassStore = new StorageClass();
export default StorageClassStore;
