import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { SERVER_URL } from "../config";
class Cluster {
  clusterList = [];
  clusterNameList = [];
  clusterName = "";
  totalElements = 0;
  cloudDashboardDetail = {
    clusterInfo: {
      address: "",
    },
  };
  clusterDetail = {
    clusterNum: 0,
    ipAddr: "",
    clusterName: "",
    clusterType: "",
    clusterEndpoint: "",
    clusterCreator: "",
    created_at: "",
    gpu: [],
    resource: {
      deployment_count: 0,
      pod_count: 0,
      service_count: 0,
      cronjob_count: 0,
      job_count: 0,
      volume_count: 0,
      Statefulset_count: 0,
      daemonset_count: 0,
    },
    nodes: [
      {
        name: "",
        type: "",
        nodeIP: "",
        os: "",
        kernel: "",
        labels: {},
        annotations: {},
        allocatable: {
          cpu: "",
          "ephemeral-storage": "",
          "hugepages-1Gi": "",
          "hugepages-2Mi": "",
          memory: "",
          pods: "",
        },
        capacity: {
          cpu: "",
          "ephemeral-storage": "",
          "hugepages-1Gi": "",
          "hugepages-2Mi": "",
          memory: "",
          pods: "",
        },
        containerRuntimeVersion: "",
      },
    ],
    events: [
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
    ],
  };

  clusters = [];

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
        this.loadCluster(this.viewList[0].clusterName);
      }
    });
  };

  goNextPage = () => {
    runInAction(() => {
      if (this.totalPages > this.currentPage) {
        this.currentPage = this.currentPage + 1;
        this.setViewList(this.currentPage - 1);
        this.loadCluster(this.viewList[0].clusterName);
      }
    });
  };

  setCurrentPage = n => {
    runInAction(() => {
      this.currentPage = n;
    });
  };

  setTotalPages = n => {
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

  setClusterList = list => {
    runInAction(() => {
      this.clusterList = list;
    });
  };

  setViewList = n => {
    runInAction(() => {
      this.viewList = this.clusterList[n];
    });
  };

  loadEdgeClusterList = async (type = "edge") => {
    await axios
      .get(`${SERVER_URL}/clusters`)
      .then(({ data: { data } }) => {
        runInAction(() => {
          // const list = data;
          const list = type === "" ? data : data.filter(item => item.clusterType === type);
          this.clusterList = list;
          this.clusterNameList = list.map(item => item.clusterName);
          this.totalElements = list.length;
        });
      })
      .then(() => {
        this.convertList(this.clusterList, this.setClusterList);
      })
      .then(() => {
        this.loadCluster(this.viewList[0].clusterName);
        this.loadClusterDetail(this.viewList[0].clusterName);
      });
  };

  loadCloudClusterList = async () => {
    await axios
      .get(`${SERVER_URL}/spider/vmList`)
      .then(({ data: { data } }) => {
        runInAction(() => {
          console.log("data is : ", data);
          const list = data;
          this.clusterList = list;
          this.clusterNameList = list.map(item => item.IId.NameId);
          this.totalElements = list.length;
        });
      })
      .then(() => {
        this.convertList(this.clusterList, this.setClusterList);
      });
  };

  loadCluster = async clusterName => {
    await axios.get(`${SERVER_URL}/clusters/${clusterName}`).then(({ data: { data } }) => {
      runInAction(() => {
        this.clusterDetail = data;
        this.nodes = this.clusterDetail.nodes !== null ? this.clusterDetail.nodes : 0;
      });
    });
    return this.clusterDetail;
  };

  loadClusterDetail = async clusterName => {
    await axios.get(`${SERVER_URL}/cloudDashboard?cluster=${clusterName}`).then(({ data: { data } }) => {
      runInAction(() => {
        this.clusterName = clusterName;
        this.cloudDashboardDetail = data;
        this.clusterInfo = data.ClusterInfo;
        this.address = data.ClusterInfo.address;
        this.nodeInfo = data.nodeInfo;
        this.type = this.nodeInfo.map(val => val.type);
        this.master = this.type.reduce((cnt, element) => cnt + ("master" === element), 0);
        this.worker = this.type.reduce((cnt, element) => cnt + ("worker" === element), 0);
        this.cpuUsage = data.cpuUsage;
        this.cpuUtil = data.cpuUtil;
        this.cpuTotal = data.cpuTotal;
        this.memoryUsage = data.memoryUsage;
        this.memoryUtil = data.memoryUtil;
        this.memoryTotal = data.memoryTotal;
        this.diskUsage = data.diskUsage;
        this.diskUtil = data.diskUtil;
        this.diskTotal = data.diskTotal;
        this.resourceCnt = data.resourceCnt;
        this.nodeRunning = data.nodeRunning;
      });
    });
  };

  loadClusterInProject = async project => {
    await axios.get(`${SERVER_URL}/clusterInfo?project=${project}`).then(res => runInAction(() => (this.clusters = res.data.data)));
  };
  loadClusterInWorkspace = async workspace => {
    await axios.get(`${SERVER_URL}/clusters?workspace=${workspace}`).then(res => runInAction(() => (this.clusters = res.data.data)));
  };

  setDetail = num => {
    runInAction(() => {
      this.clusterDetail = this.clusterList.find(item => item.clusterNum === num);
    });
  };

  setClusters = clusters => {
    runInAction(() => {
      this.clusters = clusters;
    });
  };
}

const clusterStore = new Cluster();
export default clusterStore;
