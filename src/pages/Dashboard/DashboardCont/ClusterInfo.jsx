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
      <div className="cluster_detailWrap">
        <div className="cluster_detail">
          <div className="cluster_detail_title">Name</div>
          <div className="cluster_detail_content">Innogrid</div>
          <div className="cluster_detail_title">Info / Location</div>
          <div className="cluster_detail_content">
            <div className="cluster_detail_content_txt">100, Eulji-ro, Jung-gum Seoul, Republic of Korea</div>
            <div className="cluster_detail_content_circleWrap">
              <div className="cluster_detail_content_circle">
                <span className="count">5</span>
                <div className="title">Master Node</div>
              </div>

              <div className="cluster_detail_content_circle">
                <span className="count">3</span>
                <div className="title">Worker Node</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="cluster_resourceWrap">
          <div className="cluster_resourece">
            <div className="cluster_resoureceTitle">
              <div className="resource_type">CPU</div>
              <div className="resource_percent">58<span>%</span></div>
            </div>
            <div className="cluster_resoureceGraph">
              그래프 들어갈 자리
            </div>
            <div className="cluster_resoureceInfo">
              <div className="resource_infotxt">
                <div className="usedWrap">
                  <span className="used">Used</span>
                  <span className="detail">2.41</span>
                  <span className="category">cores</span>
                </div>
                <div className="totalWrap">
                  <span className="total">Total</span>
                  <span className="detail">4</span>
                  <span className="category">cores</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cluster_resourece">
            <div className="cluster_resoureceTitle">
              <div className="resource_type">Memory</div>
              <div className="resource_percent">31<span>%</span></div>
            </div>
            <div className="cluster_resoureceGraph">
              그래프 들어갈 자리
            </div>
            <div className="cluster_resoureceInfo">
              <div className="resource_infotxt">
                <div className="usedWrap">
                  <span className="used">Used</span>
                  <span className="detail">4.91</span>
                  <span className="category">Gi</span>
                </div>
                <div className="totalWrap">
                  <span className="total">Total</span>
                  <span className="detail">15.63</span>
                  <span className="category">Gi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cluster_resourece">
            <div className="cluster_resoureceTitle">
              <div className="resource_type">Disk</div>
              <div className="resource_percent">63<span>%</span></div>
            </div>
            <div className="cluster_resoureceGraph">
              그래프 들어갈 자리
            </div>
            <div className="cluster_resoureceInfo">
              <div className="resource_infotxt">
                <div className="usedWrap">
                  <span className="used">Used</span>
                  <span className="detail">53.47</span>
                  <span className="category">GB</span>
                </div>
                <div className="totalWrap">
                  <span className="total">Total</span>
                  <span className="detail">84.48</span>
                  <span className="category">GB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    // 아래는 기존 소스
    // <div className="cluster_info">
    //   <FormControl className="form_dashboard">
    //     <Select
    //       value={clusterName}
    //       inputProps={{ "aria-label": "Without label" }}
    //       onChange={changeCluster}
    //     >
    //       {clusterNameList.map((cluster) => (
    //         <MenuItem value={cluster}>{cluster}</MenuItem>
    //       ))}
    //     </Select>
    //   </FormControl>
    //   <div className="cluster_detail">
    //     <div className="cluster_detail_title">클러스터 API 주소</div>
    //     <div className="cluster_detail_content">{clusterEndpoint}</div>
    //     <div className="cluster_detail_title">클러스터 타입</div>
    //     <div className="cluster_detail_content">
    //       {clusterType.toUpperCase()}
    //     </div>
    //     <div className="cluster_detail_title">클러스터 Creator</div>
    //     <div className="cluster_detail_content">{clusterCreator}</div>
    //     <div className="cluster_detail_title">클러스터 Resource</div>
    //     <div className="cluster_resources">
    //       <div className="cluster_resource">
    //         <span className="resource_kind">Deployment</span>
    //         <span className="resource_number">{deployment_count}</span>
    //       </div>
    //       <div className="cluster_resource">
    //         <span className="resource_kind">Pod</span>
    //         <span className="resource_number">{pod_count}</span>
    //       </div>
    //       <div className="cluster_resource">
    //         <span className="resource_kind">Service</span>
    //         <span className="resource_number">{service_count}</span>
    //       </div>
    //       <div className="cluster_resource">
    //         <span className="resource_kind">Cronjob</span>
    //         <span className="resource_number">{cronjob_count}</span>
    //       </div>
    //       <div className="cluster_resource">
    //         <span className="resource_kind">Job</span>
    //         <span className="resource_number">{job_count}</span>
    //       </div>
    //       <div className="cluster_resource">
    //         <span className="resource_kind">Volume</span>
    //         <span className="resource_number">{volume_count}</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
});

export default ClusterInfo;
