import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class Cluster {
  clusterList = [];
  clusterNameList = [];
  clusterDetail = {
    clusterNum: 0,
    ipAddr: "",
    clusterName: "",
    clusterType: "",
    clusterEndpoint: "",
    clusterCreator: "",
    created_at: "",
    gpu: "",
    resource: {
      deployment_count: 0,
      pod_count: 0,
      service_count: 0,
      cronjob_count: 0,
      job_count: 0,
      volume_count: 0,
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
  totalElements = 0;

  clusters = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadClusterList = async (type = "") => {
    await axios
      .get(`${SERVER_URL}/clusters`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          const list =
            type === ""
              ? res.data.data
              : res.data.data.filter((item) => item.clusterType === type);
          this.clusterList = list;
          this.clusterNameList = list.map((item) => item.clusterName);
          this.loadCluster(list[0].clusterName);
          // this.clusterDetail = list[0];
          this.totalElements = list.length;
        });
      });
  };

  loadCluster = async (name) => {
    await axios
      .get(`${SERVER_URL}/clusters/${name}`, {
        auth: BASIC_AUTH,
      })
      .then(({ data: { data } }) => {
        runInAction(() => {
          this.clusterDetail = data;
        });
      });
  };

  loadClusterInProject = async (project) => {
    await axios
      .get(`http://101.79.4.15:8010/clusterInfo?project=${project}`)
      .then((res) => runInAction(() => (this.clusters = res.data.data)));
  };

  setDetail = (num) => {
    runInAction(() => {
      this.clusterDetail = this.clusterList.find(
        (item) => item.clusterNum === num
      );
    });
  };
}

const clusterStore = new Cluster();
export default clusterStore;
