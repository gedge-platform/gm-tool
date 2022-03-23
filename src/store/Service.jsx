import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL2 } from "../config";

class Service {
  serviceList = [];
  serviceDetail = {
    selector: {
      app: "",
    },
  };
  totalElements = 0;

  serviceName = "";
  appName = "";
  protocol = "TCP";
  port = 0;
  targetPort = 0;

  cluster = [];
  workspace = "";
  project = "";

  content = "";

  constructor() {
    makeAutoObservable(this);
  }

  loadServiceDetail = async (name, cluster, project) => {
    await axios
      .get(
        `${SERVER_URL2}/services/${name}?cluster=${cluster}&project=${project}`,
        {
          auth: BASIC_AUTH,
        }
      )
      .then((res) => {
        runInAction(() => {
          this.serviceDetail = res.data.data;
        });
      });
  };

  loadServiceList = async (type) => {
    await axios
      .get(`${SERVER_URL2}/services`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          const list = res.data.data.filter(
            (item) => item.projectType === type
          );
          this.serviceList = list;
          // this.serviceDetail = list[0];
          this.totalElements = list.length;
        });
      });
    this.loadServiceDetail(
      this.serviceList[0].name,
      this.serviceList[0].cluster,
      this.serviceList[0].project
    );
  };

  setServiceName = (serviceName) => {
    runInAction(() => {
      this.serviceName = serviceName;
    });
  };

  setAppName = (appName) => {
    runInAction(() => {
      this.appName = appName;
    });
  };

  setProtocol = (protocol) => {
    runInAction(() => {
      this.protocol = protocol;
    });
  };

  setPort = (port) => {
    runInAction(() => {
      this.port = port;
    });
  };

  setTargetPort = (targetPort) => {
    runInAction(() => {
      this.targetPort = targetPort;
    });
  };

  setClusterList = (clusterList) => {
    runInAction(() => {
      this.cluster = clusterList;
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
    this.setServiceName("");
    this.setPort(0);
    this.setTargetPort(0);
    this.setProtocol("TCP");
    this.setWorkspace("");
    this.setClusterList([]);
    this.setProject("");
  };

  postService = (callback) => {
    const YAML = require("yamljs");
    let count = 0;
    // console.log(this.cluster, this.workspace, this.project);
    this.cluster.map(async (item) => {
      await axios
        .post(
          `${SERVER_URL}/services?cluster=${item}&workspace=${this.workspace}&project=${this.project}`,
          YAML.parse(this.content),
          {
            auth: BASIC_AUTH,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            count++;
            if (count === this.cluster.length) {
              swalError("Deployment가 생성되었습니다.", callback);
            }
          }
        });
    });
  };
}

const serviceStore = new Service();
export default serviceStore;
