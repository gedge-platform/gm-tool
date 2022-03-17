import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import workspacesStore from "../../../../store/WorkSpace";
import projectStore from "../../../../store/Project";
import deploymentStore from "../../../../store/Deployment";
import FormControl from "@material-ui/core/FormControl";
import { CTextField } from "@/components/textfields";
import clusterStore from "../../../../store/Cluster";
import serviceStore from "../../../../store/Service";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const DeploymentBasicInformation = observer(() => {
  const [projectEnable, setProjectEnable] = useState(true);
  const [clusterEnable, setClusterEnable] = useState(true);
  const { loadWorkSpaceList, workSpaceList } = workspacesStore;
  const { loadProjectListInWorkspace, projectListinWorkspace } = projectStore;
  const {
    cluster,
    serviceName,
    setServiceName,
    setClusterList,
    setWorkspace,
    setProject,
  } = serviceStore;
  const { loadClusterList, clusterList } = clusterStore;

  const checkChange = ({ target: { checked, name } }) => {
    if (checked) {
      setClusterList([...cluster, name]);
    } else {
      setClusterList(cluster.filter((item) => item !== name));
    }
  };

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
    } else if (name === "Service Name") setServiceName(value);
    else if (name === "cluster") {
      console.log(value, name);
    }
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
        <tr>
          <th>
            Cluster <span className="requried">*</span>
          </th>
          <td>
            <FormGroup className="form_fullWidth" onChange={checkChange}>
              {clusterList.map((cluster) => (
                <FormControlLabel
                  control={<Checkbox name={cluster.clusterName} />}
                  label={cluster.clusterName}
                />
              ))}
            </FormGroup>
          </td>
          <th></th>
        </tr>
        <tr>
          <th>
            Service Name
            <span className="requried">*</span>
          </th>
          <td>
            <CTextField
              type="text"
              placeholder="Service Name"
              className="form_fullWidth"
              name="Service Name"
              onChange={onChange}
              value={serviceName}
            />
          </td>
          <th></th>
        </tr>
      </tbody>
    </table>
  );
});

export default DeploymentBasicInformation;
