import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { CDialogNew } from "@/components/dialogs";
import { FormControl } from "@material-ui/core";
import { CTextField } from "@/components/textfields";
import styled from "styled-components";
import { userStore } from "@/store";
import { swalError } from "@/utils/swal-utils";
import UserInfo from "../TabList/UserInfo";
import { CDialogUser } from "../../../../components/dialogs/CDialogUser";

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

const EditUser = observer((props) => {
  const { openEdit } = props;
  const [stepValue, setStepValue] = useState(1);
  const [check, setCheck] = useState(false);
  const { inputsEdit, setInputsEdit, userName, userList, updateUser } =
    userStore;
  // console.log("userList :", userList);

  const handleClose = () => {
    props.onClose && props.onClose();
    // setInputsEdit({
    //   memberId: "",
    //   memberName: "",
    //   password: "",
    //   email: "",
    //   contact: "",
    //   memberRole: "",
    //   enabled: "",
    // });
  };

  const onChange = ({ target: { name, value } }) => {
    setInputsEdit({
      ...inputsEdit,
      [name]: value,
    });
  };

  const checkID = async () => {
    if (inputsEdit.password === "") {
      swalError("비밀번호를 입력해주세요.");
      return;
    }
    if (inputsEdit.memberName === "") {
      swalError("이름을 입력해주세요.");
      return;
    }
    if (inputsEdit.contact === "") {
      swalError("연락처를 입력해주세요.");
      return;
    }
    if (inputsEdit.memberName === "") {
      swalError("이름을 입력해주세요.");
      return;
    }
    console.log(props);
    updateUser(inputsEdit.memberId, inputsEdit);
    handleClose();
    props.reloadFunc && props.reloadFunc();
  };

  const edit = async () => {
    if (!check) {
      swalError("중복확인이 필요합니다!");
      return;
    }
    props.reloadFunc && props.reloadFunc();
  };

  const stepOfComponent = () => {
    return (
      <>
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
                  value={inputsEdit.memberId}
                  readOnly={true}
                  disabled={true}
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
                  name="password"
                  onChange={onChange}
                  value={inputsEdit.password}
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
                  value={inputsEdit.memberName}
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
                  name="email"
                  onChange={onChange}
                  value={inputsEdit.email}
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
                  name="contact"
                  onChange={onChange}
                  value={inputsEdit.contact}
                />
              </td>
            </tr>
            <tr>
              <th>
                Member Enabled <span className="requried">*</span>
              </th>
              <td style={{ width: "50%" }}>
                <FormControl className="form_fullWidth">
                  <select name="memberEnabled" onChange={onChange}>
                    {/* {console.log("inputsEdit.enabled :", inputsEdit.enabled)} */}
                    {inputsEdit.enabled === true ? (
                      <>
                        <option value={"abled"}>승인</option>
                        <option value={"disabled"}>거절</option>
                      </>
                    ) : (
                      <>
                        <option value={"disabled"}>거절</option>
                        <option value={"enabled"}>승인</option>
                      </>
                    )}
                  </select>
                </FormControl>
              </td>
            </tr>
            <tr>
              <th>
                Member Role <span className="requried">*</span>
              </th>
              <td style={{ width: "50%" }}>
                <FormControl className="form_fullWidth">
                  <select name="memberRole" onChange={onChange}>
                    {inputsEdit.memberRole === "PA" ? (
                      <>
                        <option value={"PA"}>PA</option>
                        <option value={"SA"}>SA</option>
                      </>
                    ) : (
                      <>
                        <option value={"SA"}>SA</option>
                        <option value={"PA"}>PA</option>
                      </>
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
              width: "300px",
              justifyContent: "center",
            }}
          >
            <Button onClick={handleClose}>취소</Button>
            <ButtonNext onClick={checkID}>수정</ButtonNext>
          </div>
        </div>
      </>
    );
  };

  return (
    <CDialogUser
      id="myDialog"
      open={openEdit}
      maxWidth="md"
      title={`Eidt Member`}
      //   onClose={handleClose}
      bottomArea={false}
      modules={["custom"]}
    >
      {stepOfComponent()}
    </CDialogUser>
  );
});
export default EditUser;

