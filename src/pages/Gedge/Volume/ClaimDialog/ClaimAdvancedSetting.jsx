import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { CTextField } from "@/components/textfields";
import { observer } from "mobx-react";
import { claimStore } from "@/store";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import CreateClaim from "./CreateClaim";
import { render } from "react-dom";

const HeaderContainer = styled.div`
  width: 320px;
  padding: 8px;
  border-radius: 4px;
  background-color: #eff4f9;
  text-align: center;
  margin-bottom: 20px;
`;
const ButtonBox = styled.div`
  margin-top: 15px;
  display: flex;
  width: 100%;
  justify-content: space-around;
`;
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

const ClaimAdvancedSetting = observer(() => {
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
    annotationInput,
    setAnnotationInput,
    setLabelInput,
    labels,
    setLabels,
  } = claimStore;

  // const [labelInput, setLabelInput] = useState({ [labelKey]: labelValue });
  const newLabelList = [{ [labelInputKey]: labelInputValue }];
  // const { labelKey, labelValue } = labelInput;

  // const [annotationInput, setAnnotationInput] = useState({
  //   annotationKey: "",
  //   annotationValue: "",
  // });
  // const { annotationKey, annotationValue } = annotationInput;

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
    setLabelInput({
      // ...labelInput, // 기존의 labelInput 객체를 복사한 뒤
      // [name]: value, // name 키를 가진 값을 value로 설정
      [labelKey]: labelValue,
    });
    setAnnotationInput({
      [annotationKey]: annotationValue,
    });
  };

  // const [labels, setLabels] = useState([]);
  const [annotations, setAnnotations] = useState([]);

  // const addRow = () => {
  //   const table = document.getElementById("labeltable");
  //   const newRow = table.insertRow();
  //   const newCell1 = newRow.insertCell(0);
  //   const newCell2 = newRow.insertCell(1);
  //   newCell1.innerText = "label";
  // };

  const addLabels = (e) => {
    e.preventDefault();
    console.log("click");
    if (labelKey == "") {
      alert("값을 입력하세요.");
      return;
    }
    if (labelValue == "") {
      alert("값을 입력하세요.");
      return;
    }
    setLabelInput({ [labelInputKey]: labelValue });
    //   // setLabels(newLabelList);
    //   // const labelInputKey = "";
    //   // const labelInputvalue = "";

    //   setLabelInput(labelInput.concat(newLabelList));
    //   // labelInput = { ...labelInput, newLabelList };
    //   setLabelInput({
    //     labelKey: "",
    //     labelValue: "",
    //   });
    //   console.log(labelInput);
    //   // render() {
    //   //   return (
    //   //     <tr>
    //   //           <th>Labels</th>
    //   //           <td style={{ width: "300px", padding: "8px" }}>{k}</td>
    //   //           <td style={{ width: "300px", padding: "8px" }}>{v}</td>
    //   //           <td>
    //   //             <Button onClick={() => deleteLabels(item.labelKey)}>-</Button>
    //   //           </td>
    //   //         </tr>
    //   //   );
    //   // }
  };

  // const labelsList = labels.reduce(
  //   (obj, item) => Object.assign(obj, { [item.labelKey]: item.labelValue }),
  //   {}
  // );
  // console.log("step 2", labelsList); //{1: '2'}

  const deleteLabels = (labelKey) => {
    // if (labels.length == 1) return;
    setLabels(labels.filter((item) => item.labelKey !== labelKey));
  };

  const addAnnotations = () => {
    if (annotationKey == "") {
      alert("값을 입력하세요.");
      return;
    }
    if (annotationValue == "") {
      alert("값을 입력하세요.");
      return;
    }

    // const newAnnotationsList = [
    //   {
    //     annotationKey,
    //     annotationValue,
    //   },
    // ];

    // setAnnotations(annotations.concat(newAnnotationsList));
    // setAnnotationInput({
    //   annotationKey: "",
    //   annotationValue: "",
    // });

    // labels[inputLabelKey] = inputLabelValue;
  };

  // const deleteAnnotations = (annotationKey) => {
  //   setAnnotations(
  //     annotations.filter((item) => item.annotationKey !== annotationKey)
  //   );
  // };

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
              <Button onClick={addLabels}>+</Button>
            </td>
          </tr>
          {Object.entries(labelInput).map((k) => (
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
              {/* <td style={{ width: "300px", padding: "8px" }}>{k.labelKey}</td>
              <td style={{ width: "300px", padding: "8px" }}>{k.labelValue}</td> */}
              <td>
                <Button onClick={() => deleteLabels(item.labelKey)}>-</Button>
              </td>
            </tr>
          ))}

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
          {/* {annotations.map((item) => (
            <tr>
              <th>Labels</th>
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
          ))} */}
        </tbody>
      </table>
      <CreateClaim labelsList={labelInput} />
    </>
  );
});

export default ClaimAdvancedSetting;
