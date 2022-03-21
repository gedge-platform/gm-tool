import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL2 } from "../config";

class ServiceAccount {
  serviceAccountList = [];
  serviceAccountDetail = {};
  serviceAccountTabList = {
    secrets: [
      {
        name: "",
      },
    ],
    label: {},
    annotations: {},
  };
  serviceAccountData = {};
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
          this.serviceAccountTabList = res.data.data;
          this.serviceAccountData = {};

          Object.entries(this.serviceAccountTabList?.label).map(
            ([key, value]) => {
              this.serviceAccountData[key] = value;
            }
          );

          Object.entries(this.serviceAccountTabList?.annotations).map(
            ([key, value]) => {
              this.serviceAccountData[key] = value;
            }
          );
        });
      });
  };
}

const serviceAccountStore = new ServiceAccount();
export default serviceAccountStore;
