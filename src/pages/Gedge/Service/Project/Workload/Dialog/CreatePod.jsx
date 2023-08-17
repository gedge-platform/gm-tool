import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { podStore, projectStore, schedulerStore } from "@/store";
import FormControl from "@material-ui/core/FormControl";
import { CTextField } from "@/components/textfields";
import { CDialogNew } from "@/components/dialogs";
import { randomString } from "@/utils/common-utils";
import PodAddContainer from "./PodAddContainer";
import CreatePodStepOne from "./CreatePodStepOne";
import CreatePodStepTwo from "./CreatePodStepTwo";
import CreatePodStepThree from "./CreatePodStepThree";
import PodYaml from "./PodYaml";

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

const CreatePod = observer((props) => {
  const { open } = props;
  const { podInfo, initPodInfo, initTargetClusters, setContent, setClearLA } =
    podStore;

  const [stepValue, setStepValue] = useState(1);
  const [input, setInput] = useState({ key: "", value: "" });

  const template = {
    apiVersion: "apps/v1",
    kind: "Pod",
    metadata: {
      name: podInfo.podName,
      labels: "label",
      namespace: "default",
    },
    spec: {
      selector: {
        matchLabels: "labelInput",
      },
      replicas: "1",
      template: {
        metadata: {
          annotations: "annotation",
          labels: "label",
        },
        spec: {
          name: "nginx",
          image: "nginx:1.14.2",
          ports: {
            containerPort: "80",
          },
        },
      },
    },
  };

  const handleClose = () => {
    props.onClose && props.onClose();
    setStepValue(1);
    setInput({ key: "", value: "" });
  };

  const createPod = () => {
    postDeploymentGM(require("json-to-pretty-yaml").stringify(template));
    handleClose();
    props.reloadFunc && props.reloadFunc();
  };
  const onClickStepTwo = (e) => {
    setClearLA();
    setStepValue(2);
  };
  useEffect(() => {
    return () => {
      initPodInfo();
      initTargetClusters();
    };
  }, [open]);

  useEffect(() => {
    if (stepValue === 4) {
      const YAML = require("json-to-pretty-yaml");
      setContent(YAML.stringify(template));
    }
  }, [stepValue]);

  const CreatePodComponent = () => {
    if (stepValue === 1) {
      return (
        <>
          <CreatePodStepOne />
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
                width: "240px",
                justifyContent: "center",
              }}
            >
              <Button onClick={handleClose}>취소</Button>
              <ButtonNext onClick={(e) => onClickStepTwo(e)}>다음</ButtonNext>
            </div>
          </div>
        </>
      );
    } else if (stepValue === 2) {
      return (
        <>
          <CreatePodStepTwo />
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
                width: "240px",
                justifyContent: "center",
              }}
            >
              <Button onClick={() => setStepValue(stepValue - 1)}>이전</Button>
              <ButtonNext onClick={() => setStepValue(stepValue + 1)}>
                다음
              </ButtonNext>
            </div>
          </div>
        </>
      );
    } else if (stepValue === 3) {
      return (
        <>
          <CreatePodStepThree />
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
                width: "240px",
                justifyContent: "center",
              }}
            >
              <Button onClick={() => setStepValue(stepValue - 1)}>이전</Button>
              <ButtonNext onClick={() => setStepValue(stepValue + 1)}>
                다음
              </ButtonNext>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <PodYaml />
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
                width: "240px",
                justifyContent: "center",
              }}
            >
              <Button onClick={() => setStepValue(stepValue - 1)}>이전</Button>
              <ButtonNext onClick={createPod}>확인</ButtonNext>
            </div>
          </div>
        </>
      );
    }

    // return (
    //   <>
    //     <PodAddContainer
    //       containerIndex={containerIndex}
    //       open={open2}
    //       onClose={handleClose2}
    //     ></PodAddContainer>
    //     <table className="tb_data_new tb_write">
    //       <tbody>
    //         <tr>
    //           <th>
    //             Pod Name <span className="requried">*</span>
    //           </th>
    //           <td colSpan="3">
    //             <CTextField
    //               type="text"
    //               placeholder="Pod Name"
    //               className="form_fullWidth"
    //               name="podName"
    //               onChange={onChange}
    //               value={podName}
    //             />
    //           </td>
    //         </tr>
    //         <tr>
    //           <th rowSpan={labelList.length + 2}>
    //             Labels <span className="requried">*</span>
    //           </th>
    //         </tr>
    //         {labelList.map((label, index) => (
    //           <tr>
    //             <td style={{ paddingLeft: "5px" }}>{label.key}</td>
    //             <td style={{ paddingLeft: "5px" }}>{label.value}</td>
    //             <Button
    //               style={{
    //                 border: "none",
    //                 height: "28px",
    //                 width: "30px",
    //                 fontSize: "20px",
    //                 fontWeight: 600,
    //                 lineHeight: 1,
    //                 letterSpacing: "normal",
    //                 color: "#36435c",
    //                 backgroundColor: "#eff4f9",
    //                 padding: "0 0 0 0",
    //                 margin: "2px",
    //                 borderRadius: "0",
    //               }}
    //               onClick={() => removeLabelList(index)}
    //             >
    //               -
    //             </Button>
    //           </tr>
    //         ))}
    //         <tr>
    //           <td>
    //             <CTextField
    //               type="text"
    //               placeholder="Key"
    //               className="form_fullWidth"
    //               name="key"
    //               onChange={onChangeInput}
    //               value={input.key}
    //             />
    //           </td>
    //           <td>
    //             <CTextField
    //               type="text"
    //               placeholder="Value"
    //               className="form_fullWidth"
    //               name="value"
    //               onChange={onChangeInput}
    //               value={input.value}
    //             />
    //           </td>
    //           <td>
    //             <Button
    //               style={{
    //                 border: "none",
    //                 height: "28px",
    //                 width: "30px",
    //                 fontSize: "20px",
    //                 fontWeight: 600,
    //                 lineHeight: 1,
    //                 letterSpacing: "normal",
    //                 color: "#36435c",
    //                 backgroundColor: "#eff4f9",
    //                 padding: "0 0 0 0",
    //                 borderRadius: "0",
    //               }}
    //               onClick={addLabel}
    //             >
    //               +
    //             </Button>
    //           </td>
    //         </tr>

    //         <tr>
    //           <th>
    //             Pull Secret <span className="requried">*</span>
    //           </th>
    //           <td colSpan="3">
    //             <CTextField
    //               type="text"
    //               placeholder="Pull Secrets"
    //               className="form_fullWidth"
    //               name="pullSecret"
    //               onChange={onChange}
    //               value={podName}
    //             />
    //           </td>
    //         </tr>
    //         <tr>
    //           <th>Volume</th>
    //           <td colSpan="3">
    //             <table className="tb_data_new">
    //               <tbody className="tb_data_nodeInfo">
    //                 <tr>
    //                   <th>Name</th>
    //                   <th>NFS Server</th>
    //                   <th>NFS Path</th>
    //                 </tr>
    //                 <tr>
    //                   <td>
    //                     <CTextField
    //                       type="text"
    //                       placeholder="Volume Name"
    //                       className="form_fullWidth"
    //                       name="volumeName"
    //                       onChange={onChange}
    //                       value={podName}
    //                     />
    //                   </td>
    //                   <td>
    //                     <CTextField
    //                       type="text"
    //                       placeholder="NFS Server"
    //                       className="form_fullWidth"
    //                       name="nfsServer"
    //                       onChange={onChange}
    //                       value={podName}
    //                     />
    //                   </td>
    //                   <td>
    //                     <CTextField
    //                       type="text"
    //                       placeholder="NFS Path"
    //                       className="form_fullWidth"
    //                       name="nfsPath"
    //                       onChange={onChange}
    //                       value={podName}
    //                     />
    //                   </td>
    //                 </tr>
    //               </tbody>
    //             </table>
    //           </td>
    //         </tr>
    //         <tr>
    //           <th style={{ width: "30%" }}>
    //             Priority <span className="requried">*</span>
    //           </th>
    //           <td colSpan="3">
    //             <FormControl className="form_fullWidth">
    //               <select name="priority" onChange={onChange}>
    //                 <option value={""}>Select Priority</option>
    //               </select>
    //             </FormControl>
    //           </td>
    //         </tr>
    //         <tr>
    //           <th>
    //             Target Clusters <span className="requried">*</span>
    //           </th>
    //           <td colSpan="3">
    //             <FormControl className="form_fullWidth">
    //               <select name="targetCluster" onChange={onChange}>
    //                 <option value={""}>Select Target Cluster</option>
    //               </select>
    //             </FormControl>
    //           </td>
    //         </tr>
    //         <tr>
    //           <th>
    //             Source Cluster <span className="requried">*</span>
    //           </th>
    //           <td colSpan="3">
    //             <FormControl className="form_fullWidth">
    //               <select name="sourceCluster" onChange={onChange}>
    //                 <option value={""}>Select Source Cluster</option>
    //               </select>
    //             </FormControl>
    //           </td>
    //         </tr>
    //         <tr>
    //           <th>
    //             Source Node <span className="requried">*</span>
    //           </th>
    //           <td colSpan="3">
    //             <FormControl className="form_fullWidth">
    //               <select name="sourceNode" onChange={onChange}>
    //                 <option value={""}>Select Source Node</option>
    //               </select>
    //             </FormControl>
    //           </td>
    //         </tr>
    //         <tr>
    //           <th>
    //             Containers <span className="requried">*</span>
    //           </th>
    //           <td>
    //             <Button
    //               style={{ marginBottom: "2px" }}
    //               onClick={() => openTargetCluster(-1)}
    //             >
    //               + Add Container
    //             </Button>
    //             <div>
    //               {podInfo.containers.map((container, index) => (
    //                 <Button
    //                   style={{ marginTop: "2px", marginBottom: "2px" }}
    //                   onClick={() => openTargetCluster(index)}
    //                 >
    //                   {container.containerName}
    //                   <DeleteButton onClick={(e) => removeContainers(e, index)}>
    //                     x
    //                   </DeleteButton>
    //                 </Button>
    //               ))}
    //             </div>
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table>

    //     <div
    //       style={{
    //         display: "flex",
    //         justifyContent: "flex-end",
    //         marginTop: "32px",
    //       }}
    //     >
    //       <div
    //         style={{
    //           display: "flex",
    //           width: "300px",
    //           justifyContent: "center",
    //         }}
    //       >
    //         <Button onClick={handleClose}>취소</Button>
    //         <ButtonNext onClick={createPod}>생성</ButtonNext>
    //       </div>
    //     </div>
    //   </>
    // );
  };

  return (
    <CDialogNew
      id="myDialog"
      open={open}
      maxWidth="md"
      title={"Create Pod"}
      onClose={handleClose}
      bottomArea={false}
      modules={["custom"]}
    >
      {CreatePodComponent()}
    </CDialogNew>
  );
});
export default CreatePod;

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
// import CreatePodStepOne from "./CreatePodStepOne";
// import CreatePodStepTwo from "./CreatePodStepTwo";
// import PodYaml from "./PodYaml";
// import CreatePodStepThree from "./CreatePodStepThree";
// import PodYaml from "./PodYaml";

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

