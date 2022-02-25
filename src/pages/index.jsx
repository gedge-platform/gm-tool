import React from "react";

export { default as TotalDashboard } from "./Dashboard/TotalDashboard";
export { default as Dashboard } from "./Dashboard/Dashboard";
// Gedege
export { default as Cluster } from "./Gedge/Cluster/Cluster";

const Title = {
    Dashboard: "Dashboard",
    // Gedege
    Infra: "인프라 관리",
};

const SubTitle = {
    Dashboard: {
        Dashboard: "통합 대시보드",
    },
    // Gedge
    Cluster: "클러스터 관리",
};
export { Title, SubTitle };
