import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import { CTextField } from "@/components/textfields";
import { CCreateButton } from "@/components/buttons";
import { PanelBox } from "@/components/styles/PanelBox";
import { swalError } from "../../../../utils/swal-utils";
import styled from "styled-components";
import workspacestore from "../../../../store/WorkSpace";
import projectStore from "../../../../store/Project";
import deploymentStore from "../../../../store/Deployment";
import clusterStore from "../../../../store/Cluster";
import volumeStore from "../../../../store/Volume";

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

const volumeBasicInformation = observer((props) => {
  const { loadWorkSpaceList, workSpaceList, loadWorkspaceDetail } =
    workspacestore;

  const [projectEnable, setProjectEnable] = useState(true);
  const [clusterEnable, setClusterEnable] = useState(true);

  const {
    loadProjectListInWorkspace,
    projectListinWorkspace,
    selectClusterInfo,
    setSelectClusterInfo,
    loadProjectDetail,
  } = projectStore;

  const {
    setCluster,
    setProject,
    workspaceName,
    setWorkspaceName,
    setWorkspace,
  } = deploymentStore;

  const { loadClusterInProject, clusters, setClusters } = clusterStore;
  const {
    setVolumeName,
    setAccessMode,
    setVolumeCapacity,
    volumeCapacity,
    volumeName,
  } = volumeStore;

  const [selectClusters, setSelectClusters] = useState([]);

  const onChange = async (e) => {
    const { value, name } = e.target;
    if (name === "VolumeName") {
      setVolumeName(value);
    } else if (name === "workspace") {
      loadProjectListInWorkspace(value);
      setWorkspace(value);
      setProjectEnable(false);
      return;
    } else if (name === "project") {
      if (value === "") {
        setSelectClusterInfo([]);
        return;
      }
      // loadClusterInProject(value);
      setProject(value);
      await loadProjectDetail(value);
      setSelectClusters([...selectClusterInfo]);
      setClusterEnable(false);
    } else if (name === "accessMode") {
      setAccessMode(value);
    } else if (name === "volumeCapacity") {
      setVolumeCapacity(value);
    }
  };
  console.log(onChange);

  useEffect(() => {
    loadWorkSpaceList(true);
    setSelectClusterInfo([]);
  }, []);

  useEffect(() => {
    setSelectClusters([...selectClusterInfo]);
  }, []);

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
              Volume Name
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Volume Name"
                className="form_fullWidth"
                name="VolumeName"
                onChange={onChange}
                value={volumeName}
              />
            </td>
            <th></th>
          </tr>
          <tr>
            <th>
              Workspace <span className="requried">*</span>
            </th>
            <td style={{ width: "50%" }}>
              <FormControl className="form_fullWidth">
                <select name="workspace" onChange={onChange}>
                  <option value={""}>Select Workspace</option>
                  {workSpaceList.map((item) => (
                    <option value={item.workspaceName}>
                      {item.workspaceName}
                    </option>
                  ))}
                </select>
              </FormControl>
            </td>
            <th></th>
          </tr>
          <tr>
            <th>
              Project <span className="requried">*</span>
            </th>
            <td>
              <FormControl className="form_fullWidth">
                <select
                  disabled={projectEnable}
                  name="project"
                  onChange={onChange}
                >
                  <option value={""}>Select Project</option>
                  {projectListinWorkspace.map((project) => (
                    <option value={project.projectName}>
                      {project.projectName}
                    </option>
                  ))}
                </select>
              </FormControl>
            </td>
            <th></th>
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
                    <th>IP</th>
                  </tr>
                  {selectClusterInfo.map(
                    ({ clusterName, clusterType, clusterEndpoint }) => (
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
                        <td>{clusterEndpoint}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th>
              Access Mode <span className="requried">*</span>
            </th>
            <td>
              <FormControl className="form_fullWidth">
                <select name="accessMode" onChange={onChange}>
                  <option value="Select Access Mode">Select Access Mode</option>
                  <option value="ReadWriteOnce">ReadWriteOnce</option>
                  <option value="ReadWriteOnce">ReadWriteOnce</option>
                  <option value="ReadWriteOnce">ReadWriteOnce</option>
                  <option value="ReadWriteOncePod">ReadWriteOncePod</option>
                </select>
              </FormControl>
            </td>
            <th></th>
          </tr>
          <tr>
            <th>
              Volume Capacity
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="number"
                placeholder="Volume Capacity"
                className="form_fullWidth"
                name="volumeCapacity"
                onChange={onChange}
                value={volumeCapacity}
              />
            </td>
            <th></th>
          </tr>
        </tbody>
      </table>
    </>
  );
});

export default volumeBasicInformation;
