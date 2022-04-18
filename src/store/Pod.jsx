import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class Pod {
  podList = [];
  podDetail = {};
  totalElements = 0;
  label = {};
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
  podName = "";
  containerName = "";
  containerImage = "";
  containerPort = 0;
  containerPortName = "";
  workspace = "";
  project = "";
  content = "";
  containerResources = [];
  podContainers = [
    {
      name: "",
      image: "",
      ports: [
        {
          name: "",
          containerPort: 0,
          protocol: "",
        },
      ],
      volumemounts: [
        {
          mountpath: "",
          name: "",
          readonly: true,
        },
      ],
      env: [
        {
          name: "",
          value: "",
          valueFrom: {},
        },
      ],
    },
  ];
  containerStatuses = [
    {
      containerID: "",
      name: "",
      ready: true,
      restartCount: 0,
      image: "",
      started: true,
    },
  ];
  involvesData = {
    workloadList: {
      name: "",
      kind: "",
      replicaName: "",
    },
    serviceList: [
      {
        metadata: {
          name: "",
          namespace: "",
          creationTimestamp: "",
        },
        subsets: [
          {
            addresses: [
              {
                nodename: "",
                ip: "",
              },
            ],
            ports: [
              {
                port: 0,
                protocol: "",
              },
            ],
          },
        ],
      },
    ],
  };

  constructor() {
    makeAutoObservable(this);
  }

  loadPodDetail = async (name, cluster, project) => {
    await axios
      .get(`${SERVER_URL}/pods/${name}?cluster=${cluster}&project=${project}`, {
        auth: BASIC_AUTH,
      })
      .then(({ data: { data, involvesData } }) => {
        runInAction(() => {
          this.podDetail = data;
          this.involvesData = involvesData;
          this.label = data.label;
          this.annotations = data.annotations;

          this.podContainers = data.Podcontainers;
          this.containerStatuses = data.containerStatuses;
          if (data.events !== null) {
            this.events = data.events;
          } else {
            this.events = null;
          }
        });
      });
  };

  loadPodList = async (type) => {
    await axios
      .get(`${SERVER_URL}/pods`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          const list = res.data.data.filter(
            (item) => item.projectType === type
          );
          this.podList = list;
          this.podDetail = list[0];
          this.totalElements = list.length;
        });
      });
    this.loadPodDetail(
      this.podList[0].name,
      this.podList[0].cluster,
      this.podList[0].project
    );
  };

  setPodName = (podName) => {
    runInAction(() => {
      this.podName = podName;
    });
  };

  setContainerName = (containerName) => {
    runInAction(() => {
      this.containerName = containerName;
    });
  };

  setContainerImage = (containerImage) => {
    runInAction(() => {
      this.containerImage = containerImage;
    });
  };

  setContainerPort = (containerPort) => {
    runInAction(() => {
      this.containerPort = containerPort;
    });
  };
  setContainerPortName = (containerPortName) => {
    runInAction(() => {
      this.containerPortName = containerPortName;
    });
  };

  setWorkspace = (workspace) => {
    runInAction(() => {
      this.workspace = workspace;
    });
  };

  setProject = (project) => {
    runInAction(() => {
      this.project = project;
    });
  };

  setContent = (content) => {
    runInAction(() => {
      this.content = content;
    });
  };

  clearAll = () => {
    runInAction(() => {
      this.setPodName("");
      this.setContainerImage("");
      this.setContainerName("");
      this.setContainerPort(0);
    });
  };

  createPod = async () => {};
}

const podStore = new Pod();
export default podStore;
