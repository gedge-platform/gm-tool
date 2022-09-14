import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { SERVER_URL } from "../config";
import { getItem } from "../utils/sessionStorageFn";

class Job {
  currentPage = 1;
  totalPages = 1;
  resultList = {};
  viewList = [];
  pJobList = [];
  jobList = [];
  containers = [];
  depServicesPort = [
    {
      name: "",
      port: 0,
      protocol: "",
    },
  ];
  involvesPodList = [
    {
      metadata: {
        name: "",
      },
      status: {
        phase: "",
        hostIP: "",
        podIP: "",
      },
      spec: {
        nodeName: "",
      },
    },
  ];
  ownerReferences = {};

  totalElements = 0;
  labels = {};
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

  constructor() {
    makeAutoObservable(this);
  }

  goPrevPage = () => {
    runInAction(() => {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.setViewList(this.currentPage - 1);
        this.loadJobDetail(
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
        this.setViewList(this.currentPage - 1);
        this.loadJobDetail(
          this.viewList[0].name,
          this.viewList[0].cluster,
          this.viewList[0].project
        );
      }
    });
  };

  setCurrentPage = (n) => {
    runInAction(() => {
      this.currentPage = n;
    });
  };

  setTotalPages = (n) => {
    runInAction(() => {
      this.totalPages = n;
    });
  };

  convertList = (apiList, setFunc) => {
    runInAction(() => {
      let cnt = 1;
      let totalCnt = 0;
      let tempList = [];
      let cntCheck = true;
      this.resultList = {};

      Object.entries(apiList).map(([_, value]) => {
        cntCheck = true;
        tempList.push(toJS(value));
        cnt = cnt + 1;
        if (cnt > 10) {
          cntCheck = false;
          cnt = 1;
          this.resultList[totalCnt] = tempList;
          totalCnt = totalCnt + 1;
          tempList = [];
        }
      });

      if (cntCheck) {
        this.resultList[totalCnt] = tempList;
        totalCnt = totalCnt === 0 ? 1 : totalCnt + 1;
      }

      this.setTotalPages(totalCnt);
      setFunc(this.resultList);
      this.setViewList(0);
    });
  };

  setJobList = (list) => {
    runInAction(() => {
      this.jobList = list;
    });
  };

  setViewList = (n) => {
    runInAction(() => {
      this.viewList = this.jobList[n];
    });
  };

  loadJobList = async () => {
    // let { id, role } = getItem("user");
    // role === "SA" ? (id = id) : (id = "");
    await axios
      // .get(`${SERVER_URL}/jobs?user=${id}`)
      .get(`${SERVER_URL}/jobs`)
      .then((res) => {
        runInAction(() => {
          this.jobList = res.data.data ? res.data.data : 0;
          this.jobDetail = this.jobList[0];
          this.totalElements =
            res.data.data === null ? 0 : res.data.data.length;
        });
      })
      .then(() => {
        this.convertList(this.jobList, this.setJobList);
      });
    this.loadJobDetail(
      this.viewList[0].name,
      this.viewList[0].cluster,
      this.viewList[0].project
    );
  };

  loadJobDetail = async (name, cluster, project) => {
    await axios
      .get(`${SERVER_URL}/jobs/${name}?cluster=${cluster}&project=${project}`)
      .then(({ data: { data, involves } }) => {
        // console.log(data);
        // console.log(involves);
        runInAction(() => {
          this.jobDetailData = data !== null ? data : 0;
          this.jobDetailInvolves = involves ? involves : 0;
          this.labels = data.label ? data.label : null;
          this.annotations = data.annotations !== "" ? data.annotations : null;
          this.involvesPodList = involves.podList;
          this.ownerReferences = involves.ownerReferences;
          this.containers = data.containers;
          console.log(this.containers);

          if (data.events !== null) {
            this.events = data.events;
          } else {
            this.events = null;
          }
        });
      });
  };
}

const jobStore = new Job();
export default jobStore;
