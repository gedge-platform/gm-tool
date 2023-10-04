import { observer } from "mobx-react";
import { CDialogNew } from "@/components/dialogs";
import { useState, useEffect } from "react";
import CreateTamplateStepOne from "./CreateTamplateStepOne";
import CreateTamplateStepTwo from "./CreateTamplateStepTwo";
import CreateTamplateStepThree from "./CreateTamplateStepThree";
import CreateTamplateStepFour from "./CreateTamplateStepFour";
import styled from "styled-components";
import { deploymentStore, workspaceStore } from "@/store";

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

// deployment store 사용
const TamplateCreate = observer((props) => {
  const template = {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "deployment.deploymentName",
      namespace: "default",
    },
    spec: {
      replicas: 1,
      template: {},
    },
  };

  const { setContent, setTemplate, postDeploymentGM, appInfo } =
    deploymentStore;

  console.log(appInfo);
  const { loadWorkSpaceList } = workspaceStore;

  const { open } = props;
  const [stepValue, setStepValue] = useState(1);

  const goStepTwo = () => {
    const checkRegex = /^[a-z0-9]([-a-z0-9]*[a-z0-9])*$/;

    setStepValue(2);
  };

  const goStepThree = () => {
    setStepValue(3);
  };

  const goStepFour = () => {
    setStepValue(4);
  };

  const backStepOne = () => {
    setStepValue(1);
  };

  const backStepTwo = () => {
    setStepValue(2);
  };

  const backStepThree = () => {
    setStepValue(2);
  };

  const handleClose = () => {
    props.onClose && props.onClose();
    setStepValue(1);
  };

  const createApp = () => {
    postDeploymentGM(require("json-to-pretty-yaml").stringify(template));

    handleClose();
    props.reloadFunc && props.reloadFunc();
  };

  useEffect(() => {
    loadWorkSpaceList();

    if (stepValue === 4) {
      setTemplate(template);
      const YAML = require("json-to-pretty-yaml");
      setContent(YAML.stringify(template));
    }
  }, [stepValue]);

  const CreateTamplateComponent = () => {
    if (stepValue === 1) {
      return (
        <>
          <CreateTamplateStepOne />
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
              <ButtonNext onClick={goStepTwo}>다음</ButtonNext>
            </div>
          </div>
        </>
      );
    } else if (stepValue === 2) {
      return (
        //     <>
        //       <CreateTamplateStepTwo />
        //       <div
        //         style={{
        //           display: "flex",
        //           justifyContent: "flex-end",
        //           marginTop: "32px",
        //         }}
        //       >
        //         <div
        //           style={{
        //             display: "flex",
        //             width: "240px",
        //             justifyContent: "center",
        //           }}
        //         >
        //           <Button onClick={backStepOne}>이전</Button>
        //           <ButtonNext onClick={goStepThree}>다음</ButtonNext>
        //         </div>
        //       </div>
        //     </>
        //   );
        // } else if (stepValue === 3) {
        //   return (
        <>
          <CreateTamplateStepThree />
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
              <Button onClick={backStepTwo}>이전</Button>
              <ButtonNext onClick={goStepFour}>다음</ButtonNext>
            </div>
          </div>
        </>
      );
    } else if (stepValue === 4) {
      return (
        <>
          <CreateTamplateStepFour />
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
              <Button onClick={backStepThree}>이전</Button>
              <ButtonNext onClick={createApp}>Create App</ButtonNext>
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
      title={"Create Template"}
      onClose={handleClose}
      bottomArea={false}
      modules={["custom"]}
    >
      {CreateTamplateComponent()}
    </CDialogNew>
  );
});

export default TamplateCreate;
