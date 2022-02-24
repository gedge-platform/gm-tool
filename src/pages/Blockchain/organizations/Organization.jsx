import React, { useState, useEffect } from 'react';
import Layout from "@/layout";
import { Title, SubTitle } from '@/pages';
import { CTabs, CTab, CTabPanel } from '@/components/tabs';
import OranizationsListTab from './TabList/OranizationsListTab'
import organizationStore from '../../../Store/OrganizationStore';
import { observer } from "mobx-react";
import shareStore from '../../../Store/ShareStore';

// import APIAppTab from './TabList/APIAppTab'

const Organization = observer(() => {
    const currentPage = SubTitle.Blockchain.Organization;
    const currentPageTitle = Title.Blockchain;

    const [tabvalue, setTabvalue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabvalue(newValue);
    };

    useEffect(() => {
    }, [])
    shareStore.height(1.55)
    return (
        <Layout currentPageTitle={currentPageTitle} currentPage={currentPage}>
            <div className="tabPanelContainer">
                <CTabPanel
                    value={tabvalue}
                    index={0}
                >
                    <OranizationsListTab />
                </CTabPanel>
            </div>
        </Layout>
    );
})
export default Organization;
