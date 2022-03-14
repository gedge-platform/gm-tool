import React, { useState } from "react";
import styled from "styled-components";
import FormControl from "@material-ui/core/FormControl";
import { CTextField } from "@/components/textfields";
import { observer } from "mobx-react";
import deploymentStore from "../../../../store/Deployment";

const HeaderContainer = styled.div`
  width: 320px;
  padding: 8px;
  border-radius: 4px;
  background-color: #eff4f9;
  text-align: center;
  margin-bottom: 20px;
`;
const ButtonBox = styled.div`
  margin-top: 15px;
  display: flex;
  width: 100%;
  justify-content: space-around;
`;
const Button = styled.button`
  border: none;
  height: 32px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: normal;
  color: #36435c;
  background-color: #eff4f9;
`;
const Span = styled.span`
  width: 200px;
  height: 32px;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #abb4be;
  background-color: #fff;
`;

const DeploymentPodSettins = observer(() => {
  const {
    podReplicas,
    containerName,
    containerPort,
    containerPortName,
    containerImage,
    setPodReplicas,
    setContainerName,
    setContainerPort,
    setContainerPortName,
    setContainerImage,
  } = deploymentStore;

  const onChange = (e, type) => {
    const { value, name } = e.target;
    switch (name) {
      case "Container Name":
        setContainerName(value);
        break;
      case "Container Image":
        setContainerImage(value);
        break;
      case "Container Port Name":
        setContainerPortName(value);
        break;
      case "Container Port":
        setContainerPort(value);
        break;
    }
  };

  return (
    <div>
      <HeaderContainer>
        <p>Pod Replicas</p>
        <ButtonBox>
          <Button onClick={() => setPodReplicas("minus")}>-</Button>
          <Span>{podReplicas}</Span>
          <Button onClick={() => setPodReplicas("plus")}>+</Button>
        </ButtonBox>
      </HeaderContainer>

      <table className="tb_data tb_write">
        <tbody>
          <tr>
            <th>
              Container Name
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Container Name"
                className="form_fullWidth"
                name="Container Name"
                onChange={onChange}
                value={containerName}
              />
            </td>
            <th>
              Container Image
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Container Image"
                className="form_fullWidth"
                name="Container Image"
                onChange={onChange}
                value={containerImage}
              />
            </td>
          </tr>

          <tr>
            <th>
              Container Port Name
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Container Port Name"
                className="form_fullWidth"
                name="Container Port Name"
                onChange={onChange}
                value={containerPortName}
              />
            </td>
            <th>
              Container Port
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="number"
                placeholder="Container Port"
                className="form_fullWidth"
                name="Container Port"
                onChange={onChange}
                value={containerPort}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default DeploymentPodSettins;
