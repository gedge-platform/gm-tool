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

const CreateDeployment = observer((props) => {
  const { open } = props;
  const [ open2, setOpen2 ] = useState(false);
  const [stepValue, setStepValue] = useState(1);
  const [size, setSize] = useState("md");

  const {
    deploymentName,
    podReplicas,
    containerName,
    containerImage,
    containerPort,
    project,
    workspace,
    setWorkspace,
    setContent,
    clearAll,
    setProject,
    containerPortName,
    postDeploymentGM,
    postDeploymentPVC,
    setContentVolume,
    podName,
    labelList,
    initLabelList,
    addLabelList,
    removeLabelList,
    deploymentInfo,
    setDeploymentInfo,
    initContainer,
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

  const [ input, setInput ] = useState({key: "", value: ""});
  const [ containerIndex, setContainerIndex ] = useState(1);
  const [ priority, setPriority ] = useState({
    name: "GLowLatencyPriority",
    options: {
      type: "fromNode",
      //data: {}
    }
  });

  const template = {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: deploymentName,
      namespace: project,
      labels: {
        app: deploymentName,
      },
    },
    spec: {
      replicas: podReplicas,
      selector: {
        matchLabels: {
          app: deploymentName,
        },
      },
      template: {
        metadata: {
          labels: {
            app: deploymentName,
          },
        },
        spec: {
          containers: [
            {
              image: containerImage,
              name: containerName,
              ports: [
                {
                  containerPort: Number(containerPort),
                },
              ],
            },
          ],
        },
      },
    },
  };

  const templatePVC = {
    apiVersion: "v1",
    kind: "PersistentVolumeClaim",
    metadata: {
      name: volumeName,
      namespace: project,
      labels: {
        app: "",
      },
    },
    spec: {
      storageClassName: selectStorageClass,
      accessModes: [accessMode],
      resources: {
        requests: {
          storage: Number(volumeCapacity) + "Gi",
        },
      },
    },
  };

  const onChangeInput = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const onChange = e => {
    setDeploymentInfo(e.target.name, e.target.value);
  };

  const onSecondDepthChange = e => {
    
  }

  const handleClose = () => {
    props.onClose && props.onClose();
    initLabelList();
    initContainer();
    setInput({key: "", value: ""});
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
      deploymentName: deploymentInfo.podName,
      labels : toJS(labelList),
      replicas: deploymentInfo.replicas,
      volume: deploymentInfo.volume,
      priority: deploymentInfo.priority,
      targetCluster: deploymentInfo.targetCluster,
      sourceCluster: deploymentInfo.sourceCluster,
      sourceNode: deploymentInfo.sourceNode,
      containers: toJS(deploymentInfo.containers)
    }))
    // postDeploymentGM(require("json-to-pretty-yaml").stringify(template));
    // handleClose();
    // props.reloadFunc && props.reloadFunc();
  };

  const addLabel = () => {
    if (input.key !== "" && input.value !== "") {
      addLabelList(input.key, input.value);
      setInput({key: "", value: ""});
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
      console.log(priority)
    }

    const onChangeFrom = (e) => {
      setPriority({
        ...priority,
        options: {
          type: e.target.value
        }
      })
    }

    const onChangeSource = (e) => {

    }
    const onChangeName = (e) => {

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
              <CTextField type="text" placeholder="Deployment Name" className="form_fullWidth" name="deploymentName" onChange={onChange} value={deploymentName} />
            </td>
          </tr>
          <tr>
            <th rowSpan={labelList.length+2}>
              Labels <span className="requried">*</span>
            </th>
          </tr>
          {labelList.map((label, index)=>(
            <tr>
              <td style={{paddingLeft: "5px"}}>
                {label.key}
              </td>
              <td style={{paddingLeft: "5px"}}>
                {label.value}
              </td>
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
            </tr>
          ))}
          <tr>
            <td>
              <CTextField
                type="text"
                placeholder="Key"
                className="form_fullWidth"
                name="key"
                onChange={onChangeInput}
                value={input.key}
              />
            </td>
            <td>
              <CTextField
                type="text"
                placeholder="Value"
                className="form_fullWidth"
                name="value"
                onChange={onChangeInput}
                value={input.value}
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
            <th>
              Replicas <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <CTextField type="text" placeholder="Replicas" className="form_fullWidth" name="replicas" onChange={onChange} value={podName} />
            </td>
          </tr>
          <tr>
            <th>
              Volume <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <FormControl className="form_fullWidth">
                <select name="volume" onChange={onChange}>
                  <option value={""}>Select Persistent Volume Claim</option>
                </select>
              </FormControl>
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
