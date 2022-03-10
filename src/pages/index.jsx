import React from "react";

export { default as TotalDashboard } from "./Dashboard/TotalDashboard";
export { default as Dashboard } from "./Dashboard/Dashboard";
// Gedege
export { default as Cluster } from "./Gedge/Cluster/Cluster";
export { default as WorkSpace } from "./Gedge/WorkSpace/WorkSpace";
export { default as User } from "./Management/User";
const Title = {
  Dashboard: "Dashboard",
  // Gedege
  Infra: "인프라 관리",
  Management: "조직 관리",
};

const SubTitle = {
  Dashboard: {
    Dashboard: "통합 대시보드",
  },
  // Gedge
  Cluster: "클러스터 관리",
  WorkSpace: "워크스페이스 관리",
  Management: {
    user: "사용자 목록",
    role: "사용자 역할 목록",
  },
};
export { Title, SubTitle };
