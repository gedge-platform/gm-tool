import { observer } from "mobx-react";
import { CDialogNew } from "@/components/dialogs";
import { useState } from "react";
import CreateTamplateStepOne from "./CreateTamplateStepOne";
import styled from "styled-components";

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

const TamplateCreate = observer((props) => {
  const { open } = props;
  const [stepValue, setStepValue] = useState(1);

  const handleClose = () => {
    props.onClose && props.onClose();
  };

  const CreateTamplateComponent = () => {
    if (stepValue === 1) {
      return (
        <>
          <CreateTamplateStepOne />
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
              <Button>취소</Button>
              <ButtonNext>다음</ButtonNext>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <CDialogNew
      id="myDialog"
      open={open}
      maxWidth="md"
      title={"Create Template"}
      onClose={handleClose}
      bottomArea={false}
      modules={["custom"]}
    >
      {CreateTamplateComponent()}
    </CDialogNew>
  );
});

export default TamplateCreate;
