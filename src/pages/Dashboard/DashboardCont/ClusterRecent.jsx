import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import dashboardStore from "../../../store/Dashboard";
import CCreateButton from "@/components/buttons";
import styled from "styled-components";
import { Button } from "@mui/material";

const ButtonStyle = styled(Button)`
  position: relative;
  width: 100%;
`;

const ClusterRecent = observer(() => {
  const {
    clusterCpuTop5,
    podCpuTop5,
    clusterMemTop5,
    podMemTop5,
    loadClusterRecent,
  } = dashboardStore;
  
  useEffect(() => {
    loadClusterRecent();
  }, []);

  const [toggle, setToggle] = useState(false);

  const clickToggle = () => {
    setToggle(isOpen => !isOpen);
  }
  
  const clusterCpuTop = clusterCpuTop5.map(
    (cluster, index) => 
    <li><span>{index + 1}</span>{cluster.cluster}</li>
  );

  const podCpuTop = podCpuTop5.map(
    (pod, index) => 
    <li><span>{index + 1}</span>{pod.name}</li>
  );

  const clusterMemTop = clusterMemTop5.map(
    (cluster, index) =>
    <li><span>{index + 1}</span>{cluster.cluster}</li>
  );

  const podMemTop = podMemTop5.map(
    (pod, index) => 
    <li><span>{index + 1}</span>{pod.name}</li>
  );


  return (
    <>
    {toggle ? (
      <div className="ClusterRecentWrap">
        <ButtonStyle variant="contained" onClick={clickToggle} toggle={toggle}>CPU Top 5</ButtonStyle>
          <div className="ClusterRecentTitle">Cluster CPU Top 5 / 최신</div>
            <div className="ClusterRecentListWrap">
              <ul>{clusterCpuTop ? clusterCpuTop : "-"}</ul>
          {/* <li><span>1</span>kube-node-lease</li>
          <li><span>2</span>kube-system</li>
          <li><span>3</span>default</li>
          <li><span>4</span>kubesphere-system</li>
          <li><span>5</span>kubesphere-monitoring-federated</li>
        </ul> */}
            </div>
          <div className="ClusterRecentTitle">Pod CPU Top 5 / 최신</div>
            <div className="ClusterRecentListWrap">
              <ul>{podCpuTop ? podCpuTop : "-"}</ul>
            </div>
          </div>
    ) : (
      <div className="ClusterRecentWrap">
        <ButtonStyle variant="contained" onClick={clickToggle} toggle={toggle}>Memory Top 5</ButtonStyle>
          <div className="ClusterRecentTitle">Cluster Memory Top 5 / 최신</div>
            <div className="ClusterRecentListWrap">
              <ul>{clusterMemTop? clusterMemTop : "-"}</ul>
            </div>
          <div className="ClusterRecentTitle">Pod Memory Top 5 / 최신</div>
            <div className="ClusterRecentListWrap">
              <ul>{podMemTop ? podMemTop : "-"}</ul>
            </div>
      </div>
    )
    };
    </>
  );
});

export default ClusterRecent;
  
