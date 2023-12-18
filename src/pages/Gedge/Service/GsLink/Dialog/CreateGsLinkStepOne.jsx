import { observer } from "mobx-react";
import { CTextField } from "@/components/textfields";
import styled from "styled-components";
import { CDialogNew } from "@/components/dialogs";
import { swalError } from "../../../../../utils/swal-utils";
import { FormControl, Table } from "@material-ui/core";
import { useEffect } from "react";
import gsLinkStore from "../../../../../store/GsLink";
import workspaceStore from "../../../../../store/WorkSpace";
import projectStore from "../../../../../store/Project";
import clusterStore from "../../../../../store/Cluster";

const CreateGsLinkStepOne = observer((props) => {
  const { open } = props;

  const { loadWorkSpaceList, workSpaceList } = workspaceStore;
  const { projectListinWorkspace, loadProjectListInWorkspace, projectLists } =
    projectStore;
  const { gsLinkInfo, setGsLinkInfo } = gsLinkStore;
  const { loadCluster, clusterDetail } = clusterStore;

  console.log("gsLinkInfo ???", gsLinkInfo);
  console.log("projectListinWorkspace ??", projectListinWorkspace);

  useEffect(() => {
    loadWorkSpaceList();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "workspace") {
      setGsLinkInfo("workspace_name", value);
      loadProjectListInWorkspace(value);
    }

    if (name === "project") {
      setGsLinkInfo("project_name", value);
    }

    if (name === "namespace") {
      setGsLinkInfo("namespace_name", value);
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
                <select
                  name="workspace"
                  onChange={onChange}
                  value={gsLinkInfo.workspace_name}
                >
                  <option value={""} disabled hidden>
                    Select Workspace
                  </option>
                  {workSpaceList.map((workspace) => (
                    <option
                      key={workspace.workspaceUUID}
                      value={workspace.workspaceName}
                    >
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
                  disabled={!gsLinkInfo.workspace_name}
                  name="project"
                  onChange={onChange}
                  value={gsLinkInfo.project_name}
                >
                  <option value={""} selected hidden disabled>
                    Select Project
                  </option>
                  {projectListinWorkspace ? (
                    projectListinWorkspace?.map((project) => (
                      <option value={project.projectName}>
                        {project.projectName}
                      </option>
                    ))
                  ) : (
                    <option value={""}>No Data</option>
                  )}
                </select>
              </FormControl>
            </td>
          </tr>

          <tr>
            <th>
              Namespace <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <CTextField
                type="text"
                placeholder="Namespace(영어소문자, 숫자만 가능)"
                className="form_fullWidth"
                name="namespace"
                onChange={onChange}
                value={gsLinkInfo.namespace_name}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
});

export default CreateGsLinkStepOne;
