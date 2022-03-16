import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class Pod {
  podList = [];
  podDetail = {};
  totalElements = 0;

  podName = "";
  containerName = "";
  containerImage = "";
  containerPort = 0;
  containerPortName = "";
  workspace = "";
  project = "";
  content = "";

  constructor() {
    makeAutoObservable(this);
  }

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
