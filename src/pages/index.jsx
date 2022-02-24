import React from 'react';

export { default as TotalDashboard } from './Dashboard/TotalDashboard';
export { default as Dashboard } from './Dashboard/Dashboard';
export { default as List } from './Template/List';
export { default as TabList } from './Template/TabList';
export { default as OneFrame } from './Template/OneFrame';
export { default as Board } from './Board/Board';
export { default as Notify } from './User/Notify';
export { default as User } from './Management/User';
export { default as Cluster } from './Management/Cluster'
export { default as Networks } from './Blockchain/networks/Networks'
export { default as NetworkCreate } from './Blockchain/networks/NetworkCreate'
export { default as Organizations } from './Blockchain/organizations/Organization'
export { default as OrganizationCreate } from './Blockchain/organizations/OrganizationCreate'
export { default as Chaincodes } from "./Blockchain/Chaincodes/Chaincodes"
export { default as ChaincodesCreate } from "./Blockchain/Chaincodes/ChaincodesCreate"
export { default as Channel } from "./Blockchain/Channels/Channels"
export { default as ChannelCreate } from "./Blockchain/Channels/ChannelsCreate"
export { default as Nodes } from "./Blockchain/Nodes/Nodes"
export { default as ChannelsOrgMgmt } from "./Blockchain/Channels/ChannelsOrgMgmt"
export { default as ChannelsPeerMgmt } from "./Blockchain/Channels/ChannelsPeerMgmt"
export { default as OrdererCreate } from "./Blockchain/Nodes/OrdererCreate"
export { default as CaCreate } from "./Blockchain/Nodes/CaCreate"
export { default as CaUserManage } from "./Blockchain/Nodes/CaUserManage"
export { default as ConsoManage } from "./Blockchain/Nodes/ConsoManage"
export { default as OrdererResource } from "./Blockchain/Nodes/OrdererResource"
export { default as PeerCreate } from "./Blockchain/Nodes/PeerCreate"
export { default as PeerResource } from "./Blockchain/Nodes/PeerResource"
export { default as CaResource } from "./Blockchain/Nodes/CaResource"
export { default as ChannelsBlockMgmt } from "./Blockchain/Channels/ChannelsBlockMgmt"
export { default as Login } from "./Login/Login"
export { default as FindID } from './Login/FindID';
export { default as FindPW } from './Login/FindPW';
export { default as SignUp } from './Login/SignUp';
const Title = {
    Dashboard: 'Dashboard',
    Blockchain: 'Blockchain',
    Management: 'Management',
    TabList: 'API 관리',
};

const SubTitle = {
    Dashboard: {
        Dashboard: '통합 대시보드',
    },
    Blockchain: {
        Networks: 'Networks',
        Organization: 'Organization',
        Nodes: 'Nodes',
        Channels: 'Channels',
        Chaincodes: 'Chaincodes'
    },
    Management: {
        user: 'User',
        cluster: 'Cluster',
    }
}
export { Title, SubTitle }
