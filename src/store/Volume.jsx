import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, LOCAL_VOLUME_URL } from "../config";

class Volume {
    pVolumes = [];
    pvolume = {};
    totalElements = 0;
    // pVolumeInfo = {};
    pvClaim = {};

    constructor() {
        makeAutoObservable(this);
    }

    loadPVolumes = async () => {
        await axios
            .get(`${LOCAL_VOLUME_URL}/pvs`, {
                auth: BASIC_AUTH,
            })
            .then((res) => {
                runInAction(() => {
                    this.pVolumes = res.data.data;
                    this.pVolume = this.pVolumes[0];
                    this.totalElements = this.pVolumes.length;
                });
            });
    };

    loadPVolume = async (volumeName) => {
        await axios
            .get(`${LOCAL_VOLUME_URL}/pvs/${volumeName}`, {
                auth: BASIC_AUTH,
            })
            .then((res) => {
                runInAction(() => {
                    this.pVolume = res.data.data;
                });
            });
    };

    loadPVClaim = async (pvClaimName, cluster, project) => {
        await axios
            .get(
                `${LOCAL_VOLUME_URL}/pvcs/${pvClaimName}?cluster=${cluster}&project=${project}`,
                {
                    auth: BASIC_AUTH,
                }
            )
            .then((res) => {
                runInAction(() => {
                    this.pvClaim = res.data.data;
                });
            });
    };
}

const volumeStore = new Volume();
export default volumeStore;