// const CreatePod = observer((props) => {
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
// <<<<<<< HEAD
//     initPodInfo,
//     initTargetClusters
// =======
//     setPodInfo,
//     labelList,
//     initLabelList,
//     initContainer,
//     addLabelList,
//     removeLabelList,
//     removeContainer,
// >>>>>>> 6dfde510a5e0e282efd59007a32bfc5e7080c7e6
//   } = podStore;
//   const [input, setInput] = useState({ key: "", value: "" });
//   const [containerIndex, setContainerIndex] = useState(-1);

//   const handleClose = () => {
//     props.onClose && props.onClose();
//     initLabelList();
//     initContainer();
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
//   const onClickStepOne = (e) => {
//     setStepValue(2);
//   };

//   const onClickStepTwo = (e) => {
//     setStepValue(3);
//   };

//   const onClickStepThree = (e) => {
//     setStepValue(4);
//   };

//   const onClickBackStepOne = () => {
//     setStepValue(1);
//   };

//   const onClickBackStepTwo = () => {
//     setStepValue(2);
//   };

//   const onClickBackStepThree = () => {
//     setStepValue(3);
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

// <<<<<<< HEAD
//   useEffect(() => {
//     return () => {
//       initPodInfo();
//       initTargetClusters();
//     }
//   }, [open])
// =======
//   const addLabel = () => {
//     if (input.key !== "" && input.value !== "") {
//       addLabelList(input.key, input.value);
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
// >>>>>>> 6dfde510a5e0e282efd59007a32bfc5e7080c7e6

