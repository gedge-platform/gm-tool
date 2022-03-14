import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class Pod {
  podList = [];
  podDetail = {};
  totalElements = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadPodList = async (type) => {
    await axios
      .get(`${SERVER_URL}/pods`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          const list = res.data.data.filter(
            (item) => item.projectType === type
          );
          this.podList = list;
          this.podDetail = list[0];
          this.totalElements = list.length;
        });
      });
  };
}

const podStore = new Pod();
export default podStore;
