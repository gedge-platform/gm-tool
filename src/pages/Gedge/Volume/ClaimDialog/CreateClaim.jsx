import { observer } from "mobx-react";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { swalError } from "@/utils/swal-utils";

import { CDialogNew } from "@/components/dialogs";
import {
  claimStore,
  deploymentStore,
  projectStore,
  StorageClassStore,
  volumeStore,
} from "@/store";
import ClaimBasicInformation from "./ClaimBasicInformation";
// import VolumeAdvancedSetting from "../Dialog/VolumeAdvancedSetting";
import VolumYamlPopup from "../Dialog/VolumYamlPopup";
import VolumePopup from "../Dialog/VolumePopup";
import ClaimAdvancedSetting from "./ClaimAdvancedSetting";
import ClaimYamlPopup from "./ClaimYamlPopup";

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

const CreateClaim = observer((props) => {
  const { open, labelsList } = props;
  const [stepValue, setStepValue] = useState(1);
  const { setProjectListinWorkspace } = projectStore;
  const {
    claimName,
    setClaimName,
    accessMode,
    volumeCapacity,
    setVolumeCapacity,
    responseData,
    setResponseData,
    content,
    setContent,
    clearAll,
    createVolumeClaim,
    setProject,
    project,
    selectClusters,
    setSelectClusters,
    clusterName,
    setAccessMode,
    labelsKey,
    labelKey,
    labelValue,
    setLabelsKey,
    labelsValue,
    setLabelsValue,
    setLabelsView,
    inputLabelKey,
    inputLabelValue,
    labels,
    annotations,
    labelInput,
    annotationInput,
    annotationKey,
    annotationValue,
    setLabels,
    setInputLabelKey,
    setInputLabelValue,
    setTemplate,
    setClearLA,
  } = claimStore;

  const { workspace, setWorkspace } = deploymentStore;
  const {
    storageClass,
    setStorageClass,
    selectStorageClass,
    setSelectStorageClass,
  } = StorageClassStore;

  const template = {
    apiVersion: "v1",
    kind: "PersistentVolumeClaim",
    metadata: {
      name: claimName,
      namespace: project,
      labels: labelInput,
      annotations: annotationInput,
    },
    spec: {
      storageClassName: selectStorageClass,
      accessModes: [accessMode],
      resources: {
        requests: {
          storage: Number(volumeCapacity) + "Gi",
        },
      },
    },
  };

  const onClickStepOne = (e) => {
    if (claimName === "") {
      swalError("Claim 이름을 입력해주세요");
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
    if (selectClusters.length === 0) {
      swalError("클러스터를 확인해주세요!");
      return;
    }
    if (selectStorageClass === "") {
      swalError("StorageClass를 선택해주세요");
      return;
    }
    if (accessMode === "") {
      swalError("Access Mode를 선택해주세요");
      return;
    }
    if (volumeCapacity === "") {
      swalError("Volume 용량을 입력해주세요");
      return;
    } else {
      setStepValue(2);
    }
  };

  const handleClose = () => {
    props.onClose && props.onClose();
    setProjectListinWorkspace();
    setStepValue(1);
    clearAll();
    setClaimName("");
    setWorkspace("");
    setProject("");
    setSelectStorageClass("");
    setClearLA();
  };

  const onClickStepTwo = () => {
    const LabelKeyArr = [];
    const AnnotationKeyArr = [];
    labels.map((data) => LabelKeyArr.push(data.labelKey));
    annotations.map((data) => AnnotationKeyArr.push(data.annotationKey));
    if (labelKey === "" && labelValue !== "") {
      swalError("LabelKey 값을 입력해주세요");
      return;
    }
    if (annotationKey === "" && annotationValue !== "") {
      swalError("AnnotationKey 값을 입력해주세요");
      return;
    }
    if (
      LabelKeyArr.indexOf(labelKey) < 0 &&
      AnnotationKeyArr.indexOf(annotationKey) < 0
    ) {
      setStepValue(3);
    } else {
      if (
        LabelKeyArr.indexOf(labelKey) >= 0 &&
        AnnotationKeyArr.indexOf(annotationKey) >= 0
      ) {
        swalError("AnnotationKey와 LabelKey값이 중복입니다.");
        return;
      }
      if (LabelKeyArr.indexOf(labelKey) >= 0) {
        swalError("LabelKey값이 중복입니다.");
        return;
      }
      if (AnnotationKeyArr.indexOf(annotationKey) >= 0) {
        swalError("AnnotationKey값이 중복입니다.");
        return;
      }
    }
  };

  const handlePreStepValue = () => {
    setClearLA();
    setWorkspace("");
    setProject("");
  };

  const CreateVolume = () => {
    // for문으로 복수의 클러스터이름 보내게
    createVolumeClaim(require("json-to-pretty-yaml").stringify(template));
    handleClose();
    props.reloadFunc && props.reloadFunc();
    // setSelectClusters();
  };

  const onClickBackStepTwo = () => {
    setClearLA();
    setStepValue(2);
  };

  useEffect(() => {
    if (stepValue === 3) {
      setTemplate(template);
      const YAML = require("json-to-pretty-yaml");
      setContent(YAML.stringify(template));
      // setClearLA();
    }
  }, [stepValue]);

  const stepOfComponent = () => {
    if (stepValue === 1) {
      return (
        <>
          <ClaimBasicInformation />
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
              <ButtonNext onClick={(e) => onClickStepOne(e)}>다음</ButtonNext>
            </div>
          </div>
        </>
      );
    } else if (stepValue === 2) {
      return (
        <>
          <ClaimAdvancedSetting />
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
              <ButtonNext onClick={(e) => onClickStepTwo(e)}>다음</ButtonNext>
            </div>
          </div>
        </>
      );
    } else if (stepValue === 3) {
      return (
        <>
          <ClaimYamlPopup labelsList={labelsList} />
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
              <ButtonNext onClick={() => CreateVolume()}>
                Schedule Apply
              </ButtonNext>
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
      title={"Create Claim"}
      onClose={handleClose}
      bottomArea={false}
      modules={["custom"]}
    >
      {stepOfComponent()}
    </CDialogNew>
  );
});

export default CreateClaim;
