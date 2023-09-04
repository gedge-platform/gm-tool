import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { SERVER_URL } from "../config";
import { getItem } from "../utils/sessionStorageFn";
import { swalError } from "../utils/swal-utils";

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

  keyValuePair = [];
  secretConfigmap = [];

  labelList = [];
  annotationList = [];

  labelInput = [];
  labelKey = "";
  labelValue = "";

  labelInputKey = "";
  labelInputValue = "";

  annotationInput = [];
  annotationKey = "";
  annotationValue = "";

  containerList = [];
  portList = [];
  variableList = [];

  volumeList = [];

  podInfo = {
    podName: "",
    workspace: "",
    project: "",
    replicas: 1,
    volume: "",
    pvcName: "",
    containers: [],
    labels: {},
    annotations: {},
    priority: {
      name: "GLowLatencyPriority",
      options: {
        type: "from_node",
      },
    },
    targetClusters: "",
  };

  selectedCluster = "";
  setSelectedCluster = (value) => {
    runInAction(() => {
      this.selectedCluster = value;
    });
  };
  targetClusters = [];
  unselectedClusters = [
    "cluster0",
    "cluster1",
    "cluster2",
    "cluster3",
    "cluster4",
    "cluster5",
    "cluster6",
  ];

  initTargetClusters = () => {
    runInAction(() => {
      this.targetClusters = [];
      this.unselectedClusters = [
        "cluster0",
        "cluster1",
        "cluster2",
        "cluster3",
        "cluster4",
        "cluster5",
        "cluster6",
      ];
    });
  };

  setTargetClusters = (value) => {
    runInAction(() => {
      this.targetClusters = value;
    });
  };

  setUnselectedClusters = (value) => {
    runInAction(() => {
      this.unselectedClusters = value;
    });
  };

  initPodInfo = () => {
    runInAction(() => {
      this.podInfo = {
        podName: "",
        workspace: "",
        project: "",
        replicas: 1,
        volume: "",
        containers: [],
        labels: [],
        annotations: [],
        priority: {
          name: "GLowLatencyPriority",
          options: {
            type: "from_node",
          },
        },
        targetClusters: "",
      };
    });
  };

  setPodInfo = (name, value) => {
    runInAction(() => {
      this.podInfo[name] = value;
    });
  };

  addObjectInPodInfo = (name, key, value) => {
    runInAction(() => {
      this.podInfo[name].push({ key: key, value: value });
    });
  };

  removeObjectInPodInfo = (name, removeIndex) => {
    runInAction(() => {
      this.podInfo[name] = this.podInfo[name].filter(
        (_, index) => removeIndex !== index
      );
    });
  };

  priority = {
    name: "GLowLatencyPriority",
    options: {
      type: "from_node",
    },
  };

  setPodInfoPriority = (key, value) => {
    runInAction(() => {
      this.podInfo.priority[key] = value;
    });
  };

  setPriority = (value) => {
    runInAction(() => {
      this.priority = value;
    });
  };
  priorityNodes = [];
  setPriorityNodes = (value) => {
    runInAction(() => {
      this.priorityNodes = value;
    });
  };

  initLabelList = () => {
    runInAction(() => {
      this.labelList = [];
    });
  };

  initAnnotationList = () => {
    runInAction(() => {
      this.annotationList = [];
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
  setTemplateLabel = () => {
    runInAction(() => {
      this.labels.map((data) => {
        this.labelInput[data.labelKey] = data.labelValue;
      });
    });
  };
  setLabelInput = (value) => {
    runInAction(() => {
      this.labelInput = value;
    });
  };

  setTemplate = (template) => {
    runInAction(() => {
      delete template.metadata.labels[""];
      delete template.metadata.annotations[""];
      delete template.spec.template.metadata.labels[""];
      delete template.spec.template.metadata.annotations[""];
      delete template.spec.selector.matchLabels[""];
    });
  };
  setClearLA = () => {
    runInAction(() => {
      this.labelKey = "";
      this.labelValue = "";
      this.annotationKey = "";
      this.annotationValue = "";
      this.labels = [];
      this.annotations = [];
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

  loadVolumeList = (pvcName) => {
    runInAction(() => {
      this.volumeList = [
        {
          name: "volume1",
        },
        {
          name: "volume2",
        },
        {
          name: "volume3",
        },
        {
          name: "volume4",
        },
      ];
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

  setInputLabelKey = (value) => {
    runInAction(() => {
      this.labelKey = value;
    });
  };

  setInputLabelValue = (value) => {
    runInAction(() => {
      this.labelValue = value;
    });
  };

  setInputAnnotationKey = (value) => {
    runInAction(() => {
      this.annotationKey = value;
    });
  };

  setInputAnnotationValue = (value) => {
    runInAction(() => {
      this.annotationValue = value;
    });
  };

  setAnnotationInput = (value) => {
    runInAction(() => {
      this.annotationInput = value;
    });
  };

  setLabels = (value) => {
    runInAction(() => {
      this.labels = value;
    });
  };

  setAnnotations = (value) => {
    runInAction(() => {
      this.annotations = value;
    });
  };

  labelKey = "";
  labelValue = "";

  labels = [];
  annotations = [];

  setTemplate = (template) => {
    runInAction(() => {
      delete template.metadata.labels[""];
      delete template.metadata.annotations[""];
      delete template.spec.template.metadata.labels[""];
      delete template.spec.template.metadata.annotations[""];
      delete template.spec.selector.matchLabels[""];
    });
  };

  setTemplateAnnotation = () => {
    runInAction(() => {
      this.annotations.map((data) => {
        this.annotationInput[data.annotationKey] = data.annotationValue;
      });
    });
    console.log(this.annotations);
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

  setPodName = (name) => {
    runInAction(() => {
      this.podName = name;
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
      this.PodName = "";
      this.containerName = "";
      this.containerImage = "";
      this.containerPort = 0;
    });
  };

  postPodGM = async (callback) => {
    console.log(this.priority);
    const body = this.content;
    const randomNumber = Math.floor(Math.random() * (10000 - 1)) + 1;
    // const options = encodeURI(JSON.stringify(this.priority.options));
    const option = {
      user_name: "innogrid",
      workspace_name: "scheduler_test",
      workspace_uid: "63032defd74175d7b58babd2",
      project_name: "scheduling-8c906681-2341-4acc-8188-fd51d4eda125",
      type: "default",
      data: {
        selected_cluster: "onpremise(dongjak)",
      },
    };
    const requestId = "requestId" + randomNumber;
    const options = encodeURI(JSON.stringify(option));
    console.log("body :", body);
    // console.log("options :", JSON.stringify(this.priority.options));
    console.log("option : ", options);
    console.log("requestId :", requestId);

    await axios
      .post(
        `http://101.79.4.15:31701/gmcapi/v2/gs-scheduler?requestId=${requestId}&callbackUrl=http://zento.co.kr/callback&priority=GSelectedClusterPriority&options=${options}`,
        body
      )
      .then((res) => {
        console.log("res :", res.data);
        if (res.status === 201) {
          swalError("Pod가 생성되었습니다.", callback);
        } else {
          swalError("Pod 생성 실패", callback);
        }
      });
  };

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
