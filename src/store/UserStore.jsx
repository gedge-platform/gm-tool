import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class User {
  userList = [];
  userDetail = {};
  user = {
    id: "",
    role: "",
  };

  totalElements = 0;
  currentPage = 1;
  totalPages = 1;
  resultList = {};
  viewList = [];

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (user) => {
    runInAction(() => {
      this.user = user;
      this.role = user.role;
    });
  };

  goPrevPage = () => {
    runInAction(() => {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.setViewList(this.currentPage - 1);
        this.loadUserDetail(this.viewList[0].memberId);
      }
    });
  };

  goNextPage = () => {
    runInAction(() => {
      if (this.totalPages > this.currentPage) {
        this.currentPage = this.currentPage + 1;
        this.setViewList(this.currentPage - 1);
        this.loadUserDetail(this.viewList[0].memberId);
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

  setUserList = (list) => {
    runInAction(() => {
      this.userList = list;
    });
  };

  setViewList = (n) => {
    runInAction(() => {
      this.viewList = this.userList[n];
    });
  };

  loadUserList = async () => {
    await axios
      .get(`${SERVER_URL}/members`, {
        auth: BASIC_AUTH,
      })
      .then(({ data: { data } }) => {
        runInAction(() => {
          this.userList = data;
          this.totalElements = data.length;
          // this.userDetail = res.data.data[0];
        });
      })
      .then(() => {
        this.convertList(this.userList, this.setUserList);
      })
      .then(() => {
        this.loadUserDetail(this.viewList[0].memberId);
      });
  };

  loadUserDetail = async (memberId) => {
    await axios
      .get(`${SERVER_URL}/members/${memberId}`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          this.userDetail = res.data.data;
        });
      });
  };

  postUser = async (data) => {
    const body = {
      ...data,
      memberEnabled: 0,
    };
    return await axios
      .post(`${SERVER_URL}/members`, body, {
        auth: BASIC_AUTH,
      })
      .then(({ status }) => {
        if (status === 201) return true;
        return false;
      })
      .catch((err) => false);
  };
}

const userStore = new User();
export default userStore;
