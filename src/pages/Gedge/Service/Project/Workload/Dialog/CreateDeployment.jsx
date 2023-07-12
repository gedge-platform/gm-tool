import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import DeploymentBasicInformation from "./DeploymentBasicInformation";
import DeploymentPodSettins from "./DeploymentPodSettins";
import { CTextField } from "@/components/textfields";
import FormControl from "@material-ui/core/FormControl";
import {
  deploymentStore,
  projectStore,
  schedulerStore,
  volumeStore,
  StorageClassStore,
} from "@/store";
import DeploymentYaml from "./DeploymentYaml";
import DeploymentPopup from "./DeploymentPopup";
import DeploymentVolumeSetting from "./DeploymentVolumeSetting";
import DeploymentVolumeYaml from "./DeploymentVolumeYaml";
import { swalError } from "@/utils/swal-utils";
import { CDialogNew } from "@/components/dialogs";
import { toJS } from "mobx";
import DeploymentAddContainer from "./DeploymentAddContainer";
import workspaceStore from "../../../../../../store/WorkSpace";
import clusterStore from "../../../../../../store/Cluster";
import podStore from "../../../../../../store/Pod";
import claimStore from "../../../../../../store/Claim";
import CreateDeploymentStepOne from "./CreateDeploymentStepOne";
import CreateDeploymentStepTwo from "./CreateDeploymentStepTwo";
import CreateDeploymentStepThree from "./CreateDeploymentStepThree";
import { values } from "lodash-es";

const Button = styled.button`
  background-color: #fff;
  border: 1px solid black;
  color: black;
  padding: 10px 35px;
  margin-right: 10px;
  border-radius: 4px;
  /* box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%); */
`;

const ButtonNext = styled.button`
  background-color: #0f5ce9;
  color: white;
  border: none;
  padding: 10px 35px;
  border-radius: 4px;
  /* box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%); */
`;

const DeleteButton = styled.button`
  margin: 0px 0px 0px 3px;
  overflow: hidden;
  position: relative;
  border: none;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  background: transparent;
  font: inherit;
  text-indent: 100%;
  cursor: pointer;

  &:hover {
    background: rgba(29, 161, 142, 0.1);
  }

  &:before,
  &:after {
    position: absolute;
    top: 15%;
    left: calc(50% - 0.0625em);
    width: 0.125em;
    height: 70%;
    border-radius: 0.125em;
    transform: rotate(45deg);
    background: currentcolor;
    content: "";
  }

  &:after {
    transform: rotate(-45deg);
  }
`;
const Table = styled.table`
  tbody {
    display: block;
    height: 170px;
    overflow: auto;
  }
  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  thead {
    width: calc(100% - 1em);
  }
`;

