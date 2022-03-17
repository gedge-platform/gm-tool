import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class Secret {
  secretList = [];
  secretDetail = {};
  totalElements = 0;
  secretTabList = {
    data: {},
  };

  constructor() {
    makeAutoObservable(this);
  }

  loadsecretList = async () => {
    await axios
      .get(`${SERVER_URL}/secrets`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          this.secretList = res.data.data;
          this.secretDetai = res.data.data[0];
          this.totalElements = res.data.data.length;
        });
      });
    this.loadsecretTabList(
      this.secretList[0].name,
      this.secretList[0].clusterName,
      this.secretList[0].namespace
    );
  };

  loadsecretTabList = async (name, clusterName, namespace) => {
    await axios
      .get(
        `${SERVER_URL}/secrets/${name}?cluster=${clusterName}&project=${namespace}`,
        {
          auth: BASIC_AUTH,
        }
      )
      .then((res) => {
        runInAction(() => {
          this.secretTabList = res.data.data;
        });
      });
  };
}

const secretStore = new Secret();
export default secretStore;
