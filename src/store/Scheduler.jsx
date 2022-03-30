import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { REQUEST_URL, REQUEST_URL2 } from "../config";
import clusterStore from "./Cluster";
import * as FormData from "form-data";

class Scheduler {
  constructor() {
    makeAutoObservable(this);
  }

  postWorkload = (requestId, workspace, project, type) => {
    axios
      .post(REQUEST_URL, {
        request_id: requestId,
        workspaceName: workspace,
        projectName: project,
        type: type,
        status: "CREATED",
        date: new Date(),
      })
      .then((res) => {})
      .catch((e) => console.log(e.message));
  };

  postScheduler = (requestId, yaml, callback) => {
    const { clusters } = clusterStore;

    let formData = new FormData();

    formData.append("callbackUrl", `${REQUEST_URL2}`); // 수정 필요
    formData.append("requestId", requestId);
    formData.append("yaml", yaml);
    formData.append("clusters", JSON.stringify(clusters));

    axios
      .post(`http://101.79.4.15:32527/yaml`, formData)
      .then(function (response) {
        if (response.status === 200) {
          const popup = window.open(
            "",
            "Gedge scheduler",
            `width=${screen.width},height=${screen.height}`,
            "fullscreen=yes"
          );
          popup.document.open().write(response.data);
          popup.document.close();

          callback();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

const schedulerStore = new Scheduler();
export default schedulerStore;
