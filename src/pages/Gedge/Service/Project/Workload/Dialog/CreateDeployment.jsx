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

  const {
    initLabelList,
    addLabelList,
    removeLabelList,
    annotationList,
    initAnnotationList,
    addAnnotationList,
    removeAnnotationList,
    deploymentInfo,
    initDeploymentInfo,
    setDeploymentInfo,
    removeContainer,
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

  const [label, setLabel] = useState({ key: "", value: "" });
  const [annotation, setAnnotation] = useState({ key: "", value: "" });
  const [containerIndex, setContainerIndex] = useState(1);
  const [projectDisable, setProjectDisable] = useState(true);
  const [prioritytDisable, setPriorityDisable] = useState(true);
  const [prioritytPodDisable, setPrioritytPodDisable] = useState(true);
  const [priority, setPriority] = useState({
    name: "GLowLatencyPriority",
    options: {
      type: "fromNode",
      //data: {}
    },
  });

  // const template = {
  //   apiVersion: "apps/v1",
  //   kind: "Deployment",
  //   metadata: {
  //     name: deploymentName,
  //     namespace: project,
  //     labels: {
  //       app: deploymentName,
  //     },
  //   },
  //   spec: {
  //     replicas: podReplicas,
  //     selector: {
  //       matchLabels: {
  //         app: deploymentName,
  //       },
  //     },
  //     template: {
  //       metadata: {
  //         labels: {
  //           app: deploymentName,
  //         },
  //       },
  //       spec: {
  //         containers: [
  //           {
  //             image: containerImage,
  //             name: containerName,
  //             ports: [
  //               {
  //                 containerPort: Number(containerPort),
  //               },
  //             ],
  //           },
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
    initDeploymentInfo();
    initLabelList();
    initAnnotationList();
    setLabel({ key: "", value: "" });
    setAnnotation({ key: "", value: "" });
    setProjectDisable(true);
    setPriorityDisable(true);
    setPrioritytPodDisable(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const createDeployment = () => {
    console.log("createDeployment YAML 필요");

    //setProjectDisable(true);

    // postDeploymentGM(require("json-to-pretty-yaml").stringify(template));
    // handleClose();
    // props.reloadFunc && props.reloadFunc();
  };

  const onClickStepTwo = (e) => {
    setStepValue(2);
  };

  const onClickStepThree = (e) => {
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
  }, []);

  useEffect(() => {
    loadPVClaims();
  }, []);

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
          <DeploymentYaml />
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
              <ButtonNext onClick={() => CreateDeployment()}>
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
