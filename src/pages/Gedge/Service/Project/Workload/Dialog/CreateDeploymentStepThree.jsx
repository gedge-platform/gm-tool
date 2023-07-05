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
import DeploymentTargetClusters from "./DeploymentTargetClusters";

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

const CreateDeploymentStepThree = observer(() => {
  const [ open, setOpen ] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [stepValue, setStepValue] = useState(1);
  const [projectDisable, setProjectDisable] = useState(true);
  const [containerIndex, setContainerIndex] = useState(1);
  const [prioritytDisable, setPriorityDisable] = useState(true);
  const [prioritytPodDisable, setPrioritytPodDisable] = useState(true);

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
    priority,
    setPriority,
  } = deploymentStore;
  console.log("priority :", priority);

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

  const { loadClusterList, clusterList, clusterListInWorkspace } = clusterStore;
  const { podListInclusterAPI, podListIncluster } = podStore;

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

  const openTargetCluster = (index) => {
    setOpen2(true);
    setContainerIndex(index);
  };

  const removeContainers = (e, index) => {
    e.stopPropagation();
    removeContainer(index);
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

  const handleClose = () => {
    setOpen2(false)
  }

  const PriorityComponent = () => {
    const onChangePriority = (e) => {
      if (e.target.value === "GLowLatencyPriority") {
        setPriority({
          name: e.target.value,
          options: {
            type: "fromNode",
            //data: {}
          },
        });
      } else if (e.target.value === "GMostRequestPriority") {
        setPriority({
          name: e.target.value,
          options: {
            type: "cpu",
            //data: {}
          },
        });
      } else if (e.target.value === "GSelectedClusterPriority") {
        setPriority({
          name: e.target.value,
          options: {
            type: "cluster",
            //data: {}
          },
        });
      } else {
        setPriority({
          name: e.target.value,
          options: {
            type: "",
            //data: {}
          },
        });
      }
    };

    const onChangeFrom = (e) => {
      setPriority({
        ...priority,
        options: {
          type: e.target.value,
        },
      });
    };

    const onChangeSource = (e) => {};
    const onChangeName = (e) => {};
    const onChangeType = (e) => {
      const { name, value } = e.target;
      if (name === "type") {
        setPriority({
          ...priority,
          options: {
            type: value,
          },
        });
      } else if (name === "selectCluster") {
        setPriority({
          ...priority,
          options: {
            type: "cluster",
            value: value,
          },
        });
      } else if (name === "sourceCluster") {
        setPriority({
          ...priority,
          options: {
            type: "node",
            value: value,
          },
        });
      } else if (name === "sourceNode") {
        setPriority({
          ...priority,
          options: {
            type: "node",
            value: value,
          },
        });
      }
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
                              //   disabled={prioritytDisable}
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
                    <select name="selectCluster" onChange={onChangeType}>
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
                    <select name="sourceCluster" onChange={onChangeType}>
                      <option value={""}>Select Cluster</option>
                    </select>
                  </FormControl>
                  <FormControl style={{ width: "50%", paddingLeft: "4px" }}>
                    <select name="sourceNode" onChange={onChangeType}>
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

    useEffect(() => {
      loadWorkSpaceList();
    }, []);

    useEffect(() => {
      loadPVClaims();
    }, []);

    useEffect(() => {
      loadClusterList();
    }, []);

    return (
      <tr>
        <th style={{ width: "30%" }}>
          Priority <span className="requried">*</span>
        </th>
        <td colSpan="3">
          <FormControl className="form_fullWidth">
            <select name="priority" onChange={onChangePriority}>
              <option value={"GLowLatencyPriority"}>GLowLatencyPriority</option>
              <option value={"GMostRequestPriority"}>
                GMostRequestPriority
              </option>
              <option value={"GSelectedClusterPriority"}>
                GSelectedClusterPriority
              </option>
              <option value={"GSetClusterPriority"}>GSetClusterPriority</option>
            </select>
          </FormControl>
          {SelectedPriorityComponent()}
        </td>
      </tr>
    );
  };

  return (
    <>
      <DeploymentTargetClusters
        open={open2}
        onClose={handleClose}
      ></DeploymentTargetClusters>

      <div className="step-container">
        <div className="signup-step">
          <div className="step">
            <span>기본 정보</span>
          </div>
          <div className="arr"></div>
          <div className="step">
            <span>고급 설정</span>
          </div>
          <div className="arr"></div>
          <div className="step current">
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
          {PriorityComponent()}
          {/* <tr>
            <th style={{ width: "30%" }}>
              Priority <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <FormControl className="form_fullWidth">
                <select name="priority" onChange={onChangePriority}>
                  <option value={"GLowLatencyPriority"}>
                    GLowLatencyPriority
                  </option>
                  <option value={"GMostRequestPriority"}>
                    GMostRequestPriority
                  </option>
                  <option value={"GSelectedClusterPriority"}>
                    GSelectedClusterPriority
                  </option>
                  <option value={"GSetClusterPriority"}>
                    GSetClusterPriority
                  </option>
                </select>
              </FormControl>
            </td>
          </tr> */}

          <tr>
            <th>Target Clusters</th>
            <td>
              <Button
                style={{ marginBottom: "2px" }}
                onClick={() => openTargetCluster(-1)}
              >
                + Target Clusters
              </Button>
              <div>
                {/* {deploymentInfo.containers.map((container, index) => (
                  <Button
                    style={{ marginTop: "2px", marginBottom: "2px" }}
                    onClick={() => openTargetCluster(index)}
                  >
                    {container.containerName}
                    <DeleteButton onClick={(e) => removeContainers(e, index)}>
                      x
                    </DeleteButton>
                  </Button>
                ))} */}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
});
export default CreateDeploymentStepThree;
