import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { CDialogNew } from "../../../../../components/dialogs";
import { CTextFeild } from "../../../../../components/textfields";
import { swalError } from "../../../../../utils/swal-utils";

import { Projection } from "leaflet";
import deploymentStore from "../../../../../store/Deployment";
import projectStore from "../../../../../store/Project";
import workspacestore from "../../../../../store/WorkSpace";
import { values } from "lodash";

import StorageClassStore from "../../../../../store/StorageClass";
import StorageClassBasicInfo from "./StorageClassBasicInfo";
import StorageClassAdvancedSetting from "./StorageClassAdvancedSetting";
import StorageClassYamlPopup from "./StorageClassYamlPopup";

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

const CreateStorageClass = observer((props) => {
  const { open } = props;
  const [stepValue, setStepValue] = useState(1);
  const {
    setContent,
    storageClassName,
    setStorageClassName,
    storageSystem,
    volumeExpansion,
    setStorageSystem,
    reclaimPolicy,
    setReclaimPolicy,
    accessMode,
    setAccessMode,
    volumeBindingMode,
    setVolumeBindingMode,
  } = StorageClassStore;

  const template = {
    apiVersion: "storage.k8s.io/v1",
    kind: "StorageClass",
    metadata: {
      name: storageClassName,
    },
    provisioner: storageSystem,
    parameters: {
      type: "gp2",
    },
    reclaimPolicy: reclaimPolicy,
    allowVolumeExpansion: Boolean(volumeExpansion === true ? true : false),
    volumeBindingMode: volumeBindingMode,
  };

  const handleClose = () => {
    props.reloadFunc && props.reloadFunc();
    props.onClose && props.onClose();
    setStepValue(1);
    setStorageClassName("");
    setStorageSystem("");
    setReclaimPolicy("");
    setAccessMode("");
    setVolumeBindingMode("");
  };

  const onClickStepOne = (e) => {
    if (storageClassName === "") {
      swalError("StorageClass 이름을 입력해주세요");
      return;
    }
    if (storageSystem === "") {
      swalError("Storage System을 선택해주세요");
      return;
    }
    if (volumeExpansion === "") {
      swalError("Volume Expansion을 선택해주세요");
      return;
    }
    if (reclaimPolicy === "") {
      swalError("Reclaim Policy를 선택해주세요");
      return;
    }
    if (accessMode === "") {
      swalError("Access Mode를 선택해주세요");
      return;
    }
    if (volumeBindingMode === "") {
      swalError("VolumeBinding Mode를 선택해주세요");
      return;
    }
    setStepValue(2);
  };

  const onClickStepTwo = () => {
    setStepValue(3);
  };

  const handlePreStepValue = () => {
    console.log("handlePreStepValue");
  };

  const CreateStorageClass = () => {
    CreateStorageClass(require("json-to-pretty-yaml").stringify(template));
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
          <StorageClassBasicInfo />
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
          <StorageClassAdvancedSetting />
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
          <StorageClassYamlPopup />
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
              <ButtonNext onClick={() => CreateStorageClass()}>
                Schedule Apply
              </ButtonNext>
            </div>
          </div>
        </>
      );
    } else <StorageClassBasicInfo />;
  };

  return (
    <CDialogNew
      id="myDialog"
      open={open}
      maxWidth="md"
      title={"Create StorageClass"}
      onClose={handleClose}
      bottomArea={false}
      modules={["custom"]}
    >
      {stepOfComponent()}
    </CDialogNew>
  );
});
export default CreateStorageClass;
