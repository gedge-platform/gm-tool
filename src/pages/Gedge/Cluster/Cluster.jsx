import React, { useState, useEffect } from "react";
import Layout from "@/layout";
import { Title, SubTitle } from "@/pages";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import APIListTab from "./TabList/APIListTab";

const Cluster = () => {
    const currentPage = SubTitle.Cluster;
    const currentPageTitle = Title.Infra;

    const [tabvalue, setTabvalue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabvalue(newValue);
    };
    console.log(123);

    return (
        <Layout currentPageTitle={currentPageTitle} currentPage={currentPage}>
            <div className="tabPanelContainer">
                <CTabPanel value={tabvalue} index={0}>
                    <APIListTab />
                </CTabPanel>
            </div>
        </Layout>
    );
};
export default Cluster;