//   const CreatePodComponent = () => {
//     if (stepValue === 1) {
//       return (
//         <>
//           <CreatePodStepOne />
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "flex-end",
//               marginTop: "32px",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 width: "240px",
//                 justifyContent: "center",
//               }}
//             >
//               <Button onClick={handleClose}>취소</Button>
//               <ButtonNext onClick={(e) => onClickStepOne(e)}>다음</ButtonNext>
//             </div>
//           </div>
//         </>
//       );
//     } else if (stepValue === 2) {
//       return (
//         <>
//           <CreatePodStepTwo />
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "flex-end",
//               marginTop: "32px",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 width: "300px",
//                 justifyContent: "center",
//               }}
//             >
//               <Button onClick={() => onClickBackStepOne()}>이전</Button>
//               <ButtonNext onClick={() => onClickStepTwo()}>다음</ButtonNext>
//             </div>
//           </div>
//         </>
//       );
//     } else if (stepValue === 3) {
//       return (
//         <>
//           <CreatePodStepThree />
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "flex-end",
//               marginTop: "32px",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 width: "300px",
//                 justifyContent: "center",
//               }}
//             >
//               <Button onClick={() => onClickBackStepTwo()}>이전</Button>
//               <ButtonNext onClick={() => onClickStepThree()}>다음</ButtonNext>
//             </div>
//           </div>
//         </>
//       );
//     } else if (stepValue === 4) {
//       return (
//         <>
//           <PodYaml />
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "flex-end",
//               marginTop: "32px",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 width: "300px",
//                 justifyContent: "center",
//               }}
//             >
//               <Button onClick={() => onClickBackStepThree()}>이전</Button>
//               <ButtonNext onClick={() => CreatePod()}>Create Pod</ButtonNext>
//             </div>
//           </div>
//         </>
//       );
//     }
//     // return (
//     //   <>
//     //     <PodAddContainer
//     //       containerIndex={containerIndex}
//     //       open={open2}
//     //       onClose={handleClose2}
//     //     ></PodAddContainer>
//     //     <table className="tb_data_new tb_write">
//     //       <tbody>
//     //         <tr>
//     //           <th>
//     //             Pod Name <span className="requried">*</span>
//     //           </th>
//     //           <td colSpan="3">
//     //             <CTextField
//     //               type="text"
//     //               placeholder="Pod Name"
//     //               className="form_fullWidth"
//     //               name="podName"
//     //               onChange={onChange}
//     //               value={podName}
//     //             />
//     //           </td>
//     //         </tr>
//     //         <tr>
//     //           <th rowSpan={labelList.length + 2}>
//     //             Labels <span className="requried">*</span>
//     //           </th>
//     //         </tr>
//     //         {labelList.map((label, index) => (
//     //           <tr>
//     //             <td style={{ paddingLeft: "5px" }}>{label.key}</td>
//     //             <td style={{ paddingLeft: "5px" }}>{label.value}</td>
//     //             <Button
//     //               style={{
//     //                 border: "none",
//     //                 height: "28px",
//     //                 width: "30px",
//     //                 fontSize: "20px",
//     //                 fontWeight: 600,
//     //                 lineHeight: 1,
//     //                 letterSpacing: "normal",
//     //                 color: "#36435c",
//     //                 backgroundColor: "#eff4f9",
//     //                 padding: "0 0 0 0",
//     //                 margin: "2px",
//     //                 borderRadius: "0",
//     //               }}
//     //               onClick={() => removeLabelList(index)}
//     //             >
//     //               -
//     //             </Button>
//     //           </tr>
//     //         ))}
//     //         <tr>
//     //           <td>
//     //             <CTextField
//     //               type="text"
//     //               placeholder="Key"
//     //               className="form_fullWidth"
//     //               name="key"
//     //               onChange={onChangeInput}
//     //               value={input.key}
//     //             />
//     //           </td>
//     //           <td>
//     //             <CTextField
//     //               type="text"
//     //               placeholder="Value"
//     //               className="form_fullWidth"
//     //               name="value"
//     //               onChange={onChangeInput}
//     //               value={input.value}
//     //             />
//     //           </td>
//     //           <td>
//     //             <Button
//     //               style={{
//     //                 border: "none",
//     //                 height: "28px",
//     //                 width: "30px",
//     //                 fontSize: "20px",
//     //                 fontWeight: 600,
//     //                 lineHeight: 1,
//     //                 letterSpacing: "normal",
//     //                 color: "#36435c",
//     //                 backgroundColor: "#eff4f9",
//     //                 padding: "0 0 0 0",
//     //                 borderRadius: "0",
//     //               }}
//     //               onClick={addLabel}
//     //             >
//     //               +
//     //             </Button>
//     //           </td>
//     //         </tr>

