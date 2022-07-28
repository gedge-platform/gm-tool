import React from "react";

const ClusterRecent = () => {
    return (
        <div className="ClusterRecentWrap">
            <div className="ClusterRecentTitle">Workspace Top 5 / 최신</div>
            <div className="ClusterRecentListWrap">
                <ul>
                    <li><span>1</span>kube-node-lease</li>
                    <li><span>2</span>kube-system</li>
                    <li><span>3</span>default</li>
                    <li><span>4</span>kubesphere-system</li>
                    <li><span>5</span>kubesphere-monitoring-federated</li>
                </ul>
            </div>
            <div className="ClusterRecentTitle">Project Top 5 / 최신</div>
            <div className="ClusterRecentListWrap">
                <ul>
                    <li><span>1</span>kube-node-lease</li>
                    <li><span>2</span>kube-system</li>
                    <li><span>3</span>default</li>
                    <li><span>4</span>kubesphere-system</li>
                    <li><span>5</span>kubesphere-monitoring-federated</li>
                </ul>
            </div>
        </div>
    );
};
export default ClusterRecent;
