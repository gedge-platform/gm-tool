import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { SERVER_URL } from "@/config.jsx";
import { getItem } from "../utils/sessionStorageFn";

class UserStore {
  userList = [];
  userDetail = {};
  currentPage = 1;
  totalPages = 1;
  constructor() {
    makeAutoObservable(this);
  }

  loadUserList = async () => {
    await axios
      .get(`${SERVER_URL}/users`, {
        auth: getItem("auth"),
      })
      .then(({ data: { data } }) =>
        runInAction(() => {
          this.userList = data;
          this.userDetail = data[0];
        })
      );
  };

  setDetail = (id) => {
    runInAction(() => {
      this.userDetail = this.userList.find((user) => user.id === id);
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
const userStore = new UserStore();
export default userStore;
