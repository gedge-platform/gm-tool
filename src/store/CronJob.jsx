import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL2 } from "../config";

class CronJob {
  cronJobList = [];
  cronJobDetail = {};
  totalElements = 0;
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
  cronjobInvolvesJobs = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadCronJobList = async (type) => {
    await axios.get(`${SERVER_URL2}/cronjobs`).then(({ data: { data } }) => {
      runInAction(() => {
        const list = data.filter((item) => item.projectType === type);
        this.cronJobList = list;
        // this.cronJobDetail = list[0];
        this.totalElements = list.length;
      });
    });
    this.loadCronJobDetail(
      this.cronJobList[0].name,
      this.cronJobList[0].cluster,
      this.cronJobList[0].project
    );
  };

  loadCronJobDetail = async (name, cluster, project) => {
    await axios
      .get(
        `${SERVER_URL2}/cronjobs/${name}?cluster=${cluster}&project=${project}`
      )
      .then(({ data: { data, involvesData } }) => {
        runInAction(() => {
          this.cronJobDetail = data;
          this.label = data.label;
          this.annotations = data.annotations;
          this.cronjobInvolvesJobs = involvesData.jobs;
          if (data.events !== null) {
            this.events = data.events;
          } else {
            this.events = null;
          }
        });
      });
  };
}

const cronJobStore = new CronJob();
export default cronJobStore;
