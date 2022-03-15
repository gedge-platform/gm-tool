import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class Job {
  jobList = [];
  jobDetail = {};
  totalElements = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadJobList = async (type) => {
    await axios
      .get(`${SERVER_URL}/jobs`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          const list = res.data.data.filter(
            (item) => item.projectType === type
          );
          this.jobList = list;
          this.jobDetail = list[0];
          this.totalElements = list.length;
        });
      });
  };
}

const jobStore = new Job();
export default jobStore;
