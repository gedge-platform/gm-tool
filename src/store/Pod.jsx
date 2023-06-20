import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { SERVER_URL } from "../config";
import { getItem } from "../utils/sessionStorageFn";

class Pod {
  totalYElements = 0;
  currentYPage = 1;
  totalYPages = 1;
  resultYList = {};
  viewYList = [];
  adminList = [];
  currentPage = 1;
  totalPages = 1;
  resultList = {};
  viewList = null;
  pPodList = [];
  podList = [];
  yamlListInPod = [];
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
  involvesData = [];
  workloadList = [];
  serviceList = [];

  labelList = [];
  containerList = [];
  portList = [];
  variableList = [];

  podInfo = {
    podName: "",
    labels: [
      // {
      //   key: "",
      //   value: ""
      // }
    ],
    pullSecrets: "",
    volume: {
      name: "",
      nfsServer: "",
      nfsPath: "",
    },
    priority: "",
    targetClusters: "",
    sourceNode: "",
    containers: [
      // {
      //   general: {
      //     containerName: "",
      //     containerImage: "",
      //     pullPolicy: "",
      //     ports: [
      //       {
      //         serviceType: "",
      //         name: "",
      //         privateContainerPort: "",
      //         protocol: "",
      //         host: {
      //         }
      //       },
      //     ],
      //     command: "",
      //     arguments: "",
      //     workingDir: "",
      //     variables: [
      //       {
      //         type: "",
      //         variableName: "",
      //         value: {
      //         }
      //       }
      //     ]
      //   },
      //   resource: {
      //     cpuReservation: "",
      //     memoryReservation: "",
      //     cpuLimit: "",
      //     memoryLimit: "",
      //     nvidiaGPULimitReservation: ""
      //   },
      //   storage: {
      //     volume: ""
      //   }
      // },
    ],
  };

  setPodInfo = (key, value) => {
    runInAction(() => {
      this.podInfo[key] = value;
    });
  };

  initLabelList = () => {
    runInAction(() => {
      this.labelList = [];
    });
  };
  addLabelList = (key, value) => {
    runInAction(() => {
      this.labelList.push({ key: key, value: value });
    });
  };
  removeLabelList = (removeIndex) => {
    runInAction(() => {
      this.labelList = this.labelList.filter(
        (_, index) => removeIndex !== index
      );
    });
  };

  initContainer = () => {
    runInAction(() => {
      this.podInfo.containers = [];
    });
  };
  addContainer = async (container) => {
    runInAction(() => {
      this.podInfo.containers.push(container);
    });
  };
  editContainer = (editIndex, container) => {
    runInAction(() => {
      this.podInfo.containers[editIndex] = container;
    });
  };
  removeContainer = (removeIndex) => {
    runInAction(() => {
      this.podInfo.containers = this.podInfo.containers.filter(
        (_, index) => removeIndex !== index
      );
    });
  };

  initPorts = () => {
    runInAction(() => {
      this.ports = [];
    });
  };
  addPort = (containerIndex) => {
    runInAction(() => {});
  };
  removePort = (containerIndex) => {
    runInAction(() => {});
  };

  changePort = (index, input) => {
    runInAction(() => {});
  };

  constructor() {
    makeAutoObservable(this);
  }

  initViewList = () => {
    runInAction(() => {
      this.viewList = null;
      this.currentPage = 1;
    });
  };

  initViewYList = () => {
    runInAction(() => {
      this.viewYList = null;
      this.currentYPage = 1;
    });
  };

  goPrevPage = () => {
    runInAction(() => {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.paginationList();
        this.loadPodDetail(
          this.viewList[0].name,
          this.viewList[0].cluster,
          this.viewList[0].project
        );
      }
    });
  };

  goNextPage = () => {
    runInAction(() => {
      if (this.totalPages > this.currentPage) {
        this.currentPage = this.currentPage + 1;
        this.paginationList();
        this.loadPodDetail(
          this.viewList[0].name,
          this.viewList[0].cluster,
          this.viewList[0].project
        );
      }
    });
  };

  paginationList = () => {
    runInAction(() => {
      if (this.podList !== null) {
        this.viewList = this.podList.slice(
          (this.currentPage - 1) * 10,
          this.currentPage * 10
        );
      }
    });
  };

  loadPodList = async () => {
    let { id, role } = getItem("user");
    role === "SA" ? (id = id) : (id = "");
    await axios
      .get(`${SERVER_URL}/pods?user=${id}`)
      .then((res) => {
        runInAction(() => {
          if (res.data.data !== null) {
            this.podList = res.data.data;
            this.podDetail = res.data.data[0];
            this.totalPages = Math.ceil(res.data.data.length / 10);
            this.totalElements = res.data.data.length;
          } else {
            this.podList = [];
          }
        });
      })
      .then(() => {
        this.paginationList();
      })
      .catch(() => {
        this.podList = [];
        this.paginationList();
      });
    this.loadPodDetail(
      this.viewList[0].name,
      this.viewList[0].cluster,
      this.viewList[0].project
    );
  };

  loadAdminPodList = async () => {
    let { id, role } = getItem("user");
    role === "SA" ? (id = id) : (id = "");
    await axios
      .get(`${SERVER_URL}/pods?user=${id}`)
      .then((res) => {
        runInAction(() => {
          this.adminList = res.data.data;
          this.podList = this.adminList.filter(
            (data) => data.cluster === "gm-cluster"
          );
          if (this.podList.length !== 0) {
            this.podDetail = this.podList[0];
            this.totalPages = Math.ceil(this.podList.length / 10);
            this.totalElements = this.podList.length;
          } else {
            this.podList = [];
          }
        });
      })
      .then(() => {
        this.paginationList();
      })
      .catch(() => {
        this.podList = [];
        this.paginationList();
      });
    this.loadPodDetail(
      this.podList[0].name,
      this.podList[0].cluster,
      this.podList[0].project
    );
  };

  loadPodDetail = async (name, cluster, project) => {
    await axios
      .get(`${SERVER_URL}/pods/${name}?cluster=${cluster}&project=${project}`)
      .then(({ data: { data, involvesData } }) => {
        runInAction(() => {
          this.podDetail = data;
          this.involvesData = involvesData;
          this.workloadList = involvesData.workloadList;
          this.serviceList = involvesData.serviceList;
          // if (involvesData.serviceList !== null) {
          // } else {
          //   this.serviceList = null;
          // }

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

  podListIncluster = [];
  setPodListIncluster = (podListIncluster) => {
    runInAction(() => {
      this.podListIncluster = podListIncluster;
    });
  };

  podListInclusterAPI = async (clusterName, projectName) => {
    await axios
      .get(`${SERVER_URL}/pods?cluster=${clusterName}&project=${projectName}`)
      .then(({ data }) => {
        runInAction(() => {
          this.podListIncluster = data.data;
        });
      });
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

  deletePod = async (podName, callback) => {
    axios
      .delete(`${SERVER_URL}/pods/${podName}`)
      .then((res) => {
        if (res.status === 201) swalError("Pod가 삭제되었습니다.", callback);
      })
      .catch((err) => swalError("삭제에 실패하였습니다."));
  };
}

const podStore = new Pod();
export default podStore;
