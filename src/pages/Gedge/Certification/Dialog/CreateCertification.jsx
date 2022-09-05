import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { CDialogNew } from "../../../../components/dialogs";
import FormControl from "@material-ui/core/FormControl";
import { CTextField } from "@/components/textfields";
import styled from "styled-components";
import { swalError } from "../../../../utils/swal-utils";
import certificationStore from "../../../../store/Certification";
import SelectProvider from "./SelectProvider";
import CreateAWS from "./CreateAWS";
import CreateOPENSTACK from "./CreateOPENSTACK";

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

const CreateCertification = observer((props) => {
  const { open } = props;
  const [stepValue, setStepValue] = useState(1);
  const [size, setSize] = useState("md");

  // const [inputs, setInput] = useState({
  //   CredentialName: CredentialName,
  //   IdentityEndPoint: IdentityEndPoint,
  //   Username: Username,
  //   Password: Password,
  //   DomainName: DomainName,
  //   ProjectID: ProjectID,
  //   Region: Region,
  //   Zone: Zone,
  // });

  // const inputs = {
  //   CredentialName: CredentialName,
  //   IdentityEndPoint: IdentityEndPoint,
  //   Username: Username,
  //   Password: Password,
  //   DomainName: DomainName,
  //   ProjectID: ProjectID,
  //   Region: Region,
  //   Zone: Zone,
  //   CredentialName,
  //   ProviderName,
  //   IdentityEndPoint,
  //   Username,
  //   Password,
  //   DomainName,
  //   ProjectID,
  //   Region,
  //   Zone,
  // };

  const {
    CredentialName,
    // credentialName,
    ProviderName,
    ClientId,
    ClientSecret,
    IdentityEndPoint,
    Username,
    Password,
    DomainName,
    ProjectID,
    Region,
    Zone,
  } = certificationStore;

  // const CredentialName = "";

  // const{
  //   CredentialName,
  //   ProviderName,
  //   CliendId,
  //   ClientSecret,
  //   Region,
  //   Zone,
  // } = inputs;

  const { postCredential } = certificationStore;

  const handleClose = () => {
    props.reloadFunc && props.reloadFunc();
    props.onClose && props.onClose();
    setStepValue(1);
    // CredentialName = "";
    // ProviderName = "";
    // ClientId = "";
    // ClientSecret = "";
    // IdentityEndPoint = "";
    // Username = "";
    // Password = "";
    // DomainName = "";
    // ProjectID = "";
    // Region = "";
    // Zone = "";
  };

  // const { CredentialName, ProviderName, ClientId, ClientSecret, Region, Zone } =
  //   inputs;

  const onClickStepTwo = () => {
    if (ProviderName === "") {
      swalError("Provider Name를 선택해주세요");
      return;
    }
    if (ProviderName === "AWS") {
      console.log(ProviderName);
      setStepValue(2);
    }
    if (ProviderName === "OPENSTACK") {
      console.log(ProviderName);
      setStepValue(3);
    } else {
      return;
    }
  };

  const onClickCreateAWS = () => {
    if (CredentialName === "") {
      swalError("Name을 입력해주세요");
      return;
    }
    if (DomainName === "") {
      swalError("DomainName를 입력해주세요");
      return;
    }
    if (IdentityEndPoint === "") {
      swalError("Identity Endpoint을 입력해주세요");
      return;
    }
    if (Password === "") {
      swalError("Password를 입력해주세요");
      return;
    }
    if (ProjectID === "") {
      swalError("projectID를 입력해주세요");
      return;
    }
    if (Username === "") {
      swalError("Username를 입력해주세요");
      return;
    }
    if (Region === "") {
      swalError("Region을 입력해주세요");
      return;
    }
    if (Zone === "") {
      swalError("Zone을 입력해주세요");
      return;
    } else {
      createCredential();
    }
  };

  const onClickCreateOPENSTACK = () => {
    if (CredentialName === "") {
      swalError("Name을 입력해주세요");
      return;
    }
    if (ClientId === "") {
      swalError("ClientId를 입력해주세요");
      return;
    }
    if (ClientSecret === "") {
      swalError("Client Secert을 입력해주세요");
      return;
    }
    if (Region === "") {
      swalError("Region을 입력해주세요");
      return;
    }
    if (Zone === "") {
      swalError("Zone을 입력해주세요");
      return;
    } else {
      createCredential();
    }
  };

  const createCredential = async () => {
    if (ProviderName === "AWS") {
      const inputs = {
        CredentialName: CredentialName,
        ProviderName: ProviderName,
        IdentityEndPoint: IdentityEndPoint,
        Username: Username,
        Password: Password,
        DomainName: DomainName,
        ProjectID: ProjectID,
        Region: Region,
        Zone: Zone,
      };
      const result = await postCredential(inputs);
    } else if (ProviderName === "OPENSTACK") {
      const inputs = {
        CredentialName: CredentialName,
        ProviderName: ProviderName,
        ClientId: ClientId,
        ClientSecret: ClientSecret,
        Region: Region,
        Zone: Zone,
      };
      const result = await postCredential(inputs);
    }

    handleClose();
  };

  // const createCredential = async (inputs) => {
  //   console.log(inputs);
  //   const result = await postCredential(inputs);
  // };

  useEffect(() => {
    // const YAML = require("json-to-pretty-yaml");
    // setContent(YAML.stringify(template));
  });

  const stepOfComponent = () => {
    if (stepValue === 1) {
      return (
        <>
          <SelectProvider />
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
              <ButtonNext onClick={() => onClickStepTwo()}>다음</ButtonNext>
            </div>
          </div>
        </>
      );
    } else if (stepValue === 2) {
      return (
        <>
          <CreateAWS />
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
              <Button onClick={handleClose}>취소</Button>
              <ButtonNext onClick={onClickCreateAWS}>생성</ButtonNext>
            </div>
          </div>
        </>
      );
    } else if (stepValue === 3) {
      return (
        <>
          <CreateOPENSTACK />
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
              <ButtonNext onClick={onClickCreateOPENSTACK}>생성</ButtonNext>
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
      title={"Create Credential"}
      onClose={handleClose}
      bottomArea={false}
      modules={["custom"]}
    >
      {stepOfComponent()}
    </CDialogNew>
  );
});
export default CreateCertification;
