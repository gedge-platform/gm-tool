import { observer } from "mobx-react";
import { clusterStore, podStore } from "@/store";
import FormControl from "@material-ui/core/FormControl";
import { CTextField } from "@/components/textfields";
import styled from "styled-components";
import workspaceStore from "../../../../../../store/WorkSpace";
import PodTargetClusters from "./PodTargetClusters";
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

const CreatePodStepThree = observer((props) => {
  const {
    clusterListInWorkspace,
  } = clusterStore;
  const {
    selectClusterInfo
  } = workspaceStore;
  const {
    podInfo,
    setPodInfo,
    setPodInfoPriority,
    targetClusters,
    podListIncluster,
  } = podStore;

  const [ open, setOpen ] = useState(false);

  const openTargetCluster = () => {

  }

  const onChangeName = (e) => {
    setPodInfo("priority", { name: e.target.value });
    if (e.target.value === "GLowLatencyPriority") {
      setPodInfoPriority("options", { type: "fromNode" });
    } else if (e.target.value === "GMostRequestPriority") {
      setPodInfoPriority("options", { type: "CPU" });
    } else if (e.target.value === "GSelectedClusterPriority") {
      setPodInfoPriority("options", { type: "cluster"})
    } else if (e.target.value === "GSetClusterPriority") {
      setPodInfoPriority("options", { userName: "", workspaceName: "", projectName: "", cluster: ""});
    }
  }

  const onChangeOption = (e) => {
    setPodInfoPriority("options", { ...podInfo.priority.options, [e.target.name]: e.target.value});
  }

  const PriorityComponent = () => {
    switch (podInfo.priority.name) {
      case "GLowLatencyPriority":
        return (
          <>
            <FormControl
              className="form_fullWidth"
              style={{ paddingTop: "4px" }}
            >
              <select
                name="type"
                value={podInfo.priority.options.type}
                onChange={onChangeOption}
              >
                <option value={"fromNode"}>from node</option>
                <option value={"fromPod"}>from pod</option>
              </select>
            </FormControl>
            {podInfo.priority.options.type === "fromNode" ? (
              <div style={{ paddingTop: "4px" }}>
                <FormControl style={{ width: "50%" }}>
                  <select name="sourceCluster" onChange={onChangeOption}>
                    <option value={""}>Select Source Cluster</option>
                  </select>
                </FormControl>
                <FormControl style={{ width: "50%", paddingLeft: "4px" }}>
                  <select name="sourceNode" onChange={onChangeOption}>
                    <option value={""}>Select Source Node</option>
                  </select>
                </FormControl>
              </div>
            ) : (
              <table className="tb_data_new" style={{ marginTop: "4px" }}>
                <tbody className="tb_data_nodeInfo">
                  <tr>
                    <td colSpan="3">
                      <FormControl className="form_fullWidth">
                        <select
                          name="cluster"
                          onChange={onChangeOption}
                        >
                          <option value={""} selected hidden disabled>
                            Select Cluster
                          </option>
                          {clusterListInWorkspace.map((cluster) => (
                            <option value={cluster.clusterName}>
                              {cluster.clusterName}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      <FormControl className="form_fullWidth">
                        <select
                          name="pod"
                          onChange={onChangeOption}
                        >
                          <option value={""} selected hidden disabled>
                            Select Pod
                          </option>

                          {podListIncluster ? (
                            podListIncluster.map((pod) => (
                              <option value={pod.name}>{pod.name}</option>
                            ))
                          ) : (
                            <option value="">No Data</option>
                          )}
                        </select>
                      </FormControl>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </>
        );
      case "GMostRequestPriority":
        return (
          <FormControl style={{ paddingTop: "4px" }}>
            <select
              name="type"
              value={podInfo.priority.options.type}
              onChange={onChangeOption}
            >
              <option value={"cpu"}>CPU</option>
              <option value={"gpu"}>GPU</option>
              <option value={"memory"}>MEMORY</option>
            </select>
          </FormControl>
        );
      case "GSelectedClusterPriority":
        return (
          <>
            <FormControl
                className="form_fullWidth"
                style={{ paddingTop: "4px" }}
              >
                <select
                  name="type"
                  value={podInfo.priority.options.type}
                  onChange={onChangeOption}
                >
                  <option value={"cluster"}>Cluster</option>
                  <option value={"node"}>Node</option>
                </select>
              </FormControl>
              {podInfo.priority.options.type === "cluster" ? (
                <>
                  <FormControl
                    className="form_fullWidth"
                    style={{ paddingTop: "4px" }}
                  >
                    <select name="cluster" onChange={onChangeOption}>
                      <option value={""}>Select Cluster</option>
                      {selectClusterInfo?.map((cluster) => (
                        <option value={cluster.clusterName}>
                          {cluster.clusterName}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </>
              ) : (
                <div style={{ paddingTop: "4px" }}>
                  <FormControl style={{ width: "50%" }}>
                    <select name="sourceCluster" onChange={onChangeOption}>
                      <option value={""}>Select Cluster</option>
                    </select>
                  </FormControl>
                  <FormControl style={{ width: "50%", paddingLeft: "4px" }}>
                    <select name="sourceNode" onChange={onChangeOption}>
                      <option value={""}>Select Node</option>
                    </select>
                  </FormControl>
                </div>
              )}
          </>
        );
      case "GSetClusterPriority":
        return (
          <>
            <table className="tb_data_new" style={{ marginTop: "4px" }}>
              <tbody className="tb_data_nodeInfo">
                <tr>
                  <th>User Name</th>
                  <th>Workspace Name</th>
                  <th>Project Name</th>
                </tr>
                <tr>
                  <td>
                    <CTextField
                      type="text"
                      placeholder="User Name"
                      className="form_fullWidth"
                      name="userName"
                      onChange={onChangeOption}
                    />
                  </td>
                  <td>
                    <CTextField
                      type="text"
                      placeholder="Workspace Name"
                      className="form_fullWidth"
                      name="workspaceName"
                      onChange={onChangeOption}
                    />
                  </td>
                  <td>
                    <CTextField
                      type="text"
                      placeholder="Project Name"
                      className="form_fullWidth"
                      name="projectName"
                      onChange={onChangeOption}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <FormControl
              className="form_fullWidth"
              style={{ paddingTop: "2px" }}
            >
              <select name="cluster" onChange={onChangeOption}>
                <option value={""}>Select Cluster</option>
              </select>
            </FormControl>
          </>
        );
      default:
        break;
    }
  }

  return(
    <>
      <PodTargetClusters
        open={open}
        onClose={() => setOpen(false)}
      ></PodTargetClusters>

      <div className="step-container">
        <div className="signup-step">
          <div className="step">
            <span>기본 정보</span>
          </div>
          <div className="arr"></div>
          <div className="step">
            <span>고급 설정</span>
          </div>
          <div className="arr"></div>
          <div className="step current">
            <span>스케줄러</span>
          </div>
          <div className="arr"></div>
          <div className="step">
            <span>설정 검토</span>
          </div>
        </div>
      </div>

      <table className="tb_data_new tb_write">
        <tbody>
          <tr>
            <th style={{ width: "30%" }}>
              Priority <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <FormControl className="form_fullWidth">
                <select name="priority" value={podInfo.priority.name} onChange={onChangeName}>
                  <option value={"GLowLatencyPriority"}>GLowLatencyPriority</option>
                  <option value={"GMostRequestPriority"}>GMostRequestPriority</option>
                  <option value={"GSelectedClusterPriority"}>GSelectedClusterPriority</option>
                  <option value={"GSetClusterPriority"}>GSetClusterPriority</option>
                </select>
              </FormControl>
              {PriorityComponent()}
            </td>
          </tr>
          <tr>
            <th>Target Clusters</th>
            <td>
              <Button
                style={{ marginBottom: "2px" }}
                onClick={() => setOpen(true)}
              >
                {targetClusters.length === 0 ? "+ Target Clusters": JSON.stringify(targetClusters)}
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
})

export default CreatePodStepThree;