import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { useHistory } from "react-router";
import { BASIC_AUTH, SERVER_URL2 } from "../config";
import { swalError } from "../utils/swal-utils";

class Deployment {
  deploymentList = [];
  deploymentDetail = {
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
  deploymentInvolvesData = {};
  strategy = {
    type: {},
  };
  labels = {};
  annotations = {};
  pods = [{}];
  totalElements = 0;
  deploymentName = "";
  podReplicas = "";
  containerImage = "";
  containerName = "";
  containerPort = "";
  podReplicas = 0;

  workspace = "default";
  cluster = "default";
  project = "default";
  responseData = "";

  deploymentResource = {};
  pods = [];

  //   content = {
  //     apiVersion: "apps/v1",
  //     kind: "Deployment",
  //     metadata: {
  //       name: this.deploymentName,
  //       labels: {
  //         app: this.deploymentName,
  //       },
  //     },
  //     spec: {
  //       replicas: this.podReplicas,
  //       selector: {
  //         matchLabels: {
  //           app: this.deploymentName,
  //         },
  //       },
  //       template: {
  //         metadata: {
  //           labels: {
  //             app: this.deploymentName,
  //           },
  //         },
  //         spec: {
  //           containers: [
  //             {
  //               image: this.containerImage,
  //               name: this.containerName,
  //               ports: {
  //                 containerPort: this.containerPort,
  //               },
  //             },
  //           ],
  //         },
  //       },
  //     },
  //   };

  content = "";

  constructor() {
    makeAutoObservable(this);
  }

  loadDeploymentDetail = async (name, cluster, project) => {
    await axios
      .get(
        `${SERVER_URL2}/deployments/${name}?cluster=${cluster}&project=${project}`,
        { auth: BASIC_AUTH }
      )
      .then((res) => {
        runInAction(() => {
          this.deploymentDetail = res.data.data;
          this.strategy = res.data.data.strategy;
          this.labels = res.data.data.labels;

          // if (res.data.data.labels !== "") {
          //   this.labels = res.data.data.labels;
          // } else {
          //   this.labels = "null";
          // }

          this.annotations = res.data.data.annotations;

          this.deploymentInvolvesData = res.data.involvesData;
          this.pods = res.data.involvesData.pods;
        });
      });
  };

  loadDeploymentList = async (type) => {
    await axios
      .get(`${SERVER_URL2}/deployments`, { auth: BASIC_AUTH })
      .then((res) => {
        runInAction(() => {
          const list = res.data.data.filter((item) => item.projetType === type);
          this.deploymentList = list;
          this.deploymentDetail = list[0];
          this.totalElements = list.length;
        });
      });
    this.loadDeploymentDetail(
      this.deploymentList[0].name,
      this.deploymentList[0].cluster,
      this.deploymentList[0].project
    );
  };

  setWorkspace = (workspace) => {
    runInAction(() => {
      this.workspace = workspace;
    });
  };
  setCluster = (cluster) => {
    runInAction(() => {
      this.cluster = cluster;
    });
  };
  setProject = (project) => {
    runInAction(() => {
      this.project = project;
    });
  };

  setDeployName = (name) => {
    runInAction(() => {
      this.deploymentName = name;
    });
  };

  setPodReplicas = (type) => {
    if (type === "plus") {
      runInAction(() => {
        this.podReplicas++;
      });
    } else {
      runInAction(() => {
        this.podReplicas--;
      });
    }
  };

  setContainerName = (value) => {
    runInAction(() => {
      this.containerName = value;
    });
  };

  setContainerImage = (value) => {
    runInAction(() => {
      this.containerImage = value;
    });
  };

  setContainerPortName = (value) => {
    runInAction(() => {
      this.containerPortName = value;
    });
  };

  setContainerPort = (value) => {
    runInAction(() => {
      this.containerPort = value;
    });
  };

  setContent = (content) => {
    runInAction(() => {
      this.content = content;
    });
  };
  setResponseData = (data) => {
    runInAction(() => {
      this.responseData = data;
    });
  };

  clearAll = () => {
    runInAction(() => {
      this.deploymentName = "";
      this.podReplicas = 0;
      this.containerName = "";
      this.containerImage = "";
      this.containerPortName = "";
      this.containerPort = 0;
      this.content = "";
    });
  };

  postDeployment = async (callback) => {
    const YAML = require("yamljs");

    await axios
      .post(
        `${SERVER_URL2}/deployments?workspace=${this.workspace}&project=${this.project}`,
        YAML.parse(this.content),
        {
          auth: BASIC_AUTH,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          swalError("Deployment가 생성되었습니다.", callback);
        }
      });
  };
}

const deploymentStore = new Deployment();
export default deploymentStore;
