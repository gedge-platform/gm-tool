import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { SERVER_URL_3, SERVER_URL_4 } from "@/config.jsx";
import { getItem } from "../utils/sessionStorageFn";
class NetworkStore {

    netList = [

    ];

    selectNetwork = {}

    netFrameworkList = [
        // helm chart tag info
        {
            value: '2.2.1',
            label: 'Hyperledger Fabric 2.2.1',
        },
        {
            value: '2.3.1',
            label: 'Hyperledger Fabric 2.3.1',
        },


    ];
    netDBList = [
        {
            value: 'SQLite',
            // label: 'SQLite',
        },
        {
            value: 'SQLite2',
            // label: 'SQLite2',
        },
        {
            value: 'SQLite3',
            // label: 'SQLite3',
        },
        {
            value: 'SQLite4',
            // label: 'SQLite4',
        },
    ];

    ordererList = [
        // { id: 1, name: 'Snow', setting: 'Jon', cpu: 35, memory: 35, storage: 100 },
        // { id: 2, name: 'Lannister', setting: 'Cersei', cpu: 42, memory: 35, storage: 100 },
        // { id: 3, name: 'Lannister', setting: 'Jaime', cpu: 45, memory: 35, storage: 100 },
        // { id: 4, name: 'Stark', setting: 'Arya', cpu: 16, memory: 35, storage: 100 },
        // { id: 5, name: 'Targaryen', setting: 'Daenerys', cpu: 10, memory: 35, storage: 100 },
        // { id: 6, name: 'Melisandre', setting: null, cpu: 150, memory: 35, storage: 100 },
        // { id: 7, name: 'Clifford', setting: 'Ferrara', cpu: 44, memory: 35, storage: 100 },
        // { id: 8, name: 'Frances', setting: 'Rossini', cpu: 36, memory: 35, storage: 100 },
        // { id: 9, name: 'Roxie', setting: 'Harvey', cpu: 65, memory: 35, storage: 100 },
    ]

    peerList = []
    channelList = []

    //basicinfo
    blockNetName = ""
    blockFrameWork = ""
    blockNetInfo = { blockNetName: "", blockFrameWork: this.netFrameworkList[0].value }
    // networkCreateState=false
    //orderer
    rootNetName = ""
    rootCaId = ""
    rootCAPass = ""
    rootCaDB = ""
    rootCaMSPName = ""
    selectChannel = []
    ordererSet = "true"
    ordererCnt = 0
    ordererName = ""
    ordererInfo = {
        rootCaName: "",
        rootCaId: "",
        rootCaPw: "",
        rootCaDB: this.netDBList[0].value,
        rootCaMSP: "",
        ordererName: "",
        raft: 1,
        cpu: 0.35,
        memory: 700,
        storage: 100
        // ordererList: this.ordererList
    }
    curSelOderer = []

    //peer
    orgName = ""
    orgCaName = ""
    orgCaManageId = ""
    orgCaMangePass = ""
    orgCaDB = ""
    orgMSPName = ""
    selectPeer = []
    peerSet = "true"
    peerList = []
    curSelPeer = []
    peerInfo = {
        orgName: "",
        orgCaName: "",
        orgCaId: "",
        orgCaPw: "",
        orgCaDB: this.netDBList[0].value,
        orgMSP: "",
        peerList: this.peerList
    }

    //channel
    selectChannel = []
    channelSet = "true"
    channelPeerList = []
    channelInfo = {
        channelName: "",
        DBinfo: {
            name: "",
            id: "",
            pw: "",
            port: 5984
        },
    }
    channelList = {
        // channelName: "",
        // DBinfo: {
        //     name: "",
        //     id: "",
        //     pw: "",
        //     port: 0
        // },
        // peerList: []
    }




    //check
    orderCheck = "true"
    peerCheck = "true"
    channelCheck = "true"


    constructor() {
        makeAutoObservable(this);
        // this.CallApi = new CallApi();
    }
    getNetworkList = async () => {
        await axios
            .get(`${SERVER_URL_3}/namespaces`, {
                auth: getItem("auth"),
            })
            .then(({ data: { data } }) =>
                runInAction(() => {
                    this.netList = data;
                    this.selectNetwork = data[0];
                })
            )
            .catch((e) => console.log(e));
    };