//     //         <tr>
//     //           <th>
//     //             Pull Secret <span className="requried">*</span>
//     //           </th>
//     //           <td colSpan="3">
//     //             <CTextField
//     //               type="text"
//     //               placeholder="Pull Secrets"
//     //               className="form_fullWidth"
//     //               name="pullSecret"
//     //               onChange={onChange}
//     //               value={podName}
//     //             />
//     //           </td>
//     //         </tr>
//     //         <tr>
//     //           <th>Volume</th>
//     //           <td colSpan="3">
//     //             <table className="tb_data_new">
//     //               <tbody className="tb_data_nodeInfo">
//     //                 <tr>
//     //                   <th>Name</th>
//     //                   <th>NFS Server</th>
//     //                   <th>NFS Path</th>
//     //                 </tr>
//     //                 <tr>
//     //                   <td>
//     //                     <CTextField
//     //                       type="text"
//     //                       placeholder="Volume Name"
//     //                       className="form_fullWidth"
//     //                       name="volumeName"
//     //                       onChange={onChange}
//     //                       value={podName}
//     //                     />
//     //                   </td>
//     //                   <td>
//     //                     <CTextField
//     //                       type="text"
//     //                       placeholder="NFS Server"
//     //                       className="form_fullWidth"
//     //                       name="nfsServer"
//     //                       onChange={onChange}
//     //                       value={podName}
//     //                     />
//     //                   </td>
//     //                   <td>
//     //                     <CTextField
//     //                       type="text"
//     //                       placeholder="NFS Path"
//     //                       className="form_fullWidth"
//     //                       name="nfsPath"
//     //                       onChange={onChange}
//     //                       value={podName}
//     //                     />
//     //                   </td>
//     //                 </tr>
//     //               </tbody>
//     //             </table>
//     //           </td>
//     //         </tr>
//     //         <tr>
//     //           <th style={{ width: "30%" }}>
//     //             Priority <span className="requried">*</span>
//     //           </th>
//     //           <td colSpan="3">
//     //             <FormControl className="form_fullWidth">
//     //               <select name="priority" onChange={onChange}>
//     //                 <option value={""}>Select Priority</option>
//     //               </select>
//     //             </FormControl>
//     //           </td>
//     //         </tr>
//     //         <tr>
//     //           <th>
//     //             Target Clusters <span className="requried">*</span>
//     //           </th>
//     //           <td colSpan="3">
//     //             <FormControl className="form_fullWidth">
//     //               <select name="targetCluster" onChange={onChange}>
//     //                 <option value={""}>Select Target Cluster</option>
//     //               </select>
//     //             </FormControl>
//     //           </td>
//     //         </tr>
//     //         <tr>
//     //           <th>
//     //             Source Cluster <span className="requried">*</span>
//     //           </th>
//     //           <td colSpan="3">
//     //             <FormControl className="form_fullWidth">
//     //               <select name="sourceCluster" onChange={onChange}>
//     //                 <option value={""}>Select Source Cluster</option>
//     //               </select>
//     //             </FormControl>
//     //           </td>
//     //         </tr>
//     //         <tr>
//     //           <th>
//     //             Source Node <span className="requried">*</span>
//     //           </th>
//     //           <td colSpan="3">
//     //             <FormControl className="form_fullWidth">
//     //               <select name="sourceNode" onChange={onChange}>
//     //                 <option value={""}>Select Source Node</option>
//     //               </select>
//     //             </FormControl>
//     //           </td>
//     //         </tr>
//     //         <tr>
//     //           <th>
//     //             Containers <span className="requried">*</span>
//     //           </th>
//     //           <td>
//     //             <Button
//     //               style={{ marginBottom: "2px" }}
//     //               onClick={() => openTargetCluster(-1)}
//     //             >
//     //               + Add Container
//     //             </Button>
//     //             <div>
//     //               {podInfo.containers.map((container, index) => (
//     //                 <Button
//     //                   style={{ marginTop: "2px", marginBottom: "2px" }}
//     //                   onClick={() => openTargetCluster(index)}
//     //                 >
//     //                   {container.containerName}
//     //                   <DeleteButton onClick={(e) => removeContainers(e, index)}>
//     //                     x
//     //                   </DeleteButton>
//     //                 </Button>
//     //               ))}
//     //             </div>
//     //           </td>
//     //         </tr>
//     //       </tbody>
//     //     </table>

//     //     <div
//     //       style={{
//     //         display: "flex",
//     //         justifyContent: "flex-end",
//     //         marginTop: "32px",
//     //       }}
//     //     >
//     //       <div
//     //         style={{
//     //           display: "flex",
//     //           width: "300px",
//     //           justifyContent: "center",
//     //         }}
//     //       >
//     //         <Button onClick={handleClose}>취소</Button>
//     //         <ButtonNext onClick={createPod}>생성</ButtonNext>
//     //       </div>
//     //     </div>
//     //   </>
//     // );
//   };

//   return (
//     <CDialogNew
//       id="myDialog"
//       open={open}
//       maxWidth="md"
//       title={"Create Pod"}
//       onClose={handleClose}
//       bottomArea={false}
//       modules={["custom"]}
//     >
//       {CreatePodComponent()}
//     </CDialogNew>
//   );
// });
// export default CreatePod;
