import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class Deployment {
  deploymentList = [];
  deploymentDetail = {};
  totalElements = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadDeploymentList = async (type) => {
    await axios
      .get(`${SERVER_URL}/deployments`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          const list = res.data.data.filter(
            (item) => item.projectType === type
          );
          this.deploymentList = list;
          this.deploymentDetail = list[0];
          this.totalElements = list.length;
        });
      });
  };
}

const deploymentStore = new Deployment();
export default deploymentStore;
