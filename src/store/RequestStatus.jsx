import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { REQUEST_URL } from "../config";

class RequestStatus {
  requestList = [];
  cluster = [{}];

  constructor() {
    makeAutoObservable(this);
  }

  loadRequestList = async () => {
    await axios.get(`${REQUEST_URL}`).then(({ data }) => {
      runInAction(() => {
        this.requestList = data;
      });
    });
  };
}

const requestStatusStore = new RequestStatus();
export default requestStatusStore;
