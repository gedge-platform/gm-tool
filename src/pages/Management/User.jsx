import React, { useState, useEffect } from "react";
import Layout from "@/layout";
import { Title, SubTitle } from "@/pages";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import UserListTab from "./UserListTab";
// import APIAppTab from './APIAppTab'

const User = (props) => {
  const currentPageTitle = Title.Management;
  const currentPage = SubTitle.Management.user;
  const [tabvalue, setTabvalue] = useState(0);
  const [open, setOpen] = useState(false);
  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const actionList = [
    {
      name: "승인",
      onClick: () => {
        alert("승인하시겠습니까?");
      },
    },
    {
      name: "반려",
      onClick: () => {
        alert("반려하시겠습니까?");
      },
    },
    {
      name: "강제중지",
      onClick: () => {
        alert("강제중지 하시겠습니까?");
      },
    },
  ];

  return (
    <Layout currentPageTitle={currentPageTitle} currentPage={currentPage}>
      <div className="tabPanelContainer">
        <CTabPanel value={tabvalue} index={0}>
          <UserListTab />
        </CTabPanel>
      </div>
    </Layout>
  );
};

export default User;
