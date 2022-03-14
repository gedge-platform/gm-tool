import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { BASIC_AUTH, LOCAL_VOLUME_URL } from "../config";

class Volume {
    pVolumes = [];
    pVolume = {
        annotations: {
            "kubectl.kubernetes.io/last-applied-configuration": {},
            "pv.kubernetes.io/bound-by-controller": {},
        },
    };
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
                    this.totalElements = this.pVolumes.length;
                });
            });
        this.loadPVolume(this.pVolumes[0].name, this.pVolumes[0].cluster);
    };

    loadPVolume = async (volumeName, cluster) => {
        await axios
            .get(`${LOCAL_VOLUME_URL}/pvs/${volumeName}?cluster=${cluster}`, {
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
