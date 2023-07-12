import { observer } from "mobx-react";
import podStore from "../../../../../../store/Pod";
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

const CreatePodStepThree = observer((props) => {
  const {
    targetClusters
  } = podStore;




  const openTargetCluster = () => {

  }

  const PriorityComponent = () => {
    return(
      <div>

      </div>
    )
  }

  return(
    <>
      {/* <DeploymentTargetClusters
        open={open2}
        onClose={handleClose}
      ></DeploymentTargetClusters> */}

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
          {PriorityComponent()}
          {/* <tr>
            <th style={{ width: "30%" }}>
              Priority <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <FormControl className="form_fullWidth">
                <select name="priority" onChange={onChangePriority}>
                  <option value={"GLowLatencyPriority"}>
                    GLowLatencyPriority
                  </option>
                  <option value={"GMostRequestPriority"}>
                    GMostRequestPriority
                  </option>
                  <option value={"GSelectedClusterPriority"}>
                    GSelectedClusterPriority
                  </option>
                  <option value={"GSetClusterPriority"}>
                    GSetClusterPriority
                  </option>
                </select>
              </FormControl>
            </td>
          </tr> */}

          <tr>
            <th>Target Clusters</th>
            <td>
              <Button
                style={{ marginBottom: "2px" }}
                onClick={() => openTargetCluster(-1)}
              >
                {targetClusters.length === 0 ? "+ Target Clusters": JSON.stringify(targetClusters)}
              </Button>
              <div>
                {/* {deploymentInfo.containers.map((container, index) => (
                  <Button
                    style={{ marginTop: "2px", marginBottom: "2px" }}
                    onClick={() => openTargetCluster(index)}
                  >
                    {container.containerName}
                    <DeleteButton onClick={(e) => removeContainers(e, index)}>
                      x
                    </DeleteButton>
                  </Button>
                ))} */}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
})

export default CreatePodStepThree;