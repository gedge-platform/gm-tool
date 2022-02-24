import { makeAutoObservable, runInAction } from "mobx";

class ChaincodesStore {

    networkList = [];

    constructor() {
        makeAutoObservable(this);
        this.CallApi = new CallApi();
    }

    // async getWorkspaceList(param) {
    //     runInAction(() => {
    //         this.workspaceList = apiList.data;
    //         // this.dataCheck = false
    //     });
    // }

}
const chaincodesStore = new ChaincodesStore();
export default chaincodesStore;