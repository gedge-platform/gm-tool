import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class Service {
  serviceList = [];
  serviceDetail = {};
  totalElements = 0;

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
}

const serviceStore = new Service();
export default serviceStore;
