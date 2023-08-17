import { observer } from "mobx-react";
import { CTextField } from "@/components/textfields";
import FormControl from "@material-ui/core/FormControl";
import { projectStore, claimStore, podStore, workspaceStore } from "@/store";
import styled from "styled-components";
import PodAddContainer from "./PodAddContainer";
import { useState } from "react";

const Button = styled.button`
  background-color: #fff;
  border: 1px solid black;
  color: black;
  padding: 10px 35px;
  margin-right: 10px;
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

const CreatePodStepOne = observer((props) => {
  const { podInfo, setPodInfo } = podStore;

  const { workSpaceList } = workspaceStore;

  const { projectListinWorkspace, loadProjectListInWorkspace } = projectStore;

  const { pvClaimListInDeployment, setCheckPVCInPod } = claimStore;

  const [containerIndex, setContainerIndex] = useState(1);
  const [open, setOpen] = useState(false);
  const [prioritytDisable, setPriorityDisable] = useState(true);

  const onChange = (e) => {
    setPodInfo(e.target.name, e.target.value);
    if (e.target.name === "workspace") {
      loadProjectListInWorkspace(e.target.value);
    } else if (e.target.name === "volume") {
      setCheckPVCInPod(e.target.value);
    }
  };

  const openAddContainer = (containerIndex) => {
    setContainerIndex(containerIndex);
    setOpen(true);
  };

  const removeContainer = (e, removeIndex) => {
    e.stopPropagation();
    setPodInfo(
      "containers",
      podInfo.containers.filter((_, index) => index !== removeIndex)
    );
  };

  const onChangeCheckPVC = ({ target: { name, value } }) => {
    setCheckPVCInPod(name, value);
    setPodInfo("pvcName", name);
    setPodInfo("volume", value);
  };

  return (
    <>
      <PodAddContainer
        containerIndex={containerIndex}
        open={open}
        onClose={() => setOpen(false)}
      ></PodAddContainer>

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
              Pod Name <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <CTextField
                type="text"
                placeholder="Pod Name"
                className="form_fullWidth"
                name="podName"
                onChange={onChange}
                value={podInfo.podName}
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
                  onChange={onChange}
                  value={podInfo.workspace}
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
                  disabled={!podInfo.workspace}
                  name="project"
                  onChange={onChange}
                  value={podInfo.project}
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
                value={podInfo.replicas}
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
                          checked={podInfo.pvcName === pvc.name}
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
                {podInfo.containers.map((container, index) => (
                  <Button
                    style={{ marginTop: "2px", marginBottom: "2px" }}
                    onClick={() => openAddContainer(index)}
                  >
                    {container.containerName}
                    <DeleteButton onClick={(e) => removeContainer(e, index)}>
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

export default CreatePodStepOne;

// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { toJS } from "mobx";
// import { observer } from "mobx-react";
// import { podStore, projectStore, schedulerStore } from "@/store";
// import FormControl from "@material-ui/core/FormControl";
// import { CTextField } from "@/components/textfields";
// import { CDialogNew } from "@/components/dialogs";
// import { randomString } from "@/utils/common-utils";
// import PodAddContainer from "./PodAddContainer";

// const Button = styled.button`
//   background-color: #fff;
//   border: 1px solid black;
//   color: black;
//   padding: 10px 35px;
//   margin-right: 10px;
//   border-radius: 4px;
//   /* box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%); */
// `;

// <<<<<<< HEAD
// =======
// const ButtonNext = styled.button`
//   background-color: #0f5ce9;
//   color: white;
//   border: none;
//   padding: 10px 35px;
//   border-radius: 4px;
//   /* box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%); */
// `;

// >>>>>>> 6dfde510a5e0e282efd59007a32bfc5e7080c7e6
// const DeleteButton = styled.button`
//   margin: 0px 0px 0px 3px;
//   overflow: hidden;
//   position: relative;
//   border: none;
//   width: 1.5em;
//   height: 1.5em;
//   border-radius: 50%;
//   background: transparent;
//   font: inherit;
//   text-indent: 100%;
//   cursor: pointer;

