import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class StatefulSet {
  statefulSetList = [];
  statefulSetDetail = {};
  totalElements = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadStatefulSetList = async (type) => {
    await axios
      .get(`${SERVER_URL}/statefulsets`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          const list = res.data.data.filter(
            (item) => item.projectType === type
          );
          this.statefulSetList = list;
          this.statefulSetDetail = list[0];
          this.totalElements = list.length;
        });
      });
  };
}

const statefulSetStore = new StatefulSet();
export default statefulSetStore;
