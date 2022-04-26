import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { CDialogNew } from "../../../../components/dialogs";
import FormControl from "@material-ui/core/FormControl";
import { CTextField } from "@/components/textfields";
import styled from "styled-components";
import userStore from "../../../../store/UserStore";
import { swalError } from "../../../../utils/swal-utils";

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

const CreateUser = observer((props) => {
  const { open } = props;
  const [inputs, setInputs] = useState({
    memberId: "",
    memberName: "",
    memberPassword: "",
    memberEmail: "",
    memberContact: "",
    memberDescription: "",
    memberRole: "PA",
  });

  const {
    memberId,
    memberName,
    memberPassword,
    memberRole,
    memberEmail,
    memberContact,
    memberDescription,
  } = inputs;

  const { postUser } = userStore;

  const handleClose = () => {
    props.reloadFunc && props.reloadFunc();
    props.onClose && props.onClose();
    setInputs({
      memberId: "",
      memberName: "",
      memberPassword: "",
      memberEmail: "",
      memberContact: "",
      memberDescription: "",
      memberRole: "PA",
    });
  };

  const onChange = ({ target: { name, value } }) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const createUser = async () => {
    const result = await postUser(inputs);
    if (result) swalError("멤버가 생성되었습니다.", handleClose);
    else {
      swalError("멤버 생성에 실패하였습니다.");
      return;
    }
  };

  useEffect(() => {}, []);

  return (
    <CDialogNew
      id="myDialog"
      open={open}
      maxWidth="md"
      title={`Create Member`}
      onClose={handleClose}
      bottomArea={false}
      modules={["custom"]}
    >
      <table className="tb_data_new tb_write">
        <tbody>
          <tr>
            <th>
              Member Id
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Mermber Id"
                className="form_fullWidth"
                name="memberId"
                onChange={onChange}
                value={memberId}
              />
            </td>
          </tr>
          <tr>
            <th>
              Member Password
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="password"
                placeholder="Mermber Password"
                className="form_fullWidth"
                name="memberPassword"
                onChange={onChange}
                value={memberPassword}
              />
            </td>
          </tr>
          <tr>
            <th>
              Member Name
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Member Name"
                className="form_fullWidth"
                name="memberName"
                onChange={onChange}
                value={memberName}
              />
            </td>
          </tr>
          <tr>
            <th>
              Member Email
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Member Email"
                className="form_fullWidth"
                name="memberEmail"
                onChange={onChange}
                value={memberEmail}
              />
            </td>
          </tr>
          <tr>
            <th>
              Member Contact
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Member Contact"
                className="form_fullWidth"
                name="memberContact"
                onChange={onChange}
                value={memberContact}
              />
            </td>
          </tr>
          <tr>
            <th>Member Description</th>
            <td>
              <CTextField
                type="text"
                placeholder="Member Description"
                className="form_fullWidth"
                name="memberDescription"
                onChange={onChange}
                value={memberDescription}
              />
            </td>
          </tr>
          <tr>
            <th>
              Member Role <span className="requried">*</span>
            </th>
            <td style={{ width: "50%" }}>
              <FormControl className="form_fullWidth">
                <select name="memberRole" onChange={onChange}>
                  <option value={"PA"}>PA</option>
                  <option value={"SA"}>SA</option>
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
          <ButtonNext onClick={createUser}>생성</ButtonNext>
        </div>
      </div>
    </CDialogNew>
  );
});
export default CreateUser;
