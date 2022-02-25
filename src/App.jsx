import React from "react";
import { Route, Switch } from "react-router-dom";
import { TotalDashboard, Cluster, Login } from "@/pages";
import AuthRoute from "./routes/AuthRoute";

// export const App = () => {
//     return (
//         <>
//             {/* <AuthRoute exact path="/" component={TotalDashboard} /> */}
//             {/* Login */}
//             <Switch>
//                 <Route exact path="/login" component={Login} />
//                 <Route exact path="/findId" component={FindID} />
//                 <Route exact path="/findPw" component={FindPW} />
//                 <Route exact path="/join" component={SignUp} />

//                 {/* BasicDashBoard */}
//                 <Route exact path="/basic" component={Dashboard} />
//                 {/* DashBoard */}
//                 <Route path="/" component={TotalDashboard} />
//                 {/* BlockChain */}
//                 <Route exact path="/networks" component={Networks} />
//                 <Route path="/network/create" component={NetworkCreate} />

//                 <Route exact path="/organization" component={Organizations} />
//                 <Route path="/organization/create" component={OrganizationCreate} />
//                 {/* nodes */}
//                 <Route exact path="/nodes" component={Nodes} />
//                 <Route exact path="/nodes/orderer/create" component={OrdererCreate} />
//                 <Route exact path="/nodes/ca/create" component={CaCreate} />
//                 <Route exact path="/nodes/ca/manage" component={CaUserManage} />
//                 <Route exact path="/nodes/ca/resource" component={CaResource} />
//                 <Route exact path="/nodes/conso/manage" component={ConsoManage} />
//                 <Route exact path="/nodes/orderer/resource" component={OrdererResource} />
//                 <Route exact path="/nodes/peer/create" component={PeerCreate} />
//                 <Route exact path="/nodes/peer/resource" component={PeerResource} />

//                 {/* channels */}
//                 <Route exact path="/channels" component={Channel} />
//                 <Route path="/channels/create" component={ChannelCreate} />
//                 <Route path="/channels/orgMgmt" component={ChannelsOrgMgmt} />
//                 <Route path="/channels/peerMgmt" component={ChannelsPeerMgmt} />
//                 <Route path="/channels/blockMgmt" component={ChannelsBlockMgmt} />
//                 <Route exact path="/chaincodes" component={Chaincodes} />
//                 <Route path="/chaincodes/create" component={ChaincodesCreate} />
//                 {/* Management */}
//                 <Route path="/cluster" component={Cluster} />
//                 <Route path="/user" component={User} />
//             </Switch>
//         </>
//     );
// };

{
    /* Gedge */
}
export const App = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={TotalDashboard} />
                {/* 인프라 관리 */}
                <Route path="/cluster" component={Cluster} />
                <Route path="/login" component={Login} />
            </Switch>
        </>
    );
};

export default App;
