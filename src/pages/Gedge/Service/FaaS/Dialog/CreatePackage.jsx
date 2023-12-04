import { observer } from "mobx-react";
import FormControl from "@material-ui/core/FormControl";
import { CTextField } from "@/components/textfields";
import { CDialogNew } from "@/components/dialogs";

import { swalError } from "../../../../../utils/swal-utils";
import styled from "styled-components";
import { useState } from "react";
import { CFileField } from "../../../../../components/textfields/CFilefield";
import FaasStore from "../../../../../store/Faas";

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
  const Type = ["source", "deploy", "code"];
  const envList = ["env2"];
  const [postType, setPostType] = useState("");
  const [selectFile, setSelectFile] = useState("");
  const {
    createPackage,
    packageCode,
    setPackageCode,
    packageSource,
    setPackageSource,
  } = FaasStore;

  const handleClose = () => {
    props.onClose && props.onClose();
  };

  const postPackage = () => {
    if (postType === "code") {
      createPackage(packageCode);
    }
    if (postType === "source") {
      createPackage(packageSource);
    }
    swalError("Package가 생성되었습니다.");
    props.reloadFunc && props.reloadFunc();
    props.onClose && props.onClose();
  };

  const onSelectFile = (e) => {
    e.preventDefault();
    e.persist();
    const selectedFile = e.target.files;
    const fileList = [...selectedFile];

    console.log("selectFile: ", selectedFile[0].name);
    setSelectFile(selectedFile[0].name);
  };

  const onChangePackage = (event) => {
    setPostType(event.target.value);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (postType === "code") {
      setPackageCode({
        ...packageCode,
        [name]: value,
      });
    }
    if (postType === "source") {
      setPackageSource({
        ...packageSource,
        [name]: value,
      });
    }
    console.log("packageCode: ", packageCode);
    console.log("packageSource: ", packageSource);
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
              Post type <span className="requried">*</span>
            </th>
            <td colSpan={3}>
              <FormControl className="form_fullWidth">
                <select name="Posttype" onChange={onChangePackage}>
                  <option value={""}>Select Post type</option>
                  {Type.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </FormControl>
            </td>
          </tr>
          {postType === "source" ? (
            <>
              <tr>
                <th>
                  File List <span className="requried">*</span>
                </th>
                <td>
                  <CTextField
                    type="text"
                    className="form-fullWidth"
                    name="selectFile"
                    value={selectFile}
                    readOnly
                    style={{ width: "100%" }}
                  />
                </td>
                <th>
                  File Upload <span className="requried">*</span>
                </th>
                <td>
                  <input type="file" onChange={onSelectFile} />
                </td>
              </tr>
              <tr>
                <th>
                  Package Name <span className="requried">*</span>
                </th>
                <td colSpan={3}>
                  <div style={{ display: "flex" }}>
                    <CTextField
                      type="text"
                      placeholder="Package Name"
                      className="form-fullWidth"
                      name="pack_name"
                      onChange={onChange}
                      style={{ width: "100%", marginRight: "10px" }}
                    />
                    <button style={{ width: "200px" }}>Unique Check</button>
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  Environment <span className="requried">*</span>
                </th>
                <td colSpan={3}>
                  <FormControl className="form_fullWidth">
                    <select name="env_name" onChange={onChange}>
                      <option value={""}>Select Environment</option>
                      {envList.map((item) => (
                        <option value={item}>{item}</option>
                      ))}
                    </select>
                  </FormControl>
                </td>
              </tr>
              <tr>
                <th>
                  Build <span className="requried">*</span>
                </th>
                <td colSpan={3}>
                  <CTextField
                    type="text"
                    placeholder="Build"
                    className="form-fullWidth"
                    name="build"
                    onChange={onChange}
                    style={{ width: "100%", marginRight: "10px" }}
                  />
                </td>
              </tr>
            </>
          ) : null}
          {postType === "deploy" ? (
            <>
              <tr>
                <th>
                  File List <span className="requried">*</span>
                </th>
                <td>
                  <CTextField
                    type="text"
                    className="form-fullWidth"
                    name="selectFile"
                    value={selectFile}
                    readOnly
                    style={{ width: "100%" }}
                  />
                </td>
                <th>
                  File Upload <span className="requried">*</span>
                </th>
                <td>
                  <input type="file" onChange={onSelectFile} />
                </td>
              </tr>
              <tr>
                <th>
                  Package Name <span className="requried">*</span>
                </th>
                <td colSpan={3}>
                  <div style={{ display: "flex" }}>
                    <CTextField
                      type="text"
                      placeholder="Package Name"
                      className="form-fullWidth"
                      name="packageName"
                      style={{ width: "100%", marginRight: "10px" }}
                    />
                    <button style={{ width: "200px" }}>Unique Check</button>
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  Environment <span className="requried">*</span>
                </th>
                <td colSpan={3}>
                  <FormControl className="form_fullWidth">
                    <select name="Posttype">
                      <option value={""}>Select Environment</option>
                      {Type.map((item) => (
                        <option value={item}>{item}</option>
                      ))}
                    </select>
                  </FormControl>
                </td>
              </tr>
            </>
          ) : null}
          {postType === "code" ? (
            <>
              <tr>
                <th>
                  Package Name <span className="requried">*</span>
                </th>
                <td colSpan={3}>
                  <div style={{ display: "flex" }}>
                    <CTextField
                      type="text"
                      placeholder="Package Name"
                      className="form-fullWidth"
                      name="pack_name"
                      onChange={onChange}
                      style={{ width: "100%", marginRight: "10px" }}
                    />
                    <button style={{ width: "200px" }}>Unique Check</button>
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  Environment <span className="requried">*</span>
                </th>
                <td colSpan={3}>
                  <FormControl className="form_fullWidth">
                    <select name="env_name" onChange={onChange}>
                      <option value={""}>Select Environment</option>
                      {envList.map((item) => (
                        <option value={item}>{item}</option>
                      ))}
                    </select>
                  </FormControl>
                </td>
              </tr>
              <tr>
                <th>
                  Code <span className="requried">*</span>
                </th>
                <td colSpan={3}>
                  <CTextField
                    type="text"
                    placeholder="Code"
                    className="form-fullWidth"
                    name="code"
                    onChange={onChange}
                    style={{ width: "100%" }}
                  />
                </td>
              </tr>
            </>
          ) : null}
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
