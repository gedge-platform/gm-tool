import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { podStore, projectStore, schedulerStore } from "@/store";
import FormControl from "@material-ui/core/FormControl";
import { CTextField } from "@/components/textfields";
import { CDialogNew } from "@/components/dialogs";
import { randomString } from "@/utils/common-utils";
import PodAddContainer from "./PodAddContainer";
import CreatePodStepOne from "./CreatePodStepOne";
import CreatePodStepTwo from "./CreatePodStepTwo";
import CreatePodStepThree from "./CreatePodStepThree";
import PodYaml from "./PodYaml";

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

const CreatePod = observer((props) => {
  const { open } = props;
  const {
    podInfo,
    initPodInfo,
    initTargetClusters,
    setContent,
    setClearLA,
    setTemplate,
    labelsList,
    labels,
    annotations,
    labelInput,
    annotationInput,
    postPodGM,
  } = podStore;
  console.log("podInfo :", podInfo);

  const [stepValue, setStepValue] = useState(1);

  const template = {
    apiVersion: "apps/v1",
    kind: "Pod",
    metadata: {
      name: podInfo.podName,
      annotations: annotationInput,
      labels: labelInput,
      namespace: "default",
    },
    spec: {
      selector: {
        matchLabels: labelInput,
      },
      template: {
        metadata: {
          annotations: annotationInput,
          labels: labelInput,
        },
        spec: {
          imagePullSecert: podInfo.containers?.map((e) => {
            return { name: e.pullSecret };
          }),
          containers: podInfo.containers?.map((e) => {
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
          name: podInfo.volume,
          persistentVolumeClaim: podInfo.pvcName,
        },
      ],
    },
  };

  const handleClose = () => {
    props.onClose && props.onClose();
    setStepValue(1);
    setClearLA();
    initPodInfo();
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

  const createPod = () => {
    postPodGM(require("json-to-pretty-yaml").stringify(template));
    handleClose();
    props.reloadFunc && props.reloadFunc();
  };

  useEffect(() => {
    if (stepValue === 4) {
      const YAML = require("json-to-pretty-yaml");
      setContent(YAML.stringify(template));
    }
  }, [stepValue]);

  const CreatePodComponent = () => {
    if (stepValue === 1) {
      return (
        <>
          <CreatePodStepOne />
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
          <CreatePodStepTwo />
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
              <Button onClick={() => onClickBackStepOne()}>이전</Button>
              <ButtonNext onClick={() => onClickStepThree()}>다음</ButtonNext>
            </div>
          </div>
        </>
      );
    } else if (stepValue === 3) {
      return (
        <>
          <CreatePodStepThree />
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
              <Button onClick={() => onClickBackStepTwo()}>이전</Button>
              <ButtonNext onClick={() => onClickStepFour()}>다음</ButtonNext>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <PodYaml />
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
              <Button onClick={() => onClickBackStepThree()}>이전</Button>
              <ButtonNext onClick={createPod}>확인</ButtonNext>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <CDialogNew
      id="myDialog"
      open={open}
      maxWidth="md"
      title={"Create Pod"}
      onClose={handleClose}
      bottomArea={false}
      modules={["custom"]}
    >
      {CreatePodComponent()}
    </CDialogNew>
  );
});
export default CreatePod;
