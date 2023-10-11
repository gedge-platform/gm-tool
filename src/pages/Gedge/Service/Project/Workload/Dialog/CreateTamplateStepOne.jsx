import styled from "styled-components";
import { observer } from "mobx-react";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { CTextField } from "@/components/textfields";
import { workspaceStore, projectStore, deploymentStore } from "@/store";

// const Button = styled.button`
//   background-color: #fff;
//   border: 1px solid black;
//   color: black;
//   padding: 10px 35px;
//   margin-right: 10px;
//   border-radius: 4px;
//   /* box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%); */
// `;

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

const ImgButton = styled.button`
  background-image: url(/images/resource/nginx.png);
  border: black;
`;

const CreateTamplateStepOne = observer((props) => {
  const [app, setApp] = useState("");
  const [version, setVersion] = useState("");
  const [disabledSelect, setDisabledSelect] = useState(true);

  const nginxVer = ["latest", "1.24.0", "1.23.0", "1.20.0"];
  const mysqlVer = ["latest", "8.0", "5.7.43"];

  const onChangeApp = (e) => {
    setApp(e.target.value);
    setAppInfo("app", e.target.value);
    console.log("appInfo : ", appInfo);
    setDisabledSelect(false);
  };

  const handleChange = (e) => {
    setVersion(e.target.value);
    setAppInfo("appVersion", e.target.value);
    console.log("appInfo : ", appInfo);
  };

  const { workSpaceList, selectClusterInfo, loadWorkspaceDetail } =
    workspaceStore;
  const { loadProjectListInWorkspace, projectListinWorkspace } = projectStore;
  const { setDeployment, setAppInfo, appInfo } = deploymentStore;

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "appName") {
      setAppInfo(name, value);
    }
    if (name === "appWorkspace") {
      setAppInfo(name, value);
      loadProjectListInWorkspace(value);
      loadWorkspaceDetail(value);
    }
    if (name === "appProject") {
      setAppInfo(name, value);
    }
    if (name === "appPort") {
      setAppInfo(name, value);
    }
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
            <th>
              App <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <FormControl className="form_fullWidth">
                <select name="app" onChange={onChangeApp} value={app}>
                  <option value={""} selected disabled hidden>
                    Select Version
                  </option>
                  <option value="nginx">nginx</option>
                  <option value="mysql">mysql</option>
                </select>
              </FormControl>
            </td>
          </tr>
          <tr>
            <th>
              Version <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <FormControl className="form_fullWidth">
                <select
                  name="version"
                  onChange={handleChange}
                  value={version}
                  disabled={disabledSelect}
                >
                  <option value={""} selected disabled hidden>
                    Select Version
                  </option>
                  {app === "nginx"
                    ? nginxVer.map((e) => <option value={e}>{e}</option>)
                    : mysqlVer.map((e) => <option value={e}>{e}</option>)}
                </select>
              </FormControl>
            </td>
          </tr>

          <tr>
            <th style={{ width: "200px" }}>
              Name <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <CTextField
                type="text"
                placeholder="Name(영어소문자, 숫자만 가능)"
                className="form_fullWidth"
                name="appName"
                onChange={onChange}
                value={appInfo.appName}
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
                  name="appWorkspace"
                  onChange={onChange}
                  value={appInfo.appWorkspace}
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
                  // disabled={!deployment.workspace}
                  name="appProject"
                  onChange={onChange}
                  value={appInfo.appProject}
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
                placeholder="1"
                className="form_fullWidth"
                name="appReplicas"
                onChange={onChange}
                value="1"
              />
            </td>
          </tr>

          <tr>
            <th>Port</th>
            <td colSpan="3">
              <CTextField
                type="number"
                placeholder="port"
                className="form_fullWidth"
                name="appPort"
                onChange={onChange}
                value={appInfo.appPort}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
});

export default CreateTamplateStepOne;
