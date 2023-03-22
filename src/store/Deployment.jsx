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

  constructor() {
    makeAutoObservable(this);
  }

  // viewList 초기화
  initViewList = () => {
    runInAction(() => {
      this.viewList = null;
    })
  }

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
        this.viewList =  this.deploymentList.slice((this.currentPage-1)*10, this.currentPage*10);
      }
    })
  }

  loadDeploymentList = async () => {
    let { id, role } = getItem("user");
    role === "SA" ? (id = id) : (id = "");
    await axios
      .get(`${SERVER_URL}/deployments?user=${id}`)
      .then((res) => {
        runInAction(() => {
          // data를 deploymentList에 넣고 총 페이지와 개수 입력
          if (res.data.data !== null) {
            this.deploymentList = res.data.data;
            this.deploymentDetail = res.data.data[0];
            this.totalPages = Math.ceil(res.data.data.length/10); 
            this.totalElements = res.data.data.length;
          } else {
            this.deploymentList = [];
          }
        });
      })
      .then(() => {
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
            (data) => data.cluster === "mec(ilsan)"
          );
          this.deploymentDetail = this.deploymentList[0];
          this.totalPages = Math.ceil(this.deploymentList.length/10); 
          this.totalElements = this.deploymentList.length;
        });
      })
      .then(() => {
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

  deleteDeployment = async (deploymentName, callback) => {
    axios
      .delete(`${SERVER_URL}/deployments/${deploymentName}`)
      .then((res) => {
        if (res.status === 201)
          swalError("Deployment가 삭제되었습니다.", callback);
      })
      .catch((err) => swalError("삭제에 실패하였습니다."));
  };
}

const deploymentStore = new Deployment();
export default deploymentStore;