const CreateDeployment = observer((props) => {
  const { open } = props;
  const [open2, setOpen2] = useState(false);
  const [stepValue, setStepValue] = useState(1);

  const { containerInfo } = DeploymentAddContainer;

  const {
    initLabelList,
    annotationList,
    initAnnotationList,
    deploymentInfo,
    initDeploymentInfo,
    setDeploymentInfo,
    removeContainer,
    setPriority,
    setContent,
    setClearLA,
    setTemplate,
    labelsList,
    labels,
    annotations,
    labelInput,
    annotationInput,
    postDeploymentGM,
  } = deploymentStore;

  const {
    setVolumeName,
    setAccessMode,
    setVolumeCapacity,
    volumeCapacity,
    volumeName,
    selectClusters,
    accessMode,
  } = volumeStore;

  const {
    loadPVClaims,
    pvClaimListInDeployment,
    checkPVCInDeployment,
    setCheckPVCInDeployment,
  } = claimStore;

  const { setStorageClass, selectStorageClass } = StorageClassStore;
  const { postWorkload, postScheduler } = schedulerStore;
  const {
    loadWorkSpaceList,
    workSpaceList,
    loadWorkspaceDetail,
    selectClusterInfo,
  } = workspaceStore;
  const {
    loadProjectListInWorkspace,
    setProjectListinWorkspace,
    projectListinWorkspace,
  } = projectStore;
  const { loadClusterList, clusterList, clusterListInWorkspace } = clusterStore;
  const { podListInclusterAPI, podListIncluster } = podStore;

  const [containerIndex, setContainerIndex] = useState(1);
  const [projectDisable, setProjectDisable] = useState(true);
  const [prioritytDisable, setPriorityDisable] = useState(true);
  const [prioritytPodDisable, setPrioritytPodDisable] = useState(true);

  const template = {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: deploymentInfo.deploymentName,
      annotations: annotationInput,
      labels: labelInput,
      namespace: "default",
      // workspace: deploymentInfo.workspace,
      // project: deploymentInfo.project,
    },
    spec: {
      selector: {
        matchLabels: labelInput,
      },
      replicas: deploymentInfo.replicas,
      // selector: {
      //   matchLabels: {
      //     app: "",
      //   },
      // },
      template: {
        metadata: {
          annotations: annotationInput,
          labels: labelInput,
        },
        spec: {
          imagePullSecert: deploymentInfo.containers?.map((e) => {
            return { name: e.pullSecret };
          }),
          containers: deploymentInfo.containers?.map((e) => {
            return {
              name: e.containerName,
              image: e.containerImage,
              imagePullPolicy: e.pullPolicy,
              command: e.command,
              args: e.arguments,
              resources: {
                limits: {
                  // cpu: e.cpuLimit,
                  memory: e.memoryLimit + "Mi",
                },
                requests: {
                  cpu: e.cpuReservation + "m",
                  memory: e.memoryReservation + "Mi",
                },
              },
              ports: e.ports.map((i) => {
                return {
                  name: i.name,
                  containerPort: i.privateContainerPort,
                  protocol: i.protocol,
                };
              }),
              envForm: e.variables.map((i) => {
                const item = i.type + "Ref";
                return {
                  [item]: {
                    name: i.variableName,
                    // value: i.value,
                  },
                };
              }),
              env: e.variables.map((i) => {
                return {
                  name: i.variableName,
                  value: i.value,
                };
              }),
              volumeMounts: e.volumes.map((i) => {
                return {
                  mountPath: i.subPathInVolume,
                  name: i.name,
                };
              }),
            };
          }),
        },
      },
      volumes: [
        {
          name: deploymentInfo.volume,
          persistentVolumeClaim: deploymentInfo.pvcName,
        },
      ],
    },
  };
  // console.log("containerInfo :", deploymentInfo);
  // console.log("createDeploymentLabels : ", createDeploymentLabels);

  // const template = {
  //   apiVersion: "apps/v1",
  //   kind: "Deployment",
  //   metadata: {
  //     name: deploymentInfo.deploymentName,
  //     namespace: deploymentInfo.project,
  //     labels: {
  //       app: deploymentInfo.deploymentName,
  //     },
  //   },
  //   spec: {
  //     replicas: deploymentInfo.replicas,
  //     selector: {
  //       matchLabels: {
  //         app: deploymentInfo.deploymentName,
  //       },
  //     },
  //     template: {
  //       metadata: {
  //         labels: {
  //           app: deploymentInfo.deploymentName,
  //         },
  //       },
  //       spec: {
  //         containers: [
  //           // {
  //           //   image: containerImage,
  //           //   name: containerName,
  //           //   ports: [
  //           //     {
  //           //       containerPort: Number(containerPort),
  //           //     },
  //           //   ],
  //           // },
  //         ],
  //       },
  //     },
  //   },
  // };

  // const templatePVC = {
  //   apiVersion: "v1",
  //   kind: "PersistentVolumeClaim",
  //   metadata: {
  //     name: volumeName,
  //     namespace: project,
  //     labels: {
  //       app: "",
  //     },
  //   },
  //   spec: {
  //     storageClassName: selectStorageClass,
  //     accessModes: [accessMode],
  //     resources: {
  //       requests: {
  //         storage: Number(volumeCapacity) + "Gi",
  //       },
  //     },
  //   },
  // };

  const handleClose = () => {
    props.onClose && props.onClose();
    setStepValue(1);
    initDeploymentInfo();
    setClearLA();
    setProjectDisable(true);
    setPriorityDisable(true);
    setPrioritytPodDisable(true);
    setPriority({
      name: "GLowLatencyPriority",
      options: {
        type: "fromNode",
      },
    });
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const createDeployment = () => {
    console.log("createDeployment YAML 필요");
    console.log(toJS(deploymentInfo));
    // createDeployment(require("json-to-pretty-yaml").stringify(template));

    //setProjectDisable(true);

    postDeploymentGM(require("json-to-pretty-yaml").stringify(template));
    // handleClose();
    // props.reloadFunc && props.reloadFunc();
  };

  const onClickStepTwo = (e) => {
    setClearLA();
    setStepValue(2);
  };

  const onClickStepThree = (e) => {
    const LabelKeyArr = [];
    const AnnotationKeyArr = [];
    labels.map((data) => LabelKeyArr.push(data.labelKey));
    annotations.map((data) => AnnotationKeyArr.push(data.annotationKey));
    setStepValue(3);
  };

  const onClickStepFour = () => {
    setStepValue(4);
  };

  const onClickBackStepOne = () => {
    setStepValue(1);
  };

  const onClickBackStepTwo = () => {
    setStepValue(2);
  };

  const onClickBackStepThree = () => {
    setStepValue(3);
  };

  useEffect(() => {
    loadWorkSpaceList();
    loadPVClaims();
    if (stepValue === 4) {
      setTemplate(template);
      const YAML = require("json-to-pretty-yaml");
      setContent(YAML.stringify(template));
    }
    // }, [stepValue]);
  }, [stepValue]);

  const CreateDeploymentComponent = () => {
    if (stepValue === 1) {
      return (
        <>
          <CreateDeploymentStepOne />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "32px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "240px",
                justifyContent: "center",
              }}
            >
              <Button onClick={handleClose}>취소</Button>
              <ButtonNext onClick={(e) => onClickStepTwo(e)}>다음</ButtonNext>
            </div>
          </div>
        </>
      );
    } else if (stepValue === 2) {
      return (
        <>
          <CreateDeploymentStepTwo />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "32px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "300px",
                justifyContent: "center",
              }}
            >
              <Button onClick={() => onClickBackStepOne()}>이전</Button>
              <ButtonNext onClick={() => onClickStepThree()}>다음</ButtonNext>
            </div>
          </div>
        </>
      );
    } else if (stepValue === 3) {
      return (
        <>
          <CreateDeploymentStepThree />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "32px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "300px",
                justifyContent: "center",
              }}
            >
              <Button onClick={() => onClickBackStepTwo()}>이전</Button>
              <ButtonNext onClick={() => onClickStepFour()}>다음</ButtonNext>
            </div>
          </div>
        </>
      );
    } else if (stepValue === 4) {
      return (
        <>
          <DeploymentYaml labelsList={labelsList} />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "32px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "300px",
                justifyContent: "center",
              }}
            >
              <Button onClick={() => onClickBackStepThree()}>이전</Button>
              <ButtonNext onClick={createDeployment}>
                Create Deployment
              </ButtonNext>
            </div>
          </div>
        </>
      );
    } else <DeploymentPopup />;
  };

  return (
    <CDialogNew
      id="myDialog"
      open={open}
      maxWidth="md"
      title={"Create Deployment"}
      onClose={handleClose}
      bottomArea={false}
      modules={["custom"]}
    >
      {CreateDeploymentComponent()}
    </CDialogNew>
  );
});
export default CreateDeployment;
