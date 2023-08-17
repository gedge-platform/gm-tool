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
import axios from "axios";
import { SERVER_URL } from "../../../../../../config";
import { runInAction } from "mobx";

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
  const [open2, setOpen2] = useState(false);
  const [projectDisable, setProjectDisable] = useState(true);
  const [containerIndex, setContainerIndex] = useState(1);
  const [prioritytDisable, setPriorityDisable] = useState(true);
  const [prioritytPodDisable, setPrioritytPodDisable] = useState(true);
  const [nodeDisable, setNodeDisable] = useState(true);
  const [nodeName, setNodeName] = useState("");
  const [clusterNameInPriority, setClusterNameInPriority] = useState("");
  const [podName, setPodName] = useState("");
  const [type, setType] = useState("default");
  const [userName, setUserName] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [projectName, setProjectName] = useState("");

  const {
    setDeploymentInfo,
    removeContainer,
    priority,
    setPriority,
    targetClusters,
    priorityNodes,
    setPriorityNodes,
    deploymentInfo,
  } = deploymentStore;

  const {
    loadWorkSpaceList,
    loadWorkspaceDetail,
    selectClusterInfo,
    workSpaceList,
    workSpaceDetail,
  } = workspaceStore;

  const { loadProjectListInWorkspace } = projectStore;

  const { loadPVClaims } = claimStore;

  const { loadClusterList, clusterListInWorkspace, loadCluster } = clusterStore;

  const { podListInclusterAPI, podListIncluster } = podStore;

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name == "workspace") {
      setDeploymentInfo(name, value);
      setProjectDisable(false);
      loadProjectListInWorkspace(value);
      loadClusterList();
      loadWorkspaceDetail(value);
    } else if (name === "workspaceName") {
      priority.options.data.workspace_name === value;
    } else if (name === "projectName") {
      priority.options.data.project_name === value;
    }
  };

  const openTargetCluster = (index) => {
    setOpen2(true);
    setContainerIndex(index);
  };

  const onChangePod = async ({ target: { name, value } }) => {
    let projectNameTemp = deploymentInfo.project;
    let clusterNameTemp = "";
    setPrioritytPodDisable(false);
    if (name === "project") {
      setPriorityDisable(false);
      projectNameTemp = value;
    }
    if (name === "cluster") {
      setPrioritytPodDisable(false);
      setPriority({
        ...priority,
        data: {
          workspace_name: "",
          project_name: "",
          pod_name: "",
          target_clusters: "",
        },
      });
      clusterNameTemp = value;

      await podListInclusterAPI(clusterNameTemp, projectNameTemp);
    }
    if (name === "pod") {
      setPodName(value);
      priority.options.data.pod_name = value;
    }
  };

  const handleClose = () => {
    setOpen2(false);
  };

  const PriorityComponent = () => {
    const onChangePriority = (e) => {
      console.log(e);
      if (e.target.value === "GLowLatencyPriority") {
        if (type === "default") {
          setPriority({
            name: e.target.value,
            options: {
              user_name: workSpaceDetail.memberName,
              workspace_name: deploymentInfo.workspace,
              workspace_uid: workSpaceDetail.objectId,
              project_name: deploymentInfo.project,
              type: "default",
              data: {
                selected_cluster: "innogrid-k8s-master",
                // source_node: "",
                // target_clusters: "",
              },
            },
          });
        } else if (type === "fromPod") {
          setPriority({
            name: e.target.value,
            options: {
              user_name: workSpaceDetail.memberName,
              workspace_name: workSpaceDetail.workspaceName,
              workspce_uid: workSpaceDetail.objectId,
              project_name: deploymentInfo.project,
              type: type,
              data: {
                workspace_name: "",
                project_name: "",
                pod_name: "",
                target_clusters: "",
              },
            },
          });
        }
        // setPriority({
        //   name: e.target.value,
        //   options: {
        //     type: "default",
        //   },
        // });
      } else if (e.target.value === "GMostRequestPriority") {
        setPriority({
          name: e.target.value,
          options: {
            type: "cpu",
          },
        });
      } else if (e.target.value === "GSelectedClusterPriority") {
        // setType("cluster");
        setPriority({
          name: e.target.value,
          options: {
            user_name: workSpaceDetail.memberName,
            workspace_name: deploymentInfo.workspace,
            workspace_uid: workSpaceDetail.objectId,
            project_name: deploymentInfo.project,
            type: "default",
            data: {
              selected_cluster: "innogrid-k8s-master",
            },
          },
        });
      } else {
        setPriority({
          name: e.target.value,
          options: {
            type: "",
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

    const onChangeSource = async (e) => {
      const { name, value } = e.target;
      if (name === "sourceCluster") {
        setNodeDisable(false);
        setClusterNameInPriority(value);
        priority.options.data.selected_cluster = value;

        await axios
          .get(`${SERVER_URL}/clusters/${value}`)
          .then(({ data: { data } }) => {
            runInAction(() => {
              setPriorityNodes(data.nodes);
            });
          });
      }
      if (name === "sourceNode") {
        setNodeName(value);
      }
    };
    const onChangeName = (e) => {
      const { name, value } = e.target;
      if (name === "userName") {
        priority.options.data.pod_name === value;
      } else if (name === "workspaceName") {
      } else if (name === "projectName") {
      }
    };
    const onChangeType = (e) => {
      const { name, value } = e.target;
      console.log(e.target);
      setType(value);
      if (name === "type") {
        setPriority({
          ...priority,

          options: {
            user_name: workSpaceDetail.memberName,
            workspace_name: deploymentInfo.workspace,
            workspace_uid: workSpaceDetail.objectId,
            project_name: deploymentInfo.project,
            type: "default",
            data: {
              selected_cluster: "innogrid-k8s-master",
            },
          },
        });
      } else if (name === "selectCluster") {
        setPriority({
          ...priority,
          options: {
            user_name: workSpaceDetail.memberName,
            workspace_name: deploymentInfo.workspace,
            workspace_uid: workSpaceDetail.objectId,
            project_name: deploymentInfo.project,
            type: "default",
            data: {
              selected_cluster: "innogrid-k8s-master",
            },
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
      } else if (name === "default") {
        setPriority({
          ...priority,
          type: value,
        });
      }
    };

    const SelectedPriorityComponent = () => {
      console.log(priority.name);
      switch (priority.name) {
        case "GLowLatencyPriority":
          return (
            <>
              <FormControl
                className="form_fullWidth"
                style={{ paddingTop: "4px" }}
              >
                <select name="type" value={type} onChange={onChangeType}>
                  <option value={"default"}>from node</option>
                  <option value={"from_pod"}>from pod</option>
                </select>
                {type === "default" ? (
                  <div style={{ paddingTop: "4px" }}>
                    <FormControl style={{ width: "50%" }}>
                      <select name="sourceCluster" onChange={onChangeSource}>
                        <option value={""} selected disabled hidden>
                          Select Source Cluster
                        </option>
                        {clusterListInWorkspace.map((cluster) => (
                          <option value={cluster.clusterName}>
                            {cluster.clusterName}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormControl style={{ width: "50%", paddingLeft: "4px" }}>
                      <select
                        name="sourceNode"
                        onChange={onChangeSource}
                        disabled={nodeDisable}
                      >
                        <option value={""} selected disabled hidden>
                          Select Source Node
                        </option>
                        {priorityNodes.length !== 0 ? (
                          priorityNodes.map((node) => (
                            <option value={node.name}>{node.name}</option>
                          ))
                        ) : (
                          <option value={"noData"}>No Data</option>
                        )}
                      </select>
                    </FormControl>
                  </div>
                ) : (
                  <div style={{ paddingTop: "4px" }}>
                    <FormControl style={{ width: "50%" }}>
                      <select name="sourceCluster" onChange={onChangePod}>
                        <option value={""} selected disabled hidden>
                          Select Cluster
                        </option>
                        {clusterListInWorkspace.map((cluster) => (
                          <option value={cluster.clusterName}>
                            {cluster.clusterName}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormControl style={{ width: "50%", paddingLeft: "4px" }}>
                      <select
                        name="pod"
                        onChange={onChangePod}
                        disabled={prioritytPodDisable}
                      >
                        <option value={""} selected disabled hidden>
                          Select Pod
                        </option>
                        {podListIncluster.length !== 0 ? (
                          podListIncluster.map((pod) => (
                            <option value={pod.name}>{pod.name}</option>
                          ))
                        ) : (
                          <option value={"noData"}>No Data</option>
                        )}
                      </select>
                    </FormControl>
                  </div>
                )}
              </FormControl>
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
                <select name="type" value={type} onChange={onChangeType}>
                  <option value={"cluster"}>Cluster</option>
                  <option value={"node"}>Node</option>
                </select>
                {type === "cluster" ? (
                  <>
                    <FormControl
                      className="form_fullWidth"
                      style={{ paddingTop: "4px" }}
                    >
                      <select name="selectCluster" onChange={onChangeSource}>
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
                        <option value={""} selected disabled hidden>
                          Select Source Cluster
                        </option>
                        {clusterListInWorkspace.map((cluster) => (
                          <option value={cluster.clusterName}>
                            {cluster.clusterName}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormControl style={{ width: "50%", paddingLeft: "4px" }}>
                      <select
                        name="sourceNode"
                        onChange={onChangeSource}
                        disabled={nodeDisable}
                      >
                        <option value={""} selected disabled hidden>
                          Select Source Node
                        </option>
                        {priorityNodes !== null ? (
                          priorityNodes.map((node) => (
                            <option value={node.name}>{node.name}</option>
                          ))
                        ) : (
                          <option value={"noData"}>No Data</option>
                        )}
                      </select>
                    </FormControl>
                  </div>
                )}
              </FormControl>
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

    useEffect(() => {
      loadCluster(nodeName);
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
          <tr>
            <th>Target Clusters</th>
            <td>
              <Button
                style={{ marginBottom: "2px" }}
                onClick={() => openTargetCluster(-1)}
              >
                {targetClusters.length === 0
                  ? "+ Target Clusters"
                  : JSON.stringify(targetClusters)}
              </Button>
              <div></div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
});
export default CreateDeploymentStepThree;
