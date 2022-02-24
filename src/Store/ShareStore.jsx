import { makeAutoObservable, runInAction } from "mobx";

class ShareStore {
  shareHeight = 2;

  constructor() {
    makeAutoObservable(this);
    // this.CallApi = new CallApi();
  }

  height(value) {
    const height = value;
    runInAction(() => {
      this.shareHeight = height;
    });
  }

  // async getWorkspaceList(param) {
  //     runInAction(() => {
  //         this.workspaceList = apiList.data;
  //         // this.dataCheck = false
  //     });
  // }
}
const shareStore = new ShareStore();
export default shareStore;
