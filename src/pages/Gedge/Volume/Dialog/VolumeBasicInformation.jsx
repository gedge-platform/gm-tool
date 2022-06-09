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

const VolumeBasicInformation = observer((props) => {
  const { loadWorkSpaceList, workSpaceList } = workspacestore;
  // const [projectEnable, setProjectEnable] = useState(true);
  const { loadProjectListInWorkspace, projectListinWorkspace } = projectStore;
  const onChange = (e) => {
    console.log(e.target.value);
  };

  useEffect(() => {}, []);

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
                name="Volume Name"
                onChange={onChange}
                // value={volumeName}
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
                  // disabled={projectEnable}
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
              Access Mode <span className="requried">*</span>
            </th>
            <td>
              <FormControl className="form_fullWidth">
                <select name="accessMode" onChange={onChange}>
                  <option value={0}>Select Access Mode</option>
                  <option value={1}>ReadWriteOnce</option>
                  <option value={2}>ReadOnlyMany</option>
                  <option value={3}>ReadWriteMany</option>
                  <option value={4}>ReadWriteOncePod</option>
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
                type="text"
                placeholder="Volume Capacity"
                className="form_fullWidth"
                name="Volume Capacity"
                onChange={onChange}
                // value={volumeName}
              />
            </td>
            <th></th>
          </tr>
        </tbody>
      </table>
    </>
  );
});

export default VolumeBasicInformation;