// import React, { useEffect, useState } from "react";
// import { observer } from "mobx-react";
// import { CDialogNew } from "@/components/dialogs";
// import { FormControl } from "@material-ui/core";
// import { CTextField } from "@/components/textfields";
// import styled from "styled-components";
// import { userStore } from "@/store";
// import { swalError } from "@/utils/swal-utils";
// import UserInfo from "../TabList/UserInfo";
// import CreateWorkSpace from "../../WorkSpace/Dialog/CreateWorkSpace";
// import UserProject from "../TabList/UserProject,";
// import workspaceStore from "../../../../store/WorkSpace";
// import clusterStore from "../../../../store/Cluster";
// import { CDialogUser } from "../../../../components/dialogs/CDialogUser";

// const Button = styled.button`
//   background-color: #fff;
//   border: 1px solid black;
//   color: black;
//   padding: 10px 35px;
//   margin-right: 10px;
//   border-radius: 4px;
// `;

// const ButtonNext = styled.button`
//   background-color: #0f5ce9;
//   color: white;
//   border: none;
//   padding: 10px 35px;
//   border-radius: 4px;
// `;

// const EditUser = observer((props) => {
//   const { openEdit } = props;
//   const [stepValue, setStepValue] = useState(1);

//   const { postUser, inputs, setInputs } = userStore;
//   const {
//     check,
//     workspaceName,
//     workspaceDescription,
//     createWorkspace,
//     setWorkspaceName,
//     setWorkspaceDescription,
//   } = workspaceStore;
//   const { selectCluster, setSelectCluster } = clusterStore;

//   const handleClose = () => {
//     props.onClose && props.onClose();
//     setInputs({
//       memberId: "",
//       memberName: "",
//       password: "",
//       email: "",
//       contact: "",
//       memberDescription: "",
//       memberRole: "PA",
//     });
//     setWorkspaceName("");
//     setWorkspaceDescription("");
//     setSelectCluster([]);
//     setStepValue(1);
//   };

//   const onChange = ({ target: { name, value } }) => {
//     setInputs({
//       ...inputs,
//       [name]: value,
//     });
//   };

//   const onClickCreateUser = () => {
//     if ((inputs.memberId === "") | (inputs.memberId === undefined)) {
//       swalError("ID를 입력해주세요");
//       return;
//     }
//     if ((inputs.password === "") | (inputs.password === undefined)) {
//       swalError("Password를 입력해주세요");
//       return;
//     }
//     if ((inputs.memberName === "") | (inputs.memberName === undefined)) {
//       swalError("Name을 입력해주세요");
//       return;
//     }
//     if ((inputs.email === "") | (inputs.email === undefined)) {
//       swalError("Email을 입력해주세요");
//       return;
//     }
//     if ((inputs.contact === "") | (inputs.contact === undefined)) {
//       swalError("Contact를 입력해주세요");
//       return;
//     } else {
//       createUser(inputs);
//       setStepValue(2);
//     }
//   };

//   const createUser = async () => {
//     const result = await postUser(inputs);
//     // handleClose();
//     props.reloadFunc && props.reloadFunc();
//   };

//   const create = async () => {
//     if (!check) {
//       swalError("중복확인이 필요합니다!");
//       return;
//     }
//     if (selectCluster.length === 0) {
//       swalError("클러스터를 확인해주세요!");
//       return;
//     }
//     createWorkspace(
//       workspaceName,
//       workspaceDescription,
//       selectCluster,
//       handleClose
//     );

//     props.reloadFunc && props.reloadFunc();
//   };

//   useEffect(() => {}, []);

//   const stepOfComponent = () => {
//     if (stepValue === 1) {
//       return (
//         <>
//           <UserInfo />
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "flex-end",
//               marginTop: "32px",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 width: "300px",
//                 justifyContent: "center",
//               }}
//             >
//               <Button onClick={handleClose}>취소</Button>
//               <ButtonNext onClick={() => onClickCreateUser()}>다음</ButtonNext>
//             </div>
//           </div>
//         </>
//       );
//     } else if (stepValue === 2) {
//       return (
//         <>
//           <UserProject />
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "flex-end",
//               marginTop: "32px",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 width: "240px",
//                 justifyContent: "center",
//               }}
//             >
//               {/* <Button
//                 onClick={() => {
//                   // handlePreStepValue();
//                   setStepValue(1);
//                 }}
//               >
//                 이전
//               </Button> */}
//               <ButtonNext onClick={create}>생성</ButtonNext>
//             </div>
//           </div>
//         </>
//       );
//     }
//   };
//   return (
//     <CDialogUser
//       id="myDialog"
//       open={openEdit}
//       maxWidth="md"
//       title={`Edit Member`}
//       // onClose={handleClose}
//       bottomArea={false}
//       modules={["custom"]}
//     >
//       {stepOfComponent()}
//     </CDialogUser>
//   );
// });
// export default EditUser;
