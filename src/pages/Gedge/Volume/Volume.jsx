import React, { useState, useEffect } from "react";
import Layout from "@/layout";
import { Title, SubTitle } from "@/pages";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import VolumeListTab from "./TabList/VolumeListTab";
// import CoreClusterListTab from "./TabList/CoreClusterListTab";
// import EdgeClusterListTab from "./TabList/EdgeClusterListTab";

const Volume = () => {
    const currentPageTitle = Title.Volume;

    const [tabvalue, setTabvalue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabvalue(newValue);
    };

    return (
        <Layout currentPageTitle={currentPageTitle}>
            <CTabs type="tab1" value={tabvalue} onChange={handleTabChange}>
                <CTab label="볼륨 관리" />
                <CTab label="스토리지 클래스 관리" />
            </CTabs>
            <div className="tabPanelContainer">
                <CTabPanel value={tabvalue} index={0}>
                    <VolumeListTab />
                </CTabPanel>
                <CTabPanel value={tabvalue} index={1}>
                    {/* <EdgeClusterListTab /> */}
                </CTabPanel>
            </div>
        </Layout>
    );
};
export default Volume;