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
        runInAction(() => {
          this.userList = res.data.data;
          this.userDetail = res.data.data[0];
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
