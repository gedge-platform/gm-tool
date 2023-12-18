import { FormControl, Table } from "@material-ui/core";
import projectStore from "../../../../../store/Project";
import gsLinkStore from "../../../../../store/GsLink";
import clusterStore from "../../../../../store/Cluster";
import { useEffect } from "react";

const CreateGsLinkStepTwo = () => {
  const { gsLinkInfo, setGsLinkInfo } = gsLinkStore;
  const { loadProjectList, projectLists } = projectStore;
  const { loadCluster, clusterDetail } = clusterStore;

  useEffect(
    () => {
      const fetchData = async () => {
        await loadProjectList();

        const selectedProject = projectLists?.find(
          (data) => data.workspace.workspaceName === gsLinkInfo.workspace_name
        );

        const clusterNameData = await Promise.all(
          (selectedProject?.selectCluster || []).map(async (cluster) => {
            const clusterData = await loadCluster(cluster.clusterName);
            return clusterData;
          })
        );

        console.log(clusterNameData);
        console.log("selectedProject ???", selectedProject.selectCluster);
        console.log("clusterDetail ???", clusterDetail);
        console.log("clusterNameData ???", clusterNameData);
      };

      fetchData();
    },
    [
      // loadProjectList,
      // projectLists,
      // gsLinkInfo.workspace_name,
      // loadCluster,
      // clusterDetail,
    ]
  );

  //   useEffect(() => {
  //     loadProjectList();
  //   }, []);

  //   const selectedProject = projectLists?.find(
  //     (data) => data.workspace.workspaceName === gsLinkInfo.workspace_name
  //   );

  //   const clusterNameData = await Promise.all(
  //     (selectedProject?.selectCluster || []).map(async (cluster) => {
  //       const clusterData = await loadCluster(cluster.clusterName);
  //       return clusterData;
  //     })
  //   );

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "sourceCluster") {
      console.log("?");
    }
  };

  return (
    <>
      <div className="step-container">
        <div className="signup-step">
          <div className="step">
            <span>기본 정보</span>
          </div>
          <div className="arr"></div>
          <div className="step current">
            <span>고급 설정</span>
          </div>
        </div>
      </div>

      <table className="tb_data_new tb_write">
        <tbody>
          <tr>
            <th rowSpan={2}>
              Source Cluster <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <FormControl className="form_fullWidth">
                <select
                  name="sourceCluster"
                  onChange={onChange}
                  value={gsLinkInfo.parameters.source_cluster}
                >
                  <option value={""} disabled hidden>
                    Select Source Cluster
                  </option>
                  {/* {selectedProject?.selectCluster?.map((data) => (
                    <option value={data.clusterName}>{data.clusterName}</option>
                  ))} */}
                </select>
              </FormControl>
            </td>
          </tr>

          <tr>
            <td colSpan="3">
              <Table className="tb_data_new">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center", width: "7%" }}></th>
                    <th style={{ textAlign: "center" }}>Name</th>
                    <th style={{ textAlign: "center" }}>Type</th>
                    <th style={{ textAlign: "center" }}>node</th>
                  </tr>
                </thead>
                <tbody className="tb_data_nodeInfo" style={{ height: "105px" }}>
                  {/* {selectedProject?.selectCluster?.map((cluster) => (
                    <tr>
                      <td style={{ textAlign: "center", width: "7%" }}>
                        <input
                          type="radio"
                          // checked={deployment.pvcName === pvc.name}
                          name="sourceCluster2"
                          onChange={onChange}
                          // value={JSON.stringify(pvc)}
                        />
                      </td>
                      <td>{cluster.clusterName}</td>
                      <td>{cluster.clusterType}</td>
                    </tr>
                  ))} */}
                </tbody>
              </Table>
            </td>
          </tr>

          <tr>
            <th style={{ width: "144px" }}>Pod</th>
            <td colSpan="3">
              <Table className="tb_data_new">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center", width: "7%" }}></th>
                    <th style={{ textAlign: "center" }}>Name</th>
                    <th style={{ textAlign: "center" }}>Status</th>
                  </tr>
                </thead>
                <tbody className="tb_data_nodeInfo" style={{ height: "105px" }}>
                  {/* {pvClaimListInDeployment?.map((pvc) => (
                          <tr>
                            <td style={{ textAlign: "center", width: "7%" }}>
                              <input
                                type="radio"
                                checked={deployment.pvcName === pvc.name}
                                name="claimVolume"
                                onChange={handleDeployment}
                                value={JSON.stringify(pvc)}
                              />
                            </td>
                            <td>{pvc.name}</td>
                            <td>{pvc.namespace}</td>
                            <td>{pvc.clusterName}</td>
                            <td>{pvc.volume ? pvc.volume : ""}</td>
                          </tr>
                        ))} */}
                </tbody>
              </Table>
            </td>
          </tr>

          <tr>
            <th style={{ width: "144px" }}>Service</th>
            <td colSpan="3">
              <Table className="tb_data_new">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center", width: "7%" }}></th>
                    <th style={{ textAlign: "center" }}>Name</th>
                    <th style={{ textAlign: "center" }}>Type</th>
                  </tr>
                </thead>
                <tbody className="tb_data_nodeInfo" style={{ height: "105px" }}>
                  {/* {pvClaimListInDeployment?.map((pvc) => (
                          <tr>
                            <td style={{ textAlign: "center", width: "7%" }}>
                              <input
                                type="radio"
                                checked={deployment.pvcName === pvc.name}
                                name="claimVolume"
                                onChange={handleDeployment}
                                value={JSON.stringify(pvc)}
                              />
                            </td>
                            <td>{pvc.name}</td>
                            <td>{pvc.namespace}</td>
                            <td>{pvc.clusterName}</td>
                            <td>{pvc.volume ? pvc.volume : ""}</td>
                          </tr>
                        ))} */}
                </tbody>
              </Table>
            </td>
          </tr>

          <tr>
            <th>
              Cluster <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <FormControl className="form_fullWidth">
                <select
                  //   disabled={!deployment.workspace}
                  name="cluster"
                  onChange={onChange}
                  //   value={deployment.project}
                >
                  <option value={""} selected hidden disabled>
                    Select Cluster
                  </option>
                  {/* {projectListinWorkspace ? (
                          projectListinWorkspace?.map((project) => (
                            <option value={project.projectName}>
                              {project.projectName}
                            </option>
                          ))
                        ) : (
                          <option value={""}>No Data</option>
                        )} */}
                </select>
              </FormControl>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default CreateGsLinkStepTwo;
