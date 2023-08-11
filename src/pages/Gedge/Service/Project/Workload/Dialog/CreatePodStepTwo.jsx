import { observer } from "mobx-react";
import podStore from "../../../../../../store/Pod";
import { CTextField } from "@/components/textfields";
import { useState } from "react";
import styled from "styled-components";
import { swalError } from "../../../../../../utils/swal-utils";

const Button = styled.button`
  background-color: #fff;
  border: 1px solid black;
  color: black;
  padding: 10px 35px;
  margin-right: 10px;
  border-radius: 4px;
  /* box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%); */
`;

const CreatePodStepTwo = observer((props) => {
  const { podInfo, setPodInfo } = podStore;

  const [label, setLabel] = useState({ key: "", value: "" });
  const [annotation, setAnnotation] = useState({ key: "", value: "" });

  const onChangeLabel = (e) => {
    setLabel({
      ...label,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeAnnotation = (e) => {
    setAnnotation({
      ...annotation,
      [e.target.name]: e.target.value,
    });
  };

  const addLabel = () => {
    if (label.key === "" || label.value === "") {
      swalError("값을 입력해주세요.");
    } else {
      setPodInfo("labels", [...podInfo.labels, label]);
      setLabel({ key: "", value: "" });
    }
  };

  const addAnnotation = () => {
    if (annotation.key === "" || annotation.value === "") {
      swalError("값을 입력해주세요");
    } else {
      setPodInfo("annotations", [...podInfo.annotations, annotation]);
      setAnnotation({ key: "", value: "" });
    }
  };

  const remove = (type, index) => {
    setPodInfo(
      type,
      podInfo[type].filter((_, idx) => idx !== index)
    );
  };

  return (
    <>
      <div className="step-container">
        <div className="signup-step">
          <div className="step">
            <span>기본 정보</span>
          </div>
          <div className="arr"></div>
          <div className="step current">
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
            <th rowSpan={podInfo.labels.length + 1}>Labels</th>
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
          {podInfo.labels.map((label, index) => (
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
                  onClick={() => remove("labels", index)}
                >
                  -
                </Button>
              </td>
            </tr>
          ))}

          <tr>
            <th rowSpan={podInfo.annotations.length + 2}>Annotations</th>
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
          {podInfo.annotations.map((annotation, index) => (
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
                  onClick={() => remove("annotations", index)}
                >
                  -
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
});

export default CreatePodStepTwo;

// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { toJS } from "mobx";
// import { observer } from "mobx-react";
// import { podStore, projectStore, schedulerStore } from "@/store";
// import FormControl from "@material-ui/core/FormControl";
// import { CTextField } from "@/components/textfields";
// import { useState } from "react";
// import styled from "styled-components";
// import { swalError } from "../../../../../../utils/swal-utils";

// const Button = styled.button`
//   background-color: #fff;
//   border: 1px solid black;
//   color: black;
//   padding: 10px 35px;
//   margin-right: 10px;
//   border-radius: 4px;
//   /* box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%); */
// `;

// const ButtonNext = styled.button`
//   background-color: #0f5ce9;
//   color: white;
//   border: none;
//   padding: 10px 35px;
//   border-radius: 4px;
//   /* box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%); */
// `;

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

// const CreatePodStepTwo = observer((props) => {
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
//     annotationList,
//     initAnnotationList,
//     addAnnotationList,
//     removeAnnotationList,
//   } = podStore;
//   const [input, setInput] = useState({ key: "", value: "" });
//   const [containerIndex, setContainerIndex] = useState(-1);

//   const handleClose = () => {
//     props.onClose && props.onClose();
//     initLabelList();
//     initContainer();
//     initAnnotationList();
//     setInput({ key: "", value: "" });
//   };

//   const handleClose2 = () => {
//     setOpen2(false);
//   };

//   const onChangeInput = (e) => {
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const onChange = (e) => {
//     setPodInfo(e.target.name, e.target.value);
//   };

//   const createPod = () => {
//     console.log(
//       toJS({
//         podName: podInfo.podName,
//         labels: toJS(labelList),
//         annotations: toJS(annotationList),
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
// <<<<<<< HEAD
//     if (label.key === "" || label.value === "") {
//       swalError("값을 입력해주세요.");
//     } else {
//       setPodInfo("labels", [
//         ...podInfo.labels,
//         label
//       ]);
//       setLabel({key: "", value: ""});
//     }
//   }

//   const addAnnotation = () => {
//     if (annotation.key === "" || annotation.value === "") {
//       swalError("값을 입력해주세요");
//     } else {
//       setPodInfo("annotations", [
//         ...podInfo.annotations,
//         annotation
//       ]);
//       setAnnotation({key: "", value: ""});
//     }
//   }

//   const remove = (type, index) => {
//     setPodInfo(type, podInfo[type].filter((_, idx) => idx !== index));
//   }
// =======
//     if (input.key !== "" && input.value !== "") {
//       addLabelList(input.key, input.value);
//       setInput({ key: "", value: "" });
//     }
//   };

//   const addAnnotation = () => {
//     if (input.key !== "" && input.value !== "") {
//       addAnnotationList(input.key, input.value);
//       setInput({ key: "", value: "" });
//     }
//   };

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
// >>>>>>> 6dfde510a5e0e282efd59007a32bfc5e7080c7e6

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
//           <div className="step ">
//             <span>기본 정보</span>
//           </div>
//           <div className="arr"></div>
//           <div className="step current">
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
//       <table className="tb_data_new tb_write">
//         <tbody>
//           <tr>
//             <th rowSpan={labelList.length + 2}>
//               Labels <span className="requried">*</span>
//             </th>
//           </tr>
//           {labelList.map((label, index) => (
//             <tr>
//               <td style={{ paddingLeft: "5px" }}>{label.key}</td>
//               <td style={{ paddingLeft: "5px" }}>{label.value}</td>
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
//                     margin: "2px",
//                     borderRadius: "0",
//                   }}
//                   onClick={() => removeLabelList(index)}
//                 >
//                   -
//                 </Button>
//               </td>
//             </tr>
//           ))}
//           <tr>
//             <td>
//               <CTextField
//                 type="text"
//                 placeholder="Key"
//                 className="form_fullWidth"
//                 name="key"
//                 onChange={onChangeInput}
//                 value={input.key}
//               />
//             </td>
//             <td>
//               <CTextField
//                 type="text"
//                 placeholder="Value"
//                 className="form_fullWidth"
//                 name="value"
//                 onChange={onChangeInput}
//                 value={input.value}
//               />
//             </td>
//             <td>
//               <Button
//                 style={{
//                   border: "none",
//                   height: "28px",
//                   width: "30px",
//                   fontSize: "20px",
//                   fontWeight: 600,
//                   lineHeight: 1,
//                   letterSpacing: "normal",
//                   color: "#36435c",
//                   backgroundColor: "#eff4f9",
//                   padding: "0 0 0 0",
//                   borderRadius: "0",
//                 }}
//                 onClick={addLabel}
//               >
//                 +
//               </Button>
//             </td>
//           </tr>
//           <tr>
//             <th rowSpan={annotationList?.length + 2}>
//               Annotaions <span className="requried">*</span>
//             </th>
//           </tr>
//           {annotationList.map((annotation, index) => (
//             <tr>
//               <td style={{ paddingLeft: "5px" }}>{annotation.key}</td>
//               <td style={{ paddingLeft: "5px" }}>{annotation.value}</td>
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
//                     margin: "2px",
//                     borderRadius: "0",
//                   }}
//                   onClick={() => removeAnnotationList(index)}
//                 >
//                   -
//                 </Button>
//               </td>
//             </tr>
//           ))}
//           <tr>
//             <td>
//               <CTextField
//                 type="text"
//                 placeholder="Key"
//                 className="form_fullWidth"
//                 name="key"
//                 onChange={onChangeInput}
//                 value={input.key}
//               />
//             </td>
//             <td>
//               <CTextField
//                 type="text"
//                 placeholder="Value"
//                 className="form_fullWidth"
//                 name="value"
//                 onChange={onChangeInput}
//                 value={input.value}
//               />
//             </td>
//             <td>
//               <Button
//                 style={{
//                   border: "none",
//                   height: "28px",
//                   width: "30px",
//                   fontSize: "20px",
//                   fontWeight: 600,
//                   lineHeight: 1,
//                   letterSpacing: "normal",
//                   color: "#36435c",
//                   backgroundColor: "#eff4f9",
//                   padding: "0 0 0 0",
//                   borderRadius: "0",
//                 }}
//                 onClick={addAnnotation}
//               >
//                 +
//               </Button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </>
//   );
// });
// export default CreatePodStepTwo;
