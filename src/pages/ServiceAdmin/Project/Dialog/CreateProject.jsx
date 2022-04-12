import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { CDialogNew } from "../../../../components/dialogs";
import FormControl from "@material-ui/core/FormControl";
import { CTextField } from "@/components/textfields";
import styled from "styled-components";
import { FormGroup } from "@mui/material";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import projectStore from "../../../../store/Project";
import workspacesStore from "../../../../store/WorkSpace";
import clusterStore from "../../../../store/Cluster";
import { dateFormatter } from "@/utils/common-utils";

const Button = styled.button`
  background-color: #fff;
  border: 1px solid black;
  color: black;
  padding: 10px 35px;
  margin-right: 10px;
  border-radius: 4px;
`;

const ButtonNext = styled.button`
  background-color: #0f5ce9;
  color: white;
  border: none;
  padding: 10px 35px;
  border-radius: 4px;
`;

const CreateProject = observer((props) => {
  const { open } = props;
  const { clusters, loadClusterInWorkspace } = clusterStore;
  const { workSpaceList, loadWorkSpaceList } = workspacesStore;
  const { createProject } = projectStore;

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [workspace, setWorkspace] = useState("");
  const [selectCluster, setSelectCluster] = useState([]);

  const handleClose = () => {
    props.reloadFunc && props.reloadFunc();
    props.onClose && props.onClose();
    setProjectName("");
    setProjectDescription("");
    setWorkspace("");
    setSelectCluster([]);
  };

  const onChange = ({ target: { name, value } }) => {
    if (name === "workspace") {
      loadClusterInWorkspace(value);
      setWorkspace(value);
    } else if (name === "projectName") {
      setProjectName(value);
    } else if (name === "projectDescription") {
      setProjectDescription(value);
    }
  };

  const checkCluster = ({ target: { checked } }, clusterName) => {
    if (checked) {
      setSelectCluster([...selectCluster, clusterName]);
    } else {
      setSelectCluster(
        selectCluster.filter((cluster) => cluster !== clusterName)
      );
    }
  };

  const postProject = () => {
    createProject(
      projectName,
      projectDescription,
      props.type,
      workspace,
      selectCluster,
      handleClose
    );
  };

  useEffect(() => {
    loadWorkSpaceList();
  }, []);

  return (
    <CDialogNew
      id="myDialog"
      open={open}
      maxWidth="md"
      title={`Create Project`}
      onClose={handleClose}
      bottomArea={false}
      modules={["custom"]}
    >
      <table className="tb_data_new tb_write">
        <tbody>
          <tr>
            <th>
              Project Name
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Project Name"
                className="form_fullWidth"
                name="projectName"
                onChange={onChange}
                value={projectName}
              />
            </td>
          </tr>
          <tr>
            <th>
              Project Description
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Project Description"
                className="form_fullWidth"
                name="projectDescription"
                onChange={onChange}
                value={projectDescription}
              />
            </td>
          </tr>
          <tr>
            <th>
              Project Type
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                disabled={true}
                className="form_fullWidth"
                name="projectType"
                value={props.type}
              />
            </td>
          </tr>
          <tr>
            <th>
              Workspace
              <span className="requried">*</span>
            </th>
            <td>
              <FormControl className="form_fullWidth">
                <select name="workspace" onChange={onChange}>
                  <option value={"dafault"}>default</option>
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
              Cluster <span className="requried">*</span>
            </th>
            <td>
              <table className="tb_data_new">
                <tbody className="tb_data_nodeInfo">
                  <tr>
                    <th></th>
                    <th>이름</th>
                    <th>타입</th>
                    <th>생성자</th>
                    <th>노드개수</th>
                    <th>IP</th>
                    <th>생성날짜</th>
                  </tr>
                  {clusters.map(
                    ({
                      clusterName,
                      clusterType,
                      clusterEndpoint,
                      nodeCnt,
                      clusterCreator,
                      created_at,
                    }) => (
                      <tr>
                        <td style={{ textAlign: "center" }}>
                          <input
                            type="checkbox"
                            name="clusterCheck"
                            onChange={(e) => checkCluster(e, clusterName)}
                          />
                        </td>
                        <td>{clusterName}</td>
                        <td>{clusterType}</td>
                        <td>{clusterCreator}</td>
                        <td>{nodeCnt}</td>
                        <td>{clusterEndpoint}</td>
                        <td>{dateFormatter(created_at)}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
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
            width: "240px",
            justifyContent: "center",
          }}
        >
          <Button onClick={handleClose}>취소</Button>
          <ButtonNext onClick={postProject}>생성</ButtonNext>
        </div>
      </div>
    </CDialogNew>
  );
});
export default CreateProject;
