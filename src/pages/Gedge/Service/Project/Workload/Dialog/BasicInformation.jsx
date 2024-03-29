import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import {
  workspaceStore,
  deploymentStore,
  clusterStore,
  projectStore,
} from "@/store";
import FormControl from "@material-ui/core/FormControl";
import { CTextField } from "@/components/textfields";

const BasicInformation = observer(() => {
  const [projectEnable, setProjectEnable] = useState(true);
  const [clusterEnable, setClusterEnable] = useState(true);

  const { loadWorkSpaceList, workSpaceList, workspace } = workspaceStore;
  const { loadProjectListInWorkspace, projectListinWorkspace } = projectStore;
  const {
    deploymentName,
    setDeployName,
    setCluster,
    setWorkspace,
    setProject,
  } = deploymentStore;
  const { loadClusterInProject, clusters } = clusterStore;

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "workspace") {
      loadProjectListInWorkspace(value);
      setWorkspace(value);
      setProjectEnable(false);
      return;
    } else if (name === "project") {
      loadClusterInProject(value);
      setProject(value);
      setClusterEnable(false);
    } else if (name === "Deployment Name") setDeployName(value);
    else if (name === "cluster") setCluster(value);
  };
  useEffect(() => {
    loadWorkSpaceList();
  }, []);
  return (
    <>
      <div className="step-container2">
        <div className="signup-step">
          <div className="step current">
            <span>기본 정보</span>
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
              Workspace <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <FormControl className="form_fullWidth">
                <select name="workspace" onChange={onChange}>
                  <option value={""}>Select Workspace</option>
                  {workspace.map((item) => (
                    <option value={item}>{item}</option>
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
          </tr>
        </tbody>
      </table>
    </>
  );
});

export default BasicInformation;
