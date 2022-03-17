import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class ServiceAccount {
  serviceAccountList = [];
  serviceAccountDetail = {
    secrets: {
      name: "",
    },
  };
  totalElements = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadServiceAccountList = async () => {
    await axios
      .get(`${SERVER_URL}/serviceaccounts`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          this.serviceAccountList = res.data.data;
          this.serviceAccountDetail = res.data.data[0];
          this.totalElements = res.data.data.length;
        });
      });
  };
}

const serviceAccountStore = new ServiceAccount();
export default serviceAccountStore;
