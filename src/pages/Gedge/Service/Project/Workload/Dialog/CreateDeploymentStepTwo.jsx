import React, { useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import DeploymentPodSettins from "./DeploymentPodSettins";
import { CTextField } from "@/components/textfields";
import FormControl from "@material-ui/core/FormControl";
import { deploymentStore } from "@/store";
import { swalError } from "@/utils/swal-utils";
import { CDialogNew } from "@/components/dialogs";
import { toJS } from "mobx";
import clusterStore from "../../../../../../store/Cluster";
import podStore from "../../../../../../store/Pod";
import claimStore from "../../../../../../store/Claim";

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

const CreateDeploymentStepTwo = observer((props) => {
  const { open } = props;
  const [open2, setOpen2] = useState(false);
  const [stepValue, setStepValue] = useState(1);

  const {
    labelList,
    initLabelList,
    addLabelList,
    removeLabelList,
    annotationList,
    initAnnotationList,
    addAnnotationList,
    removeAnnotationList,
    deploymentInfo,
    initDeploymentInfo,
    setDeploymentInfo,
    removeContainer,
    createDeploymentLabels,
    setCreateDeploymentLabels,
    createDeploymentAnnotaions,
    setCreateDeploymentAnnotaions,
  } = deploymentStore;

  const onChangeLabel = (e) => {
    setCreateDeploymentLabels({
      ...createDeploymentLabels,
      [e.target.name]: e.target.value,
    });
  };

  const addLabel = () => {
    if (
      createDeploymentLabels.key === "" &&
      createDeploymentLabels.value === ""
    ) {
      swalError("값을 입력해주세요.");
    }
    if (
      createDeploymentLabels.key !== "" &&
      createDeploymentLabels.value !== ""
    ) {
      addLabelList(createDeploymentLabels.key, createDeploymentLabels.value);
      setCreateDeploymentLabels({ key: "", value: "" });
    }
  };

  const onChangeAnnotation = (e) => {
    setCreateDeploymentAnnotaions({
      ...createDeploymentAnnotaions,
      [e.target.name]: e.target.value,
    });
  };

  const addAnnotation = () => {
    if (
      createDeploymentAnnotaions.key !== "" &&
      createDeploymentAnnotaions.value !== ""
    ) {
      addAnnotationList(
        createDeploymentAnnotaions.key,
        createDeploymentAnnotaions.value
      );
      setCreateDeploymentAnnotaions({ key: "", value: "" });
    }
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
            <th rowSpan={deploymentInfo.labels.length + 1}>Labels</th>
            <td>
              <CTextField
                type="text"
                placeholder="Key"
                className="form_fullWidth"
                name="key"
                onChange={onChangeLabel}
                value={createDeploymentLabels.key}
              />
            </td>
            <td>
              <CTextField
                type="text"
                placeholder="Value"
                className="form_fullWidth"
                name="value"
                onChange={onChangeLabel}
                value={createDeploymentLabels.value}
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
          {labelList.map((createDeploymentLabels, index) => (
            <tr>
              <td style={{ paddingLeft: "5px" }}>
                {createDeploymentLabels.key}
              </td>
              <td style={{ paddingLeft: "5px" }}>
                {createDeploymentLabels.value}
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
                    margin: "2px",
                    borderRadius: "0",
                  }}
                  onClick={() => removeObjectInDeploymentInfo("labels", index)}
                >
                  -
                </Button>
              </td>
            </tr>
          ))}

          <tr>
            <th rowSpan={annotationList.length + 2}>Annotations</th>
          </tr>
          {annotationList.map((createDeploymentAnnotaions, index) => (
            <tr>
              <td style={{ paddingLeft: "5px" }}>
                {createDeploymentAnnotaions.key}
              </td>
              <td style={{ paddingLeft: "5px" }}>
                {createDeploymentAnnotaions.value}
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
                    margin: "2px",
                    borderRadius: "0",
                  }}
                  onClick={() => removeAnnotationList(index)}
                >
                  -
                </Button>
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
                value={createDeploymentAnnotaions.key}
              />
            </td>
            <td>
              <CTextField
                type="text"
                placeholder="Value"
                className="form_fullWidth"
                name="value"
                onChange={onChangeAnnotation}
                value={createDeploymentAnnotaions.value}
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
          {deploymentInfo.annotations.map((annotation, index) => (
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
                  onClick={() =>
                    removeObjectInDeploymentInfo("annotations", index)
                  }
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
export default CreateDeploymentStepTwo;
