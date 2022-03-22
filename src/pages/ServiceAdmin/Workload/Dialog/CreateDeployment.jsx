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
import { getItem } from "@/utils/sessionStorageFn";
import { randomString } from "@/utils/common-utils";
import { CDialogNew } from "../../../../components/dialogs";

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

const CreateDeployment = observer((props) => {
  const { open } = props;
  const [stepValue, setStepValue] = useState(3);
  const [size, setSize] = useState("md");
  const [loading, setLoading] = useState(false);

  const {
    deploymentName,
    podReplicas,
    content,
    containerName,
    containerImage,
    containerPort,
    project,
    workspace,
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
    const requestId = `${getItem("user")}-${randomString()}`;
    let body = {
      requestId: requestId,
      workspace: workspace,
      project: project,
      type: "Deployment",
      status: "CREATED",
    };
    let formData = new FormData();
    formData.append("callbackUrl", "http://101.79.4.15:8080/callback"); // 수정 필요
    formData.append("requestId", requestId);
    formData.append("yaml", content);
    formData.append("clusters", JSON.stringify(clusters));

    // axios
    //   .post(`http://101.79.4.15:32527/yaml`, formData)
    //   .then(function (response) {
    //     if (response.status === 200) {
    //       setResponseData(response.data);

    //       const popup = window.open(
    //         "",
    //         "Gedge scheduler",
    //         "width=1200,height=800"
    //       );
    //       popup.document.open().write(response.data);
    //       popup.document.close();

    //       handleClose();
    //       // setStepValue(4);
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };
  useEffect(() => {
    if (stepValue === 3) {
      const YAML = require("json-to-pretty-yaml");
      setContent(YAML.stringify(template));
    } else if (stepValue === 4) setSize("xl");
  }, [stepValue]);

  const stepOfComponent = () => {
    if (stepValue === 1) {
      return (
        <>
          <DeploymentBasicInformation />
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
              <ButtonNext onClick={createDeployment2}>
                Schedule Apply
              </ButtonNext>
              {/* <ButtonNext onClick={createDeployment}>Default Apply</ButtonNext> */}
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
      maxWidth={size}
      title={"Create Deployment"}
      onClose={handleClose}
      bottomArea={false}
      modules={["custom"]}
    >
      {stepOfComponent()}
    </CDialogNew>
  );
});
export default CreateDeployment;
