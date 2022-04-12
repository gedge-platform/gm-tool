import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL2 } from "../config";

class ServiceAccount {
  serviceAccountList = [];
  serviceAccountDetail = {
    name: "",
    namespace: "",
    cluster: "",
    secrets: [
      {
        name: "",
      },
    ],
    secretCnt: 0,
    label: {},
    annotations: {},
    createdAt: "",
  };

  totalElements = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadServiceAccountList = async () => {
    await axios
      .get(`${SERVER_URL2}/serviceaccounts`, {
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
        `${SERVER_URL2}/serviceaccounts/${name}?cluster=${cluster}&project=${namespace}`,
        {
          auth: BASIC_AUTH,
        }
      )
      .then((res) => {
        runInAction(() => {
          this.serviceAccountDetail = res.data.data;
        });
      });
  };
}

const serviceAccountStore = new ServiceAccount();
export default serviceAccountStore;
