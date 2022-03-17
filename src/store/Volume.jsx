import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { BASIC_AUTH, LOCAL_VOLUME_URL } from "../config";

class Volume {
  pVolumes = [];
  pVolume = {};
  totalElements = 0;
  pVolumeYamlFile = "";
  pVolumeMetadata = {};
  pvClaims = [];
  pvClaim = {};
  pvClaimYamlFile = "";
  pvClaimAnnotations = {};
  pvClaimLables = {};
  pvClaimEvents = [];
  storageClasses = [];
  storageClass = {};

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
          this.pVolumeYamlFile = "";
          this.pVolumeMetadata = {};
          console.log(this.pVolume);
          console.log(this.pVolume.annotations);
          Object.entries(this.pVolume?.annotations).forEach(([key, value]) => {
            try {
              const YAML = require("json-to-pretty-yaml");
              this.pVolumeYamlFile = YAML.stringify(JSON.parse(value));
            } catch (e) {
              if (key && value) {
                this.pVolumeMetadata[key] = value;
              }
            }
          });
        });
      });
  };

  loadPVClaims = async () => {
    await axios
      .get(`${LOCAL_VOLUME_URL}/pvcs`, {
        auth: BASIC_AUTH,
      })
      .then((res) => {
        runInAction(() => {
          this.pvClaims = res.data.data;
          this.totalElements = this.pvClaims.length;
        });
      });
    this.loadPVClaim(
      this.pvClaims[0].name,
      this.pvClaims[0].clusterName,
      this.pvClaims[0].namespace
    );
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
          this.pvClaimYamlFile = "";
          this.pvClaimAnnotations = {};
          this.pvClaimLables = {};

          Object.entries(this.pvClaim?.label).map(([key, value]) => {
            this.pvClaimLables[key] = value;
          });

          Object.entries(this.pvClaim?.annotations).forEach(([key, value]) => {
            try {
              const YAML = require("json-to-pretty-yaml");
              this.pvClaimYamlFile = YAML.stringify(JSON.parse(value));
            } catch (e) {
              if (key && value) {
                this.pvClaimAnnotations[key] = value;
              }
            }
          });
        });
      });
  };
}

const volumeStore = new Volume();
export default volumeStore;
