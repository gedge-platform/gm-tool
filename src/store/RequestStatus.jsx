import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { SERVER_URL3 } from "../config";

class RequestStatus {
  requestList = [];
  cluster = [{}];

  constructor() {
    makeAutoObservable(this);
  }

  loadRequestList = async () => {
    await axios.get(`${SERVER_URL3}`).then(({ data }) => {
      runInAction(() => {
        this.requestList = data;
        console.log(this.requestList);
      });
    });
  };
}

const requestStatusStore = new RequestStatus();
export default requestStatusStore;
