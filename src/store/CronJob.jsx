import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class CronJob {
  cronJobList = [];
  cronJobDetail = {};
  totalElements = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadCronJobList = async (type) => {
    await axios
      .get(`${SERVER_URL}/cronjobs`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          const list = res.data.data.filter(
            (item) => item.projectType === type
          );
          this.cronJobList = list;
          this.cronJobDetail = list[0];
          this.totalElements = list.length;
        });
      });
  };
}

const cronJobStore = new CronJob();
export default cronJobStore;
