import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { CTextField } from "@/components/textfields";
import FormControl from "@material-ui/core/FormControl";
import { deploymentStore, projectStore } from "@/store";
import DeploymentAddContainer from "./DeploymentAddContainer";
import workspaceStore from "../../../../../../store/WorkSpace";
import claimStore from "../../../../../../store/Claim";

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

const DeleteButton = styled.button`
  margin: 0px 0px 0px 3px;
  overflow: hidden;
  position: relative;
  border: none;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  background: transparent;
  font: inherit;
  text-indent: 100%;
  cursor: pointer;

  &:hover {
    background: rgba(29, 161, 142, 0.1);
  }

  &:before,
  &:after {
    position: absolute;
    top: 15%;
    left: calc(50% - 0.0625em);
    width: 0.125em;
    height: 70%;
    border-radius: 0.125em;
    transform: rotate(45deg);
    background: currentcolor;
    content: "";
  }

  &:after {
    transform: rotate(-45deg);
  }
`;
const Table = styled.table`
  tbody {
    display: block;
    height: 170px;
    overflow: auto;
  }
  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  thead {
    width: calc(100% - 1em);
  }
`;

const CreateDeploymentStepOne = observer((props) => {
  const { open } = props;
  const [open2, setOpen2] = useState(false);
  const [stepValue, setStepValue] = useState(1);
  const [containerIndex, setContainerIndex] = useState(1);

  const [prioritytDisable, setPriorityDisable] = useState(true);
  const [prioritytPodDisable, setPrioritytPodDisable] = useState(true);
  const [priority, setPriority] = useState({
    name: "GLowLatencyPriority",
    options: {
      type: "fromNode",
      //data: {}
    },
  });

  const {
    deploymentInfo,
    setDeploymentInfo,
    removeContainer,
    initTargetClusters,
  } = deploymentStore;

  const {
    loadWorkSpaceList,
    workSpaceList,
    loadWorkspaceDetail,
    selectClusterInfo,
  } = workspaceStore;

  const {
    loadProjectListInWorkspace,
    projectListinWorkspace,
    loadProjectDetail,
  } = projectStore;

  const { pvClaimListInDeployment, setCheckPVCInDeployment } = claimStore;

  const onChange = (e) => {
    setDeploymentInfo(e.target.name, e.target.value);
  };

  const onChangeWorkspace = (e) => {
    setDeploymentInfo(e.target.name, e.target.value);
    loadProjectListInWorkspace(e.target.value);
    loadWorkspaceDetail(e.target.value);
  };

  const onChangePod = async ({ target: { name, value } }) => {
    let projectNameTemp = "";
    let clusterNameTemp = "";

    if (name === "project") {
      setDeploymentInfo(name, value);
      setPriorityDisable(false);
      projectNameTemp = value;
      loadProjectDetail(value);
      initTargetClusters(
        selectClusterInfo.map((clusterInfo) => clusterInfo.clusterName)
      );
    }
    if (name === "cluster") {
      setPrioritytPodDisable(false);
      clusterNameTemp = value;
      await podListInclusterAPI(clusterNameTemp, projectNameTemp);
    }
  };

  const openAddContainer = (index) => {
    setOpen2(true);
    setContainerIndex(index);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const onChangeCheckPVC = ({ target: { name, value } }) => {
    setCheckPVCInDeployment(name, value);
    setDeploymentInfo("pvcName", name);
    setDeploymentInfo("volume", value);
  };

  const deleteContainer = (e, index) => {
    e.stopPropagation();
    removeContainer(index);
  };

  useEffect(() => {
    loadWorkSpaceList();
  }, []);

  return (
    <>
      <DeploymentAddContainer
        containerIndex={containerIndex}
        open={open2}
        onClose={handleClose2}
      ></DeploymentAddContainer>

      <div className="step-container">
        <div className="signup-step">
          <div className="step current">
            <span>기본 정보</span>
          </div>
          <div className="arr"></div>
          <div className="step">
            <span>고급 설정</span>
          </div>
          <div className="arr"></div>
          <div className="step">
            <span>스케줄러</span>
          </div>
          <div className="arr"></div>
          <div className="step">
            <span>설정 검토</span>
          </div>
        </div>
      </div>
      <table className="tb_data_new tb_write">
        <tbody>
          <tr>
            <th style={{ width: "200px" }}>
              Deployment Name <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <CTextField
                type="text"
                placeholder="Deployment Name(영어소문자, 숫자만 가능)"
                className="form_fullWidth"
                name="deploymentName"
                onChange={onChange}
                value={deploymentInfo.deploymentName}
              />
            </td>
          </tr>

          <tr>
            <th>
              Workspace <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <FormControl className="form_fullWidth">
                <select
                  name="workspace"
                  onChange={onChangeWorkspace}
                  value={deploymentInfo.workspace}
                >
                  <option value={""} selected disabled hidden>
                    Select Workspace
                  </option>
                  {workSpaceList.map((workspace) => (
                    <option value={workspace.workspaceName}>
                      {workspace.workspaceName}
                    </option>
                  ))}
                </select>
              </FormControl>
            </td>
          </tr>

          <tr>
            <th>
              Project <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <FormControl className="form_fullWidth">
                <select
                  disabled={!deploymentInfo.workspace}
                  name="project"
                  onChange={onChangePod}
                  value={deploymentInfo.project}
                >
                  <option value={""} selected hidden disabled>
                    Select Project
                  </option>
                  {projectListinWorkspace.map((project) => (
                    <option value={project.projectName}>
                      {project.projectName}
                    </option>
                  ))}
                </select>
              </FormControl>
            </td>
          </tr>

          <tr>
            <th>
              Replicas <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <CTextField
                type="number"
                placeholder="Replicas"
                className="form_fullWidth"
                name="replicas"
                onChange={onChange}
                value={deploymentInfo.replicas}
              />
            </td>
          </tr>

          <tr>
            <th>ClaimVolume</th>
            <td colSpan="3">
              <Table className="tb_data_new">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center", width: "7%" }}></th>
                    <th style={{ textAlign: "center" }}>Name</th>
                    <th style={{ textAlign: "center" }}>Namespace</th>
                    <th style={{ textAlign: "center" }}>cluster</th>
                    <th style={{ textAlign: "center" }}>volume</th>
                  </tr>
                </thead>
                <tbody className="tb_data_nodeInfo" style={{ height: "105px" }}>
                  {pvClaimListInDeployment.map((pvc) => (
                    <tr>
                      <td style={{ textAlign: "center", width: "7%" }}>
                        <input
                          type="radio"
                          checked={deploymentInfo.pvcName === pvc.name}
                          name={pvc.name}
                          onChange={onChangeCheckPVC}
                          value={pvc.volume}
                        />
                      </td>
                      <td>{pvc.name}</td>
                      <td>{pvc.namespace}</td>
                      <td>{pvc.clusterName}</td>
                      <td>{pvc.volume ? pvc.volume : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </td>
          </tr>

          <tr>
            <th>
              Containers <span className="requried">*</span>
            </th>
            <td>
              <Button
                style={{ marginBottom: "2px" }}
                onClick={() => openAddContainer(-1)}
              >
                + Add Container
              </Button>
              <div>
                {deploymentInfo.containers.map((container, index) => (
                  <Button
                    style={{ marginTop: "2px", marginBottom: "2px" }}
                    onClick={() => openAddContainer(index)}
                  >
                    {container?.containerName}
                    <DeleteButton onClick={(e) => deleteContainer(e, index)}>
                      x
                    </DeleteButton>
                  </Button>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
});
export default CreateDeploymentStepOne;
