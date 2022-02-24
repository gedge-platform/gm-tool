import React, { useState, useEffect } from 'react';
import { ws, WebSocket, WebSocketServer } from 'ws'
import Layout from "@/layout";
import { Title, SubTitle } from '@/pages';
import { CTabs, CTab, CTabPanel } from '@/components/tabs';
import APIListTab from './TabList/APIListTab'
// import APIAppTab from './TabList/APIAppTab'
import nodestore from '../../../Store/NodesStore';
import { observer } from "mobx-react";
import shareStore from '../../../Store/ShareStore';
import Xterm from 'xterm-for-react/dist/src/XTerm';


const PeerTerminal = observer(() => {

    return (
        <Xterm>

        </Xterm>
    );
})
export default PeerTerminal;
