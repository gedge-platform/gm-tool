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
  const triggerType = ["HTTP", "KafkaQueue"];
  const [value, setValue] = useState("");

  const handleClose = () => {
    props.onClose && props.onClose();
  };

  const postTrigger = () => {
    swalError("Trigger가 생성되었습니다.");
    props.reloadFunc && props.reloadFunc();
    props.onClose && props.onClose();
  };

  const onChangeTrigger = (event) => {
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
              Trigger Type <span className="requried">*</span>
            </th>
            <td>
              <FormControl className="form_fullWidth">
                <select name="Posttype" onChange={onChangeTrigger}>
                  <option value={""}>Select Post type</option>
                  {triggerType.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </FormControl>
            </td>
          </tr>
          <tr>
            <th>
              Trigger Name <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Trigger Name"
                className="form-fullWidth"
                name="triggerName"
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <th>
              Function <span className="requried">*</span>
            </th>
            <td>
              <FormControl className="form_fullWidth">
                <select name="Posttype">
                  <option value={""}>Select Post type</option>
                  {triggerType.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </FormControl>
            </td>
          </tr>
          {value === "HTTP" ? (
            <>
              <tr>
                <th>
                  Method <span className="requried">*</span>
                </th>
                <td>
                  <CTextField
                    type="text"
                    placeholder="Method"
                    className="form-fullWidth"
                    name="method"
                    style={{ width: "100%" }}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  Url <span className="requried">*</span>
                </th>
                <td>
                  <CTextField
                    type="text"
                    placeholder="Url"
                    className="form-fullWidth"
                    name="url"
                    style={{ width: "100%" }}
                  />
                </td>
              </tr>
            </>
          ) : null}
          {value === "KafkaQueue" ? (
            <>
              <tr>
                <th>
                  KafkaQueue Type <span className="requried">*</span>
                </th>
                <td>
                  <CTextField
                    type="text"
                    placeholder="KafkaQueue Type"
                    className="form-fullWidth"
                    name="kafkaQueueType"
                    style={{ width: "100%" }}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  KafkaQueue Kind <span className="requried">*</span>
                </th>
                <td>
                  <CTextField
                    type="text"
                    placeholder="KafkaQueue Kind"
                    className="form-fullWidth"
                    name="kafkaQueueKind"
                    style={{ width: "100%" }}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  Topic <span className="requried">*</span>
                </th>
                <td>
                  <CTextField
                    type="text"
                    placeholder="Topic"
                    className="form-fullWidth"
                    name="topic"
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
                  Max Retries <span className="requried">*</span>
                </th>
                <td>
                  <CTextField
                    type="text"
                    placeholder="Max Retries"
                    className="form-fullWidth"
                    name="maxRetries"
                    style={{ width: "100%" }}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  Cooldown Period <span className="requried">*</span>
                </th>
                <td>
                  <CTextField
                    type="text"
                    placeholder="Cooldown Period"
                    className="form-fullWidth"
                    name="kafkaQueueType"
                    style={{ width: "100%" }}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  Polling Interval <span className="requried">*</span>
                </th>
                <td>
                  <CTextField
                    type="text"
                    placeholder="Pooling Interval"
                    className="form-fullWidth"
                    name="poolingInterval"
                    style={{ width: "100%" }}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  Metadata <span className="requried">*</span>
                </th>
                <td>
                  <CTextField
                    type="text"
                    placeholder="Metadata"
                    className="form-fullWidth"
                    name="metadata"
                    style={{ width: "100%" }}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  Secret <span className="requried">*</span>
                </th>
                <td>
                  <CTextField
                    type="text"
                    placeholder="Secret"
                    className="form-fullWidth"
                    name="secret"
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
