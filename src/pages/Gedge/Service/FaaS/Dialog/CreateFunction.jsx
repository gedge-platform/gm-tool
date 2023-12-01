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

  // const onChange = ({ target }) => {
  //   const { value, name } = target;
  //   setInputs({
  //     ...inputs,
  //     [name]: value,
  //   });
  // };

  // const checkName = async () => {
  //   if (id === "") {
  //     swalError("아이디를 입력해주세요!");
  //     return;
  //   }
  //   await axios
  //     .get(`${SERVER_URL}/check/${id}`)
  //     .then(({ data: { status } }) => {
  //       if (status === "true") {
  //         setIsID(true);
  //         swalError("사용가능한 이름입니다.");
  //       } else {
  //         setIsID(false);
  //         swalError("사용중인 이름입니다.");
  //         return;
  //       }
  //     })
  //     .catch(e => console.log(e));
  // };

  const onChangeFile = () => {
    console.log("file");
  };

  return (
    <CDialogNew
      id="myDialog"
      open={open}
      maxWidth="md"
      title={`Create Function`}
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
                name="functionName"
                // onChange={onChange}
                value={"functionName"}
                style={{ width: "100%" }}
              />
            </td>
            <td style={{ display: "flex" }}>
              <button
                type="button"
                style={{
                  width: "60%",
                  height: "30px",
                  backgroundColor: "#0a2348",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "4px",
                  fontSize: "13px",
                  border: "none",
                }}
                // onClick={checkName}
              >
                중복확인
              </button>
            </td>
          </tr>
          <tr>
            <th>
              Environment <span className="requried">*</span>
            </th>
            <td>
              <FormControl className="form_fullWidth">
                <select
                  name="environment"
                  value={"environment"}
                  // onChange={handlePriority}
                >
                  <option value={"fission/node-env"}>pack-env</option>
                </select>
              </FormControl>
            </td>
            <td></td>
          </tr>
          <tr>
            <th>
              Content <span className="requried">*</span>
            </th>
            <td>
              <FormControl className="form_fullWidth">
                <input type="file" name="file" onChange={onChangeFile} />
              </FormControl>
            </td>
            <td></td>
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
