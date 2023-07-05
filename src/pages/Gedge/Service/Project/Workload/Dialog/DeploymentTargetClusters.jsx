import { observer } from "mobx-react";
import { CDialogNew } from "@/components/dialogs";
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

const DeploymentTargetClusters = observer((props) => {
  const { open, onClose } = props;

  const applyTagetClusters = () => {

  }

  return(
    <CDialogNew
      id="myDialog"
      open={open}
      maxWidth="md"
      title={"Target Clusters"}
      onClose={onClose}
      bottomArea={false}
      modules={["custom"]}
    >
      <>
        <div>
          <div>Selected Cluster List</div>
          <div>칸</div>
          <div>Unselected Cluster List</div>
          <div>칸</div>
        </div>
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
          <Button onClick={onClose}>취소</Button>
          <ButtonNext onClick={applyTagetClusters}>
            설정
          </ButtonNext>
          </div>
        </div>
      </>
    </CDialogNew>
  )
})

export default DeploymentTargetClusters;