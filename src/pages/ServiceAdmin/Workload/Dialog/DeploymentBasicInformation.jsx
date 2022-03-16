import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import workspacesStore from "../../../../store/WorkSpace";
import projectStore from "../../../../store/Project";
import deploymentStore from "../../../../store/Deployment";
import FormControl from "@material-ui/core/FormControl";
import { CTextField } from "@/components/textfields";
import clusterStore from "../../../../store/Cluster";

const DeploymentBasicInformation = observer(() => {
  const [projectEnable, setProjectEnable] = useState(true);
  const [clusterEnable, setClusterEnable] = useState(true);
  const { loadWorkSpaceList, workSpaceList } = workspacesStore;
  const { loadProjectListInWorkspace, projectListinWorkspace } = projectStore;
  const {
    deploymentName,
    setDeployName,
    setCluster,
    setWorkspace,
    setProject,
  } = deploymentStore;
  const { loadClusterList, clusterList } = clusterStore;

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "workspace") {
      loadProjectListInWorkspace(value);
      setWorkspace(value);
      setProjectEnable(false);
      return;
    } else if (name === "project") {
      loadClusterList();
      setProject(value);
      setClusterEnable(false);
    } else if (name === "Deployment Name") setDeployName(value);
    else if (name === "cluster") setCluster(value);
  };
  useEffect(() => {
    loadWorkSpaceList();
  }, []);
  return (
    <table className="tb_data tb_write">
      <tbody>
        <tr>
          <th>
            Workspace <span className="requried">*</span>
          </th>
          <td style={{ width: "50%" }}>
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
                {projectListinWorkspace.map((project) => (
                  <option value={project.projectName}>
                    {project.projectName}
                  </option>
                ))}
                <option value={"dafault"}>default</option>
              </select>
            </FormControl>
          </td>
          <th></th>
        </tr>
        {/* <tr>
          <th>
            Cluster <span className="requried">*</span>
          </th>
          <td>
            <FormControl className="form_fullWidth">
              <select
                disabled={clusterEnable && projectEnable}
                name="cluster"
                onChange={onChange}
              >
                {clusterList.map((cluster) => (
                  <option value={cluster.clusterName}>
                    {cluster.clusterName}
                  </option>
                ))}
                <option value={"dafault"}>default</option>
              </select>
            </FormControl>
          </td>
          <th></th>
        </tr> */}
        <tr>
          <th>
            Deployment Name
            <span className="requried">*</span>
          </th>
          <td colSpan={3}>
            <CTextField
              type="text"
              placeholder="Deployment Name"
              className="form_fullWidth"
              name="Deployment Name"
              onChange={onChange}
              value={deploymentName}
            />
          </td>
          <th></th>
        </tr>
      </tbody>
    </table>
  );
});

export default DeploymentBasicInformation;
