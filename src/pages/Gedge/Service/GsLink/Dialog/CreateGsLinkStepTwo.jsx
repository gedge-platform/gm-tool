import { FormControl } from "@material-ui/core";
import styled from "styled-components";
import projectStore from "../../../../../store/Project";
import gsLinkStore from "../../../../../store/GsLink";
import clusterStore from "../../../../../store/Cluster";
import { useEffect, useState } from "react";
import workspaceStore from "../../../../../store/WorkSpace";
import podStore from "../../../../../store/Pod";
import { observer } from "mobx-react";
import serviceStore from "../../../../../store/Service";

const Table = styled.table`
  tbody {
    display: block;
    height: 110px;
    overflow: auto;
  }
  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  thead {
    width: 100%;
  }
`;

const CreateGsLinkStepTwo = observer(() => {
  const { gsLinkInfo, setGsLinkInfo } = gsLinkStore;
  const { loadProjectList, projectLists } = projectStore;
  const { loadCluster, clusterDetail } = clusterStore;
  const { sourceClusterList } = workspaceStore;
  const { loadPodList, podList } = podStore;
  const [selectedPod, setSelectedPod] = useState([]);
  const [selectedService, setSelectedService] = useState([]);
  const { loadServiceList, serviceList } = serviceStore;

  useEffect(() => {
    loadPodList();
    loadServiceList();
  }, []);

  console.log("serviceList ???", serviceList);

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "sourceCluster") {
      console.log("podList ???", podList);
      console.log("value ???", value);
      const clusterListTemp = podList?.filter((data) => data.cluster === value);
      setSelectedPod(clusterListTemp);
      const serviceListTemp = serviceList?.filter(
        (data) => data.cluster === value
      );
      setSelectedService(serviceListTemp);
      console.log("serviceListTemp ???", serviceListTemp);
    }
    if (name === "pod") {
    }
    if (name === "service") {
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
            <th>
              Source Cluster <span className="requried">*</span>
            </th>
            <td colSpan="3">
              <Table className="tb_data_new">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center", width: "7%" }}></th>
                    <th style={{ textAlign: "center", width: "70%" }}>Name</th>
                    <th style={{ textAlign: "center" }}>Type</th>
                  </tr>
                </thead>
                <tbody className="tb_data_nodeInfo">
                  {sourceClusterList ? (
                    sourceClusterList?.map((cluster) => (
                      <tr>
                        <td style={{ textAlign: "center", width: "7%" }}>
                          <input
                            type="radio"
                            // checked={cluster.clusterName}
                            name="sourceCluster"
                            onChange={onChange}
                            value={cluster.clusterName}
                          />
                        </td>
                        <td style={{ width: "70%" }}>{cluster.clusterName}</td>
                        <td>{cluster.clusterType}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No Data</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </td>
          </tr>

          <tr style={{}}>
            <th style={{ width: "144px" }}>Pod</th>
            <td colSpan="3">
              <Table className="tb_data_new">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center", width: "7%" }}></th>
                    <th style={{ textAlign: "center", width: "70%" }}>Name</th>
                    <th style={{ textAlign: "center" }}>Status</th>
                  </tr>
                </thead>
                <tbody className="tb_data_nodeInfo">
                  {selectedPod.length > 0 ? (
                    selectedPod?.map((data, index) => (
                      <tr key={data.name}>
                        <td style={{ textAlign: "center", width: "7%" }}>
                          <input
                            type="radio"
                            // checked={deployment.pvcName === pvc.name}
                            name="pod"
                            onChange={onChange}
                            value={data.name}
                          />
                        </td>
                        <td style={{ width: "70%" }}>{data.name}</td>
                        <td>{data.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No Data</td>
                    </tr>
                  )}
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
                    <th style={{ textAlign: "center", width: "70%" }}>Name</th>
                    <th style={{ textAlign: "center" }}>Type</th>
                  </tr>
                </thead>
                <tbody className="tb_data_nodeInfo">
                  {selectedService.length > 0 ? (
                    selectedService?.map((data, index) => (
                      <tr key={data.name}>
                        <td style={{ textAlign: "center", width: "7%" }}>
                          <input
                            type="radio"
                            // checked={deployment.pvcName === pvc.name}
                            name="service"
                            onChange={onChange}
                            value={data.name}
                          />
                        </td>
                        <td style={{ width: "70%" }}>{data.name}</td>
                        <td>{data.type}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No Data</td>
                    </tr>
                  )}
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
});

export default CreateGsLinkStepTwo;
