import React, { useState, useEffect } from 'react';
import Layout from "@/layout";
import { Title, SubTitle } from '@/pages';
import { CTabs, CTab, CTabPanel } from '@/components/tabs';
import NetworkListTab from './TabList/NetworkListTab'
import networkStore from '../../../Store/NetworkStore';
import shareStore from '../../../Store/ShareStore';
import { observer } from "mobx-react";

const Networks = observer(() => {
    const currentPage = SubTitle.Blockchain.Networks;
    const currentPageTitle = Title.Blockchain;

    useEffect(() => {
        networkStore.init()
        return () => {
        }
    }, [])


    shareStore.height(2.7)

    return (
        <Layout currentPageTitle={currentPageTitle} currentPage={currentPage}>
            <div className="tabPanelContainer">
                <NetworkListTab />
            </div>
        </Layout>
    );
})
export default Networks;
