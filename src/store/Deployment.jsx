import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class Deployment {
  deploymentName = "";
  podReplicas = "";
  containerImage = "";
  containerName = "";
  containerPort = "";
  podReplicas = 0;

  workspace = "";
  cluster = "";
  project = "";

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
        `${SERVER_URL}/deployments?cluster=${this.cluster}&project=${this.project}`,
        YAML.parse(this.content),
        {
          auth: BASIC_AUTH,
        }
      )
      .then((res) => {
        if (res.status === 200) callback();
      });
  };
}

const deploymentStore = new Deployment();
export default deploymentStore;
