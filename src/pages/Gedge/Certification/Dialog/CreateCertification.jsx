import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { CDialogNew } from "../../../../components/dialogs";
import FormControl from "@material-ui/core/FormControl";
import { CTextField } from "@/components/textfields";
import styled from "styled-components";
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

const CreateCertification = observer((props) => {
  const { open } = props;
  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
    domainName: "",
    projectID: "",
    endPointAddress: "",
  });

  const { userName, password, domainName, projectID, endPointAddress } = inputs;

  const handleClose = () => {
    props.reloadFunc && props.reloadFunc();
    props.onClose && props.onClose();
    setInputs({
      userName: "",
      password: "",
      domainName: "",
      projectID: "",
      endPointAddress: "",
    });
  };

  const onChange = ({ target: { name, value } }) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const createCertification = async () => {
    const result = await postCretification(inputs);
    handleClose();
  };

  return (
    <CDialogNew
      id="myDialog"
      open={open}
      maxWidth="md"
      title={`Create Certification`}
      onClose={handleClose}
      bottomArea={false}
      modules={[`custom`]}
    >
      <table className="tb_data_new_tb_write">
        <tbody>
          <tr>
            <th>
              User Name
              <span className="required">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="User Name"
                className="form_fullWidth"
                name="userName"
                onChange={onChange}
                value={userName}
              />
            </td>
          </tr>
          <tr>
            <th>
              Password
              <span className="required">*</span>
            </th>
            <td>
              <CTextField
                type="password"
                placeholder="User Password"
                className="form_fullWidth"
                name="password"
                onChange={onChange}
                value={password}
              />
            </td>
          </tr>
          <tr>
            <th>
              Domain Name
              <span className="required">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Domain Name"
                className="form_fullWidth"
                name="domainName"
                onChange={onChange}
                value={domainName}
              />
            </td>
          </tr>
          <tr>
            <th>
              Project ID
              <span className="required">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Project ID"
                className="form_fullWidth"
                name="projectID"
                onChange={onChange}
                value={projectID}
              />
            </td>
          </tr>
          <tr>
            <th>
              Endpoint Address
              <span className="required">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Endpoint Address"
                className="form_fullWidth"
                name="endpointAddress"
                onChange={onChange}
                value={endPointAddress}
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
          <ButtonNext onClick={handleClose}>생성</ButtonNext>
        </div>
      </div>
    </CDialogNew>
  );
});
export default CreateCertification;
