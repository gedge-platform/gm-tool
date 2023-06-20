import { observer } from "mobx-react";
import { CTextField } from "@/components/textfields";
import styled from "styled-components";
import { CDialogNew } from "@/components/dialogs";
import { swalError } from "../../../../../utils/swal-utils";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

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

const CreateTrigger = observer((props) => {
  const { open } = props;
  const trigType = ["HTTPTrigger", "MQTrigger"];
  const [value, setValue] = useState("");

  const handleClose = () => {
    props.onClose && props.onClose();
  };

  const postTrigger = () => {
    swalError("Trigger가 생성되었습니다.");
    props.reloadFunc && props.reloadFunc();
    props.onClose && props.onClose();
  };

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <CDialogNew
      id="myDialog"
      open={open}
      maxWidth="md"
      title={`Create Trigger`}
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
                placeholder="Trigger Name"
                className="form-fullWidth"
                name="Trigger Name"
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <th>
              Trigger Type <span className="requried">*</span>
            </th>
            <td>
              <FormControl className="form_fullWidth">
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={onChange}
                >
                  <FormControlLabel
                    value="HTTP Trigger"
                    control={<Radio />}
                    label="HTTP Trigger"
                  />
                  <FormControlLabel
                    value="MQ Trigger"
                    control={<Radio />}
                    label="MQ Trigger"
                  />
                </RadioGroup>
              </FormControl>
            </td>
          </tr>
          {value === "HTTP Trigger" ? (
            <tr>
              <th>
                Call URL <span className="requried">*</span>
              </th>
              <td>
                <CTextField
                  type="text"
                  placeholder="Call URL"
                  className="form-fullWidth"
                  name="Call URL"
                  style={{ width: "100%" }}
                />
              </td>
            </tr>
          ) : null}
          {value === "MQ Trigger" ? (
            <>
              <tr>
                <th>
                  Topic <span className="requried">*</span>
                </th>
                <td>
                  <CTextField
                    type="text"
                    placeholder="Topic"
                    className="form-fullWidth"
                    name="Topic"
                    style={{ width: "100%" }}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  Response Topic <span className="requried">*</span>
                </th>
                <td>
                  <CTextField
                    type="text"
                    placeholder="Response Topic"
                    className="form-fullWidth"
                    name="Response Topic"
                    style={{ width: "100%" }}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  Error Topic <span className="requried">*</span>
                </th>
                <td>
                  <CTextField
                    type="text"
                    placeholder="Error Topic"
                    className="form-fullWidth"
                    name="Error Topic"
                    style={{ width: "100%" }}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  Server URL <span className="requried">*</span>
                </th>
                <td>
                  <CTextField
                    type="text"
                    placeholder="Server URL"
                    className="form-fullWidth"
                    name="Server URL"
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
          <ButtonNext onClick={postTrigger}>생성</ButtonNext>
        </div>
      </div>
    </CDialogNew>
  );
});

export default CreateTrigger;
