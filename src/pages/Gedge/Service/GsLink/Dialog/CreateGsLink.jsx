import { observer } from "mobx-react";
import { CTextField } from "@/components/textfields";
import styled from "styled-components";
import { CDialogNew } from "@/components/dialogs";
import { swalError } from "../../../../../utils/swal-utils";
import { FormControl } from "@material-ui/core";
import { useEffect } from "react";
import gsLinkStatusStore from "../../../../../store/GsLink";
import workspaceStore from "../../../../../store/WorkSpace";
import projectStore from "../../../../../store/Project";

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

const CreateGsLink = observer((props) => {
  const { open } = props;

  const { loadWorkSpaceList, workSpaceList } = workspaceStore;
  const { projectListinWorkspace, loadProjectList } = projectStore;

  useEffect(() => {
    loadWorkSpaceList();
    loadProjectList();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "workspace") {
      console.log("");
    }
  };

  const handleClose = () => {
    props.onClose && props.onClose();
  };

  const postEnvironment = () => {
    // PostEnvAPI(envName, envImage);

    props.reloadFunc && props.reloadFunc();
    props.onClose && props.onClose();
  };

  return (
    <CDialogNew
      id="myDialog"
      open={open}
      maxWidth="md"
      title={`Create GsLink`}
      onClose={handleClose}
      bottomArea={false}
      modules={["custom"]}
    >
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
                  //   value={deployment.workspace}
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
                  //   disabled={!deployment.workspace}
                  name="project"
                  onChange={onChange}
                  //   value={deployment.project}
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
          <ButtonNext onClick={postEnvironment}>생성</ButtonNext>
        </div>
      </div>
    </CDialogNew>
  );
});

export default CreateGsLink;
