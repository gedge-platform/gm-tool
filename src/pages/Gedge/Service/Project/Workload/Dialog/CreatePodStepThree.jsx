import { observer } from "mobx-react";
import FormControl from "@material-ui/core/FormControl";
import { CTextField } from "@/components/textfields";
import styled from "styled-components";
import PodTargetClusters from "./PodTargetClusters";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../../../../../../config";
import podStore from "../../../../../../store/Pod";
import claimStore from "../../../../../../store/Claim";
import workspaceStore from "../../../../../../store/WorkSpace";
import clusterStore from "../../../../../../store/Cluster";
import projectStore from "../../../../../../store/Project";
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

const CreatePodStepThree = observer((props) => {
  const {
    loadWorkSpaceList,
    loadWorkspaceDetail,
    selectClusterInfo,
    workSpaceDetail,
  } = workspaceStore;

  const {
    priority,
    setPriority,
    podInfo,
    setPodInfo,
    targetClusters,
    podListIncluster,
    priorityNodes,
    setPriorityNodes,
    podListInclusterAPI,
    selectedCluster,
    setSelectedCluster,
  } = podStore;

  const { loadProjectListInWorkspace } = projectStore;

  const { loadPVClaims } = claimStore;

  const {
    loadClusterList,
    loadCluster,
    loadClusterInWorkspace,
    clusterDetail,
  } = clusterStore;

  const [open, setOpen] = useState(false);
  const [nodeName, setNodeName] = useState("");
  const [nodeDisable, setNodeDisable] = useState(true);
  const [containerIndex, setContainerIndex] = useState(1);
  const [prioritytDisable, setPriorityDisable] = useState(true);
  const [prioritytPodDisable, setPrioritytPodDisable] = useState(true);
  const [clusterNameInPriority, setClusterNameInPriority] = useState("");
  const [type, setType] = useState("from_node");
  const [podName, setPodName] = useState("");
  const [projectDisable, setProjectDisable] = useState(true);

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name == "workspace") {
      setPodInfo(name, value);
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
    setOpen(true);
    setContainerIndex(index);
  };

  const onChangePod = async (e) => {
    console.log("priority : ", priority);
    const { name, value } = e.target;
    let projectNameTemp = podInfo.project;
    let clusterNameTemp = "";
    console.log("target : ", e.target);
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
    }
    if (name === "sourceCluster") {
      clusterNameTemp = value;

      await podListInclusterAPI(clusterNameTemp, projectNameTemp);
    }
    if (name === "selectCluster") {
      console.log(value);
      priority.options.data.selected_cluster = value;
      clusterNameTemp = value;

      await podListInclusterAPI(clusterNameTemp, projectNameTemp);
    }

    if (name === "pod") {
      setPodName(value);
      priority.options.data.pod_name = value;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const PriorityComponent = () => {
    const onChangePriority = (e) => {
      if (e.target.value === "GLowLatencyPriority") {
        if (type === "from_node") {
          console.log(workSpaceDetail);
          setPriority({
            name: e.target.value,
            options: {
              user_name: workSpaceDetail.memberName,
              workspace_name: podInfo.workspace,
              workspace_uid: workSpaceDetail.objectId,
              project_name: podInfo.project,
              type: type,
              data: {
                source_cluster: "",
                source_node: "",
                selected_cluster: "",
                // selected_cluster: "innogrid-k8s-master",
                // source_node: "",
                // target_clusters: "",
              },
            },
          });
        } else if (type === "from_pod") {
          setPriority({
            name: e.target.value,
            options: {
              user_name: workSpaceDetail.memberName,
              workspace_name: workSpaceDetail.workspaceName,
              workspce_uid: workSpaceDetail.objectId,
              project_name: podInfo.project,
              type: type,
              data: {
                select_cluster: "",
                pod_name: "",
                selected_cluster: "",
                // selected_cluster: "innogrid-k8s-master",
                // source_node: "",
                // target_clusters: "",
              },
            },
          });
          setClusterNameInPriority("");
        }
        setPriority({
          name: e.target.value,
          options: {
            type: "from_node",
          },
        });
      } else if (e.target.value === "GMostRequestPriority") {
        setPriority({
          name: e.target.value,
          options: {
            type: "cpu",
          },
        });
      } else if (e.target.value === "GSelectedClusterPriority") {
        setPriority({
          name: e.target.value,
          options: {
            user_name: workSpaceDetail.memberName,
            workspace_name: podInfo.workspace,
            workspace_uid: workSpaceDetail.objectId,
            project_name: podInfo.project,
            type: "default",
            data: {
              selected_cluster: selectedCluster,
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
      const { name, value } = e.target;
      setPriority({
        ...priority,
        options: {
          type: value,
        },
      });
    };

    const onChangeSource = async (e) => {
      const { name, value } = e.target;
      console.log(value);
      if (name === "selectCluster") {
        // priority.options.data.selected_cluster = value;
        setSelectedCluster(value);
        console.log("priority : ", priority);
      }
      if (name === "sourceCluster") {
        console.log("priority : ", priority);
        setPriority({
          name: priority.name,
          options: {
            user_name: workSpaceDetail.memberName,
            workspace_name: podInfo.workspace,
            workspace_uid: workSpaceDetail.objectId,
            project_name: podInfo.project,
            type: type,
            data: {
              source_cluster: value,
              source_node: "",
              selected_cluster: "",
            },
          },
        });
        setNodeDisable(false);
        setClusterNameInPriority(value);
        loadCluster(value);
        // priority.options.data.source_cluster = value;

        await axios.get(`${SERVER_URL}/clusters/${value}`).then((res) => {
          runInAction(() => {
            setPriorityNodes(res.data.data.nodes);
          });
        });
      }
      if (name === "sourceNode") {
        podListInclusterAPI(clusterNameInPriority, podInfo.project);
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
      setType(value);
      console.log(priority);
      console.log(e.target);
      if (name === "type") {
        console.log("selectedCluster : ", selectedCluster);
        setPriority({
          ...priority,
          options: {
            user_name: workSpaceDetail.memberName,
            workspace_name: podInfo.workspace,
            workspace_uid: workSpaceDetail.objectId,
            project_name: podInfo.project,
            type: value,
            data: {
              // selected_cluster: selectedCluster,
            },
          },
        });
      } else if (name === "selectCluster") {
        setPriority({
          ...priority,
          options: {
            user_name: workSpaceDetail.memberName,
            workspace_name: podInfo.workspace,
            workspace_uid: workSpaceDetail.objectId,
            project_name: podInfo.project,
            type: "default",
            data: {
              selected_cluster: selectedCluster,
            },
          },
        });
      } else if (name === "sourceCluster") {
        setPriority({
          ...priority,
          options: {
            type: " from_node",
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
      console.log("priority : ", priority);
      switch (priority.name) {
        case "GLowLatencyPriority":
          return (
            <>
              <FormControl
                className="form_fullWidth"
                style={{ paddingTop: "4px" }}
              >
                <select name="type" value={type} onChange={onChangeType}>
                  <option value={"from_node"}>from node</option>
                  <option value={"from_pod"}>from pod</option>
                </select>
                {type === "from_node" ? (
                  <div style={{ paddingTop: "4px" }}>
                    <FormControl style={{ width: "50%" }}>
                      <select name="sourceCluster" onChange={onChangeSource}>
                        <option value={""} selected disabled hidden>
                          Select Source Cluster
                        </option>
                        {selectClusterInfo.map((cluster) => (
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
                        {clusterDetail.nodes !== null ? (
                          clusterDetail.nodes.map((node) => (
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
                      <select name="selectCluster" onChange={onChangePod}>
                        <option value={""} selected disabled hidden>
                          Select Cluster
                        </option>
                        {selectClusterInfo.map((cluster) => (
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
                        {podListIncluster !== null ? (
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
                  onChange={onChangeFrom}
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
                {type === "node" ? (
                  <div style={{ paddingTop: "4px" }}>
                    <FormControl style={{ width: "50%" }}>
                      <select name="sourceCluster" onChange={onChangeSource}>
                        <option value={""} selected disabled hidden>
                          Select Source Cluster
                        </option>
                        {selectClusterInfo.map((cluster) => (
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
                ) : (
                  <>
                    <FormControl
                      className="form_fullWidth"
                      style={{ paddingTop: "4px" }}
                    >
                      <select name="selectCluster" onChange={onChangeSource}>
                        <option value={""} selected disabled hidden>
                          Select Cluster
                        </option>
                        {selectClusterInfo.map((cluster) => (
                          <option value={cluster.clusterName}>
                            {cluster.clusterName}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                  </>
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
                {/* <select name="clusters" onChange={onChangeSource}>
                  <option value={""} selected disabled hidden>
                    Set Clusters
                  </option>
                  {selectClusterInfo.map((cluster) => (
                    <option value={cluster.clusterName}>
                      {cluster.clusterName}
                    </option>
                  ))}
                </select> */}
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
      loadClusterInWorkspace(podInfo.workspace);
    }, []);

    useEffect(() => {
      loadCluster(nodeName);
    }, []);

    useEffect(() => {
      loadClusterList();
    }, []);

    useEffect(() => {
      loadWorkspaceDetail(podInfo.workspace);
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
      <PodTargetClusters open2={open} onClose={handleClose}></PodTargetClusters>

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

export default CreatePodStepThree;
