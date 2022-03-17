import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class Service {
  serviceList = [];
  serviceDetail = {};
  totalElements = 0;

  serviceName = "";
  appName = "";
  protocol = "";
  port = 0;
  targetPort = 0;

  cluster = [];
  workspace = "";
  project = "";

  constructor() {
    makeAutoObservable(this);
  }

  loadServiceList = async (type) => {
    await axios
      .get(`${SERVER_URL}/services`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          const list = res.data.data.filter(
            (item) => item.projectType === type
          );
          this.serviceList = list;
          this.serviceDetail = list[0];
          this.totalElements = list.length;
        });
      });
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
    console.log(clusterList);
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

  clearAll = () => {
    this.setServiceName("");
    this.setPort(0);
    this.setTargetPort(0);
    this.setProtocol("");
  };
}

const serviceStore = new Service();
export default serviceStore;
