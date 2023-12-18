import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { GSLINK_URL } from "../config";
import { getItem } from "../utils/sessionStorageFn";
import { swalError } from "../utils/swal-utils";

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

  gsLinkInfo = {
    user_name: "",
    workspace_name: "",
    project_name: "",
    namespace_name: "",
    status: "active",
    source_type: "pod",
    parameters: {
      source_cluster: "",
      source_name: "",
      source_service: "",
      target_cluster: "",
    },
  };

  setGsLinkInfo = (name, value) => {
    runInAction(() => {
      this.gsLinkInfo[name] = value;
    });
  };

  initGsLinkInfo = () => {
    this.gsLinkInfo = {
      user_name: "",
      workspace_name: "",
      project_name: "",
      namespace_name: "",
      status: "active",
      source_type: "pod",
      parameters: {
        source_cluster: "",
        source_name: "",
        source_service: "",
        target_cluster: "",
      },
    };
  };

  nodeList = [];
  setLodeList = (value) => {
    runInAction(() => {
      this.nodeList = value;
    });
  };

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
        console.log(res);
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

  postGsLink = async (data, callback) => {
    let { id } = getItem("user");
    console.log(id);
    console.log(this.gsLinkInfo);
    const body = {
      user_name: "",
      workspace_name: "",
      project_name: "",
      namespace_name: "",
      status: "active",
      source_type: "pod",
      parameters: {
        source_cluster: "",
        source_name: "",
        source_service: "",
        target_cluster: "",
      },
    };
    await axios
      .post(`${GSLINK_URL}`, body)
      .then((res) => {
        console.log(res);
        runInAction(() => {
          if (res.status === 200) {
            swalError("생성", callback);
            return true;
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

const gsLinkStore = new GsLink();
export default gsLinkStore;