//   &:hover {
//     background: rgba(29, 161, 142, 0.1);
// <<<<<<< HEAD
//   }

//   &:before,
//   &:after {
//     position: absolute;
//     top: 15%;
//     left: calc(50% - 0.0625em);
//     width: 0.125em;
//     height: 70%;
//     border-radius: 0.125em;
//     transform: rotate(45deg);
//     background: currentcolor;
//     content: "";
//   }

//   &:after {
//     transform: rotate(-45deg);
//   }
// `;

// const Table = styled.table`
//   tbody {
//     display: block;
//     height: 170px;
//     overflow: auto;
// =======
// >>>>>>> 6dfde510a5e0e282efd59007a32bfc5e7080c7e6
//   }

//   &:before,
//   &:after {
//     position: absolute;
//     top: 15%;
//     left: calc(50% - 0.0625em);
//     width: 0.125em;
//     height: 70%;
//     border-radius: 0.125em;
//     transform: rotate(45deg);
//     background: currentcolor;
//     content: "";
//   }

//   &:after {
//     transform: rotate(-45deg);
//   }
// `;

// const CreatePodStepOne = observer((props) => {
//   const { open } = props;
//   const [open2, setOpen2] = useState(false);
//   const [stepValue, setStepValue] = useState(1);

//   const { setProjectListinWorkspace } = projectStore;
//   const { postWorkload, postScheduler } = schedulerStore;

//   const {
//     podName,
//     containerName,
//     containerImage,
//     containerPort,
//     workspace,
//     project,
//     content,
//     clearAll,
//     setContent,
//     podInfo,
//     setPodInfo,
//     labelList,
//     initLabelList,
//     initContainer,
//     addLabelList,
//     removeLabelList,
//     removeContainer,
//   } = podStore;
//   const [input, setInput] = useState({ key: "", value: "" });
//   const [containerIndex, setContainerIndex] = useState(-1);

// <<<<<<< HEAD
//   const {
//     pvClaimListInDeployment,
//     setCheckPVCInDeployment
//   } = claimStore;
// =======
//   const handleClose = () => {
//     props.onClose && props.onClose();
//     initLabelList();
//     initContainer();
//     setInput({ key: "", value: "" });
//   };

//   const handleClose2 = () => {
//     setOpen2(false);
//   };
// >>>>>>> 6dfde510a5e0e282efd59007a32bfc5e7080c7e6

