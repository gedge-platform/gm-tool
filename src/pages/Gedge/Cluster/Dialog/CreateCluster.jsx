import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { CDialogNew } from "../../../../components/dialogs";
import FormControl from "@material-ui/core/FormControl";
import { CTextField } from "@/components/textfields";
import styled from "styled-components";
import clusterStore from "../../../../store/Cluster";
import { swalError } from "../../../../utils/swal-utils";
import { SERVER_URL } from "@/config.jsx";
import axios from "axios";

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

const CreateCluster = observer(props => {
  const { open } = props;
  const { loadClusterList, clusterList, createCluster } = clusterStore;

  const clusterType = props.type;
  const [clusterName, setClusterName] = useState("");
  const [clusterEndpoint, setClusterEndpoint] = useState("");
  const [clusterToken, setClusterToken] = useState("");

  const handleClose = () => {
    props.reloadFunc && props.reloadFunc();
    props.onClose && props.onClose();
  };

  const handleSubmit = () => {
    console.log("handleSubmit in");
    // createCluster(clusterType, clusterName, clusterEndpoint, clusterToken, handleClose);

    const body = {
      clusterType: this.clusterType,
      clusterName: this.clusterName,
      clusterEndpoint: this.clusterEndpoint,
      clusterToken: this.clusterToken,
    };
    console.log("body is : ", body);
    axios
      .post(`${SERVER_URL}/clusters`, body)
      .then(res => {
        if (res.status === 201) {
          swalError("클러스터를 추가하였습니다.");
        }
      })
      .catch(err => {
        swalError("엣지 클러스터 추가에 실패하였습니다.");
      });
  };

  const onChange = ({ target: { value } }) => {
    console.log(value);
  };

  useEffect(props => {
    console.log("props is ", props);
  }, []);

  return (
    <CDialogNew id="myDialog" open={open} maxWidth="md" title={`Create Cluster`} onClose={handleClose} bottomArea={false} modules={["custom"]}>
      <table className="tb_data_new tb_write">
        <tbody>
          <tr>
            <th>
              Type <span className="requried">*</span>
            </th>
            <td style={{ width: "50%" }}>
              <CTextField type="text" className="form_fullWidth" name="clusterName" value={props.type} disabled />
            </td>
          </tr>
          {props.type == "cloud" && (
            <>
              <tr>
                <th>
                  Cloud Type
                  <span className="requried">*</span>
                </th>
                <td>
                  <FormControl className="form_fullWidth">
                    <select name="cloudType" onChange={onChange}>
                      <option value="aws">AWS</option>
                      <option value="openstack">OpenStack</option>
                    </select>
                  </FormControl>
                </td>
              </tr>
            </>
          )}
          <tr>
            <th>
              Cluster Name
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField type="text" placeholder="Cluster Name" className="form_fullWidth" name="clusterName" onChange={onChange} value={""} />
            </td>
          </tr>
          <tr>
            <th>
              Cluster Endpoint
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Cluster Endpoint"
                className="form_fullWidth"
                name="clusterEnpoint"
                onChange={onChange}
                value={""}
              />
            </td>
          </tr>
          <tr>
            <th>
              Token
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField type="text" placeholder="Token" className="form_fullWidth" name="token" onChange={onChange} value={""} />
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
          <ButtonNext onClick={handleSubmit}>생성</ButtonNext>
        </div>
      </div>
    </CDialogNew>
  );
});
export default CreateCluster;
