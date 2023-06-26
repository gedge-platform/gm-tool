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
import workspaceStore from "../../../../../../store/WorkSpace";
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

const CreateDeploymentStepTwo = observer((props) => {
  const { open } = props;
  const [open2, setOpen2] = useState(false);
  const [stepValue, setStepValue] = useState(1);
  const [projectDisable, setProjectDisable] = useState(true);
  const [label, setLabel] = useState({ key: "", value: "" });
  const [annotation, setAnnotation] = useState({ key: "", value: "" });
  const [prioritytDisable, setPriorityDisable] = useState(true);
  const [prioritytPodDisable, setPrioritytPodDisable] = useState(true);
  const [priority, setPriority] = useState({
    name: "GLowLatencyPriority",
    options: {
      type: "fromNode",
      //data: {}
    },
  });

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
    deploymentInfo,
    initDeploymentInfo,
    setDeploymentInfo,
    removeContainer,
  } = deploymentStore;

  const {
    loadWorkSpaceList,
    workSpaceList,
    loadWorkspaceDetail,
    selectClusterInfo,
  } = workspaceStore;

  const {
    loadProjectListInWorkspace,
    setProjectListinWorkspace,
    projectListinWorkspace,
  } = projectStore;

  const {
    loadPVClaims,
    pvClaimListInDeployment,
    checkPVCInDeployment,
    setCheckPVCInDeployment,
  } = claimStore;

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name == "workspace") {
      setDeploymentInfo(name, value);
      setProjectDisable(false);
      loadProjectListInWorkspace(value);
      // setPriorityDisable(false);
      loadClusterList();
      loadWorkspaceDetail(value);
    }
  };

  const onChangePod = async ({ target: { name, value } }) => {
    let projectNameTemp = "";
    let clusterNameTemp = "";

    if (name === "project") {
      setPriorityDisable(false);
      projectNameTemp = value;
      // setPrioritytDisable(false);
    }
    if (name === "cluster") {
      setPrioritytPodDisable(false);
      clusterNameTemp = value;
      await podListInclusterAPI(clusterNameTemp, projectNameTemp);
    }
  };

  const onChangeLabel = (e) => {
    setLabel({
      ...label,
      [e.target.name]: e.target.value,
    });
  };

  const addLabel = () => {
    if (label.key !== "" && label.value !== "") {
      addLabelList(label.key, label.value);
      setLabel({ key: "", value: "" });
    }
  };

  const onChangeAnnotation = (e) => {
    setAnnotation({
      ...annotation,
      [e.target.name]: e.target.value,
    });
  };

  const addAnnotation = () => {
    if (annotation.key !== "" && annotation.value !== "") {
      addAnnotationList(annotation.key, annotation.value);
      setAnnotation({ key: "", value: "" });
    }
  };

  const onChangeCheckPVC = ({ target: { value } }) => {
    setCheckPVCInDeployment(value);
  };

  return (
    <>
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
            <span>설정 검토</span>
          </div>
        </div>
      </div>

      <table className="tb_data_new tb_write">
        <tbody>
          <tr>
            <th rowSpan={labelList.length + 2}>Labels</th>
          </tr>
          {labelList.map((label, index) => (
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
                  onClick={() => removeLabelList(index)}
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
          <tr>
            <th rowSpan={annotationList.length + 2}>Annotations</th>
          </tr>
          {annotationList.map((annotation, index) => (
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
                value={deploymentInfo.replicas}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
});
export default CreateDeploymentStepTwo;
