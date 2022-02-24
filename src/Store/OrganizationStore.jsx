import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { SERVER_URL_2, SERVER_URL_4 } from "@/config.jsx";
import { getItem } from "../utils/sessionStorageFn";
class OrganizationStore {
  //네트워크 선택
  netList = [];
  netSelect = "";
  //조직 리스트
  orgList = [];
  orgInfo = this.orgList[0];
  filterOrgList = this.orgList;

  orgCAList = ["SQLite"];

  //org 생성
  orgName = "";
  orgMSPName = "";
  orgSelectCA = this.orgCAList[0];

  totalPages = Math.ceil(this.filterOrgList.length / 10);
  totalElements = this.filterOrgList.length;
  currentPage = 1;

  constructor() {
    makeAutoObservable(this);
  }

  loadOrg = async () => {
    await axios
      .get(`${SERVER_URL_2}/org`, {
        auth: getItem("auth"),
      })
      .then(({ data }) =>
        runInAction(() => {
          this.netList = [
            ...new Set(Object.keys(data).map((org) => org.split("/")[0])),
          ];
          this.orgList = Object.keys(data).map((org) => ({
            name: org.split("/")[1],
            orgId: org.split("/")[1],
            import: "Y",
            network: org.split("/")[0],
          }));

          this.filterOrgList = Object.keys(data).map((org) => ({
            name: org.split("/")[1],
            orgId: org.split("/")[1],
            import: "Y",
            network: org.split("/")[0],
          }));
          this.setDetail({
            network: Object.keys(data)[0].split("/")[0],
            name: Object.keys(data)[0].split("/")[1],
          });
        })
      )
      .catch((e) => console.log(e));
  };

  setDetail = async (org) => {
    await axios
      .get(`${SERVER_URL_2}/org/${org.network}/${org.name}`, {
        auth: getItem("auth"),
      })
      .then(({ data }) => {
        runInAction(() => {
          this.orgInfo = data.items;
        });
      })
      .catch((e) => console.log(e));
  };

  setCA = (ca) => {
    runInAction(() => {
      this.orgSelectCA = ca;
    });
  };

  setNet = (net) => {
    runInAction(() => {
      this.netSelect = net;
    });
  };

  createOrg = (org) => {
    const {
      orgName,
      orgMSPName,
      caName,
      orgSelectCA,
      caOrdererID,
      caOrdererPW,
      netSelect,
    } = org;

    const newOrg = {
      id: this.orgList.length - 1,
      organizationName: orgName,
      organizationID: orgName,
      isImport: "N",
      network: netSelect,
      orgMSPName,
      caName,
      orgSelectCA,
      caOrdererID,
      caOrdererPW,
    };

    console.log(org);

    runInAction(() => {
      this.orgList.push(newOrg);
      this.filterOrgList.push(newOrg);
      this.totalPages = Math.ceil(this.filterOrgList.length / 10);
      this.totalElements = this.filterOrgList.length;
    });
  };
  searchKeyword = (keyword) => {
    runInAction(() => {
      this.filterOrgList = this.orgList.filter(
        (org) => org.organizationName.indexOf(keyword) !== -1
      );
    });
  };

  filterNetwork = (network) => {
    runInAction(() => {
      if (network === "") {
        this.filterOrgList = this.orgList;
      } else {
        this.filterOrgList = this.orgList.filter(
          (org) => org.network === network
        );
      }
    });
  };

  deleteOrg = () => {
    runInAction(() => {
      this.filterOrgList = this.orgList.filter(
        (org) => org.id !== this.orgInfo.id
      );
      this.orgInfo = this.filterOrgList[0];
      this.totalElements--;
      this.totalPages = Math.ceil(this.filterOrgList.length / 10);
    });
  };

  goPrevPage = () => {
    runInAction(() => {
      if (this.currentPage === 1) {
        alert("첫 페이지입니다!");
        return;
      }
      this.currentPage--;
    });
  };
  goNextPage = () => {
    runInAction(() => {
      if (this.currentPage === this.totalPages) {
        alert("마지막 페이지입니다!");
        return;
      }
      this.currentPage++;
    });
  };
}
const organizationStore = new OrganizationStore();
export default organizationStore;
