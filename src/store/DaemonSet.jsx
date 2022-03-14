import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class DaemonSet {
  daemonSetList = [];
  daemonSetDetail = {};
  totalElements = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadDaemonSetList = async (type) => {
    await axios
      .get(`${SERVER_URL}/daemonsets`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        console.log(res.data);
        runInAction(() => {
          const list = res.data.data.filter(
            (item) => item.projectType === type
          );
          this.daemonSetList = list;
          this.daemonSetDetail = list[0];
          this.totalElements = list.length;
        });
      });
  };
}

const daemonSetStore = new DaemonSet();
export default daemonSetStore;
