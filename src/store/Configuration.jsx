import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class Configuration {
  configurationList = [];
  configurationDetail = {};

  constructor() {
    makeAutoObservable(this);
  }

  loadConfigurationList = async () => {
    await axios
      .get(`${SERVER_URL}/configmaps`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          this.configurationList = res.data.data;
          this.configurationDetail = res.data.data[0];
        });
      });
  };
}

const configurationStore = new Configuration();
export default configurationStore;
