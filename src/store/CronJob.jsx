import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

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
        `${SERVER_URL}/cronjobs/${name}?cluster=${cluster}&project=${project}`,
        {
          auth: BASIC_AUTH,
        }
      )
      .then((res) => {
        runInAction(() => {
          this.cronJobDetail = res.data.data;
          this.label = res.data.data.label;
          this.annotations = res.data.data.annotations;
          this.cronjobInvolvesJobs = res.data.involvesData.jobs;

          if (res.data.data.events !== null) {
            this.events = res.data.data.events;
          } else {
            this.events = null;
          }
        });
      });
  };
}

const cronJobStore = new CronJob();
export default cronJobStore;
