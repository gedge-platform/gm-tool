import { observer } from "mobx-react";
import FormControl from "@material-ui/core/FormControl";
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

const CreateFunction = observer((props) => {
  const envName = ["env1", "env2", "env3", "env4"];
  const { open } = props;

  const handleClose = () => {
    props.onClose && props.onClose();
  };

  const postFunction = () => {
    swalError("Function가 생성되었습니다.");
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
            <td>
              <CTextField
                type="text"
                placeholder="Function Name"
                className="form-fullWidth"
                name="Function Name"
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <th>
              Min Scale <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="number"
                placeholder="Function Min Size"
                className="form-fullWidth"
                name="Function Min Size"
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <th>
              Max Scale <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="number"
                placeholder="Function Max Size"
                className="form-fullWidth"
                name="Function MAx Size"
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <th>
              Env Name <span className="requried">*</span>
            </th>
            <td>
              <FormControl className="form_fullWidth">
                <select name="EnvName">
                  <option value={""}>Select Env Name</option>
                  {envName.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </FormControl>
            </td>
          </tr>
          <tr>
            <th rowSpan={2}>Package</th>
            <td>
              <FormControl className="form_fullWidth">
                <select name="PackageName">
                  <option value={""}>Select Package Name</option>
                  {envName.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </FormControl>
            </td>
          </tr>
          <tr>
            <td>
              <FormControl className="form_fullWidth">
                <select name="Entrypoint">
                  <option value={""}>Select Entrypoint</option>
                  {envName.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
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
          <ButtonNext onClick={postFunction}>생성</ButtonNext>
        </div>
      </div>
    </CDialogNew>
  );
});

export default CreateFunction;
