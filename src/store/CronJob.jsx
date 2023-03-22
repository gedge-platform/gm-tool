import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";
import { getItem } from "../utils/sessionStorageFn";

class CronJob {
  currentPage = 1;
  totalPages = 1;
  resultList = {};
  viewList = null;
  adminList = [];
  pCronjobList = [];
  cronJobList = [];
  cronJobDetail = [];
  totalElements = 0;
  label = [];
  containers = [];
  annotations = [];
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

  initViewList = () => {
    runInAction(() => {
      this.viewList = null;
    })
  }

  goPrevPage = () => {
    runInAction(() => {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.paginationList();
        this.loadCronJobDetail(
          this.viewList[0].name,
          this.viewList[0].cluster,
          this.viewList[0].project
        );
      }
    });
  };

  goNextPage = () => {
    runInAction(() => {
      if (this.totalPages > this.currentPage) {
        this.currentPage = this.currentPage + 1;
        this.paginationList();
        this.loadCronJobDetail(
          this.viewList[0].name,
          this.viewList[0].cluster,
          this.viewList[0].project
        );
      }
    });
  };

  paginationList = () => {
    if (this.cronJobList !== null) {
      this.viewList =  this.cronJobList.slice((this.currentPage-1)*10, this.currentPage*10);
    }
  }

  loadCronJobList = async () => {
    let { id, role } = getItem("user");
    role === "SA" ? (id = id) : (id = "");
    await axios
      .get(`${SERVER_URL}/cronjobs?user=${id}`)
      .then((res) => {
        runInAction(() => {

          if (res.data.data !== null) {
            this.cronJobList = res.data.data;
            this.cronJobDetail = res.data.data[0];
            this.totalPages = Math.ceil(res.data.data.length/10); 
            this.totalElements = res.data.data.length;
          } else {
            this.cronJobList = [];
          }
        });
      })
      .then(() => {
        this.paginationList();
        this.cronJobList === null
          ? this.cronJobDetail === null
          : this.loadCronJobDetail(
              this.cronJobList[0].name,
              this.cronJobList[0].cluster,
              this.cronJobList[0].project
            );
      });
  };

  loadAdminCronJobList = async () => {
    let { id, role } = getItem("user");
    role === "SA" ? (id = id) : (id = "");
    await axios
      .get(`${SERVER_URL}/cronjobs?user=${id}`)
      .then((res) => {
        runInAction(() => {
          this.adminList = res.data.data;
          this.cronJobList = this.adminList.filter(
            (data) => data.cluster === "mec(ilsan)"
          );
          this.cronJobDetail = this.cronJobList[0];
          this.totalPages = Math.ceil(this.cronJobList.length/10); 
          this.totalElements = this.cronJobList.length;
        });
      })
      .then(() => {
        this.paginationList();
        this.adminList.length === 0
          ? this.cronJobDetail === null
          : this.loadCronJobDetail(
              this.cronJobList[0].name,
              this.cronJobList[0].cluster,
              this.cronJobList[0].project
          );
      });
  };

  loadCronJobDetail = async (name, cluster, project) => {
    await axios
      .get(
        `${SERVER_URL}/cronjobs/${name}?cluster=${cluster}&project=${project}`
      )
      .then(({ data: { data, involvesData } }) => {
        runInAction(() => {
          this.cronJobDetail = data;
          this.containers = data.containers;
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

  deleteCronJob = async (cronjobName, callback) => {
    axios
      .delete(`${SERVER_URL}/cronjobs/${cronjobName}`)

      .then((res) => {
        if (res.status === 201)
          swalError("CronJob이 삭제되었습니다.", callback);
      })
      .catch((err) => swalError("삭제에 실패하였습니다."));
  };
}

const cronJobStore = new CronJob();
export default cronJobStore;
