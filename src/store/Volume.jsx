import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, LOCAL_VOLUME_URL } from "../config";

class Volume {
    volumeList = [];
    volumeDetail = {};
    totalElements = 0;

    constructor() {
        makeAutoObservable(this);
    }

    loadVolumeList = async () => {
        await axios
            .get(`${LOCAL_VOLUME_URL}/pvs`, {
                auth: BASIC_AUTH,
            })
            .then((res) => {
                runInAction(() => {
                    const list = res.data.data;
                    this.volumeList = list;
                    this.volumeDetail = list[0];
                    this.totalElements = list.length;
                });
            });
    };
}

const volumeStore = new Volume();
export default volumeStore;
