import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import DeploymentBasicInformation from "./DeploymentBasicInformation";
import DeploymentPodSettins from "./DeploymentPodSettins";
import { CTextField } from "@/components/textfields";
import FormControl from "@material-ui/core/FormControl";
import {
  deploymentStore,
  projectStore,
  schedulerStore,
  volumeStore,
  StorageClassStore,
} from "@/store";
import DeploymentYaml from "./DeploymentYaml";
import DeploymentPopup from "./DeploymentPopup";
import DeploymentVolumeSetting from "./DeploymentVolumeSetting";
import DeploymentVolumeYaml from "./DeploymentVolumeYaml";
import { swalError } from "@/utils/swal-utils";
import { CDialogNew } from "@/components/dialogs";
import { toJS } from "mobx";
import DeploymentAddContainer from "./DeploymentAddContainer";
import workspaceStore from "../../../../../../store/WorkSpace";
import clusterStore from "../../../../../../store/Cluster";
import podStore from "../../../../../../store/Pod";
import claimStore from "../../../../../../store/Claim";

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
  const [projectDisable, setProjectDisable] = useState(true);
  const [label, setLabel] = useState({ key: "", value: "" });
  const [annotation, setAnnotation] = useState({ key: "", value: "" });
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
    podReplicas,
    containerName,
    containerImage,
    containerPort,
    project,
    setContent,
    clearAll,
    setProject,
    containerPortName,
    postDeploymentGM,
    postDeploymentPVC,
    setContentVolume,
    podName,
    projectList,
    loadProjectList,
    labelList,
    initLabelList,
    addLabelList,
    removeLabelList,
    annotationList,
    initAnnotationList,
    addAnnotationList,
    removeAnnotationList,
    deploymentInfo,
    initDeploymentInfo,
    setDeploymentInfo,
    removeContainer,
  } = deploymentStore;

  const {
    loadWorkSpaceList,
    workSpaceList,
    loadWorkspaceDetail,
    selectClusterInfo,
  } = workspaceStore;

  const {
    loadProjectListInWorkspace,
    setProjectListinWorkspace,
    projectListinWorkspace,
  } = projectStore;

  const {
    loadPVClaims,
    pvClaimListInDeployment,
    checkPVCInDeployment,
    setCheckPVCInDeployment,
  } = claimStore;

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name == "workspace") {
      setDeploymentInfo(name, value);
      setProjectDisable(false);
      loadProjectListInWorkspace(value);
      // setPriorityDisable(false);
      loadClusterList();
      loadWorkspaceDetail(value);
    }
  };

  const onChangePod = async ({ target: { name, value } }) => {
    let projectNameTemp = "";
    let clusterNameTemp = "";

    if (name === "project") {
      setPriorityDisable(false);
      projectNameTemp = value;
      // setPrioritytDisable(false);
    }
    if (name === "cluster") {
      setPrioritytPodDisable(false);
      clusterNameTemp = value;
      await podListInclusterAPI(clusterNameTemp, projectNameTemp);
    }
  };

  const onChangeLabel = (e) => {
    setLabel({
      ...label,
      [e.target.name]: e.target.value,
    });
  };

  const addLabel = () => {
    if (label.key !== "" && label.value !== "") {
      addLabelList(label.key, label.value);
      setLabel({ key: "", value: "" });
    }
  };

  const onChangeAnnotation = (e) => {
    setAnnotation({
      ...annotation,
      [e.target.name]: e.target.value,
    });
  };

  const addAnnotation = () => {
    if (annotation.key !== "" && annotation.value !== "") {
      addAnnotationList(annotation.key, annotation.value);
      setAnnotation({ key: "", value: "" });
    }
  };

  const onChangeCheckPVC = ({ target: { value } }) => {
    setCheckPVCInDeployment(value);
  };

  const SelectedPriorityComponent = () => {
    switch (priority.name) {
      case "GLowLatencyPriority":
        return (
          <>
            <FormControl
              className="form_fullWidth"
              style={{ paddingTop: "4px" }}
            >
              <select
                name="type"
                value={priority.options.type}
                onChange={onChangeFrom}
              >
                <option value={"fromNode"}>from node</option>
                <option value={"fromPod"}>from pod</option>
              </select>
            </FormControl>
            {priority.options.type === "fromNode" ? (
              <div style={{ paddingTop: "4px" }}>
                <FormControl style={{ width: "50%" }}>
                  <select name="sourceCluster" onChange={onChangeSource}>
                    <option value={""}>Select Source Cluster</option>
                  </select>
                </FormControl>
                <FormControl style={{ width: "50%", paddingLeft: "4px" }}>
                  <select name="sourceNode" onChange={onChangeSource}>
                    <option value={""}>Select Source Node</option>
                  </select>
                </FormControl>
              </div>
            ) : (
              <>
                <table className="tb_data_new" style={{ marginTop: "4px" }}>
                  <tbody className="tb_data_nodeInfo">
                    <tr>
                      <td colSpan="3">
                        <FormControl className="form_fullWidth">
                          <select
                            disabled={prioritytDisable}
                            name="cluster"
                            onChange={onChangePod}
                          >
                            <option value={""} selected hidden disabled>
                              Select Cluster
                            </option>
                            {clusterListInWorkspace.map((cluster) => (
                              <option value={cluster.clusterName}>
                                {cluster.clusterName}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3">
                        <FormControl className="form_fullWidth">
                          <select
                            disabled={prioritytPodDisable}
                            name="pod"
                            onChange={onChangePod}
                          >
                            <option value={""} selected hidden disabled>
                              Select Pod
                            </option>

                            {podListIncluster ? (
                              podListIncluster.map((pod) => (
                                <option value={pod.name}>{pod.name}</option>
                              ))
                            ) : (
                              <option value="">No Data</option>
                            )}
                          </select>
                        </FormControl>
                      </td>
                    </tr>
                  </tbody>
                  {/* <tbody className="tb_data_nodeInfo">
                    <tr>
                      <th>Workspace Name</th>
                      <th>Project Name</th>
                      <th>Pod Name</th>
                    </tr>
                    <tr>
                      <td>
                        <CTextField
                          type="text"
                          placeholder="Workspace Name"
                          className="form_fullWidth"
                          name="workspaceName"
                          onChange={onChangeName}
                        />
                      </td>
                      <td>
                        <CTextField
                          type="text"
                          placeholder="Project Name"
                          className="form_fullWidth"
                          name="projectName"
                          onChange={onChange}
                        />
                      </td>
                      <td>
                        <CTextField
                          type="text"
                          placeholder="Pod Name"
                          className="form_fullWidth"
                          name="podName"
                          onChange={onChange}
                        />
                      </td>
                    </tr>
                  </tbody> */}
                </table>
              </>
            )}
          </>
        );
      case "GMostRequestPriority":
        return (
          <>
            <FormControl style={{ paddingTop: "4px" }}>
              <select
                name="type"
                value={priority.options.type}
                onChange={onChangeType}
              >
                <option value={"cpu"}>CPU</option>
                <option value={"gpu"}>GPU</option>
                <option value={"memory"}>MEMORY</option>
              </select>
            </FormControl>
          </>
        );
      case "GSelectedClusterPriority":
        return (
          <>
            <FormControl
              className="form_fullWidth"
              style={{ paddingTop: "4px" }}
            >
              <select
                name="type"
                value={priority.options.type}
                onChange={onChangeType}
              >
                <option value={"cluster"}>Cluster</option>
                <option value={"node"}>Node</option>
              </select>
            </FormControl>
            {priority.options.type === "cluster" ? (
              <>
                <FormControl
                  className="form_fullWidth"
                  style={{ paddingTop: "4px" }}
                >
                  <select name="cluster" onChange={onChangeType}>
                    <option value={""}>Select Cluster</option>
                    {selectClusterInfo.map((cluster) => (
                      <option value={cluster.clusterName}>
                        {cluster.clusterName}
                      </option>
                    ))}
                  </select>
                </FormControl>
              </>
            ) : (
              <div style={{ paddingTop: "4px" }}>
                <FormControl style={{ width: "50%" }}>
                  <select name="sourceCluster" onChange={onChangeSource}>
                    <option value={""}>Select Cluster</option>
                  </select>
                </FormControl>
                <FormControl style={{ width: "50%", paddingLeft: "4px" }}>
                  <select name="sourceNode" onChange={onChangeSource}>
                    <option value={""}>Select Node</option>
                  </select>
                </FormControl>
              </div>
            )}
          </>
        );
      case "GSetClusterPriority":
        return (
          <>
            <table className="tb_data_new" style={{ marginTop: "4px" }}>
              <tbody className="tb_data_nodeInfo">
                <tr>
                  <th>User Name</th>
                  <th>Workspace Name</th>
                  <th>Project Name</th>
                </tr>
                <tr>
                  <td>
                    <CTextField
                      type="text"
                      placeholder="User Name"
                      className="form_fullWidth"
                      name="userName"
                      onChange={onChangeName}
                    />
                  </td>
                  <td>
                    <CTextField
                      type="text"
                      placeholder="Workspace Name"
                      className="form_fullWidth"
                      name="workspaceName"
                      onChange={onChange}
                    />
                  </td>
                  <td>
                    <CTextField
                      type="text"
                      placeholder="Project Name"
                      className="form_fullWidth"
                      name="projectName"
                      onChange={onChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <FormControl
              className="form_fullWidth"
              style={{ paddingTop: "2px" }}
            >
              <select name="clusters" onChange={onChangeSource}>
                <option value={""}>Set Clusters</option>
              </select>
            </FormControl>
          </>
        );
      default:
        break;
    }
  };

  return (
    <>
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
            <span>설정 검토</span>
          </div>
        </div>
      </div>

      <table className="tb_data_new tb_write">
        <tbody>
          <tr>
            <th style={{ width: "278.39px" }}>
              Deployment Name <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <CTextField
                type="text"
                placeholder="Deployment Name"
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
                <select name="workspace" onChange={onChange}>
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
                  disabled={projectDisable}
                  name="project"
                  onChange={onChangePod}
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
            <th rowSpan={labelList.length + 2}>Labels</th>
          </tr>
          {labelList.map((label, index) => (
            <tr>
              <td style={{ paddingLeft: "5px" }}>{label.key}</td>
              <td style={{ paddingLeft: "5px" }}>{label.value}</td>
              <td>
                <Button
                  style={{
                    border: "none",
                    height: "28px",
                    width: "30px",
                    fontSize: "20px",
                    fontWeight: 600,
                    lineHeight: 1,
                    letterSpacing: "normal",
                    color: "#36435c",
                    backgroundColor: "#eff4f9",
                    padding: "0 0 0 0",
                    margin: "2px",
                    borderRadius: "0",
                  }}
                  onClick={() => removeLabelList(index)}
                >
                  -
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <CTextField
                type="text"
                placeholder="Key"
                className="form_fullWidth"
                name="key"
                onChange={onChangeLabel}
                value={label.key}
              />
            </td>
            <td>
              <CTextField
                type="text"
                placeholder="Value"
                className="form_fullWidth"
                name="value"
                onChange={onChangeLabel}
                value={label.value}
              />
            </td>
            <td>
              <Button
                style={{
                  border: "none",
                  height: "28px",
                  width: "30px",
                  fontSize: "20px",
                  fontWeight: 600,
                  lineHeight: 1,
                  letterSpacing: "normal",
                  color: "#36435c",
                  backgroundColor: "#eff4f9",
                  padding: "0 0 0 0",
                  borderRadius: "0",
                }}
                onClick={addLabel}
              >
                +
              </Button>
            </td>
          </tr>
          <tr>
            <th rowSpan={annotationList.length + 2}>Annotations</th>
          </tr>
          {annotationList.map((annotation, index) => (
            <tr>
              <td style={{ paddingLeft: "5px" }}>{annotation.key}</td>
              <td style={{ paddingLeft: "5px" }}>{annotation.value}</td>
              <td>
                <Button
                  style={{
                    border: "none",
                    height: "28px",
                    width: "30px",
                    fontSize: "20px",
                    fontWeight: 600,
                    lineHeight: 1,
                    letterSpacing: "normal",
                    color: "#36435c",
                    backgroundColor: "#eff4f9",
                    padding: "0 0 0 0",
                    margin: "2px",
                    borderRadius: "0",
                  }}
                  onClick={() => removeAnnotationList(index)}
                >
                  -
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <CTextField
                type="text"
                placeholder="Key"
                className="form_fullWidth"
                name="key"
                onChange={onChangeAnnotation}
                value={annotation.key}
              />
            </td>
            <td>
              <CTextField
                type="text"
                placeholder="Value"
                className="form_fullWidth"
                name="value"
                onChange={onChangeAnnotation}
                value={annotation.value}
              />
            </td>
            <td>
              <Button
                style={{
                  border: "none",
                  height: "28px",
                  width: "30px",
                  fontSize: "20px",
                  fontWeight: 600,
                  lineHeight: 1,
                  letterSpacing: "normal",
                  color: "#36435c",
                  backgroundColor: "#eff4f9",
                  padding: "0 0 0 0",
                  borderRadius: "0",
                }}
                onClick={addAnnotation}
              >
                +
              </Button>
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
            <th>Volume</th>
            <td colSpan="3">
              <Table className="tb_data_new">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center", width: "7%" }}></th>
                    <th style={{ textAlign: "center" }}>Name</th>
                    <th style={{ textAlign: "center" }}>Namespace</th>
                    <th style={{ textAlign: "center" }}>cluster</th>
                  </tr>
                </thead>
                <tbody className="tb_data_nodeInfo" style={{ height: "105px" }}>
                  {pvClaimListInDeployment.map((pvc) => (
                    <tr>
                      <td style={{ textAlign: "center", width: "7%" }}>
                        <input
                          type="radio"
                          name="clusterCheck"
                          onChange={onChangeCheckPVC}
                          value={pvc.name}
                        />
                      </td>
                      <td>{pvc.name}</td>
                      <td>{pvc.namespace}</td>
                      <td>{pvc.clusterName}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </td>
          </tr>

          <tr>
            <th>Priority</th>
            <td colSpan="3">
              <FormControl className="form_fullWidth">
                {/* <select name="workspace" onChange={onChangeWorkspace}> */}
                <select name="priority" onChange={onChange}>
                  <option value={""} selected disabled hidden>
                    Select Prority
                  </option>
                  <option value="gLowLatencyPriority">
                    GLowLatencyPriority
                  </option>
                </select>
              </FormControl>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
});
export default CreateDeploymentStepOne;
