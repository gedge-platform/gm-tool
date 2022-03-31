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
          font-size: 16px;
          text-align: center;
          font-weight: 700;
          border: none !important;
          border-radius: 8px;
        }
        svg {
          font-size: 24px;
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
            font-size: 15px;
            background-color: #4047cc;
          }
          .cluster_detail_content {
            height: 70px;
            display: flex;
            align-items: center;
            font-size: 16px;
            font-weight: 700;
            color: rgba(255, 255, 255, 0.9);
          }
          .cluster_resources {
            height: 288px;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: center;

            .cluster_resource {
              width: 95px;
              height: 95px;
              border-radius: 50%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              background-color: #4047cc;
              span {
                font-size: 12px;
                font-weight: 500;
                color: rgba(255, 255, 255, 0.9);
              }
              .resource_kind {
                margin-bottom: 4px;
              }
              .resource_number {
                font-size: 24px;
                font-weight: 700;
              }
            }
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
                <div className="cluster_detail_title">클러스터 타입</div>
                <div className="cluster_detail_content">CORE</div>
                <div className="cluster_detail_title">클러스터 Creator</div>
                <div className="cluster_detail_content">innogrid</div>
                <div className="cluster_detail_title">클러스터 Resource</div>
                <div className="cluster_resources">
                  <div className="cluster_resource">
                    <span className="resource_kind">Deployment</span>
                    <span className="resource_number">26</span>
                  </div>
                  <div className="cluster_resource">
                    <span className="resource_kind">Pod</span>
                    <span className="resource_number">76</span>
                  </div>
                  <div className="cluster_resource">
                    <span className="resource_kind">Service</span>
                    <span className="resource_number">32</span>
                  </div>
                  <div className="cluster_resource">
                    <span className="resource_kind">Cronjob</span>
                    <span className="resource_number">1</span>
                  </div>
                  <div className="cluster_resource">
                    <span className="resource_kind">Job</span>
                    <span className="resource_number">4</span>
                  </div>
                  <div className="cluster_resource">
                    <span className="resource_kind">Volume</span>
                    <span className="resource_number">0</span>
                  </div>
                </div>
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
