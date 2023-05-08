import { observer } from "mobx-react";
import { CDialogNew } from "@/components/dialogs";
import { CTextField } from "@/components/textfields";
import FormControl from "@material-ui/core/FormControl";
import styled from "styled-components";
import { useState } from "react";

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

const ButtonAddHost = styled.button`
  background-color: #fff;
  border: 1px solid black;
  color: black;
  border-radius: 4px;
`;

const PodAddContainer = observer(props => {
  const { open } = props;
  const [ ports, setPorts ] = useState([]);
  const [ variables, setVariables ] = useState([]);


  const handleClose = () => {
    props.onClose && props.onClose();
    setPorts([]);
    setVariables([]);
  }

  const onChange = (e) => {

  }

  const onChangePort = (e, index) => {
    const temp = {...ports[index], [e.target.name]: e.target.value}
    ports[index] = temp;
    setPorts([
      ...ports
    ])
  }

  const addPort = () => {
    setPorts([
      ...ports,
      {serviceType: "", name: "", privateContainerPort: "", protocol: ""}
    ])
  }
  
  const removePort = (removeIndex) => {
    setPorts(ports.filter((_, index) => 
      removeIndex !== index
    ))
  }

  const onChangeVariable = (e, index) => {
    const temp = {...variables[index], [e.target.name]: e.target.value}
    variables[index] = temp;
    setVariables([
      ...variables
    ])
  }

  const addVariable = () => {
    setVariables([
      ...variables,
      {type: "KeyValuePair", variableName: "", value: ""}
    ])
  }

  const removeVariable = (removeIndex) => {
    setVariables(variables.filter((_, index) => 
      removeIndex !== index
    ))
  }

  const addContainer = () => {
    console.log(ports);
    console.log(variables);
  }

  const AddContainerComponent = () => {
    return(
      <>
        <table className="tb_data_new tb_write">
          <tbody>
            <tr>
              <th>
                Container Name <span className="requried">*</span>
              </th>
              <td colSpan="3">
                <CTextField type="text" placeholder="Container Name" className="form_fullWidth" name="podName" onChange={onChange}/>
              </td>
            </tr>
            <tr>
              <th>
                Container Image <span className="requried">*</span>
              </th>
              <td colSpan="3">
                <CTextField type="text" placeholder="Container Image" className="form_fullWidth" name="podName" onChange={onChange}/>
              </td>
            </tr>
            <tr>
              <th>
                Pull Policy <span className="requried">*</span>
              </th>
              <td colSpan="3">
                <FormControl className="form_fullWidth">
                  <select name="pullpolicy" onChange={onChange}>
                    <option value={""}>Select Pull Policy</option>
                  </select>
                </FormControl>
              </td>
            </tr>
            <tr>
              <th rowSpan={"2"}>
                Port <span className="requried">*</span>
              </th>
              <td>
                <table className="tb_data_new">
                  <tbody className="tb_data_nodeInfo">
                    <tr>
                      <th>Service Type</th>
                      <th>Name</th>
                      <th>Private Container Port</th>
                      <th>Protocol</th>
                      <th>Host</th>
                    </tr>
                    {ports.map((port, index) => (
                      <tr style={{ lineHeight: "35px" }}>
                        <FormControl className="form_fullWidth" style={{padding: "1px"}}>
                          <select name="serviceType" onChange={() => onChangePort(event, index)}>
                            <option value={""}>Do not create a service</option>
                            <option value={"ClusterIP"}>Cluster IP</option>
                            <option value={"NodePort"}>Node Port</option>
                            <option value={"LoadBalancer"}>Load Balancer</option>
                          </select>
                        </FormControl>
                        <td><CTextField type="text" placeholder="Name" className="form_fullWidth" name="name" onChange={() => onChangePort(event, index)} value={ports[index].name}/></td>
                        <td><CTextField type="text" placeholder="Private Container Port" className="form_fullWidth" name="privateContainerPort" onChange={() => onChangePort(event, index)} value={ports[index].privateContainerPort}/></td>
                        <FormControl className="form_fullWidth" style={{padding: "1px"}}>
                          <select name="protocol" onChange={() => onChangePort(event, index)}>
                            <option value={"TCP"}>TCP</option>
                            <option value={"UDP"}>UDP</option>
                          </select>
                        </FormControl>
                        <td><ButtonAddHost>Add Host</ButtonAddHost></td>
                        <Button style={{
                          border: "none",
                          height: "28px",
                          width: "30px",
                          fontSize: "20px",
                          fontWeight: 600,
                          letterSpacing: "normal",
                          color: "#36435c",
                          backgroundColor: "#eff4f9",
                          padding: "0 0 0 0",
                          margin: "2px",
                          borderRadius: "0"
                        }} onClick={() => removePort(index)}>-</Button>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <Button onClick={addPort}>Add Port</Button>
              </td>
            </tr>
            <tr>
              <th>
                Command <span className="requried">*</span>
              </th>
              <td colSpan="3">
                <CTextField type="text" placeholder="Command" className="form_fullWidth" name="podName" onChange={onChange}/>
              </td>
            </tr>
            <tr>
              <th>
                Arguments <span className="requried">*</span>
              </th>
              <td colSpan="3">
                <CTextField type="text" placeholder="Arguments" className="form_fullWidth" name="podName" onChange={onChange}/>
              </td>
            </tr>
            <tr>
              <th>
                WorkingDir <span className="requried">*</span>
              </th>
              <td colSpan="3">
                <CTextField type="text" placeholder="WorkingDir" className="form_fullWidth" name="podName" onChange={onChange}/>
              </td>
            </tr>
            <tr>
              <th rowSpan={2}>
                Add Variables <span className="requried">*</span>
              </th>
              <td>
                <table className="tb_data_new">
                  <tbody className="tb_data_nodeInfo">
                    <tr>
                      <th>Type</th>
                      <th>Variable Name</th>
                      <th>Value</th>
                    </tr>
                    {variables.map((variable, index) => (
                      <tr style={{ lineHeight: "35px" }}>
                        <FormControl className="form_fullWidth">
                          <select name="type" onChange={() => onChangeVariable(event, index)}>
                            <option value={"KeyValuePair"}>Key/Value Pair</option>
                            <option value={"Resource"}>Resource</option>
                            <option value={"ConfigMapKey"}>ConfigMap Key</option>
                            <option value={"SecretKey"}>Secret Key</option>
                          </select>
                        </FormControl>
                        <td><CTextField type="text" placeholder="Variable Name" className="form_fullWidth" name="variableName" onChange={() => onChangeVariable(event, index)} value={variables[index].variableName}/></td>
                        <td><CTextField type="text" placeholder="Value" className="form_fullWidth" name="value" onChange={() => onChangeVariable(event, index)} value={variables[index].value}/></td>
                        <Button style={{
                          border: "none",
                          height: "28px",
                          width: "30px",
                          fontSize: "20px",
                          fontWeight: 600,
                          letterSpacing: "normal",
                          color: "#36435c",
                          backgroundColor: "#eff4f9",
                          padding: "0px 0px",
                          margin: "4px 2px",
                          borderRadius: "0"
                        }} onClick={() => removeVariable(index)}>-</Button>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <Button onClick={addVariable}>Add Variables</Button>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            width: "300px",
            justifyContent: "center",
            marginTop: "32px",
          }}
        >
          <Button onClick={handleClose}>취소</Button>
          <ButtonNext onClick={addContainer}>추가</ButtonNext>
        </div>
      </>
    )
  }

  return(
    <CDialogNew id="myDialog" open={open} maxWidth="md" title={"Add Container"} onClose={handleClose} bottomArea={false} modules={["custom"]}>
      {AddContainerComponent()}
    </CDialogNew>
  )
})

export default PodAddContainer;