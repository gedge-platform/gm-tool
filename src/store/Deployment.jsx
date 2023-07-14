import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { SERVER_URL } from "../config";
import { swalError } from "../utils/swal-utils";
import volumeStore from "./Volume";
import { getItem } from "../utils/sessionStorageFn";

class Deployment {
  currentPage = 1;
  totalPages = 1;
  resultList = {};
  viewList = null;
  adminViewList = [];
  pDeploymentList = [];
  adminList = [];
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
  adminTotalElements = 0;
  deploymentName = "";

  podReplicas = "";
  containerImage = "";
  containerName = "";
  containerPort = "";
  podReplicas = 0;

  workspace = "";
  cluster = "";
  project = "";
  responseData = "";
  workspaceName = "";
  projectName = "";

  deploymentResource = {};
  pods = [];
  containerPortName = "";

  depServices = {};

  content = "";
  contentVolume = "";

  podName = "";

  workspaceList = [];
  projectList = [];
  labelList = [];
  annotationList = [];

  deploymentInfo = {
    deploymentName: "",
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
        type: "fromNode",
        //data: {}
      },
    },
    targetClusters: "",
  };

  hpaWorkspaceList = [
    {
      name: "workspace1",
    },
    {
      name: "workspace2",
    },
    {
      name: "workspace3",
    },
    {
      name: "workspace4",
    },
  ];
  hpaProjectList = [
    {
      name: "project1",
    },
    {
      name: "project2",
    },
    {
      name: "project3",
    },
    {
      name: "project4",
    },
  ];
  hpaClusterList = [
    {
      name: "cluster1",
    },
    {
      name: "cluster2",
    },
    {
      name: "cluster3",
    },
    {
      name: "cluster4",
    },
  ];
  hpaDeploymentList = [
    {
      name: "deployment1",
    },
    {
      name: "deployment2",
    },
    {
      name: "deployment3",
    },
    {
      name: "deployment4",
    },
  ];

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
    })
  }

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

  loadClustersList = () => {
    runInAction(() => {
      const clusterList = [];

      [].map((cluster) => {
        // fetch한 clusterList 변환
        clusterList.push(cluster.clusterName);
      });
    });
  };

  loadProjectList = (workspace) => {
    runInAction(() => {
      this.projectList = [
        {
          name: "project1",
        },
        {
          name: "project2",
        },
        {
          name: "project3",
        },
        {
          name: "project4",
        },
      ];
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

  setDeploymentInfo = (name, value) => {
    runInAction(() => {
      this.deploymentInfo[name] = value;
    });
  };

  addObjectInDeploymentInfo = (name, key, value) => {
    runInAction(() => {
      this.deploymentInfo[name].push({ key: key, value: value });
    });
  };

  removeObjectInDeploymentInfo = (name, removeIndex) => {
    runInAction(() => {
      this.deploymentInfo[name] = this.deploymentInfo[name].filter(
        (_, index) => removeIndex !== index
      );
    });
  };

  initDeploymentInfo = () => {
    runInAction(() => {
      this.deploymentInfo = {
        deploymentName: "",
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
            type: "fromNode",
            //data: {}
          },
        },
        targetClusters: "",
      };
    });
  };

  createDeploymentLabels = {
    key: "",
    value: "",
  };
  setCreateDeploymentLabels = (value) => {
    runInAction(() => {
      this.createDeploymentLabels = value;
    });
  };

  createDeploymentAnnotaions = {
    key: "",
    value: "",
  };

  setCreateDeploymentAnnotaions = (value) => {
    runInAction(() => {
      this.createDeploymentAnnotaions = value;
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

  initAnnotationList = () => {
    runInAction(() => {
      this.annotationList = [];
    });
  };
  addAnnotationList = (key, value) => {
    runInAction(() => {
      this.annotationList.push({ key: key, value: value });
    });
  };
  removeAnnotationList = (removeIndex) => {
    runInAction(() => {
      this.annotationList = this.annotationList.filter(
        (_, index) => removeIndex !== index
      );
    });
  };

  initContainer = () => {
    runInAction(() => {
      this.deploymentInfo.containers = [];
    });
  };
  addContainer = async (container) => {
    runInAction(() => {
      this.deploymentInfo.containers.push(container);
    });
  };
  editContainer = (editIndex, container) => {
    runInAction(() => {
      this.deploymentInfo.containers[editIndex] = container;
    });
  };
  removeContainer = (removeIndex) => {
    runInAction(() => {
      this.deploymentInfo.containers = this.deploymentInfo.containers.filter(
        (_, index) => removeIndex !== index
      );
    });
  };

  priority = {
    name: "GLowLatencyPriority",
    options: {
      type: "fromNode",
    },
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

  constructor() {
    makeAutoObservable(this);
  }

  // viewList, 현재 페이지 초기화
  initViewList = () => {
    runInAction(() => {
      this.viewList = null;
      this.currentPage = 1;
    });
  };

  goPrevPage = () => {
    runInAction(() => {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.paginationList();
        this.loadDeploymentDetail(
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
        this.loadDeploymentDetail(
          this.viewList[0].name,
          this.viewList[0].cluster,
          this.viewList[0].project
        );
      }
    });
  };

  // deploymentList를 페이지에 맞게 잘라서 viewList에 할당
  paginationList = () => {
    runInAction(() => {
      if (this.deploymentList !== null) {
        this.viewList = this.deploymentList.slice(
          (this.currentPage - 1) * 10,
          this.currentPage * 10
        );
      }
    });
  };

  loadDeploymentList = async () => {
    let { id, role } = getItem("user");
    role === "SA" ? (id = id) : (id = "");
    await axios
      .get(`${SERVER_URL}/deployments?user=${id}`)
      .then((res) => {
        runInAction(() => {
          // 응답 data를 deploymentList에 넣고 총 페이지와 개수 입력
          if (res.data.data !== null) {
            this.deploymentList = res.data.data;
            this.deploymentDetail = res.data.data[0];
            this.totalPages = Math.ceil(res.data.data.length / 10);
            this.totalElements = res.data.data.length;
          } else {
            this.deploymentList = [];
          }
        });
      })
      .then(() => {
        this.paginationList();
      })
      .catch(() => {
        this.deploymentList = [];
        this.paginationList();
      });
    this.loadDeploymentDetail(
      this.deploymentList[0].name,
      this.deploymentList[0].cluster,
      this.deploymentList[0].project
    );
  };

  loadAdminDeploymentList = async () => {
    let { id, role } = getItem("user");
    role === "SA" ? (id = id) : (id = "");
    await axios
      .get(`${SERVER_URL}/deployments?user=${id}`)
      .then((res) => {
        runInAction(() => {
          this.adminList = res.data.data;
          this.deploymentList = this.adminList.filter(
            (data) => data.cluster === "gm-cluster"
          );
          if (this.deploymentList.length !== 0) {
            this.deploymentDetail = this.deploymentList[0];
            this.totalPages = Math.ceil(this.deploymentList.length / 10);
            this.totalElements = this.deploymentList.length;
          } else {
            this.deploymentList = [];
          }
        });
      })
      .then(() => {
        this.paginationList();
      })
      .catch((err) => {
        this.requestList = [];
        this.paginationList();
      });
    this.loadDeploymentDetail(
      this.deploymentList[0].name,
      this.deploymentList[0].cluster,
      this.deploymentList[0].project
    );
  };

  loadDeploymentDetail = async (name, cluster, project) => {
    await axios
      .get(
        `${SERVER_URL}/deployments/${name}?cluster=${cluster}&project=${project}`
      )
      .then(({ data: { data, involvesData } }) => {
        runInAction(() => {
          this.deploymentDetail = data;
          this.workspace = data.workspace;
          this.workspaceName = data.workspace;
          this.projectName = data.project;
          this.strategy = data.strategy;
          this.labels = data.labels;
          this.annotations = data.annotations;
          if (data.events !== null) {
            this.events = data.events;
          } else {
            this.events = null;
          }
          this.pods = involvesData.pods;
          this.depServices = involvesData.services;
          // this.depServicesPort = involvesData.services.port;
          this.deploymentEvents = data.events;
          this.containersTemp = data.containers;
        });
      });
  };

  loadDeploymentInCluster = async (cluster) => {
    await axios
      .get(`${SERVER_URL}/deployments?cluster=${cluster}`)
      .then((res) => runInAction(() => (this.deploymentList = res.data.data)));
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

  setWorkspaceName = (workspace) => {
    runInAction(() => {
      this.workspaceName = workspace;
    });
  };

  setProjectName = (project) => {
    runInAction(() => {
      this.projectName = project;
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

  setContentVolume = (contentVolume) => {
    runInAction(() => {
      this.contentVolume = contentVolume;
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
      this.workspace = "";
    });
  };

  postDeploymentGM = async (callback) => {
    const { selectClusters } = volumeStore;
    const YAML = require("yamljs");

    await axios
      .post(
        `${SERVER_URL}/deployments?workspace=${this.workspace}&project=${this.project}&cluster=${selectClusters}`,
        YAML.parse(this.content)
      )
      .then((res) => {
        if (res.status === 201) {
          swalError("Deployment가 생성되었습니다.", callback);
        }
      });
  };

  postDeploymentPVC = async () => {
    const YAML = require("yamljs");
    const { selectClusters } = volumeStore;

    await axios
      .post(
        `${SERVER_URL}/pvcs?cluster=${selectClusters}&project=${this.project}`,
        YAML.parse(this.contentVolume)
      )
      .then(() => {
        return;
      });
  };

  deleteDeployment = async (
    deploymentName,
    clusterName,
    projectName,
    callback
  ) => {
    axios
      .delete(
        `${SERVER_URL}/deployments/${deploymentName}?cluster=${clusterName}&project=${projectName} `
      )
      .then((res) => {
        console.log("delete res: ", res);
        if (res.status === 201)
          swalError("Deployment가 삭제되었습니다.", callback);
      })
      .catch((err) => swalError("삭제에 실패하였습니다."));
  };
}

const deploymentStore = new Deployment();
export default deploymentStore;
