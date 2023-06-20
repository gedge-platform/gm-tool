import { observer } from "mobx-react";
import FormControl from "@material-ui/core/FormControl";
import { CTextField } from "@/components/textfields";
import { CDialogNew } from "@/components/dialogs";

import { swalError } from "../../../../../utils/swal-utils";
import styled from "styled-components";

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

const CreatePackage = observer((props) => {
  const { open } = props;

  const handleClose = () => {
    props.onClose && props.onClose();
  };

  const postPackage = () => {
    swalError("Package가 생성되었습니다.");
    props.reloadFunc && props.reloadFunc();
    props.onClose && props.onClose();
  };
  return (
    <CDialogNew
      id="myDialog"
      open={open}
      maxWidth="md"
      title={`Create Package`}
      onClose={handleClose}
      bottomArea={false}
      modules={["custom"]}
    >
      <table className="tb_data_new tb_write">
        <tbody>
          <tr>
            <th>
              Name <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Package Name"
                className="form-fullWidth"
                name="Package Name"
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <th>
              Env Name <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Env Name"
                className="form-fullWidth"
                name="Env Name"
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <th>
              Source dir <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Source dir"
                className="form-fullWidth"
                name="Source dir"
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <th>
              Build cmd <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Build cmd"
                className="form-fullWidth"
                name="Build cmd"
                style={{ width: "100%" }}
              />
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
          <ButtonNext onClick={postPackage}>생성</ButtonNext>
        </div>
      </div>
    </CDialogNew>
  );
});

export default CreatePackage;
