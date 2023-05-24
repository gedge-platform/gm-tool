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
    background: rgba(29, 161, 142, .1)
  }

  &:before, &:after {
    position: absolute;
    top: 15%; left: calc(50% - .0625em);
    width: .125em; height: 70%;
    border-radius: .125em;
    transform: rotate(45deg);
    background: currentcolor;
    content: ''
  }

  &:after { transform: rotate(-45deg); }
`
const Table = styled.table`
  
  tbody {
    display: block;
    height: 170px;
    overflow: auto;
  }
  thead, tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  thead {
    width: calc( 100% - 1em )
  }
`

const CreateDeployment = observer((props) => {
  const { open } = props;
  const [ open2, setOpen2 ] = useState(false);
  const [stepValue, setStepValue] = useState(1);
  const [size, setSize] = useState("md");

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
    workspaceList,
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
    pvcList,
    deploymentInfo,
    initDeploymentInfo,
    setDeploymentInfo,
    removeContainer
  } = deploymentStore;

  const {
    setVolumeName,
    setAccessMode,
    setVolumeCapacity,
    volumeCapacity,
    volumeName,
    selectClusters,
    accessMode,
  } = volumeStore;

  const { setStorageClass, selectStorageClass } = StorageClassStore;

  const { setProjectListinWorkspace } = projectStore;
  const { postWorkload, postScheduler } = schedulerStore;

  const [ label, setLabel ] = useState({key: "", value: ""});
  const [ annotation, setAnnotation ] = useState({key: "", value: ""})
  const [ containerIndex, setContainerIndex ] = useState(1);
  const [ projectDisable, setProjectDisable ] = useState(true);
  const [ priority, setPriority ] = useState({
    name: "GLowLatencyPriority",
    options: {
      type: "fromNode",
      //data: {}
    }
  });

  // const template = {
  //   apiVersion: "apps/v1",
  //   kind: "Deployment",
  //   metadata: {
  //     name: deploymentName,
  //     namespace: project,
  //     labels: {
  //       app: deploymentName,
  //     },
  //   },
  //   spec: {
  //     replicas: podReplicas,
  //     selector: {
  //       matchLabels: {
  //         app: deploymentName,
  //       },
  //     },
  //     template: {
  //       metadata: {
  //         labels: {
  //           app: deploymentName,
  //         },
  //       },
  //       spec: {
  //         containers: [
  //           {
  //             image: containerImage,
  //             name: containerName,
  //             ports: [
  //               {
  //                 containerPort: Number(containerPort),
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     },
  //   },
  // };

  // const templatePVC = {
  //   apiVersion: "v1",
  //   kind: "PersistentVolumeClaim",
  //   metadata: {
  //     name: volumeName,
  //     namespace: project,
  //     labels: {
  //       app: "",
  //     },
  //   },
  //   spec: {
  //     storageClassName: selectStorageClass,
  //     accessModes: [accessMode],
  //     resources: {
  //       requests: {
  //         storage: Number(volumeCapacity) + "Gi",
  //       },
  //     },
  //   },
  // };

  const onChangeLabel = e => {
    setLabel({
      ...label,
      [e.target.name]: e.target.value
    })
  }
  const onChangeAnnotation = e => {
    setAnnotation({
      ...annotation,
      [e.target.name]: e.target.value
    })
  }

  const onChange = e => {
    setDeploymentInfo(e.target.name, e.target.value);
  };
  const onChangeWorkspace = (e) => {
    setDeploymentInfo(e.target.name, e.target.value);
    setProjectDisable(false);
    loadProjectList(e.target.value);
  }

  const handleClose = () => {
    props.onClose && props.onClose();
    initDeploymentInfo();
    initLabelList();
    initAnnotationList();
    setLabel({key: "", value: ""});
    setAnnotation({key: "", value: ""});
    setProjectDisable(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  }

  const openTargetCluster = (index) => {
    setOpen2(true);
    setContainerIndex(index);
  }

  // const createDeployment = () => {
  //   const requestId = `${deploymentName}-${randomString()}`;

  //   postWorkload(requestId, workspace, project, "Deployment");
  //   console.log(requestId, workspace, project, "Deployment");
  //   postScheduler(requestId, content, handleClose);
  //   console.log(requestId, content, handleClose);

  // let formData = new FormData();
  // formData.append("callbackUrl", `${REQUEST_UR2}`); // 수정 필요
  // formData.append("requestId", requestId);
  // formData.append("yaml", content);
  // formData.append("clusters", JSON.stringify(clusters));

  // axios
  //   .post(`http://101.79.4.15:32527/yaml`, formData)
  //   .then(function (response) {
  //     if (response.status === 200) {
  //       setResponseData(response.data);

  //       const popup = window.open(
  //         "",
  //         "Gedge scheduler",
  //         `width=${screen.width},height=${screen.height}`,
  //         "fullscreen=yes"
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
  // };

  const createDeployment = () => {
    console.log(toJS({
      deploymentName: deploymentInfo.deploymentName,
      workspace: deploymentInfo.workspace,
      project: deploymentInfo.project,
      labels : toJS(labelList),
      annotation: toJS(annotationList),
      replicas: deploymentInfo.replicas,
      volume: deploymentInfo.volume,
      priority: priority,
      targetCluster: deploymentInfo.targetCluster,
      containers: toJS(deploymentInfo.containers)
    }))
    //setProjectDisable(true);

    // postDeploymentGM(require("json-to-pretty-yaml").stringify(template));
    // handleClose();
    // props.reloadFunc && props.reloadFunc();
  };

  const addLabel = () => {
    if (label.key !== "" && label.value !== "") {
      addLabelList(label.key, label.value);
      setLabel({key: "", value: ""});
    }
  }
  const addAnnotation = () => {
    if (annotation.key !== "" && annotation.value !== "") {
      addAnnotationList(annotation.key, annotation.value);
      setAnnotation({key: "", value: ""});
    }
  }

  const removeContainers = (e, index) => {
    e.stopPropagation();
    removeContainer(index);
  }

  const PriorityComponent = () => {
    const onChangePriority = (e) => {
      if (e.target.value === "GLowLatencyPriority") {
        setPriority({
          name: e.target.value,
          options: {
            type: "fromNode",
            //data: {}
          }
        })
      } else if(e.target.value === "GMostRequestPriority") {
        setPriority({
          name: e.target.value,
          options: {
            type: "default",
            //data: {}
          }
        })
      } else if (e.target.value === "GSelectedClusterPriority") {
        setPriority({
          name: e.target.value,
          options: {
            type: "cluster",
            //data: {}
          }
        })
      } else {
        setPriority({
          name: e.target.value,
          options: {
            type: "",
            //data: {}
          }
        })
      }
    }

    const onChangeFrom = (e) => {
      setPriority({
        ...priority,
        options: {
          type: e.target.value
        }
      })
    }

    const onChangeType = (e) => {
      setPriority({
        ...priority,
        options: {
          type: e.target.value
        }
      })
    }
    
    const SelectedPriorityComponent = () => {
      switch (priority.name) {
        case "GLowLatencyPriority":
          return(<>
              <FormControl className="form_fullWidth" style={{ paddingTop: "4px"}}>
                <select name="type" value={priority.options.type} onChange={onChangeFrom}>
                  <option value={"fromNode"} >from node</option>
                  <option value={"fromPod"}>from pod</option>
                </select>
              </FormControl>
              {
                priority.options.type === "fromNode" ?
                (<div style={{ paddingTop: "4px" }}>
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
                </div>)
                :(<>
                  <table className="tb_data_new" style={{ marginTop: "4px"}}>
                    <tbody className="tb_data_nodeInfo">
                      <tr>
                        <th>Workspace Name</th>
                        <th>Project Name</th>
                        <th>Pod Name</th>
                      </tr>
                      <tr>
                        <td>
                          <CTextField type="text" placeholder="Workspace Name" className="form_fullWidth" name="workspaceName" onChange={onChangeName}/>
                        </td>
                        <td>
                          <CTextField type="text" placeholder="Project Name" className="form_fullWidth" name="projectName" onChange={onChange}/>
                        </td>
                        <td>
                          <CTextField type="text" placeholder="Pod Name" className="form_fullWidth" name="podName" onChange={onChange}/>
                        </td>
                      </tr>
                      </tbody>
                  </table>
                </>)
              }
          </>)
        case "GMostRequestPriority":
          return(<>
            <FormControl style={{ paddingTop: "4px" }}>
              <select name="type" value={priority.options.type} onChange={onChangeType}>
                <option value={"default"}>Default</option>
                <option value={"gpu"}>GPU</option>
                <option value={"cpu"}>CPU</option>
                <option value={"memory"}>MEMORY</option>
              </select>
            </FormControl>
          </>)
        case "GSelectedClusterPriority":
          return(<>
            <FormControl className="form_fullWidth" style={{ paddingTop: "4px"}}>
              <select name="type" value={priority.options.type} onChange={onChangeType}>
                <option value={"cluster"} >Cluster</option>
                <option value={"node"}>Node</option>
              </select>
            </FormControl>
            {priority.options.type === "cluster"?
            (<>
              <FormControl className="form_fullWidth" style={{ paddingTop: "4px"}}>
                <select name="cluster" onChange={onChangeType}>
                  <option value={""} >Select Cluster</option>
                </select>
              </FormControl>
            </>)
            :(<div style={{ paddingTop: "4px" }}>
              <FormControl style={{ width: "50%" }}>
                <select name="sourceCluster"  onChange={onChangeSource}>
                  <option value={""}>Select Cluster</option>
                </select>
              </FormControl>
              <FormControl style={{ width: "50%", paddingLeft: "4px" }}>
                <select name="sourceNode" onChange={onChangeSource}>
                  <option value={""}>Select Node</option>
                </select>
              </FormControl>
            </div>)}
          </>)
        case "GSetClusterPriority":
          return(<>
            <table className="tb_data_new" style={{ marginTop: "4px"}}>
              <tbody className="tb_data_nodeInfo">
                <tr>
                  <th>User Name</th>
                  <th>Workspace Name</th>
                  <th>Project Name</th>
                </tr>
                <tr>
                  <td>
                    <CTextField type="text" placeholder="User Name" className="form_fullWidth" name="userName" onChange={onChangeName}/>
                  </td>
                  <td>
                    <CTextField type="text" placeholder="Workspace Name" className="form_fullWidth" name="workspaceName" onChange={onChange}/>
                  </td>
                  <td>
                    <CTextField type="text" placeholder="Project Name" className="form_fullWidth" name="projectName" onChange={onChange}/>
                  </td>
                </tr>
              </tbody>
            </table>
            <FormControl className="form_fullWidth" style={{ paddingTop: "2px"}}>
                <select name="clusters" onChange={onChangeSource}>
                  <option value={""}>Set Clusters</option>
                </select>
              </FormControl>
          </>)
        default:
          break;
      }
    }

    return(
      <tr>
        <th style={{width: "30%"}}>
          Priority <span className="requried">*</span>
        </th>
        <td colSpan="3">
          <FormControl className="form_fullWidth">
            <select name="priority" onChange={onChangePriority}>
              <option value={"GLowLatencyPriority"} >GLowLatencyPriority</option>
              <option value={"GMostRequestPriority"}>GMostRequestPriority</option>
              <option value={"GSelectedClusterPriority"}>GSelectedClusterPriority</option>
              <option value={"GSetClusterPriority"}>GSetClusterPriority</option>
            </select>
          </FormControl>
          {SelectedPriorityComponent()}
        </td>
      </tr>
    )
  }

  const CreateDeploymentComponent = () => {
    const checkPVC = () => {

    }

    return(
      <>
      <DeploymentAddContainer containerIndex={containerIndex} open={open2} onClose={handleClose2}></DeploymentAddContainer>
      <table className="tb_data_new tb_write">
        <tbody>
          <tr>
            <th>
              Deployment Name <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <CTextField type="text" placeholder="Deployment Name" className="form_fullWidth" name="deploymentName" onChange={onChange} value={deploymentInfo.deploymentName} />
            </td>
          </tr>
          <tr>
            <th>
              Workspace <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <FormControl className="form_fullWidth">
                <select name="workspace" onChange={onChangeWorkspace}>
                  <option value={""} selected disabled hidden>Select Workspace</option>
                  {workspaceList.map(workspace => (
                    <option value={workspace.name}>{workspace.name}</option>
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
                <select disabled={projectDisable} name="project" onChange={onChange}>
                  <option value={""} selected hidden disabled>Select Project</option>
                  {projectList.map(project => (
                    <option value={project.name}>{project.name}</option>
                  ))}
                </select>
              </FormControl>
            </td>
          </tr>
          <tr>
            <th rowSpan={labelList.length+2}>
              Labels
            </th>
          </tr>
          {labelList.map((label, index)=>(
            <tr>
              <td style={{ paddingLeft: "5px" }}>
                {label.key}
              </td>
              <td style={{ paddingLeft: "5px" }}>
                {label.value}
              </td>
              <td>
                <Button style={{
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
                  borderRadius: "0"
                }} onClick={() => removeLabelList(index)}>-</Button>
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
              <Button style={{
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
                borderRadius: "0"
              }} onClick={addLabel}>+</Button>
            </td>
          </tr>
          <tr>
            <th rowSpan={annotationList.length+2}>
              Annotations
            </th>
          </tr>
          {annotationList.map((annotation, index)=>(
            <tr>
              <td style={{paddingLeft: "5px"}}>
                {annotation.key}
              </td>
              <td style={{paddingLeft: "5px"}}>
                {annotation.value}
              </td>
              <td>
                <Button style={{
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
                  borderRadius: "0"
                }} onClick={() => removeAnnotationList(index)}>-</Button>
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
              <Button style={{
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
                borderRadius: "0"
              }} onClick={addAnnotation}>+</Button>
            </td>
          </tr>
          <tr>
            <th>
              Replicas <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <CTextField type="number" placeholder="Replicas" className="form_fullWidth" name="replicas" onChange={onChange} value={deploymentInfo.replicas} />
            </td>
          </tr>
          <tr>
            <th>
              Volume <span className="requried">*</span>
            </th>
            <td colSpan="3">
              {/* <FormControl className="form_fullWidth">
                <select name="volume" onChange={onChange}>
                  <option value={""}>Select Persistent Volume Claim</option>
                </select>
              </FormControl> */}
              <Table className="tb_data_new">
                <thead> 
                  <tr>
                    <th style={{ textAlign: "center", width: "7%"  }}></th>
                    <th style={{ textAlign: "center" }}>이름</th>
                    <th style={{ textAlign: "center" }}>네임스페이스</th>
                    <th style={{ textAlign: "center" }}>클러스터</th>
                  </tr>
                </thead>
                <tbody className="tb_data_nodeInfo">
                  {pvcList.map((pvc) => (
                    <tr>
                      <td style={{ textAlign: "center", width: "7%" }}>
                        <input type="checkbox" name="clusterCheck" onChange={checkPVC} />
                      </td>
                      <td>{pvc.name}</td>
                      <td>{pvc.namespace}</td>
                      <td>{pvc.cluster}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </td>
          </tr>
          {PriorityComponent()}
          <tr>
            <th>
              Target Clusters <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <FormControl className="form_fullWidth">
                <select name="targetCluster" onChange={onChange}>
                  <option value={""}>Select Target Cluster</option>
                </select>
              </FormControl>
            </td>
          </tr>
          <tr>
            <th>
              Containers <span className="requried">*</span>
            </th>
            <td>
              <Button style={{marginBottom: "2px"}} onClick={() => openTargetCluster(-1)}>+ Add Container</Button>
              <div>
                {
                  deploymentInfo.containers.map((container, index) => (
                    <Button style={{marginTop: "2px", marginBottom: "2px"}} onClick={() => openTargetCluster(index)}>{container.containerName}<DeleteButton onClick={(e) => removeContainers(e, index)}>x</DeleteButton></Button>
                  ))
                }
              </div>
            </td>
          </tr>
        </tbody>
      </table>

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
          <ButtonNext onClick={createDeployment}>생성</ButtonNext>
        </div>
      </div>
    </>
    )
  }

  return (
    <CDialogNew
      id="myDialog"
      open={open}
      maxWidth="md"
      title={"Create Deployment"}
      onClose={handleClose}
      bottomArea={false}
      modules={["custom"]}
    >
      {CreateDeploymentComponent()}
    </CDialogNew>
  );
});
export default CreateDeployment;