import { observer } from "mobx-react";
import { CDialogNew } from "@/components/dialogs";
import { CTextField } from "@/components/textfields";
import Tabs from "@material-ui/core/Tabs";
import { CSubTab, CTab } from "@/components/tabs";
import FormControl from "@material-ui/core/FormControl";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { CSubTabs } from "../../../../../../components/tabs/CSubTabs";
import podStore from "../../../../../../store/Pod";

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
  height: 30px;
  color: black;
  border-radius: 4px;
`;

const PodAddContainer = observer(props => {
  const { 
    podInfo,
    initContainer,
    addContainer,
    editContainer,
    removeContainer,
  } = podStore;
  const { open, containerIndex } = props;
  const [ tabvalue, setTabvalue ] = useState(0);
  const [ containerInfo, setContainerInfo ] = useState();
  const [ ports, setPorts ] = useState([]);
  const [ variables, setVariables ] = useState([]);

  const handleTabChange = (_, value) => {
    setTabvalue(value);
  }

  const handleClose = () => {
    props.onClose && props.onClose();
  }

  const onChange = (e) => {
    console.log(containerInfo)
    setContainerInfo({
      ...containerInfo,
      [e.target.name]: e.target.value
    })
  }

  const onChangePort = (e, index) => {
    const temp = {...containerInfo.ports[index], [e.target.name]: e.target.value}
    containerInfo.ports[index] = temp;
    setContainerInfo({
      ...containerInfo,
    })
  }

  const addPort = () => {
    setPorts([
      ...ports,
      {serviceType: "", name: "", privateContainerPort: "", protocol: ""}
    ])
    
    containerInfo.ports.push({serviceType: "", name: "", privateContainerPort: "", protocol: ""});
    setContainerInfo({
      ...containerInfo
    })
    console.log(containerInfo)
  }

  const addHost = (index) => {
    ports[index].publicHostPort = "";
    setPorts([
      ...ports
    ]);
    containerInfo.ports[index].publicHostPort = "";
    containerInfo.ports[index].hostIP = "";
    setContainerInfo({
      ...containerInfo
    })
  }
  
  const removePort = (removeIndex) => {
    // setPorts(ports.filter((_, index) => 
    //   removeIndex !== index
    // ))
    containerInfo.ports = containerInfo.ports.filter((_, index) => removeIndex !== index)
    setContainerInfo({
      ...containerInfo,
    });
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

  const addContainers = () => {
    const temp = {...containerInfo};
    props.onClose && props.onClose();
    addContainer(temp);
  }

  const editContainers = () => {
    const temp = {...containerInfo};
    props.onClose && props.onClose();
    editContainer(containerIndex, temp);
  }

  useEffect(() => {
    if (containerIndex === -1) {
      setContainerInfo({
        containerName: "",
        containerImage: "",
        pullPolicy: "",
        ports: [],
        command: "",
        arguments: "",
        workingDir: "",
        variables: [],
        cpuReservation: "",
        memoryReservation: "",
        cpuLimit: "",
        memoryLimit: "",
        NVIDIAGPU: "",
        volume: ""
      })
    } else {
      setContainerInfo(podInfo.containers[containerIndex]);
    }
  }, [open])


  const HostComponent = (index) => {
    if (containerInfo.ports[index].serviceType === "NodePort" || containerInfo.ports[index].serviceType === "LoadBalancer") {
      return(
        <td><CTextField type="text" placeholder="Listening Port" className="form_fullWidth" name="listeningPort" onChange={() => onChangePort(event, index)} value={containerInfo.ports[index].listeningPort}/></td>
      )
    } else if (containerInfo.ports[index].publicHostPort !== undefined) {
      return (
        <td style={{display: "flex"}}>
          <CTextField style={{paddingRight: "3px"}} type="text" placeholder="Public Host Port" className="form_fullWidth" name="publicHostPort" onChange={() => onChangePort(event, index)} value={containerInfo.ports[index].publicHostPort}/>
          <CTextField type="text" placeholder="Host IP" className="form_fullWidth" name="hostIP" onChange={() => onChangePort(event, index)} value={containerInfo.ports[index].hostIP}/>
        </td>
      )
    } else {
      return <td><ButtonAddHost onClick={() => addHost(index)}>Add Host</ButtonAddHost></td>
    }
  }

  const ValueComponent = (index) => {
    switch (variables[index].type) {
      case "KeyValuePair":
        return(
          <td>
            <CTextField type="text" placeholder="Value" className="form_fullWidth" name="value" onChange={() => onChangeVariable(event, index)} value={variables[index].value}/>
          </td>
        )
      case "Resource":
        return(
          <td style={{ display: "flex", padding:"1px" }}>
            <CTextField type="text" placeholder="Container Name" className="form_fullWidth" name="value" onChange={() => onChangeVariable(event, index)} value={variables[index].value}/>
            <FormControl className="form_fullWidth" style={{ height: "inherit", padding: "0px 0px 0px 2px" }}>
              <select name="type" value={variables[index].type} onChange={() => onChangeVariable(event, index)}>
                <option value={""}>Key 선택</option>
              </select>
            </FormControl>
          </td>
        )
      case "ConfigMapKey":
        return(
          <td style={{ display: "flex", padding: "1px" }}>
            <FormControl className="form_fullWidth" style={{ height: "inherit", padding: "0px 0px 0px 0px" }}>
              <select name="type" value={variables[index].type} onChange={() => onChangeVariable(event, index)}>
                <option value={""}>ConfigMap 선택</option>
              </select>
            </FormControl>
            <FormControl className="form_fullWidth" style={{ height: "inherit", padding: "0px 0px 0px 2px" }}>
              <select name="type" value={variables[index].type} onChange={() => onChangeVariable(event, index)}>
                <option value={""}>Key 선택</option>
              </select>
            </FormControl>
          </td>
        )
      case "SecretKey":
        return(
          <td style={{ display: "flex", padding: "1px" }}>
            <FormControl className="form_fullWidth" style={{ height: "inherit", padding: "0px 0px 0px 2px" }}>
              <select name="type" value={variables[index].type} onChange={() => onChangeVariable(event, index)}>
                <option value={""}>Secret 선택</option>
              </select>
            </FormControl>
            <FormControl className="form_fullWidth" style={{ height: "inherit", padding: "0px 0px 0px 2px" }}>
              <select name="type" value={variables[index].type} onChange={() => onChangeVariable(event, index)}>
                <option value={""}>Key 선택</option>
              </select>
            </FormControl>
          </td>
        )
      case "PodField":
        return(
          <td>
            <CTextField tpe="text" placeholder="Key (e.g. metadata.labels['<KEY>'])" className="form_fullWidth" name="value" onChange={() => onChangeVariable(event, index)} value={variables[index].value}/>
          </td>
        )
      case "Secret":
        return(
          <td>
            <FormControl className="form_fullWidth" style={{ height: "inherit", padding: "0px 0px 0px 2px" }}>
              <select name="type" value={variables[index].type} onChange={() => onChangeVariable(event, index)}>
                <option value={""}>Secret 선택</option>
              </select>
            </FormControl>
          </td>
        )
      case "ConfigMap":
        return(
          <td>
            <FormControl className="form_fullWidth" style={{ height: "inherit", padding: "0px 0px 0px 2px" }}>
              <select name="type" value={variables[index].type} onChange={() => onChangeVariable(event, index)}>
                <option value={""}>Key 선택</option>
              </select>
            </FormControl>
          </td>
        )
      default:
        return(<td></td>)
    }
  }
  

  const AddContainerComponent = () => {
    if (tabvalue === 0) {
      return(
        <>
          <table className="tb_data_new tb_write" >
            <tbody>
              <tr>
                <th>
                  Container Name <span className="requried">*</span>
                </th>
                <td colSpan="3">
                  <CTextField type="text" placeholder="Container Name" className="form_fullWidth" name="containerName" onChange={onChange} value={containerInfo?.containerName}/>
                </td>
              </tr>
              <tr>
                <th>
                  Container Image <span className="requried">*</span>
                </th>
                <td colSpan="3">
                  <CTextField type="text" placeholder="Container Image" className="form_fullWidth" name="containerImage" onChange={onChange} value={containerInfo?.containerImage}/>
                </td>
              </tr>
              <tr>
                <th>
                  Pull Policy <span className="requried">*</span>
                </th>
                <td colSpan="3">
                  <FormControl className="form_fullWidth">
                    <select name="pullpolicy" onChange={onChange}>
                      <option value={"selectpullpolicy"}>Select Pull Policy</option>
                    </select>
                  </FormControl>
                </td>
              </tr>
              <tr>
                <th rowSpan={"2"}>
                  Ports <span className="requried">*</span>
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
                      {containerInfo?.ports?.map((port, index) => (
                        <tr style={{ lineHeight: "35px" }}>
                          <td>
                            <FormControl className="form_fullWidth" style={{padding: "1px"}}>
                              <select name="serviceType" value={port.serviceType} onChange={() => onChangePort(event, index)}>
                                <option value={""}>Do not create a service</option>
                                <option value={"ClusterIP"}>Cluster IP</option>
                                <option value={"NodePort"}>Node Port</option>
                                <option value={"LoadBalancer"}>Load Balancer</option>
                              </select>
                            </FormControl>
                          </td>
                          <td><CTextField type="text" placeholder="Name" className="form_fullWidth" name="name" onChange={() => onChangePort(event, index)} value={port.name}/></td>
                          <td><CTextField type="text" placeholder="Private Container Port" className="form_fullWidth" name="privateContainerPort" onChange={() => onChangePort(event, index)} value={port.privateContainerPort}/></td>
                          <td>
                            <FormControl className="form_fullWidth" style={{padding: "1px"}}>
                              <select name="protocol" value={port.protocol} onChange={() => onChangePort(event, index)}>
                                <option value={"TCP"}>TCP</option>
                                <option value={"UDP"}>UDP</option>
                              </select>
                            </FormControl>
                          </td>
                          {HostComponent(index)}
                          <td>
                            <Button style={{
                              border: "none",
                              height: "28px",
                              width: "30px",
                              fontSize: "20px",
                              fontWeight: 600,
                              letterSpacing: "normal",
                              color: "#36435c",
                              backgroundColor: "#eff4f9",
                              padding: "0 0",
                              margin: "2px",
                              borderRadius: "0"
                            }} onClick={() => removePort(index)}>-</Button>
                          </td>
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
                  <CTextField type="text" placeholder="Command" className="form_fullWidth" name="command" onChange={onChange} value={containerInfo?.command}/>
                </td>
              </tr>
              <tr>
                <th>
                  Arguments <span className="requried">*</span>
                </th>
                <td colSpan="3">
                  <CTextField type="text" placeholder="Arguments" className="form_fullWidth" name="arguments" onChange={onChange} value={containerInfo?.arguments}/>
                </td>
              </tr>
              <tr>
                <th>
                  WorkingDir <span className="requried">*</span>
                </th>
                <td colSpan="3">
                  <CTextField type="text" placeholder="WorkingDir" className="form_fullWidth" name="workingDir" onChange={onChange} value={containerInfo?.workingDir}/>
                </td>
              </tr>
              <tr>
                <th rowSpan={2}>
                  Variables <span className="requried">*</span>
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
                          <td>
                            <FormControl className="form_fullWidth">
                              <select name="type" value={variables[index].type} onChange={() => onChangeVariable(event, index)}>
                                <option value={"KeyValuePair"}>Key/Value Pair</option>
                                <option value={"Resource"}>Resource</option>
                                <option value={"ConfigMapKey"}>ConfigMap Key</option>
                                <option value={"SecretKey"}>Secret Key</option>
                                <option value={"PodField"}>Pod Field</option>
                                <option value={"Secret"}>Secret</option>
                                <option value={"ConfigMap"}>ConfigMap</option>
                              </select>
                            </FormControl>
                          </td>
                          <td><CTextField type="text" placeholder="Variable Name" className="form_fullWidth" name="variableName" onChange={() => onChangeVariable(event, index)} value={variables[index].variableName}/></td>
                          {ValueComponent(index)}
                          <td>
                            <Button style={{
                              border: "none",
                              height: "28px",
                              width: "30px",
                              fontSize: "20px",
                              fontWeight: 600,
                              letterSpacing: "normal",
                              color: "#36435c",
                              backgroundColor: "#eff4f9",
                              padding: "0 0",
                              margin: "2px",
                              borderRadius: "0"
                            }} onClick={() => removeVariable(index)}>-</Button>
                          </td>
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
            {containerIndex === -1? 
            (<ButtonNext onClick={addContainers}>추가</ButtonNext>)
            :(<ButtonNext onClick={editContainers}>변경</ButtonNext>)
            }
          </div>
        </>
      )
    } else if (tabvalue === 1) {
      return(
        <>
          <table className="tb_data_new tb_write">
            <tbody>
              <tr>
                <th>
                  CPU Reservation
                </th>
                <td >
                  <CTextField type="text" placeholder="CPU Reservation" className="form_fullWidth" name="cpuReservation" onChange={onChange} value={containerInfo?.cpuReservation}/>
                </td>
              </tr>
              <tr>
                <th>
                  Memory Reservation
                </th>
                <td>
                  <CTextField type="text" placeholder="Memory Reservation" className="form_fullWidth" name="memoryReservation" onChange={onChange} value={containerInfo?.memoryReservation}/>
                </td>
              </tr>
              <tr>
                <th>
                  CPU Limit
                </th>
                <td>
                  <CTextField type="text" placeholder="CPU Limit" className="form_fullWidth" name="cpuLimit" onChange={onChange} value={containerInfo?.cpuLimit}/>
                </td>
              </tr>
              <tr>
                <th>
                  Memory Limit
                </th>
                <td>
                  <CTextField type="text" placeholder="Memory Limit" className="form_fullWidth" name="memoryLimit" onChange={onChange} value={containerInfo?.memoryLimit}/>
                </td>
              </tr>
              <tr>
                <th>
                  NVIDIA GPU Limit/Reservation
                </th>
                <td>
                  <CTextField type="text" placeholder="NVIDIA GPU Limit/Reservation" className="form_fullWidth" name="NVIDIAGPU" onChange={onChange} value={containerInfo?.NVIDIAGPU}/>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              width: "300px",
              justifyContent: "center",
              marginTop: "229px",
            }}
          >
            <Button onClick={handleClose}>취소</Button>
            {containerIndex === -1? 
            (<ButtonNext onClick={addContainers}>추가</ButtonNext>)
            :(<ButtonNext onClick={editContainers}>변경</ButtonNext>)
            }
          </div>
        </>
      )
    } else {
      return(
        <>
          <table className="tb_data_new tb_write">
            <tbody>
              <tr>
                <th>
                  Volume
                </th>
                <td>
                  <FormControl className="form_fullWidth">
                    <select name="type" value={containerInfo.volume} onChange={() => onChangeVariable(event, index)}>
                      <option value={"selectVolume"}>Select Volume</option>
                    </select>
                  </FormControl>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              width: "300px",
              justifyContent: "center",
              marginTop: "377px",
            }}
          >
            <Button onClick={handleClose}>취소</Button>
            {containerIndex === -1? 
            (<ButtonNext onClick={addContainers}>추가</ButtonNext>)
            :(<ButtonNext onClick={editContainers}>변경</ButtonNext>)
            }
          </div>
        </>
      )
    }

  }

  return(
    <CDialogNew id="myDialog" open={open} maxWidth="md" title={"Add Container"} onClose={handleClose} bottomArea={false} modules={["custom"]}>
      <CSubTabs value={tabvalue} onChange={handleTabChange}>
        <CSubTab label="General"></CSubTab>
        <CSubTab label="Resource"></CSubTab>
        <CSubTab label="Storage"></CSubTab>
      </CSubTabs>
      {AddContainerComponent()}
    </CDialogNew>
  )
})

export default PodAddContainer;