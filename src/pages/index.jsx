import React from "react";

export { default as TotalDashboard } from "./Dashboard/TotalDashboard";
export { default as Dashboard } from "./Dashboard/Dashboard";
// Gedege
export { default as Cluster } from "./Gedge/Cluster/Cluster";
export { default as Project } from "./Gedge/Project/Project";

const Title = {
  Dashboard: "통합 대시보드",
  // Gedege
  Cluster: "클러스터 관리",
  Workspace: "워크스페이스 관리",
  Project: "프로젝트 관리",
  Component: "컴포넌트 관리",
  Volume: "볼륨 관리",
  Monitoring: "모니터링",
  User: "사용자 관리",
};

const SubTitle = {
  Dashboard: {
    Dashboard: "통합 대시보드",
  },
  // Gedge
  Cluster: "클러스터 관리",
};
export { Title, SubTitle };
