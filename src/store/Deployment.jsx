import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { useHistory } from "react-router";
import { BASIC_AUTH, SERVER_URL } from "../config";
import { swalError } from "../utils/swal-utils";

class Deployment {
  deploymentList = [];
  deploymentDetail = {
    name: "",
    project: "",
    cluster: "",
    workspace: "",
    ready: "",
    createAt: "",
    replica: {
      replicas: 0,
      readyReplicas: 0,
      updatedReplicas: 0,
      availableReplicas: 0,
      unavailableReplicas: 0,
    },
    strategy: {
      rollingUpdate: {
        maxSurge: "",
        maxUnavailable: "",
      },
      type: "",
    },
    containers: [
      {
        env: [{ name: "", value: "" }],
        image: "",
        imagePullPolicy: "",
        name: "",
        ports: [{ containerPort: 0, protocol: "" }],
        resources: {},
        terminationMessagePath: "",
        terminationMessagePolicy: "",
      },
    ],
    lables: {},
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
    annotations: {},
    involvesData: {},
  };

  deploymentEvents = [];

  deploymentInvolvesData = {};
  strategy = {
    type: {},
  };
  labels = {};
  annotations = {};
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
  containersTemp = [
    {
      image: "",
      imagePullPolicy: "",
      name: "",
      ports: [
        {
          containerPort: 0,
          protocol: "",
        },
      ],
      resources: {},
      terminationMessagePath: "",
      terminationMessagePolicy: "",
    },
  ];
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
  deploymentInvolvesData = [{}];

  depServices = {};
  depServicesPort = [
    {
      name: "",
      port: 0,
      protocol: "",
    },
  ];

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
        `${SERVER_URL}/deployments/${name}?cluster=${cluster}&project=${project}`,
        { auth: BASIC_AUTH }
      )
      .then(({ data: { data, involvesData } }) => {
        runInAction(() => {
          this.deploymentDetail = data;
          this.strategy = data.strategy;
          this.labels = data.labels;
          this.annotations = data.annotations;
          if (data.events !== null) {
            this.events = data.events;
          } else {
            this.events = null;
          }
          this.deploymentInvolvesData = involvesData;
          this.pods = involvesData.pods;
          this.depServices = involvesData.services;
          this.depServicesPort = involvesData.services.port;
          this.deploymentEvents = data.events;
          this.containersTemp = data.containers;
          console.log(this.containersTemp);
        });
      });
  };

  loadDeploymentList = async (type) => {
    await axios
      .get(`${SERVER_URL}/deployments`, { auth: BASIC_AUTH })
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

  postDeploymentGM = async (callback) => {
    const YAML = require("yamljs");

    await axios
      .post(
        `${SERVER_URL}/deployments?workspace=${this.workspace}&project=${this.project}`,
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
