import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import {
  deploymentStore,
  projectStore,
  schedulerStore,
  volumeStore,
  StorageClassStore,
} from "@/store";
import DeploymentYaml from "./DeploymentYaml";
import DeploymentPopup from "./DeploymentPopup";
import { CDialogNew } from "@/components/dialogs";
import DeploymentAddContainer from "./DeploymentAddContainer";
import workspaceStore from "../../../../../../store/WorkSpace";
import clusterStore from "../../../../../../store/Cluster";
import podStore from "../../../../../../store/Pod";
import claimStore from "../../../../../../store/Claim";
import CreateDeploymentStepOne from "./CreateDeploymentStepOne";
import CreateDeploymentStepTwo from "./CreateDeploymentStepTwo";
import CreateDeploymentStepThree from "./CreateDeploymentStepThree";
import { swalError } from "../../../../../../utils/swal-utils";

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
  const [stepValue, setStepValue] = useState(1);

  const {
    setContent,
    setClearLA,
    setTemplate,
    labelsList,
    labels,
    annotations,
    labelInput,
    annotationInput,
    postDeploymentGM,
    keyValuePair,
    secretConfigmap,
    deployment,
    resetDeployment,
    postGLowLatencyPriority,
    postGSelectedClusterPriority,
    postGMostRequestPriority,
    postGSetClusterPriority,
  } = deploymentStore;

  const { loadPVClaims } = claimStore;

  const { loadWorkSpaceList } = workspaceStore;

  const template = {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: deployment.deploymentName,
      annotations: annotationInput,
      labels: labelInput,
      namespace: deployment.workspacetag,
    },
    spec: {
      selector: {
        matchLabels: labelInput,
      },
      replicas: deployment.replicas,
      template: {
        metadata: {
          annotations: annotationInput,
          labels: labelInput,
        },
        spec: {
          // imagePullSecrets: [{ name: "my" }],
          imagePullSecret: deployment.containers?.map((e) => {
            return { name: e.pullSecret };
          }),
          containers: deployment.containers?.map((e) => {
            return {
              name: e.containerName,
              image: e.containerImage,
              imagePullPolicy: e.pullPolicy,
              command: e.command.length !== 0 ? e.command.split(/[\s,]+/) : [],
              args: e.arguments.length !== 0 ? e.arguments.split(/[\s,]+/) : [],
              resources: {
                limits: {
                  cpu: e.cpuLimit + "m",
                  memory: e.memoryLimit + "Mi",
                  "nvidia.com/gpu": e.NVIDIAGPU,
                },
                requests: {
                  cpu: e.cpuReservation + "m",
                  memory: e.memoryReservation + "Mi",
                },
              },
              ports: e.ports.map((i) => {
                return {
                  name: i.name,
                  containerPort: parseInt(i.privateContainerPort),
                  protocol: i.protocol,
                };
              }),
              envFrom: secretConfigmap.map((i) => {
                // {
                //   if (i.type === "secret") {
                //     return { [i.type + "Ref"]: { name: i.variableName } };
                //   } else if (i.type === "configMap") {
                //     return { [i.type + "Ref"]: { name: i.variableName } };
                //   }
                // }
                const item = i.type + "Ref";
                return {
                  [i.type + "Ref"]: { name: i.variableName },
                };
              }),
              env: keyValuePair.map((i) => {
                return {
                  name: i[0],
                  value: i[1],
                };
              }),
              // volumeMounts: e.volumes.map((i) => {
              //   return {
              //     mountPath: i.subPathInVolume,
              //     name: deployment.pvcName,
              //   };
              // }),
            };
          }),
          // volumes: [
          //   {
          //     name: deployment.pvcName,
          //     persistentVolumeClaim: {
          //       claimName: deployment.volume,
          //     },
          //   },
          // ],
        },
      },
    },
  };

  const handleClose = () => {
    props.onClose && props.onClose();
    setStepValue(1);
    setClearLA();
    resetDeployment();
  };

  const createDeployment = () => {
    if (deployment.priority.name === "GLowLatencyPriority") {
      postGLowLatencyPriority(
        require("json-to-pretty-yaml").stringify(template)
      );
    }
    if (deployment.priority.name === "GMostRequestPriority") {
      postGMostRequestPriority(
        require("json-to-pretty-yaml").stringify(template)
      );
    }
    if (deployment.priority.name === "GSelectedClusterPriority") {
      postGSelectedClusterPriority(
        require("json-to-pretty-yaml").stringify(template)
      );
    }
    if (deployment.priority.name === "GSetClusterPriority") {
      postGSetClusterPriority(
        require("json-to-pretty-yaml").stringify(template)
      );
    }

    handleClose();
    props.reloadFunc && props.reloadFunc();
  };

  const onClickStepTwo = (e) => {
    const checkRegex = /^[a-z0-9]([-a-z0-9]*[a-z0-9])*$/;

    if (deployment.deploymentName === "") {
      swalError("Deployment 이름을 입력해주세요");
      return;
    } else if (!checkRegex.test(deployment.deploymentName)) {
      swalError("영어소문자와 숫자만 입력해주세요.");
      return;
    }
    if (deployment.workspace === "") {
      swalError("Workspace를 선택해주세요");
      return;
    }
    if (deployment.project === "") {
      swalError("Project를 선택해주세요");
      return;
    }
    // Replica는 기본 설정 1이라서 추가 안함
    if (deployment.volume === "") {
      swalError("Volume을 선택해주세요");
      return;
    }
    if (deployment.containers.length === 0) {
      swalError("Container를 선택해주세요");
      return;
    }
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
