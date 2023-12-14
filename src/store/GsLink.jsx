import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { GSLINK_URL } from "../config";

class GsLink {
  gsLinkList = [];

  totalElements = 0;
  currentPage = 1;
  totalPages = 1;
  resultList = {};
  viewList = null;

  constructor() {
    makeAutoObservable(this);
  }

  initViewList = () => {
    runInAction(() => {
      this.viewList = null;
    });
  };

  goPrevPage = () => {
    runInAction(() => {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.paginationList();
      }
    });
  };

  goNextPage = () => {
    runInAction(() => {
      if (this.totalPages > this.currentPage) {
        this.currentPage = this.currentPage + 1;
        this.paginationList();
      }
    });
  };

  paginationList = () => {
    runInAction(() => {
      if (this.gsLinkList !== null) {
        this.viewList = this.gsLinkList.slice(
          (this.currentPage - 1) * 10,
          this.currentPage * 10
        );
      }
    });
  };

  loadGsLinkList = async () => {
    await axios
      .get(`${GSLINK_URL}`)
      .then((res) => {
        runInAction(() => {
          if (res.data !== null) {
            this.gsLinkList = res.data;
            this.totalPages = Math.ceil(res.data.length / 10);
            this.totalElements = res.data.length;
          } else {
            this.gsLinkList = [];
            this.totalPages = "1";
          }
        });
      })
      .then(() => {
        this.paginationList();
      })
      .catch((error) => {
        this.gsLinkList = [];
        this.paginationList();
      });
  };
}

const gsLinkStatusStore = new GsLink();
export default gsLinkStatusStore;
