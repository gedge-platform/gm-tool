import React, { useState, useEffect, useLayoutEffect } from "react";
import { CDialog } from "@/components/dialogs";
import { swalUpdate } from "@/utils/swal-utils";
import FormControl from "@material-ui/core/FormControl";
import { CTextField } from "@/components/textfields";
import { SERVER_URL } from "@/config.jsx";
import axios from "axios";
import { CButton } from "@/components/buttons";
import styled from "styled-components";
import { observer } from "mobx-react";
import workspacesStore from "../../../../store/WorkSpace";
import projectStore from "../../../../store/Project";
import DeploymentBasicInformation from "./DeploymentBasicInformation";
import DeploymentPodSettins from "./DeploymentPodSettins";
import deploymentStore from "../../../../store/Deployment";
import DeploymentYaml from "./DeploymentYaml";

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

const CreateDialog = observer((props) => {
  const { open } = props;
  const [stepValue, setStepValue] = useState(1);

  const {
    deploymentName,
    podReplicas,
    containerName,
    containerImage,
    containerPort,
    setContent,
    clearAll,
    postDeployment,
  } = deploymentStore;

  const template = {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: deploymentName,
      labels: {
        app: deploymentName,
      },
    },
    spec: {
      replicas: podReplicas,
      selector: {
        matchLabels: {
          app: deploymentName,
        },
      },
      template: {
        metadata: {
          labels: {
            app: deploymentName,
          },
        },
        spec: {
          containers: [
            {
              image: containerImage,
              name: containerName,
              ports: [
                {
                  containerPort: Number(containerPort),
                },
              ],
            },
          ],
        },
      },
    },
  };

  const handleClose = () => {
    props.onClose && props.onClose();
  };

  const createDeployment = () => {
    postDeployment(handleClose);
  };
  useEffect(() => {
    if (stepValue === 3) {
      const YAML = require("json-to-pretty-yaml");
      setContent(YAML.stringify(template));
    }
  });

  const cancelClick = () => {
    clearAll();
    handleClose();
  };

  const stepOfComponent = () => {
    if (stepValue === 1) {
      return (
        <>
          <DeploymentBasicInformation />
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
              <Button onClick={cancelClick}>취소</Button>
              <ButtonNext onClick={() => setStepValue(2)}>다음</ButtonNext>
            </div>
          </div>
        </>
      );
    } else if (stepValue === 2) {
      return (
        <>
          <DeploymentPodSettins />
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
              <Button onClick={cancelClick}>취소</Button>
              <Button onClick={() => setStepValue(1)}>이전</Button>
              <ButtonNext onClick={() => setStepValue(3)}>다음</ButtonNext>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <DeploymentYaml />
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
              <Button onClick={cancelClick}>취소</Button>
              <Button onClick={() => setStepValue(2)}>이전</Button>
              <ButtonNext onClick={createDeployment}>생성</ButtonNext>
            </div>
          </div>
        </>
      );
    }
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
export default CreateDialog;
