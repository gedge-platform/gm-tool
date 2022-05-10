import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class Secret {
  secretList = [];
  secretDetail = {};
  totalElements = 0;
  secretTabList = {};
  data = {};
  label = {};
  annotations = {};
  events = [
    {
      kind: "",
      name: "",
      namespace: "",
      cluster: "",
      message: "",
      reason: "",
      type: "",
      eventTime: "",
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  loadsecretList = async () => {
    await axios
      .get(`${SERVER_URL}/secrets`, {
        auth: BASIC_AUTH,
      })
      .then(({ data: { data } }) => {
        runInAction(() => {
          this.secretList = data;
          this.secretDetai = data[0];
          this.totalElements = data.length;
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
      .then(({ data: { data } }) => {
        runInAction(() => {
          this.secretTabList = data;
          this.data = data.data;
          this.label = data.label;
          this.annotations = data.annotations;
          this.events = data.events;
        });
      });
  };
}

const secretStore = new Secret();
export default secretStore;
