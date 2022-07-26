import React from "react";

const ClusterSummary = () => {
  return (
    <div className="ClusterSummaryWrap">
      <div className="ClusterSummary Cluster">
        <div className="ClusterCountTitle">전체 클러스터 개수</div>
        <div className="ClusterCount">10</div>
      </div>

      <div className="ClusterSummary Core">
        <div className="ClusterCountTitle">코어 클라우드 개수</div>
        <div className="ClusterCount">4</div>
      </div>

      <div className="ClusterSummary Edge">
        <div className="ClusterCountTitle">엣지 클라우드 개수</div>
        <div className="ClusterCount">4</div>
      </div>

      <div className="ClusterSummary Workspace">
        <div className="ClusterCountTitle">전체 워크스페이스 개수</div>
        <div className="ClusterCount">8</div>
      </div>

      <div className="ClusterSummary Project">
        <div className="ClusterCountTitle">전체 프로젝트 개수</div>
        <div className="ClusterCount">9</div>
      </div>
    </div>
  );
};
export default ClusterSummary;