    deleteNetwork = async (param) => {
        await axios
            .delete(`${SERVER_URL_3}/networks/` + param, {

                // auth: getItem("auth"),
                auth: { username: "admin", password: "qwe1212!Q" },
            })
            .then((response) => (response && response.data))
            .catch((error) => {
                console.log(error)
                // var message = error.response.data
                // return message;
            });
    }
    setNetwork = async (body) => {
        await axios
            .post(`${SERVER_URL_3}/networks`, body, {

                // auth: getItem("auth"),
                auth: { username: "admin", password: "qwe1212!Q" },
            })
            .then((response) => (response && response.data))
            .catch((error) => {
                console.log(error)
                // var message = error.response.data
                // return message;
            });
    }
    setClickNetwork(list) {
        runInAction(() => {
            this.selectNetwork = list;
        })
    }

    deleteChannelList(id, list) {
        list = list.filter((data) => data.id != id)
        runInAction(() => {
            this.channelInfo = list
        });
    }
    setChannelInfo(channelName, name, id, pw, port) {
        runInAction(() => {
            this.channelInfo.channelId = channelName
            this.channelInfo.DBinfo.name = name
            this.channelInfo.DBinfo.id = id
            this.channelInfo.DBinfo.pw = pw
            this.channelInfo.DBinfo.port = port
        });
    }
    setPeerInfo(orgName, orgCaName, orgCaId, orgCaPw, orgCaDB, orgMSP, peerList) {
        runInAction(() => {
            this.peerInfo.orgName = orgName
            this.peerInfo.orgCaName = orgCaName
            this.peerInfo.orgCaId = orgCaId
            this.peerInfo.orgCaPw = orgCaPw
            this.peerInfo.orgCaDB = orgCaDB
            this.peerInfo.orgMSP = orgMSP
            this.peerInfo.peerList = peerList

        });
    }
    setOrdererInfo(rootCaName, rootCaId, rootCaPw, rootCaDB, rootCaMSP, ordererName, raft) {
        runInAction(() => {
            this.ordererInfo.rootCaName = rootCaName
            this.ordererInfo.rootCaId = rootCaId
            this.ordererInfo.rootCaPw = rootCaPw
            this.ordererInfo.rootCaDB = rootCaDB
            this.ordererInfo.rootCaMSP = rootCaMSP
            this.ordererInfo.ordererName = ordererName
            this.ordererInfo.raft = raft
            // this.ordererInfo.ordererList = ordererList
        });

    }
    setNetworkInfo(name, frameworkName) {
        runInAction(() => {
            this.blockNetInfo.blockNetName = name
            this.blockNetInfo.blockFrameWork = frameworkName
        });
    }
    init() {
        runInAction(() => {
            this.ordererList = []
            this.peerList = []
            this.channelList = []

            //basicinfobv
            this.blockNetName = ""
            this.blockFrameWork = ""
            this.blockNetInfo = { blockNetName: "", blockFrameWork: this.netFrameworkList[0].value }
            //orderer
            this.rootNetName = ""
            this.rootCaId = ""
            this.rootCAPass = ""
            this.rootCaDB = ""
            this.rootCaMSPName = ""
            this.selectChannel = []
            this.ordererSet = "true"
            this.ordererName = ""
            this.ordererList = []
            this.ordererInfo = {
                rootCaName: "",
                rootCaId: "",
                rootCaPw: "",
                rootCaDB: this.netDBList[0].value,
                rootCaMSP: "",
                ordererName: "",
                raft: 1
                // ordererList: this.ordererList
            }

            //peer
            this.orgName = ""
            this.orgCaName = ""
            this.orgCaManageId = ""
            this.orgCaMangePass = ""
            this.orgCaDB = ""
            this.orgMSPName = ""
            this.selectPeer = []
            this.peerSet = "true"
            this.curSelPeer = []
            this.peerList = []

            //channel
            this.selectChannel = []
            this.channelSet = "true"

            this.orderCheck = "true"
            this.peerCheck = "true"
            this.channelCheck = "true"
            this.ordererCnt = 0
            this.ordererList = []
            this.curSelOderer = []
            this.channelPeerList = []
            this.channelInfo = {
                channelId: "",
                DBinfo: {
                    name: "",
                    id: "",
                    pw: "",
                    port: 5984
                },
            }
            this.networkCreateState = -1
        });
    }
}

const networkStore = new NetworkStore();
export default networkStore;
