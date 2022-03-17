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
import { useHistory } from "react-router";
import * as FormData from "form-data";
import DeploymentPopup from "./DeploymentPopup";
import clusterStore from "../../../../store/Cluster";
import { toJS } from "mobx";
import { form } from "react-dom-factories";

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

const CreateDeployment = observer((props) => {
  const { open } = props;
  const [stepValue, setStepValue] = useState(1);
  const [size, setSize] = useState("md");
  const [loading, setLoading] = useState(false);

  const {
    deploymentName,
    podReplicas,
    containerName,
    containerImage,
    containerPort,
    project,
    responseData,
    setContent,
    clearAll,
    postDeployment,
    setResponseData,
  } = deploymentStore;
  const { clusters } = clusterStore;

  const template = {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: deploymentName,
      namespace: project,
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
    props.reloadFunc && props.reloadFunc();
    props.onClose && props.onClose();
    setStepValue(1);
    setSize("md");
    clearAll();
  };

  const createDeployment = () => {
    postDeployment(handleClose);
  };
  const createDeployment2 = () => {
    let formData = new FormData();
    formData.append("callbackUrl", "http://101.79.4.15:8080/callback");
    formData.append("requestId", deploymentName);
    formData.append("yaml", deploymentStore.content);
    formData.append("clusters", JSON.stringify(clusters));
    console.log(JSON.stringify(clusters));

    axios
      .post(`http://101.79.4.15:32527/yaml`, formData)
      .then(function (response) {
        if (response.status === 200) {
          setResponseData(response.data);
          console.log(response.data);

          const popup = window.open('', 'Gedge scheduler', 'width=600,height=400');
          popup.document.open().write(response.data);
          popup.document.close();

          setStepValue(4);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    if (stepValue === 3) {
      const YAML = require("json-to-pretty-yaml");
      setContent(YAML.stringify(template));
      setSize("xl");
    }
  });

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
              <Button onClick={handleClose}>취소</Button>
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
                width: "430px",
                justifyContent: "space-around",
              }}
            >
              <Button onClick={handleClose}>취소</Button>
              <Button onClick={() => setStepValue(2)}>이전</Button>
              <ButtonNext onClick={createDeployment2}>
                Schedule Apply
              </ButtonNext>
              <ButtonNext onClick={createDeployment}>Default Apply</ButtonNext>
            </div>
          </div>
        </>
      );
    } else return <DeploymentPopup />;
  };

  return (
    <CDialog
      id="myDialog"
      open={open}
      maxWidth={size}
      title={"Create Deployment"}
      onClose={handleClose}
      bottomArea={false}
      modules={["custom"]}
    >
      {stepOfComponent()}
    </CDialog>
  );
});
export default CreateDeployment;
