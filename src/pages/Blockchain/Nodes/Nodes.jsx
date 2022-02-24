import React, { useState, useEffect } from 'react';
import Layout from "@/layout";
import { Title, SubTitle } from '@/pages';
import { CTabs, CTab, CTabPanel } from '@/components/tabs';
import APIListTab from './TabList/APIListTab'
// import APIAppTab from './TabList/APIAppTab'
import nodestore from '../../../Store/NodesStore';
import { observer } from "mobx-react";
import shareStore from '../../../Store/ShareStore';

const Organization = observer(() => {
    const currentPage = SubTitle.Blockchain.Nodes;
    const currentPageTitle = Title.Blockchain;

    const [tabvalue, setTabvalue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabvalue(newValue);
    };

    useEffect(() => {
        nodestore.init()
        return () => { }
    }, [])

    shareStore.height(3.2)

    return (
        <Layout currentPageTitle={currentPageTitle} currentPage={currentPage}>
            <div className="tabPanelContainer">
                <CTabPanel
                    value={tabvalue}
                    index={0}
                >
                    <APIListTab />
                </CTabPanel>
            </div>
        </Layout>
    );
})
export default Organization;
