import { makeAutoObservable, runInAction } from "mobx";

class MenuStore {

    menu1 = "open"
    menu2 = ""
    menu3 = ""

    constructor() {
        makeAutoObservable(this);
        // this.CallApi = new CallApi();
    }

    handleMenu1() {
        let viewState = ""

        if (this.menu1 === "") {
            viewState = "open"
        } else {
            viewState = ""
        }

        runInAction(() => {
            this.menu1 = viewState
        })
    }

    handleMenu2() {
        let viewState = ""

        if (this.menu2 === "") {
            viewState = "open"
        } else {
            viewState = ""
        }

        runInAction(() => {
            this.menu2 = viewState
        })
    }

    handleMenu3() {
        let viewState = ""

        if (this.menu3 === "") {
            viewState = "open"
        } else {
            viewState = ""
        }

        runInAction(() => {
            this.menu3 = viewState
        })
    }

    // async getWorkspaceList(param) {
    //     runInAction(() => {
    //         this.workspaceList = apiList.data;
    //         // this.dataCheck = false
    //     });
    // }

}
const menuStore = new MenuStore();
export default menuStore;