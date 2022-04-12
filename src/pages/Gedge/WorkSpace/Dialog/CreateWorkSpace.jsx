import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { CDialogNew } from "../../../../components/dialogs";
import FormControl from "@material-ui/core/FormControl";
import { CTextField } from "@/components/textfields";
import styled from "styled-components";
import { FormGroup } from "@mui/material";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import clusterStore from "../../../../store/Cluster";

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

const CreateWorkSpace = observer((props) => {
  const { open } = props;
  const { loadClusterList, clusterList } = clusterStore;
  // const clusterList = ["gedgemgmt01", "gs-cluster01", "gs-cluster02"];

  const handleClose = () => {
    props.reloadFunc && props.reloadFunc();
    props.onClose && props.onClose();
  };

  const onChange = ({ target: { value } }) => {
    console.log(value);
  };

  useEffect(() => {
    loadClusterList();
  }, []);

  return (
    <CDialogNew
      id="myDialog"
      open={open}
      maxWidth="md"
      title={`Create Workspace`}
      onClose={handleClose}
      bottomArea={false}
      modules={["custom"]}
    >
      <table className="tb_data_new tb_write">
        <tbody>
          <tr>
            <th>
              Workspace Name
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Workspace Name"
                className="form_fullWidth"
                name="workspaceName"
                onChange={onChange}
                value={""}
              />
            </td>
          </tr>
          <tr>
            <th>
              Workspace Description
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Workspace Description"
                className="form_fullWidth"
                name="workspaceDescription"
                onChange={onChange}
                value={""}
              />
            </td>
          </tr>
          <tr>
            <th>
              Cluster <span className="requried">*</span>
            </th>
            <td>
              <FormGroup className="form_fullWidth" onChange={""}>
                {clusterList?.map((cluster) => (
                  <FormControlLabel
                    control={<Checkbox name={cluster.clusetrName} />}
                    label={cluster.clusetrName}
                  />
                ))}
              </FormGroup>
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
          <ButtonNext onClick={handleClose}>생성</ButtonNext>
        </div>
      </div>
    </CDialogNew>
  );
});
export default CreateWorkSpace;
