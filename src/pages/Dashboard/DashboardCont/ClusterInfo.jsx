import React, { useEffect } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { observer } from "mobx-react";
import clusterStore from "../../../store/Cluster";

const ClusterInfo = observer(() => {
  const {
    clusterNameList,
    clusterDetail: {
      clusterCreator,
      clusterEndpoint,
      clusterName,
      clusterNum,
      clusterType,
      created_at,
      events,
      gpu,
      ipAddr,
      nodes,
      resource: {
        cronjob_count,
        deployment_count,
        job_count,
        pod_count,
        service_count,
        volume_count,
      },
    },
    loadClusterList,
    loadCluster,
  } = clusterStore;

  const changeCluster = ({ target: { value } }) => {
    loadCluster(value);
  };

  useEffect(() => {
    loadClusterList();
  }, []);
  return (
    <div className="cluster_info">
      <FormControl className="form_dashboard">
        <Select
          value={clusterName}
          inputProps={{ "aria-label": "Without label" }}
          onChange={changeCluster}
        >
          {clusterNameList.map((cluster) => (
            <MenuItem value={cluster}>{cluster}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="cluster_detail">
        <div className="cluster_detail_title">클러스터 API 주소</div>
        <div className="cluster_detail_content">{clusterEndpoint}</div>
        <div className="cluster_detail_title">클러스터 타입</div>
        <div className="cluster_detail_content">
          {clusterType.toUpperCase()}
        </div>
        <div className="cluster_detail_title">클러스터 Creator</div>
        <div className="cluster_detail_content">{clusterCreator}</div>
        <div className="cluster_detail_title">클러스터 Resource</div>
        <div className="cluster_resources">
          <div className="cluster_resource">
            <span className="resource_kind">Deployment</span>
            <span className="resource_number">{deployment_count}</span>
          </div>
          <div className="cluster_resource">
            <span className="resource_kind">Pod</span>
            <span className="resource_number">{pod_count}</span>
          </div>
          <div className="cluster_resource">
            <span className="resource_kind">Service</span>
            <span className="resource_number">{service_count}</span>
          </div>
          <div className="cluster_resource">
            <span className="resource_kind">Cronjob</span>
            <span className="resource_number">{cronjob_count}</span>
          </div>
          <div className="cluster_resource">
            <span className="resource_kind">Job</span>
            <span className="resource_number">{job_count}</span>
          </div>
          <div className="cluster_resource">
            <span className="resource_kind">Volume</span>
            <span className="resource_number">{volume_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ClusterInfo;
