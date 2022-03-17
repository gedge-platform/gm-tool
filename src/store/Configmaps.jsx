import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL2 } from "../config";

class Configmaps {
  configmapsList = [];
  configmapsDetail = {};
  totalElements = 0;
  configmapsTabList = {
    data: {},
  };
  configmapsData = {};

  constructor() {
    makeAutoObservable(this);
  }

  loadconfigmapsList = async () => {
    await axios
      .get(`${SERVER_URL2}/configmaps`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          this.configmapsList = res.data.data;
          this.configmapsDetail = res.data.data[0];
          this.totalElements = res.data.data.length;
        });
      });
    this.loadconfigmapsTabList(
      this.configmapsList[0].name,
      this.configmapsList[0].cluster,
      this.configmapsList[0].namespace
    );
  };

  loadconfigmapsTabList = async (name, cluster, namespace) => {
    await axios
      .get(
        `${SERVER_URL2}/configmaps/${name}?cluster=${cluster}&project=${namespace}`,
        {
          auth: BASIC_AUTH,
        }
      )
      .then((res) => {
        runInAction(() => {
          this.configmapsTabList = res.data.data;
          this.configmapsData = {};
          Object.entries(this.configmapsTabList?.data).map(([key, value]) => {
            this.configmapsData[key] = value;
          });
        });
      });
  };
}

const configmapsStore = new Configmaps();
export default configmapsStore;
