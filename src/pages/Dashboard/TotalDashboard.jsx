import React, { useEffect, useState } from "react";
import Layout from "@/layout";
import { Title, SubTitle } from "@/pages";
import { PanelBox } from "@/components/styles/PanelBox";
import { AgGrid } from "@/components/datagrids";
import styled from "styled-components";

import { CSelectButton } from "@/components/buttons";
import moment from "moment";
import { observer } from "mobx-react";
import CommActionBar from "@/components/common/CommActionBar";
import { FormControl, MenuItem, Select } from "@mui/material";
import theme from "../../styles/theme";
import MapContent from "./DashboardCont/MapContent";

const DashboardWrap = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-bottom: 12px;

  .panel_service {
    width: 100%;
    height: 800px;

    .panel_title {
      color: #fff;
    }
    .content_container {
      display: flex;
      width: 100%;
      height: 100%;
      padding: 25px;
      .cluster_map {
      }

      .cluster_info {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        .form_dashboard {
          width: 95%;
        }
        .MuiInputBase-input {
          background-color: #1c8be0;
          color: rgba(255, 255, 255, 0.9);
          font-size: 20px;
          text-align: center;
          font-weight: 700;
          border: none !important;
          border-radius: 8px;
        }
        svg {
          font-size: 28px;
          color: rgba(255, 255, 255, 0.9);
        }
        .cluster_detail {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 12px;
          height: 700px;
          width: 95%;
          background-color: #4950d6;
          margin-top: 10px;
          border-radius: 8px;

          .cluster_detail_title {
            width: 100%;
            border-radius: 8px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: rgba(255, 255, 255, 0.8);
            font-size: 1.1rem;
            background-color: #4047cc;
          }
          .cluster_detail_content {
            height: 50px;
            line-height: 50px;
            font-size: 1.2rem;
            font-weight: 700;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 20px;
          }
        }
      }
      .cluster_map {
        flex: 3;
        border-radius: 8px;
      }
    }
  }
`;

const clusters = ["gedgemgmt01", "gs-cluster01", "gs-cluster02"];

const TotalDashboard = observer(() => {
  const currentPageTitle = Title.Dashboard;

  useEffect(() => {}, []);

  return (
    <Layout currentPageTitle={currentPageTitle}>
      <DashboardWrap>
        <PanelBox className="panel_service">
          <div className="content_container">
            <div className="cluster_info">
              <FormControl className="form_dashboard">
                <Select
                  value={clusters[0]}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {clusters.map((cluster) => (
                    <MenuItem value={cluster}>{cluster}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className="cluster_detail">
                <div className="cluster_detail_title">클러스터 API 주소</div>
                <div className="cluster_detail_content">http://101.79.4.15</div>
                <div className="cluster_detail_title">클러스터 API 주소</div>
                <div className="cluster_detail_content">http://101.79.4.15</div>
              </div>
            </div>
            <div className="cluster_map">
              <MapContent />
            </div>
          </div>
        </PanelBox>
      </DashboardWrap>
      <DashboardWrap>
        <PanelBox className="panel_service"></PanelBox>
      </DashboardWrap>
    </Layout>
  );
});
export default TotalDashboard;
