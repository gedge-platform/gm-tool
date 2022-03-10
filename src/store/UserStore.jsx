import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class User {
  userList = [];
  userDetail = {};

  constructor() {
    makeAutoObservable(this);
  }

  loadUserList = async () => {
    await axios
      .get(`${SERVER_URL}/members`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        console.log(res);
        runInAction(() => {
          this.userList = res.data.data;
          this.userDetail = res.data.data[0];
        });
      });
  };
}

const userrStore = new User();
export default userrStore;
