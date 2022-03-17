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
  serviceAccountTabList = {
    data: {},
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
    this.loadServiceAccountTabList(
      this.serviceAccountList[0].name,
      this.serviceAccountList[0].cluster,
      this.serviceAccountList[0].namespace
    );
  };

  loadServiceAccountTabList = async (name, cluster, namespace) => {
    await axios
      .get(
        `${SERVER_URL}/serviceaccounts/${name}?cluster=${cluster}&project=${namespace}`,
        {
          auth: BASIC_AUTH,
        }
      )
      .then((res) => {
        runInAction(() => {
          this.serviceAccountTabList = res.data.data;
          console.log(this.serviceAccountTabList);
        });
      });
  };
}

const serviceAccountStore = new ServiceAccount();
export default serviceAccountStore;
