import React, { useState, useEffect } from "react";
import { CDialog } from "@/components/dialogs";
import styled from "styled-components";
import { observer } from "mobx-react";
import serviceStore from "../../../../store/Service";
import ServiceBasicInformation from "../Dialog/ServiceBasicInformation";

const Button = styled.button`
  background-color: ##eff4f9;
  border: 1px solid #ccd3db;
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%);
`;

const ButtonNext = styled.button`
  background-color: #242e42;
  color: white;
  border: 1px solid #242e42;
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%);
`;

const CreatePod = observer((props) => {
  const { open } = props;
  const [stepValue, setStepValue] = useState(1);
  const [loading, setLoading] = useState(false);

  const { serviceName, appName, protocol, port, targetPort, clearAll } =
    serviceStore;

  const template = {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: serviceName,
    },
    spec: {
      selector: {
        app: appName,
      },
      ports: [
        {
          protocol: protocol,
          port: port,
          targetPort: targetPort,
        },
      ],
    },
  };

  const handleClose = () => {
    props.reloadFunc && props.reloadFunc();
    props.onClose && props.onClose();
    clearAll();
  };

  useEffect(() => {
    if (stepValue === 3) {
      //   const YAML = require("json-to-pretty-yaml");
      //   setContent(YAML.stringify(template));
    }
  });

  const stepOfComponent = () => {
    if (stepValue === 1) {
      return (
        <>
          <ServiceBasicInformation />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "150px",
                justifyContent: "space-around",
              }}
            >
              <Button onClick={handleClose}>취소</Button>
              <ButtonNext onClick={() => setStepValue(2)}>다음</ButtonNext>
            </div>
          </div>
        </>
      );
    } else if (stepValue === 2) {
      return (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "230px",
                justifyContent: "space-around",
              }}
            >
              <Button onClick={handleClose}>취소</Button>
              <Button onClick={() => setStepValue(1)}>이전</Button>
              <ButtonNext onClick={() => setStepValue(3)}>다음</ButtonNext>
            </div>
          </div>
        </>
      );
    } else if (stepValue === 3) {
      return (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "430px",
                justifyContent: "space-around",
              }}
            >
              <Button onClick={handleClose}>취소</Button>
              <Button onClick={() => setStepValue(2)}>이전</Button>
              <ButtonNext onClick={() => console.log("")}>
                Schedule Apply
              </ButtonNext>
              <ButtonNext onClick={() => console.log("")}>
                Default Apply
              </ButtonNext>
            </div>
          </div>
        </>
      );
    } else return <>4</>;
  };

  return (
    <CDialog
      id="myDialog"
      open={open}
      maxWidth="md"
      title={"Create Deployment"}
      onClose={handleClose}
      bottomArea={false}
      modules={["custom"]}
    >
      {stepOfComponent()}
    </CDialog>
  );
});
export default CreatePod;
