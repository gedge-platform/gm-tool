import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, SERVER_URL } from "../config";

class Cluster {
    clusterList = [];
    clusterDetail = {};

    constructor() {
        makeAutoObservable(this);
    }

    loadClusterList = async () => {
        await axios
            .get(`${SERVER_URL}/clusters`, {
                auth: BASIC_AUTH,
            })
            .then((res) => {
                runInAction(() => {
                    this.clusterList = res.data.data;
                    this.clusterDetail = res.data.data[0];
                });
            });
    };
}

const clusterStore = new Cluster();
export default clusterStore;