//   const onChangeInput = (e) => {
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const onChange = (e) => {
//     setPodInfo(e.target.name, e.target.value);
// <<<<<<< HEAD
//     if (e.target.name === "workspace") {
//       loadProjectListInWorkspace(e.target.value);
//     } else if (e.target.name === "volume") {
//       setCheckPVCInDeployment(e.target.value);
// =======
//   };

//   const createPod = () => {
//     console.log(
//       toJS({
//         podName: podInfo.podName,
//         labels: toJS(labelList),
//         pullSecret: podInfo.pullSecret,
//         volume: {
//           volumeName: podInfo.volumeName,
//           nfsServer: podInfo.nfsServer,
//           nfsPath: podInfo.nfsPath,
//         },
//         priority: podInfo.priority,
//         targetCluster: podInfo.targetCluster,
//         sourceCluster: podInfo.sourceCluster,
//         sourceNode: podInfo.sourceNode,
//         containers: toJS(podInfo.containers),
//       })
//     );
//     // const requestId = `${podName}-${randomString()}`;

//     // postWorkload(requestId, workspace, project, "Pod");
//     // postScheduler(requestId, content, handleClose);
//     // props.reloadFunc && props.reloadFunc();
//   };

//   const addLabel = () => {
//     if (input.key !== "" && input.value !== "") {
//       addLabelList(input.key, input.value);
//       setInput({ key: "", value: "" });
// >>>>>>> 6dfde510a5e0e282efd59007a32bfc5e7080c7e6
//     }
//   };

// <<<<<<< HEAD
//   const openAddContainer = (containerIndex) => {
//     setContainerIndex(containerIndex);
//     setOpen(true);
//   }

//   const removeContainer = (e, removeIndex) => {
//     e.stopPropagation();
//     setPodInfo("containers", podInfo.containers.filter((_, index) => index !== removeIndex));
//   }
// =======
//   const openTargetCluster = (index) => {
//     setOpen2(true);
//     setContainerIndex(index);
//   };

//   const removeContainers = (e, index) => {
//     e.stopPropagation();
//     removeContainer(index);
//   };

//   const CreatePodComponent = () => {
//     return (
//       <>
//         <PodAddContainer
//           containerIndex={containerIndex}
//           open={open2}
//           onClose={handleClose2}
//         ></PodAddContainer>
//         <table className="tb_data_new tb_write">
//           <tbody>
//             <tr>
//               <th>
//                 Pod Name <span className="requried">*</span>
//               </th>
//               <td colSpan="3">
//                 <CTextField
//                   type="text"
//                   placeholder="Pod Name"
//                   className="form_fullWidth"
//                   name="podName"
//                   onChange={onChange}
//                   value={podName}
//                 />
//               </td>
//             </tr>
//             <tr>
//               <th rowSpan={labelList.length + 2}>
//                 Labels <span className="requried">*</span>
//               </th>
//             </tr>
//             {labelList.map((label, index) => (
//               <tr>
//                 <td style={{ paddingLeft: "5px" }}>{label.key}</td>
//                 <td style={{ paddingLeft: "5px" }}>{label.value}</td>
//                 <Button
//                   style={{
//                     border: "none",
//                     height: "28px",
//                     width: "30px",
//                     fontSize: "20px",
//                     fontWeight: 600,
//                     lineHeight: 1,
//                     letterSpacing: "normal",
//                     color: "#36435c",
//                     backgroundColor: "#eff4f9",
//                     padding: "0 0 0 0",
//                     margin: "2px",
//                     borderRadius: "0",
//                   }}
//                   onClick={() => removeLabelList(index)}
//                 >
//                   -
//                 </Button>
//               </tr>
//             ))}
//             <tr>
//               <td>
//                 <CTextField
//                   type="text"
//                   placeholder="Key"
//                   className="form_fullWidth"
//                   name="key"
//                   onChange={onChangeInput}
//                   value={input.key}
//                 />
//               </td>
//               <td>
//                 <CTextField
//                   type="text"
//                   placeholder="Value"
//                   className="form_fullWidth"
//                   name="value"
//                   onChange={onChangeInput}
//                   value={input.value}
//                 />
//               </td>
//               <td>
//                 <Button
//                   style={{
//                     border: "none",
//                     height: "28px",
//                     width: "30px",
//                     fontSize: "20px",
//                     fontWeight: 600,
//                     lineHeight: 1,
//                     letterSpacing: "normal",
//                     color: "#36435c",
//                     backgroundColor: "#eff4f9",
//                     padding: "0 0 0 0",
//                     borderRadius: "0",
//                   }}
//                   onClick={addLabel}
//                 >
//                   +
//                 </Button>
//               </td>
//             </tr>

//             <tr>
//               <th>
//                 Pull Secret <span className="requried">*</span>
//               </th>
//               <td colSpan="3">
//                 <CTextField
//                   type="text"
//                   placeholder="Pull Secrets"
//                   className="form_fullWidth"
//                   name="pullSecret"
//                   onChange={onChange}
//                   value={podName}
//                 />
//               </td>
//             </tr>
//             <tr>
//               <th>Volume</th>
//               <td colSpan="3">
//                 <table className="tb_data_new">
//                   <tbody className="tb_data_nodeInfo">
//                     <tr>
//                       <th>Name</th>
//                       <th>NFS Server</th>
//                       <th>NFS Path</th>
//                     </tr>
//                     <tr>
//                       <td>
//                         <CTextField
//                           type="text"
//                           placeholder="Volume Name"
//                           className="form_fullWidth"
//                           name="volumeName"
//                           onChange={onChange}
//                           value={podName}
//                         />
//                       </td>
//                       <td>
//                         <CTextField
//                           type="text"
//                           placeholder="NFS Server"
//                           className="form_fullWidth"
//                           name="nfsServer"
//                           onChange={onChange}
//                           value={podName}
//                         />
//                       </td>
//                       <td>
//                         <CTextField
//                           type="text"
//                           placeholder="NFS Path"
//                           className="form_fullWidth"
//                           name="nfsPath"
//                           onChange={onChange}
//                           value={podName}
//                         />
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </td>
//             </tr>
//             <tr>
//               <th style={{ width: "30%" }}>
//                 Priority <span className="requried">*</span>
//               </th>
//               <td colSpan="3">
//                 <FormControl className="form_fullWidth">
//                   <select name="priority" onChange={onChange}>
//                     <option value={""}>Select Priority</option>
//                   </select>
//                 </FormControl>
//               </td>
//             </tr>
//             <tr>
//               <th>
//                 Target Clusters <span className="requried">*</span>
//               </th>
//               <td colSpan="3">
//                 <FormControl className="form_fullWidth">
//                   <select name="targetCluster" onChange={onChange}>
//                     <option value={""}>Select Target Cluster</option>
//                   </select>
//                 </FormControl>
//               </td>
//             </tr>
//             <tr>
//               <th>
//                 Source Cluster <span className="requried">*</span>
//               </th>
//               <td colSpan="3">
//                 <FormControl className="form_fullWidth">
//                   <select name="sourceCluster" onChange={onChange}>
//                     <option value={""}>Select Source Cluster</option>
//                   </select>
//                 </FormControl>
//               </td>
//             </tr>
//             <tr>
//               <th>
//                 Source Node <span className="requried">*</span>
//               </th>
//               <td colSpan="3">
//                 <FormControl className="form_fullWidth">
//                   <select name="sourceNode" onChange={onChange}>
//                     <option value={""}>Select Source Node</option>
//                   </select>
//                 </FormControl>
//               </td>
//             </tr>
//             <tr>
//               <th>
//                 Containers <span className="requried">*</span>
//               </th>
//               <td>
//                 <Button
//                   style={{ marginBottom: "2px" }}
//                   onClick={() => openTargetCluster(-1)}
//                 >
//                   + Add Container
//                 </Button>
//                 <div>
//                   {podInfo.containers.map((container, index) => (
//                     <Button
//                       style={{ marginTop: "2px", marginBottom: "2px" }}
//                       onClick={() => openTargetCluster(index)}
//                     >
//                       {container.containerName}
//                       <DeleteButton onClick={(e) => removeContainers(e, index)}>
//                         x
//                       </DeleteButton>
//                     </Button>
//                   ))}
//                 </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
// >>>>>>> 6dfde510a5e0e282efd59007a32bfc5e7080c7e6

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "flex-end",
//             marginTop: "32px",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               width: "300px",
//               justifyContent: "center",
//             }}
//           >
//             <Button onClick={handleClose}>취소</Button>
//             <ButtonNext onClick={createPod}>생성</ButtonNext>
//           </div>
//         </div>
//       </>
//     );
//   };

//   return (
//     <>
//       <div className="step-container">
//         <div className="signup-step">
//           <div className="step current">
//             <span>기본 정보</span>
//           </div>
//           <div className="arr"></div>
//           <div className="step">
//             <span>고급 설정</span>
//           </div>
//           <div className="arr"></div>
//           <div className="step">
//             <span>스케줄러 설정</span>
//           </div>
//           <div className="arr"></div>
//           <div className="step">
//             <span>설정 검토</span>
//           </div>
//         </div>
//       </div>
//       <PodAddContainer
//         containerIndex={containerIndex}
//         open={open2}
//         onClose={handleClose2}
//       ></PodAddContainer>
//       <table className="tb_data_new tb_write">
//         <tbody>
//           <tr>
//             <th>
//               Pod Name <span className="requried">*</span>
//             </th>
//             <td colSpan="3">
//               <CTextField
//                 type="text"
//                 placeholder="Pod Name"
//                 className="form_fullWidth"
//                 name="podName"
//                 onChange={onChange}
//                 value={podName}
//               />
//             </td>
//           </tr>
//           <tr>
//             <th>
//               Pull Secret <span className="requried">*</span>
//             </th>
//             <td colSpan="3">
//               <CTextField
//                 type="text"
//                 placeholder="Pull Secrets"
//                 className="form_fullWidth"
//                 name="pullSecret"
//                 onChange={onChange}
//                 value={podName}
//               />
//             </td>
//           </tr>

//           <tr>
//             <th>Volume</th>
//             <td colSpan="3">
//               <table className="tb_data_new">
//                 <tbody className="tb_data_nodeInfo">
//                   <tr>
//                     <th>Name</th>
//                     <th>NFS Server</th>
//                     <th>NFS Path</th>
//                   </tr>
//                   <tr>
//                     <td>
//                       <CTextField
//                         type="text"
//                         placeholder="Volume Name"
//                         className="form_fullWidth"
//                         name="volumeName"
//                         onChange={onChange}
//                         value={podName}
//                       />
//                     </td>
//                     <td>
//                       <CTextField
//                         type="text"
//                         placeholder="NFS Server"
//                         className="form_fullWidth"
//                         name="nfsServer"
//                         onChange={onChange}
//                         value={podName}
//                       />
//                     </td>
//                     <td>
//                       <CTextField
//                         type="text"
//                         placeholder="NFS Path"
//                         className="form_fullWidth"
//                         name="nfsPath"
//                         onChange={onChange}
//                         value={podName}
//                       />
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </td>
//           </tr>

//           <tr>
//             <th style={{ width: "30%" }}>
//               Priority <span className="requried">*</span>
//             </th>
//             <td colSpan="3">
//               <FormControl className="form_fullWidth">
//                 <select name="priority" onChange={onChange}>
//                   <option value={""}>Select Priority</option>
//                 </select>
//               </FormControl>
//             </td>
//           </tr>

//           <tr>
//             <th>
//               Containers <span className="requried">*</span>
//             </th>
//             <td>
//               <Button
//                 style={{ marginBottom: "2px" }}
// <<<<<<< HEAD
//                 onClick={() => openAddContainer(-1)}
// =======
//                 onClick={() => openTargetCluster(-1)}
// >>>>>>> 6dfde510a5e0e282efd59007a32bfc5e7080c7e6
//               >
//                 + Add Container
//               </Button>
//               <div>
//                 {podInfo.containers.map((container, index) => (
//                   <Button
//                     style={{ marginTop: "2px", marginBottom: "2px" }}
//                     onClick={() => openAddContainer(index)}
//                   >
//                     {container.containerName}
//                     <DeleteButton onClick={(e) => removeContainer(e, index)}>
//                       x
//                     </DeleteButton>
//                   </Button>
//                 ))}
//               </div>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </>
//     // <CDialogNew
//     //   id="myDialog"
//     //   open={open}
//     //   maxWidth="md"
//     //   title={"Create Pod"}
//     //   onClose={handleClose}
//     //   bottomArea={false}
//     //   modules={["custom"]}
//     // >
//     //   {CreatePodComponent()}
//     // </CDialogNew>
//   );
// });
// export default CreatePodStepOne;