import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { CTextField } from "@/components/textfields";

import { swalError } from "@/utils/swal-utils";

import { claimStore } from "@/store";
import CreateDeployment from "./CreateDeployment";
import deploymentStore from "../../../../../../store/Deployment";

const Button = styled.button`
  border: none;
  height: 28px;
  width: 30px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: normal;
  color: #36435c;
  background-color: #eff4f9;
`;
const Span = styled.span`
  width: 200px;
  height: 32px;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #abb4be;
  background-color: #fff;
`;

const CreateDeploymentStepTwo = observer(() => {
  const {
    setInputLabelKey,
    setInputLabelValue,
    setInputAnnotationKey,
    setInputAnnotationValue,
    labelKey,
    labelValue,
    labelInput,
    labelInputKey,
    labelInputValue,
    annotationKey,
    annotationValue,
    setAnnotationInput,
    setLabelInput,
    labels,
    annotations,
    setLabels,
    setAnnotations,
  } = deploymentStore;

  const newLabelList = [{ [labelInputKey]: labelInputValue }];

  const handleChange = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case "labelKey":
        setInputLabelKey(value);
        break;
      case "labelValue":
        setInputLabelValue(value);
        break;
      case "annotationKey":
        setInputAnnotationKey(value);
        break;
      case "annotationValue":
        setInputAnnotationValue(value);
        break;
    }
  };

  useEffect(() => {
    setLabelInput({
      // ...labelInput, : 기존의 labelInput 객체를 복사한 뒤
      // [name]: value, : name 키를 가진 값을 value로 설정
      [labelKey]: labelValue,
    });
    setAnnotationInput({
      [annotationKey]: annotationValue,
    });
  }, [labelKey, labelValue, annotationKey, annotationValue]);

  const addRow = () => {
    if (labelKey == "") {
      swalError("LabelKey 값을 입력해주세요");
      return;
    }

    const LabelKeyArr = [];
    labels.map((data) => LabelKeyArr.push(data.labelKey));

    if (LabelKeyArr.indexOf(labelKey) >= 0) {
      swalError("LabelKey 값이 중복입니다.");
      return;
    }

    const newLabelsList = [
      {
        labelKey,
        labelValue,
      },
    ];

    setLabels(labels.concat(newLabelsList));
    setLabelInput({
      labelKey: "",
      labelValue: "",
    });

    setInputLabelKey("");
    setInputLabelValue("");
  };

  const deleteLabels = (labelKey) => {
    setLabels(labels.filter((item) => item.labelKey !== labelKey));
  };

  const addAnnotations = () => {
    if (annotationKey == "") {
      swalError("AnnotationKey 값을 입력해주세요");
      return;
    }

    const AnnotationKeyArr = [];
    annotations.map((data) => AnnotationKeyArr.push(data.annotationKey));

    if (AnnotationKeyArr.indexOf(annotationKey) >= 0) {
      swalError("AnnotationKey 값이 중복입니다.");
      return;
    }

    const newAnnotationsList = [
      {
        annotationKey,
        annotationValue,
      },
    ];

    setAnnotations(annotations.concat(newAnnotationsList));
    setAnnotationInput({
      annotationKey: "",
      annotationValue: "",
    });

    setInputAnnotationKey("");
    setInputAnnotationValue("");
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

      <table id="labelTable" className="tb_data_new tb_write">
        <tbody>
          <tr>
            <th>Labels</th>
            <td>
              <CTextField
                type="text"
                placeholder="Key"
                className="form_fullWidth"
                name="labelKey"
                onChange={handleChange}
                value={labelKey}
              />
            </td>
            <td>
              <CTextField
                type="text"
                placeholder="Value"
                className="form_fullWidth"
                name="labelValue"
                onChange={handleChange}
                value={labelValue}
              />
            </td>
            <td>
              <Button onClick={addRow}>+</Button>
            </td>
          </tr>
          {labels
            ? labels.map((item) => (
                <tr>
                  <th>Labels</th>
                  <td style={{ width: "300px", padding: "8px" }}>
                    {item.labelKey}
                  </td>
                  <td style={{ width: "300px", padding: "8px" }}>
                    {item.labelValue}
                  </td>
                  <td>
                    <Button onClick={() => deleteLabels(item.labelKey)}>
                      -
                    </Button>
                  </td>
                </tr>
              ))
            : null}

          <tr>
            <th>Annotations</th>
            <td>
              <CTextField
                type="text"
                placeholder="Key"
                className="form_fullWidth"
                name="annotationKey"
                onChange={handleChange}
                value={annotationKey}
              />
            </td>
            <td>
              <CTextField
                type="text"
                placeholder="Value"
                className="form_fullWidth"
                name="annotationValue"
                onChange={handleChange}
                value={annotationValue}
              />
            </td>
            <td colSpan={2}>
              <Button onClick={addAnnotations}>+</Button>
            </td>
          </tr>
          {annotations.map((item) => (
            <tr>
              <th>Annotations</th>
              <td style={{ width: "300px", padding: "8px" }}>
                {item.annotationKey}
              </td>
              <td style={{ width: "300px", padding: "8px" }}>
                {item.annotationValue}
              </td>
              <td>
                <Button onClick={() => deleteAnnotations(item.annotationKey)}>
                  -
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CreateDeployment labelsList={labelInput} />
    </>
  );
});

export default CreateDeploymentStepTwo;
// import React, { useState } from "react";
// import styled from "styled-components";
// import { observer } from "mobx-react";
// import DeploymentPodSettins from "./DeploymentPodSettins";
// import { CTextField } from "@/components/textfields";
// import FormControl from "@material-ui/core/FormControl";
// import { deploymentStore } from "@/store";
// import { swalError } from "@/utils/swal-utils";
// import { CDialogNew } from "@/components/dialogs";
// import { toJS } from "mobx";
// import clusterStore from "../../../../../../store/Cluster";
// import podStore from "../../../../../../store/Pod";
// import { claimStore } from "@/store";

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

// const Table = styled.table`
//   tbody {
//     display: block;
//     height: 170px;
//     overflow: auto;
//   }
//   thead,
//   tbody tr {
//     display: table;
//     width: 100%;
//     table-layout: fixed;
//   }
//   thead {
//     width: calc(100% - 1em);
//   }
// `;

// const CreateDeploymentStepTwo = observer((props) => {
//   // const { open } = props;
//   // const [open2, setOpen2] = useState(false);
//   // const [stepValue, setStepValue] = useState(1);

//   // const {
//   //   labelList,
//   //   initLabelList,
//   //   addLabelList,
//   //   removeLabelList,
//   //   annotationList,
//   //   initAnnotationList,
//   //   addAnnotationList,
//   //   removeAnnotationList,
//   //   deploymentInfo,
//   //   initDeploymentInfo,
//   //   setDeploymentInfo,
//   //   removeContainer,
//   //   createDeploymentLabels,
//   //   setCreateDeploymentLabels,
//   //   createDeploymentAnnotaions,
//   //   setCreateDeploymentAnnotaions,
//   // } = deploymentStore;

//   // const onChangeLabel = (e) => {
//   //   setCreateDeploymentLabels({
//   //     ...createDeploymentLabels,
//   //     [e.target.name]: e.target.value,
//   //   });
//   // };

//   // const addLabel = () => {
//   //   if (
//   //     createDeploymentLabels.key === "" &&
//   //     createDeploymentLabels.value === ""
//   //   ) {
//   //     swalError("값을 입력해주세요.");
//   //   }
//   //   if (
//   //     createDeploymentLabels.key !== "" &&
//   //     createDeploymentLabels.value !== ""
//   //   ) {
//   //     addLabelList(createDeploymentLabels.key, createDeploymentLabels.value);
//   //     setCreateDeploymentLabels({ key: "", value: "" });
//   //   }
//   // };

//   // const onChangeAnnotation = (e) => {
//   //   setCreateDeploymentAnnotaions({
//   //     ...createDeploymentAnnotaions,
//   //     [e.target.name]: e.target.value,
//   //   });
//   // };

//   // const addAnnotation = () => {
//   //   if (
//   //     createDeploymentAnnotaions.key !== "" &&
//   //     createDeploymentAnnotaions.value !== ""
//   //   ) {
//   //     addAnnotationList(
//   //       createDeploymentAnnotaions.key,
//   //       createDeploymentAnnotaions.value
//   //     );
//   //     setCreateDeploymentAnnotaions({ key: "", value: "" });
//   //   }
//   // };

//   const {
//     labels,
//     setLabels,
//     inputLabelKey,
//     setInputLabelKey,
//     inputLabelValue,
//     setInputLabelValue,
//     inputAnnotationsKey,
//     setInputAnnotationsKey,
//     inputAnnotationsValue,
//     setInputAnnotationsValue,
//     annotations,
//     setAnnotations,
//   } = claimStore;

//   const [labelsNextId, setLabelsNextId] = useState(1);
//   const [annotationsNextId, setAnnotationsNextId] = useState(1);

//   const handleChange = (e) => {
//     const { value, name } = e.target;
//     if (name === "LabelsKey") {
//       setInputLabelKey(value);
//       return;
//     } else if (name === "LabelsValue") {
//       setInputLabelValue(value);
//       return;
//     } else if (name === "AnnotationsKey") {
//       setInputAnnotationsKey(value);
//       return;
//     } else if (name === "AnnotationsValue") {
//       setInputAnnotationsValue(value);
//       return;
//     }
//   };

//   const addLabels = () => {
//     const newLabelsList = labels.concat({
//       id: labelsNextId,
//       key: inputLabelKey,
//       value: inputLabelValue,
//     });
//     setLabelsNextId(labelsNextId + 1);
//     setLabels([...labels, newLabelsList]);
//     setInputLabelKey(inputLabelKey);
//     setInputLabelValue(inputLabelValue);
//   };

//   const deleteLabels = (id) => {
//     if (labels.length == 1) return;
//     const deletedNewList = labels.filter((labels) => labels.id !== id);
//     setLabels(deletedNewList);
//   };

//   const addAnnotations = () => {
//     const newAnnotationsList = annotations.concat({
//       id: annotationsNextId,
//       key: inputAnnotationsKey,
//       value: inputAnnotationsValue,
//     });
//     setAnnotationsNextId(annotationsNextId + 1);
//     setAnnotations(newAnnotationsList);
//     setInputAnnotationsKey("");
//     setInputAnnotationsValue("");
//     return;
//   };

//   const deleteAnnotations = (id) => {
//     if (annotations.length == 1) return;
//     const deletedNewList = annotations.filter((labels) => labels.id !== id);
//     setAnnotations(deletedNewList);
//   };

//   console.log(labels);
//   return (
//     <>
//       <div className="step-container">
//         <div className="signup-step">
//           <div className="step">
//             <span>기본 정보</span>
//           </div>
//           <div className="arr"></div>
//           <div className="step current">
//             <span>고급 설정</span>
//           </div>
//           <div className="arr"></div>
//           <div className="step">
//             <span>스케줄러</span>
//           </div>
//           <div className="arr"></div>
//           <div className="step">
//             <span>설정 검토</span>
//           </div>
//         </div>
//       </div>

//       {/* <table className="tb_data_new tb_write">
//         <tbody>
//           <tr>
//             <th rowSpan={deploymentInfo.labels.length + 1}>Labels</th>
//             <td>
//               <CTextField
//                 type="text"
//                 placeholder="Key"
//                 className="form_fullWidth"
//                 name="key"
//                 onChange={onChangeLabel}
//                 value={createDeploymentLabels.key}
//               />
//             </td>
//             <td>
//               <CTextField
//                 type="text"
//                 placeholder="Value"
//                 className="form_fullWidth"
//                 name="value"
//                 onChange={onChangeLabel}
//                 value={createDeploymentLabels.value}
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
//           {labelList.map((createDeploymentLabels, index) => (
//             <tr>
//               <td style={{ paddingLeft: "5px" }}>
//                 {createDeploymentLabels.key}
//               </td>
//               <td style={{ paddingLeft: "5px" }}>
//                 {createDeploymentLabels.value}
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
//                     margin: "2px",
//                     borderRadius: "0",
//                   }}
//                   onClick={() => removeObjectInDeploymentInfo("labels", index)}
//                 >
//                   -
//                 </Button>
//               </td>
//             </tr>
//           ))}

//           <tr>
//             <th rowSpan={annotationList.length + 2}>Annotations</th>
//           </tr>
//           {annotationList.map((createDeploymentAnnotaions, index) => (
//             <tr>
//               <td style={{ paddingLeft: "5px" }}>
//                 {createDeploymentAnnotaions.key}
//               </td>
//               <td style={{ paddingLeft: "5px" }}>
//                 {createDeploymentAnnotaions.value}
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
//                 onChange={onChangeAnnotation}
//                 value={createDeploymentAnnotaions.key}
//               />
//             </td>
//             <td>
//               <CTextField
//                 type="text"
//                 placeholder="Value"
//                 className="form_fullWidth"
//                 name="value"
//                 onChange={onChangeAnnotation}
//                 value={createDeploymentAnnotaions.value}
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
//           {deploymentInfo.annotations.map((annotation, index) => (
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
//                   onClick={() =>
//                     removeObjectInDeploymentInfo("annotations", index)
//                   }
//                 >
//                   -
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table> */}
//       <table className="tb_data_new tb_write">
//         <tbody>
//           {labels.map((item, i) => (
//             <tr>
//               <th>Labels</th>
//               <td>
//                 <CTextField
//                   type="text"
//                   placeholder="Key"
//                   className="form_fullWidth"
//                   name="LabelsKey"
//                   onChange={handleChange}
//                   value={item.key || ""}
//                 />
//               </td>
//               <td>
//                 <CTextField
//                   type="text"
//                   placeholder="Value"
//                   className="form_fullWidth"
//                   name="LabelsValue"
//                   onChange={handleChange}
//                   value={item.value}
//                 />
//               </td>
//               <td>
//                 <Button onClick={addLabels}>+</Button>
//                 &nbsp;&nbsp;
//                 <Button onClick={() => deleteLabels(item.id)}>-</Button>
//               </td>
//             </tr>
//           ))}
//           {annotations.map((item, i) => (
//             <tr>
//               <th>Annotations</th>
//               <td>
//                 <CTextField
//                   type="text"
//                   placeholder="Key"
//                   className="form_fullWidth"
//                   name="AnnotationsKey"
//                   onChange={handleChange}
//                   value={inputAnnotationsKey}
//                 />
//               </td>
//               <td>
//                 <CTextField
//                   type="text"
//                   placeholder="Value"
//                   className="form_fullWidth"
//                   name="AnnotationsValue"
//                   onChange={handleChange}
//                   value={inputAnnotationsValue}
//                 />
//               </td>
//               <td colSpan={2}>
//                 <Button onClick={addAnnotations}>+</Button>
//                 &nbsp;&nbsp;
//                 <Button onClick={() => deleteAnnotations(item.id)}>-</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// });
// export default CreateDeploymentStepTwo;
