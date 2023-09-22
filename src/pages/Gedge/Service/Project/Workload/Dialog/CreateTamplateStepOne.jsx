import styled from "styled-components";
import { observer } from "mobx-react";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

// const Button = styled.button`
//   background-color: #fff;
//   border: 1px solid black;
//   color: black;
//   padding: 10px 35px;
//   margin-right: 10px;
//   border-radius: 4px;
//   /* box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%); */
// `;

const DeleteButton = styled.button`
  margin: 0px 0px 0px 3px;
  overflow: hidden;
  position: relative;
  border: none;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  background: transparent;
  font: inherit;
  text-indent: 100%;
  cursor: pointer;

  &:hover {
    background: rgba(29, 161, 142, 0.1);
  }

  &:before,
  &:after {
    position: absolute;
    top: 15%;
    left: calc(50% - 0.0625em);
    width: 0.125em;
    height: 70%;
    border-radius: 0.125em;
    transform: rotate(45deg);
    background: currentcolor;
    content: "";
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

const Table = styled.table`
  tbody {
    display: block;
    height: 170px;
    overflow: auto;
  }
  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  thead {
    width: calc(100% - 1em);
  }
`;

const ImgButton = styled.button`
  background-image: url(/images/resource/nginx.png);
  border: black;
`;

const CreateTamplateStepOne = observer((props) => {
  const [logo, setLogo] = useState("");

  const onClickLogo = (e) => {
    setLogo(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <div className="step-container">
        <div className="signup-step">
          <div className="step current">
            <span>기본 정보</span>
          </div>
          <div className="arr"></div>
          <div className="step">
            <span>고급 설정</span>
          </div>
          <div className="arr"></div>
          <div className="step">
            <span>설정 검토</span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", margin: "5px 5px 5px 5px" }}>
        {/* <input
            type="image"
            src="images/resource/nginxLogo.png"
            value="nginx"
            width="150px"
            onClick={onClickLogo}
          />
          <input
            type="image"
            src="images/resource/mysqlLogo.png"
            value="mysql"
            width="150px"
            onClick={onClickLogo}
          /> */}
        <Button
          onClick={onClickLogo}
          value="nginx"
          variant="outlined"
          style={{ margin: "5px 5px 15px 5px" }}
          size="large"
        >
          {/* <img
              src="images/resource/nginx.png"
              alt="nginx"
              style={{ display: "block" }}
              width={50}
              height={50}
            /> */}
          NGINX
        </Button>
        <Button
          onClick={onClickLogo}
          value="mysql"
          variant="outlined"
          style={{ margin: "5px 5px 15px 5px" }}
          size="large"
        >
          {/* <img
              src="images/resource/mysql.png"
              alt="mysql"
              width={50}
              // style={{ display: "block" }}
            /> */}
          MySQL
        </Button>
      </div>
      <div style={{ width: "400px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Version</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="version"
            // onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
    </>
  );
});

export default CreateTamplateStepOne;
