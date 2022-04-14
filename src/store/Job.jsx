import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class Job {
  jobList = [];
  jobDetailData = {
    containers: [
      {
        name: "",
        image: "",
      },
    ],
    ownerReferences: [
      {
        name: "",
        apiVersion: "",
        kind: "",
      },
    ],
    conditions: [
      {
        status: "",
        type: "",
        lastProbeTime: "",
      },
    ],
  };
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
          // this.jobDetail = list[0];
          this.totalElements = list.length;
        });
      });
    this.loadJobDetail(
      this.jobList[0].name,
      this.jobList[0].cluster,
      this.jobList[0].project
    );
  };

  loadJobDetail = async (name, cluster, project) => {
    await axios
      .get(`${SERVER_URL}/jobs/${name}?cluster=${cluster}&project=${project}`, {
        auth: BASIC_AUTH,
      })
      .then(({ data: { data, involves } }) => {
        runInAction(() => {
          this.jobDetailData = data;
          this.jobDetailInvolves = involves;
          this.labels = data.label;
          this.annotations = data.annotations;
          this.involvesPodList = involves.podList;

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
