import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { CTextField } from "@/components/textfields";
import FormControl from "@material-ui/core/FormControl";
import {
  deploymentStore,
  projectStore,
  workspaceStore,
  clusterStore,
  podStore,
  claimStore,
} from "@/store";
import DeploymentTargetClusters from "./DeploymentTargetClusters";
import axios from "axios";
import { runInAction } from "mobx";
import { SERVER_URL } from "@/config.jsx";

const Button = styled.button`
  background-color: #fff;
  border: 1px solid black;
  color: black;
  padding: 10px 35px;
  margin-right: 10px;
  border-radius: 4px;
  /* box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%); */
`;

const CreateDeploymentStepThree = observer(() => {
  const [open2, setOpen2] = useState(false);
  const [containerIndex, setContainerIndex] = useState(1);

  const {
    targetClusters,
    resetTargetClusters,
    deployment,
    setDeployment,
    setDeploymentPriority,
  } = deploymentStore;

  const { selectClusterInfo } = workspaceStore;

  const { loadCluster, clusterDetail, initClusterDetail } = clusterStore;

  const { podListInclusterAPI, podListIncluster } = podStore;

  const { loadProjectList, projectLists } = projectStore;

  useEffect(() => {
    loadProjectList();
  }, []);

  // 프로젝트 기준의 클러스터리스트
  const selectedProject = projectLists?.find(
    (data) => data.workspace.workspaceName === deployment.workspace
  );

  const openTargetClusters = (index) => {
    setOpen2(true);
    setContainerIndex(index);
  };

  const loadSourceNode = (targetCluster) => {
    if (
      !(
        deployment.priority.name === "GLowLatencyPriority" &&
        deployment.priority.mode === "from_node"
      )
    ) {
      setDeploymentPriority("sourceNode", "");
    }
    loadCluster(targetCluster[0]);
  };

  const showTargetClusters = () => {
    if (targetClusters.length === 0) {
      return "+ Target Clusters";
    }
    if (deployment.priority.name === "GSetClusterPriority") {
      return JSON.stringify(targetClusters[0]);
    }
    return JSON.stringify(targetClusters);
  };

  const handleClose = () => {
    setOpen2(false);
  };

  const PriorityComponent = () => {
    const handlePriority = (e) => {
      if (e.target.name === "name") {
        resetTargetClusters();
        if (e.target.value === "GLowLatencyPriority") {
          setDeployment("priority", {
            name: "GLowLatencyPriority",
            mode: "from_node",
            sourceCluster: "",
            sourceNode: "",
          });
        }
        if (e.target.value === "GMostRequestPriority") {
          setDeployment("priority", {
            name: "GMostRequestPriority",
            mode: "default",
          });
        }
        if (e.target.value === "GSelectedClusterPriority") {
          setDeployment("priority", {
            name: e.target.value,
            mode: "cluster",
            sourceCluster: "",
          });
        }
        if (e.target.value === "GSetClusterPriority") {
          setDeployment("priority", {
            name: e.target.value,
          });
        }
      }

      if (e.target.name === "mode") {
        resetTargetClusters();
        if (deployment.priority.name === "GLowLatencyPriority") {
          if (e.target.value === "from_node") {
            setDeployment("priority", {
              name: "GLowLatencyPriority",
              mode: "from_node",
              sourceCluster: "",
              sourceNode: "",
            });
          }
          if (e.target.value === "from_pod") {
            setDeployment("priority", {
              name: "GLowLatencyPriority",
              mode: "from_pod",
              sourceCluster: "",
              podName: "",
            });
          }
        }
        if (deployment.priority.name === "GMostRequestPriority") {
          setDeployment("priority", {
            name: "GMostRequestPriority",
            mode: e.target.value,
          });
        }
        if (deployment.priority.name === "GSelectedClusterPriority") {
          if (e.target.value === "cluster") {
            setDeployment("priority", {
              name: "GSelectedClusterPriority",
              mode: "cluster",
              selectCluster: "",
            });
          }
          if (e.target.value === "node") {
            initClusterDetail();
            setDeployment("priority", {
              name: "GSelectedClusterPriority",
              mode: "node",
              sourceCluster: "",
              sourceNode: "",
            });
          }
        }
      }

      if (e.target.name === "sourceCluster") {
        setDeploymentPriority("sourceCluster", e.target.value);
        if (deployment.priority.mode === "from_node") {
          loadCluster(e.target.value);
          // setDeploymentPriority("sourceNode", e.target.value);
        }
        if (deployment.priority.mode === "from_pod") {
          podListInclusterAPI(e.target.value, deployment.project);
          setDeploymentPriority("podName", "");
        }
        if (deployment.priority.mode === "node") {
          loadCluster(e.target.value);
          setDeploymentPriority("sourceNode", e.target.value);
        }
      }

      if (e.target.name === "sourceNode") {
        setDeploymentPriority("sourceNode", e.target.value);
      }

      if (e.target.name === "podName") {
        setDeploymentPriority("podName", e.target.value);
      }
    };

    const SelectedPriorityComponent = () => {
      switch (deployment.priority.name) {
        case "GLowLatencyPriority":
          return (
            <>
              <tr>
                <th>
                  Priority Mode<span className="requried">*</span>
                </th>
                <td>
                  <FormControl className="form_fullWidth">
                    <select
                      name="mode"
                      value={deployment.priority.mode}
                      onChange={handlePriority}
                    >
                      <option value={"from_node"}>from node</option>
                      <option value={"from_pod"}>from pod</option>
                    </select>
                  </FormControl>
                </td>
              </tr>
              <tr>
                <th>
                  Source Clusters & Nodes<span className="requried">*</span>
                </th>
                <td>
                  {deployment.priority.mode === "from_node" ? (
                    <div>
                      <FormControl style={{ width: "50%" }}>
                        <select
                          name="sourceCluster"
                          value={deployment.priority.sourceCluster}
                          onChange={handlePriority}
                        >
                          <option value={""} selected disabled hidden>
                            Select Source Cluster
                          </option>
                          {selectedProject?.selectCluster?.map((cluster) => (
                            <option value={cluster.clusterName}>
                              {cluster.clusterName}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormControl style={{ width: "50%", paddingLeft: "4px" }}>
                        <select
                          name="sourceNode"
                          onChange={handlePriority}
                          value={deployment.priority.sourceNode}
                          disabled={
                            deployment.priority.sourceCluster === "" && true
                          }
                        >
                          <option value={""} selected disabled hidden>
                            Select Source Node
                          </option>
                          {clusterDetail.nodes !== null ? (
                            clusterDetail.nodes.map((node) => (
                              <option value={node.name}>{node.name}</option>
                            ))
                          ) : (
                            <option value={"noData"} disabled>
                              No Data
                            </option>
                          )}
                        </select>
                      </FormControl>
                    </div>
                  ) : (
                    <div>
                      <FormControl style={{ width: "50%" }}>
                        <select
                          name="sourceCluster"
                          value={deployment.priority.sourceCluster}
                          onChange={handlePriority}
                        >
                          <option value={""} selected disabled hidden>
                            Select Cluster
                          </option>
                          {selectedProject?.selectCluster?.map((cluster) => (
                            <option value={cluster.clusterName}>
                              {cluster.clusterName}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormControl style={{ width: "50%", paddingLeft: "4px" }}>
                        <select
                          name="podName"
                          onChange={handlePriority}
                          value={deployment.priority.podName}
                          disabled={
                            deployment.priority.sourceCluster === "" && true
                          }
                        >
                          <option value={""} selected disabled hidden>
                            Select Pod
                          </option>
                          {podListIncluster !== null ? (
                            podListIncluster.map((pod) => (
                              <option value={pod.name}>{pod.name}</option>
                            ))
                          ) : (
                            <option value={"noData"} disabled>
                              No Data
                            </option>
                          )}
                        </select>
                      </FormControl>
                    </div>
                  )}
                </td>
              </tr>
            </>
          );
        case "GMostRequestPriority":
          return (
            <tr>
              <th>
                Priority Mode<span className="requried">*</span>
              </th>
              <td>
                <FormControl>
                  <select
                    name="mode"
                    value={deployment.priority.mode}
                    onChange={handlePriority}
                  >
                    <option value={"default"}>default</option>
                    <option value={"cpu"}>CPU</option>
                    <option value={"gpu"}>GPU</option>
                    <option value={"memory"}>MEMORY</option>
                  </select>
                </FormControl>
              </td>
            </tr>
          );
        case "GSelectedClusterPriority":
          return (
            <>
              <tr>
                <th>
                  Priority Mode<span className="requried">*</span>
                </th>
                <td>
                  <FormControl className="form_fullWidth">
                    <select
                      name="mode"
                      value={deployment.priority.mode}
                      onChange={handlePriority}
                    >
                      <option value={"cluster"}>Cluster</option>
                      <option value={"node"}>Node</option>
                    </select>
                  </FormControl>
                </td>
              </tr>
              {deployment.priority.mode === "node" && (
                <>
                  <tr>
                    <th>Target Clusters</th>
                    <td>
                      <Button onClick={() => openTargetClusters(-1)}>
                        {showTargetClusters()}
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      Source Node<span className="requried">*</span>
                    </th>
                    <td>
                      <div>
                        <FormControl style={{ width: "100%" }}>
                          <select
                            name="sourceNode"
                            onChange={handlePriority}
                            value={deployment.priority.sourceNode}
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
                    </td>
                  </tr>
                </>
              )}
            </>
          );
        case "GSetClusterPriority":
          return;
        default:
          break;
      }
    };

    return (
      <>
        <tr>
          <th style={{ width: "30%" }}>
            Priority Type <span className="requried">*</span>
          </th>
          <td>
            <FormControl className="form_fullWidth">
              <select name="name" onChange={handlePriority}>
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
        </tr>
        {SelectedPriorityComponent()}
      </>
    );
  };

  // const PriorityComponent = () => {
  //   const onChangePriority = (e) => {
  //     if (e.target.value === "GLowLatencyPriority") {
  //       setType("default");
  //       console.log(type);
  //       if (type === "default") {
  //         setPriority({
  //           name: e.target.value,
  //           options: {
  //             user_name: "user1",
  //             workspace_name: "ws1",
  //             workspace_uid: "649128e7fc34732e0eccfa6d",
  //             project_name: "p1",
  //             type: "default",
  //             data: {
  //               selected_cluster: "innogrid-k8s-master",
  //             },
  //             // user_name: workSpaceDetail.memberName,
  //             // workspace_name: deploymentInfo.workspace,
  //             // workspace_uid: workSpaceDetail.objectId,
  //             // project_name: deploymentInfo.project,
  //             // type: "default",
  //             // data: {
  //             //   selected_cluster: selectedCluster,
  //             //   source_node: "",
  //             //   target_clusters: "",
  //             // },
  //           },
  //         });
  //       } else if (type === "fromPod") {
  //         console.log(type);
  //         setPriority({
  //           name: e.target.value,
  //           options: {
  //             user_name: "user1",
  //             workspace_name: "ws1",
  //             workspace_uid: "649128e7fc34732e0eccfa6d",
  //             project_name: "p1",
  //             type: "default",
  //             data: {
  //               selected_cluster: "innogrid-k8s-master",
  //             },
  //             // user_name: workSpaceDetail.memberName,
  //             // workspace_name: workSpaceDetail.workspaceName,
  //             // workspce_uid: workSpaceDetail.objectId,
  //             // project_name: deploymentInfo.project,
  //             // type: type,
  //             // data: {
  //             //   workspace_name: "",
  //             //   project_name: "",
  //             //   pod_name: "",
  //             //   target_clusters: "",
  //             // },
  //           },
  //         });
  //       }
  //       setPriority({
  //         name: e.target.value,
  //         options: {
  //           type: "default",
  //         },
  //       });
  //     } else if (e.target.value === "GMostRequestPriority") {
  //       console.log(type);
  //       setPriority({
  //         name: e.target.value,
  //         options: {
  //           type: "cpu",
  //         },
  //       });
  //     } else if (e.target.value === "GSelectedClusterPriority") {
  //       setType("cluster");
  //       console.log(type);
  //       setPriority({
  //         name: e.target.value,
  //         options: {
  //           user_name: "user1",
  //           workspace_name: "ws1",
  //           workspace_uid: "649128e7fc34732e0eccfa6d",
  //           project_name: "p1",
  //           type: "default",
  //           data: {
  //             selected_cluster: "innogrid-k8s-master",
  //           },
  //           // user_name: workSpaceDetail.memberName,
  //           // workspace_name: deploymentInfo.workspace,
  //           // workspace_uid: workSpaceDetail.objectId,
  //           // project_name: deploymentInfo.project,
  //           // type: "default",
  //           // data: {
  //           //   selected_cluster: selectedCluster,
  //           // },
  //         },
  //       });
  //     } else {
  //       console.log(type);
  //       setPriority({
  //         name: e.target.value,
  //         options: {
  //           type: "",
  //         },
  //       });
  //     }
  //   };

  //   const onChangeFrom = (e) => {
  //     setPriority({
  //       ...priority,
  //       options: {
  //         type: e.target.value,
  //       },
  //     });
  //   };

  //   const onChangeSource = async (e) => {
  //     const { name, value } = e.target;
  //     // if (name === "selectCluster") {
  //     priority.options.data.selected_cluster = "innogrid-k8s-master";
  //     //   setSelectedCluster(value);
  //     // }
  //     if (name === "sourceCluster") {
  //       setNodeDisable(false);
  //       setClusterNameInPriority(value);
  //       loadCluster(value);
  //       priority.options.data.selected_cluster = "innogrid-k8s-master";

  //       await axios
  //         .get(`${SERVER_URL}/clusters/${value}`)
  //         .then(({ data: { data } }) => {
  //           runInAction(() => {
  //             setPriorityNodes(data.nodes);
  //           });
  //         });
  //     }
  //     if (name === "sourceNode") {
  //       priority.options.data.selected_cluster = "innogrid-k8s-master";
  //       setNodeName("innogrid-k8s-master");
  //       console.log(priority);
  //     }
  //   };

  //   const onChangeName = (e) => {
  //     const { name, value } = e.target;
  //     if (name === "userName") {
  //       priority.options.data.pod_name === value;
  //     } else if (name === "workspaceName") {
  //     } else if (name === "projectName") {
  //     }
  //   };
  //   const onChangeType = (e) => {
  //     const { name, value } = e.target;
  //     console.log(e.target);
  //     setType(value);
  //     if (name === "type") {
  //       setPriority({
  //         ...priority,

  //         options: {
  //           user_name: "user1",
  //           workspace_name: "ws1",
  //           workspace_uid: "649128e7fc34732e0eccfa6d",
  //           project_name: "p1",
  //           type: "default",
  //           data: {
  //             selected_cluster: "innogrid-k8s-master",
  //           },
  //           // user_name: workSpaceDetail.memberName,
  //           // workspace_name: deploymentInfo.workspace,
  //           // workspace_uid: workSpaceDetail.objectId,
  //           // project_name: deploymentInfo.project,
  //           // type: "default",
  //           // data: {
  //           //   selected_cluster: selectedCluster,
  //           // },
  //         },
  //       });
  //     } else if (name === "selectCluster") {
  //       setPriority({
  //         ...priority,
  //         options: {
  //           user_name: "user1",
  //           workspace_name: "ws1",
  //           workspace_uid: "649128e7fc34732e0eccfa6d",
  //           project_name: "p1",
  //           type: "default",
  //           data: {
  //             selected_cluster: "innogrid-k8s-master",
  //           },
  //           // user_name: workSpaceDetail.memberName,
  //           // workspace_name: deploymentInfo.workspace,
  //           // workspace_uid: workSpaceDetail.objectId,
  //           // project_name: deploymentInfo.project,
  //           // type: "default",
  //           // data: {
  //           //   selected_cluster: selectedCluster,
  //           // },
  //         },
  //       });
  //     } else if (name === "sourceCluster") {
  //       setPriority({
  //         ...priority,
  //         // options: {
  //         //   type: "node",
  //         //   value: value,
  //         // },
  //         options: {
  //           user_name: workSpaceDetail.memberName,
  //           workspace_name: deploymentInfo.workspace,
  //           // workspace_uid: workSpaceDetail.objectId,
  //           project_name: deploymentInfo.project,
  //           type: "default",
  //           data: {
  //             selected_cluster: "innogrid-k8s-master",
  //           },
  //         },
  //       });
  //     } else if (name === "sourceNode") {
  //       setPriority({
  //         ...priority,
  //         options: {
  //           type: "node",
  //           value: value,
  //         },
  //       });
  //     } else if (name === "default") {
  //       setPriority({
  //         ...priority,
  //         type: value,
  //       });
  //     }
  //   };

  //   const SelectedPriorityComponent = () => {
  //     switch (deployment.priority.name) {
  //       case "GLowLatencyPriority":
  //         return (
  //           <>
  //             <FormControl
  //               className="form_fullWidth"
  //               style={{ paddingTop: "4px" }}
  //             >
  //               <select name="type" value={type} onChange={onChangeType}>
  //                 <option value={"default"}>from node</option>
  //                 <option value={"from_pod"}>from pod</option>
  //               </select>
  //               {type === "default" ? (
  //                 <div style={{ paddingTop: "4px" }}>
  //                   <FormControl style={{ width: "50%" }}>
  //                     <select name="sourceCluster" onChange={onChangeSource}>
  //                       <option value={""} selected disabled hidden>
  //                         Select Source Cluster
  //                       </option>
  //                       {selectClusterInfo.map((cluster) => (
  //                         <option value={cluster.clusterName}>
  //                           {cluster.clusterName}
  //                         </option>
  //                       ))}
  //                     </select>
  //                   </FormControl>
  //                   <FormControl style={{ width: "50%", paddingLeft: "4px" }}>
  //                     <select
  //                       name="sourceNode"
  //                       onChange={onChangeSource}
  //                       disabled={nodeDisable}
  //                     >
  //                       <option value={""} selected disabled hidden>
  //                         Select Source Node
  //                       </option>
  //                       {clusterDetail.nodes !== null ? (
  //                         clusterDetail.nodes.map((node) => (
  //                           <option value={node.name}>{node.name}</option>
  //                         ))
  //                       ) : (
  //                         <option value={"noData"}>No Data</option>
  //                       )}
  //                     </select>
  //                   </FormControl>
  //                 </div>
  //               ) : (
  //                 <div style={{ paddingTop: "4px" }}>
  //                   <FormControl style={{ width: "50%" }}>
  //                     <select name="sourceCluster" onChange={onChangePod}>
  //                       <option value={""} selected disabled hidden>
  //                         Select Cluster
  //                       </option>
  //                       {selectClusterInfo.map((cluster) => (
  //                         <option value={cluster.clusterName}>
  //                           {cluster.clusterName}
  //                         </option>
  //                       ))}
  //                     </select>
  //                   </FormControl>
  //                   <FormControl style={{ width: "50%", paddingLeft: "4px" }}>
  //                     <select
  //                       name="pod"
  //                       onChange={onChangePod}
  //                       disabled={prioritytPodDisable}
  //                     >
  //                       <option value={""} selected disabled hidden>
  //                         Select Pod
  //                       </option>
  //                       {podListIncluster !== null ? (
  //                         podListIncluster.map((pod) => (
  //                           <option value={pod.name}>{pod.name}</option>
  //                         ))
  //                       ) : (
  //                         <option value={"noData"}>No Data</option>
  //                       )}
  //                     </select>
  //                   </FormControl>
  //                 </div>
  //               )}
  //             </FormControl>
  //           </>
  //         );
  //       case "GMostRequestPriority":
  //         return (
  //           <>
  //             <FormControl style={{ paddingTop: "4px" }}>
  //               <select
  //                 name="type"
  //                 value={priority.options.type}
  //                 onChange={onChangeFrom}
  //               >
  //                 <option value={"cpu"}>CPU</option>
  //                 <option value={"gpu"}>GPU</option>
  //                 <option value={"memory"}>MEMORY</option>
  //               </select>
  //             </FormControl>
  //           </>
  //         );
  //       case "GSelectedClusterPriority":
  //         return (
  //           <>
  //             <FormControl
  //               className="form_fullWidth"
  //               style={{ paddingTop: "4px" }}
  //             >
  //               <select name="type" value={type} onChange={onChangeType}>
  //                 <option value={"cluster"}>Cluster</option>
  //                 <option value={"node"}>Node</option>
  //               </select>
  //               {type === "node" ? (
  //                 <div style={{ paddingTop: "4px" }}>
  //                   <FormControl style={{ width: "50%" }}>
  //                     <select name="sourceCluster" onChange={onChangeSource}>
  //                       <option value={""} selected disabled hidden>
  //                         Select Source Cluster
  //                       </option>
  //                       {selectClusterInfo.map((cluster) => (
  //                         <option value={cluster.clusterName}>
  //                           {cluster.clusterName}
  //                         </option>
  //                       ))}
  //                     </select>
  //                   </FormControl>
  //                   <FormControl style={{ width: "50%", paddingLeft: "4px" }}>
  //                     <select
  //                       name="sourceNode"
  //                       onChange={onChangeSource}
  //                       disabled={nodeDisable}
  //                     >
  //                       <option value={""} selected disabled hidden>
  //                         Select Source Node
  //                       </option>
  //                       {priorityNodes !== null ? (
  //                         priorityNodes.map((node) => (
  //                           <option value={node.name}>{node.name}</option>
  //                         ))
  //                       ) : (
  //                         <option value={"noData"}>No Data</option>
  //                       )}
  //                     </select>
  //                   </FormControl>
  //                 </div>
  //               ) : (
  //                 <>
  //                   <FormControl
  //                     className="form_fullWidth"
  //                     style={{ paddingTop: "4px" }}
  //                   >
  //                     <select name="selectCluster" onChange={onChangeSource}>
  //                       <option value={""} selected disabled hidden>
  //                         Select Cluster
  //                       </option>
  //                       {selectClusterInfo.map((cluster) => (
  //                         <option value={cluster.clusterName}>
  //                           {cluster.clusterName}
  //                         </option>
  //                       ))}
  //                     </select>
  //                   </FormControl>
  //                 </>
  //               )}
  //             </FormControl>
  //           </>
  //         );
  //       case "GSetClusterPriority":
  //         return (
  //           <>
  //             <table className="tb_data_new" style={{ marginTop: "4px" }}>
  //               <tbody className="tb_data_nodeInfo">
  //                 <tr>
  //                   <th>User Name</th>
  //                   <th>Workspace Name</th>
  //                   <th>Project Name</th>
  //                 </tr>
  //                 <tr>
  //                   <td>
  //                     <CTextField
  //                       type="text"
  //                       placeholder="User Name"
  //                       className="form_fullWidth"
  //                       name="userName"
  //                       onChange={onChangeName}
  //                     />
  //                   </td>
  //                   <td>
  //                     <CTextField
  //                       type="text"
  //                       placeholder="Workspace Name"
  //                       className="form_fullWidth"
  //                       name="workspaceName"
  //                       onChange={onChange}
  //                     />
  //                   </td>
  //                   <td>
  //                     <CTextField
  //                       type="text"
  //                       placeholder="Project Name"
  //                       className="form_fullWidth"
  //                       name="projectName"
  //                       onChange={onChange}
  //                     />
  //                   </td>
  //                 </tr>
  //               </tbody>
  //             </table>
  //             <FormControl
  //               className="form_fullWidth"
  //               style={{ paddingTop: "2px" }}
  //             >
  //               <select name="clusters" onChange={onChangeSource}>
  //                 <option value={""} selected disabled hidden>
  //                   Set Clusters
  //                 </option>
  //                 {selectClusterInfo.map((cluster) => (
  //                   <option value={cluster.clusterName}>
  //                     {cluster.clusterName}
  //                   </option>
  //                 ))}
  //               </select>
  //             </FormControl>
  //           </>
  //         );
  //       default:
  //         break;
  //     }
  //   };

  //   useEffect(() => {
  //     loadWorkSpaceList();
  //   }, []);

  //   useEffect(() => {
  //     loadPVClaims();
  //   }, []);

  //   useEffect(() => {
  //     loadClusterList();
  //   }, []);

  //   useEffect(() => {
  //     loadCluster(nodeName);
  //   }, []);

  //   // useEffect(() => {
  //   //   loadWorkspaceDetail(deploymentInfo.workspace);
  //   // }, []);

  //   return (
  //     <tr>
  //       <th style={{ width: "30%" }}>
  //         Priority <span className="requried">*</span>
  //       </th>
  //       <td colSpan="3">
  //         <FormControl className="form_fullWidth">
  //           <select name="priority" onChange={onChangePriority}>
  //             <option value={"GLowLatencyPriority"}>GLowLatencyPriority</option>
  //             <option value={"GMostRequestPriority"}>
  //               GMostRequestPriority
  //             </option>
  //             <option value={"GSelectedClusterPriority"}>
  //               GSelectedClusterPriority
  //             </option>
  //             <option value={"GSetClusterPriority"}>GSetClusterPriority</option>
  //           </select>
  //         </FormControl>
  //         {SelectedPriorityComponent()}
  //       </td>
  //     </tr>
  //   );
  // };

  return (
    <>
      <DeploymentTargetClusters
        open={open2}
        onClose={handleClose}
        onComplete={loadSourceNode}
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
          {deployment.priority.mode === "node" ? (
            <></>
          ) : (
            <tr>
              <th>Target Clusters</th>
              <td>
                <Button
                  style={{ marginBottom: "2px" }}
                  onClick={() => openTargetClusters(-1)}
                >
                  {showTargetClusters()}
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
});
export default CreateDeploymentStepThree;
