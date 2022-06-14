import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { randomString } from "@/utils/common-utils";
import { CDialogNew } from "../../../../components/dialogs";
import { swalError } from "../../../../utils/swal-utils";
import { Projection } from "leaflet";
import VolumeBasicInformation from "./VolumeBasicInformation";
import deploymentStore from "../../../../store/Deployment";
import volumeStore from "../../../../store/Volume";
import VolumeAdvancedSetting from "./VolumeAdvancedSetting";
import VolumYamlPopup from "./VolumYamlPopup";
import VolumePopup from "./VolumePopup";
import projectStore from "../../../../store/Project";
import schedulerStore from "../../../../store/Scheduler";

const Button = styled.button`
  background-color: #fff;
  border: 1px solid black;
  color: black;
  padding: 10px 35px;
  margin-right: 10px;
  border-radius: 4px;
`;

const ButtonNext = styled.button`
  background-color: #0f5ce9;
  color: white;
  border: none;
  padding: 10px 35px;
  border-radius: 4px;
`;

const CreateVolume = observer((props) => {
  const { open } = props;
  const [stepValue, setStepValue] = useState(1);
  const { setProjectListinWorkspace } = projectStore;
  const {
    volumeName,
    setVolumeName,
    accessMode,
    volumeCapacity,
    setVolumeCapacity,
    responseData,
    setResponseData,
    content,
    setContent,
    clearAll,
    createVolume,
  } = volumeStore;
  const { workspace, setWorkspace, project, setProject } = deploymentStore;

  const template = {
    apiVersion: "v1",
    kind: "PersistentVolumeClaim",
    metadata: {
      name: volumeName,
      namespace: project,
      labels: {},
    },
    spec: {
      storageClassName: "manual",
      accessModes: {
        accessMode,
      },
      resources: {
        requests: {
          storage: Number(volumeCapacity) + "Gi",
        },
      },
    },
  };

  const onClickStepOne = () => {
    if (volumeName === "") {
      swalError("Volume 이름을 입력해주세요");
      return;
    }
    if (workspace === "") {
      swalError("Workspace를 선택해주세요");
      return;
    }
    if (project === "") {
      swalError("Project를 선택해주세요");
      return;
    }
    if (accessMode === "") {
      swalError("Access Mode를 선택해주세요");
      return;
    }
    if (volumeCapacity === "") {
      swalError("Volume 용량을 입력해주세요");
      return;
    }
    if (
      volumeName !== "" &&
      workspace !== "" &&
      project !== "" &&
      accessMode !== "" &&
      volumeCapacity !== ""
    ) {
      setStepValue(2);
    }
  };

  const handleClose = () => {
    props.reloadFunc && props.reloadFunc();
    props.onClose && props.onClose();
    setProjectListinWorkspace();
    setStepValue(1);
    clearAll();
  };

  const onClickStepTwo = () => {
    setStepValue(3);
  };

  const handlePreStepValue = () => {
    setWorkspace();
    setProject();
  };

  const CreateVolume = () => {
    createVolume(require("json-to-pretty-yaml").stringify(template));
  };

  useEffect(() => {
    if (stepValue === 3) {
      const YAML = require("json-to-pretty-yaml");
      setContent(YAML.stringify(template));
    }
  }, [stepValue]);

  const stepOfComponent = () => {
    if (stepValue === 1) {
      return (
        <>
          <VolumeBasicInformation />
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
              <ButtonNext onClick={() => onClickStepOne()}>다음</ButtonNext>
            </div>
          </div>
        </>
      );
    } else if (stepValue === 2) {
      return (
        <>
          <VolumeAdvancedSetting />
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
              <Button
                onClick={() => {
                  handlePreStepValue();
                  setStepValue(1);
                }}
              >
                이전
              </Button>
              <ButtonNext onClick={() => onClickStepTwo()}>다음</ButtonNext>
            </div>
          </div>
        </>
      );
    } else if (stepValue === 3) {
      return (
        <>
          <VolumYamlPopup />
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
              <Button onClick={() => setStepValue(2)}>이전</Button>
              <ButtonNext onClick={CreateVolume}>Schedule Apply</ButtonNext>
            </div>
          </div>
        </>
      );
    } else <VolumePopup />;
  };

  return (
    <CDialogNew
      id="myDialog"
      open={open}
      maxWidth="md"
      title={"Create Volume"}
      onClose={handleClose}
      bottomArea={false}
      modules={["custom"]}
    >
      {stepOfComponent()}
    </CDialogNew>
  );
});
export default CreateVolume;