import { observer } from "mobx-react";
import { CTextField } from "@/components/textfields";
import styled from "styled-components";
import { CDialogNew } from "@/components/dialogs";
import { swalError } from "../../../../../utils/swal-utils";

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

const CreateEnvironment = observer((props) => {
  const { open } = props;

  const handleClose = () => {
    props.onClose && props.onClose();
  };

  const postEnvironment = () => {
    swalError("Environment가 생성되었습니다.");
    props.reloadFunc && props.reloadFunc();
    props.onClose && props.onClose();
  };

  return (
    <CDialogNew
      id="myDialog"
      open={open}
      maxWidth="md"
      title={`Create Environment`}
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
            <td style={{ width: "50%" }}>
              <CTextField
                type="text"
                placeholder="Environment Name"
                className="form-fullWidth"
                name="Environment Name"
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <th>
              Size <span className="requried">*</span>
            </th>
            <td style={{ width: "50%" }}>
              <CTextField
                type="number"
                placeholder="Environment Size"
                className="form-fullWidth"
                name="Environment Size"
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
          <ButtonNext onClick={postEnvironment}>생성</ButtonNext>
        </div>
      </div>
    </CDialogNew>
  );
});

export default CreateEnvironment;
