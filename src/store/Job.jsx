import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL2 } from "../config";

class Job {
  jobList = [];
  jobDetailData = {
    label: {
      app: "",
      // ceph-version: "",
      // rook-version: "",
      rook_cluster: "",
    },
    annotations: "",
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
  jobDetailInvolves = {
    podList: [
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
    ],
    event: "",
  };
  totalElements = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadJobList = async (type) => {
    await axios
      .get(`${SERVER_URL2}/jobs`, {
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
      .get(
        `${SERVER_URL2}/jobs/${name}?cluster=${cluster}&project=${project}`,
        {
          auth: BASIC_AUTH,
        }
      )
      .then((res) => {
        runInAction(() => {
          this.jobDetailData = res.data.data;
          this.jobDetailInvolves = res.data.involves;
        });
      });
  };
}

const jobStore = new Job();
export default jobStore;
