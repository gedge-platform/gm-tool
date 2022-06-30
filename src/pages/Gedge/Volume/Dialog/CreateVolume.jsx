import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { randomString } from "@/utils/common-utils";
import { CDialogNew } from "../../../../components/dialogs";
import { swalError } from "../../../../utils/swal-utils";
import { Projection } from "leaflet";
import VolumeBasicInformation from "./VolumeBasicInformation";

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

  //     const template = {
  //         apiVersion: "v1",
  //         kind: "PersistentVolumeClaim",
  //         metadata: {
  //             namespace: Projection,
  //             name: VolumeName,
  //             labels: {}
  //         },
  //         spec:
  //   accessModes:
  //     - ReadWriteOnce
  //   resources:
  //     requests:
  //       storage: 10Gi
  //   storageClassName: local
  //     }

  const handleClose = () => {
    props.reloadFunc && props.reloadFunc();
    props.onClose && props.onClose();
    // setProjectListinWorkspace();s
    setStepValue(1);
    // clearAll();
  };

  const onClickStepOne = () => {
    setStepValue(2);
  };

  const onClickStepTwo = () => {
    setStepValue(3);
  };

  //   const handlePreStepValue = () => {
  //     setWorkspace();
  //     setProject();
  //   };

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
          고급 설정
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
                  //   handlePreStepValue();
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
          Yaml
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
    } else return <DeploymentPopup />;
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
