import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { podStore, projectStore, schedulerStore } from "@/store";
import FormControl from "@material-ui/core/FormControl";
import { CTextField } from "@/components/textfields";
import { CDialogNew } from "@/components/dialogs";
import { randomString } from "@/utils/common-utils";
import PodAddContainer from "./PodAddContainer";

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

const CreatePod = observer(props => {
  const { open } = props;
  const [ open2, setOpen2 ] = useState(false);
  const [stepValue, setStepValue] = useState(1);

  const { setProjectListinWorkspace } = projectStore;
  const { postWorkload, postScheduler } = schedulerStore;

  const { 
    podName, 
    containerName, 
    containerImage, 
    containerPort, 
    workspace, 
    project, 
    content, 
    clearAll, 
    setContent,
    labelList,
    initLabelList,
    addLabelList,
    deleteLabelList
  } = podStore;
  const [ input, setInput ] = useState({});

  const handleClose = () => {
    props.onClose && props.onClose();
    initLabelList();
  };

  const handleClose2 = () => {
    setOpen2(false);
  }

  const onChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  };

  const createPod = () => {
    console.log(input)
    // const requestId = `${podName}-${randomString()}`;

    // postWorkload(requestId, workspace, project, "Pod");
    // postScheduler(requestId, content, handleClose);
    // props.reloadFunc && props.reloadFunc();
  };

  const addLabel = () => {
    addLabelList(input.key, input.value);
    setInput({key: "", value: ""})
  }

  const openTargetCluster = () => {
    setOpen2(true);
  }

  const CreatePodComponent = () => {
    return (
      <>
        <PodAddContainer open={open2} onClose={handleClose2}></PodAddContainer>
        <table className="tb_data_new tb_write">
          <tbody>
            <tr>
              <th>
                Pod Name <span className="requried">*</span>
              </th>
              <td colSpan="3">
                <CTextField type="text" placeholder="Pod Name" className="form_fullWidth" name="podName" onChange={onChange} value={podName} />
              </td>
            </tr>
            <tr>
              <th rowSpan={labelList.length+2}>
                Labels <span className="requried">*</span>
              </th>
            </tr>
            {labelList.map((label)=>(
              <tr>
                <td style={{paddingLeft: "5px"}}>
                  {label.key}
                </td>
                <td style={{paddingLeft: "5px"}}>
                  {label.value}
                </td>
                <Button style={{
                  border: "none",
                  height: "28px",
                  width: "30px",
                  fontSize: "20px",
                  fontWeight: 600,
                  lineHeight: 1,
                  letterSpacing: "normal",
                  color: "#36435c",
                  backgroundColor: "#eff4f9",
                  padding: "0 0 0 0",
                  margin: "2px",
                  borderRadius: "0"
                }} onClick={() => deleteLabelList(label.key)}>-</Button>
              </tr>
            ))}
            <tr>
              <td>
                <CTextField
                  type="text"
                  placeholder="Key"
                  className="form_fullWidth"
                  name="key"
                  onChange={onChange}
                  value={input.key}
                />
              </td>
              <td>
                <CTextField
                  type="text"
                  placeholder="Value"
                  className="form_fullWidth"
                  name="value"
                  onChange={onChange}
                  value={input.value}
                />
              </td>
              <td>
                <Button style={{
                  border: "none",
                  height: "28px",
                  width: "30px",
                  fontSize: "20px",
                  fontWeight: 600,
                  lineHeight: 1,
                  letterSpacing: "normal",
                  color: "#36435c",
                  backgroundColor: "#eff4f9",
                  padding: "0 0 0 0",
                  borderRadius: "0"
                }} onClick={addLabel}>+</Button>
              </td>
            </tr>

            <tr>
              <th>
                Pull Secrets <span className="requried">*</span>
              </th>
              <td colSpan="3">
                <CTextField type="text" placeholder="Pull Secrets" className="form_fullWidth" name="pullSecrets" onChange={onChange} value={podName} />
              </td>
            </tr>
            <tr>
              <th>
                Volume
              </th>
              <td colSpan="3">
                <table className="tb_data_new">
                  <tbody className="tb_data_nodeInfo">
                    <tr>
                      <th>Name</th>
                      <th>NFS Server</th>
                      <th>NFS Path</th>
                    </tr>
                    <tr>
                      <td><CTextField type="text" placeholder="Volume Name" className="form_fullWidth" name="volumeName" onChange={onChange} value={podName} /></td>
                      <td><CTextField type="text" placeholder="NFS Server" className="form_fullWidth" name="NFSServer" onChange={onChange} value={podName} /></td>
                      <td><CTextField type="text" placeholder="NFS Path" className="form_fullWidth" name="NFSPath" onChange={onChange} value={podName} /></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <th style={{width: "30%"}}>
                Priority <span className="requried">*</span>
              </th>
              <td colSpan="3">
                <FormControl className="form_fullWidth">
                  <select name="priority" onChange={onChange}>
                    <option value={""}>Select Priority</option>
                  </select>
                </FormControl>
              </td>
            </tr>
            <tr>
              <th>
                Target Clusters <span className="requried">*</span>
              </th>
              <td colSpan="3">
                <FormControl className="form_fullWidth">
                  <select name="targetCluster" onChange={onChange}>
                    <option value={""}>Select Target Cluster</option>
                  </select>
                </FormControl>
              </td>
            </tr>
            <tr>
              <th>
                Source Cluster <span className="requried">*</span>
              </th>
              <td colSpan="3">
                <FormControl className="form_fullWidth">
                  <select name="sourceCluster" onChange={onChange}>
                    <option value={""}>Select Source Cluster</option>
                  </select>
                </FormControl>
              </td>
            </tr>
            <tr>
              <th>
                Source Node <span className="requried">*</span>
              </th>
              <td colSpan="3">
                <FormControl className="form_fullWidth">
                  <select name="sourceNode" onChange={onChange}>
                    <option value={""}>Select Source Node</option>
                  </select>
                </FormControl>
              </td>
            </tr>
            <tr>
              <th>
                Container <span className="requried">*</span>
              </th>
              <td>
                <Button onClick={openTargetCluster}>+ Add Container</Button>
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
            <ButtonNext onClick={createPod}>생성</ButtonNext>
          </div>
        </div>
      </>
    );
  }

  return (
    <CDialogNew id="myDialog" open={open} maxWidth="md" title={"Create Pod"} onClose={handleClose} bottomArea={false} modules={["custom"]}>
      {CreatePodComponent()}
    </CDialogNew>
  );
});
export default CreatePod;
