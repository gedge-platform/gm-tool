import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { BASIC_AUTH, SERVER_URL2, SERVER_URL4 } from "../config";
import { getItem } from "@/utils/sessionStorageFn";
import { swalError } from "../utils/swal-utils";

class ServiceAdminDashboard {
  constructor() {
    makeAutoObservable(this);
  }

  loadServiceAdminDashboard = async () => {
    await axios.get(`${SERVER_URL4}/serviceDashboard`).then((res) => {
      runInAction(() => {
        console.log(res);
      });
    });
  };
}
const serviceAdminDashboardStore = new ServiceAdminDashboard();
export default serviceAdminDashboardStore;
