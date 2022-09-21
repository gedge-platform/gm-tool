import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { CDialogNew } from "../../../../components/dialogs";
import clusterStore from "../../../../store/Cluster";
import styled from "styled-components";
import { swalError } from "../../../../utils/swal-utils";
import axios from "axios";
import { SERVER_URL } from "@/config";

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

const DeleteCluster = observer(props => {
  const { open, dName } = props;

  const handleClose = () => {
    props.reloadFunc && props.reloadFunc();
    props.onClose && props.onClose();
  };

  const handleSubmit = async () => {
    console.log("handleSubmit");

    await axios
      .delete(`${SERVER_URL}/clusters/${dName}`)
      .then(res => {
        console.log("res is ", res);
        if (res.status === 200) {
          swalError("클러스터를 삭제하였습니다.");
          handleClose();
        }
      })
      .catch(err => {
        swalError("올바른접근이 아닙니다. 다시 시도해주세요.");
        handleClose();
      });
  };

  // useEffect(props => {
  //   console.log("props is ", props);
  // }, []);

  return (
    <CDialogNew id="myDialog" open={open} title={`Delete Cluster`} onClose={handleClose} bottomArea={false} modules={["custom"]}>
      <h1 className="MuiTypography-root MuiTypography-h6">{dName}을 삭제하시겠습니까?</h1>
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
          <ButtonNext onClick={handleSubmit}>삭제</ButtonNext>
        </div>
      </div>
    </CDialogNew>
  );
});
export default DeleteCluster;
