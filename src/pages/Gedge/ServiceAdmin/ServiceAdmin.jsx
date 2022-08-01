import React, { useState, useEffect } from "react";
import Layout from "@/layout";
import { Title } from "@/pages";
import { PanelBox } from "@/components/styles/PanelBox";
import styled from "styled-components";
import { FormControl, MenuItem, Select } from "@mui/material";

const ServiceAdminWrap = styled.div`
    padding: 0 10px;
    .panel_summary {
        width: 100%;
        margin-bottom: 12px;
        background: #202842;
        border: 0;
        border-radius: 8px;
        &::before {
            display: none;;
        }
    }
`
const ServiceAdmin = () => {
    const currentPageTitle = Title.ServiceAdmin;

    return (
        <Layout currentPageTitle={currentPageTitle}>
            <ServiceAdminWrap>
                <div className="ServiceSummaryWrap">
                    <div className="ServiceSummary Workspace">
                        <div className="SummaryCountTitle">전체 워크스페이스 개수</div>
                        <div className="SummaryCount">10</div>
                    </div>

                    <div className="ServiceSummary Project">
                        <div className="SummaryCountTitle">전체 프로젝트 개수</div>
                        <div className="SummaryCount">8</div>
                    </div>
                </div>

                <PanelBox className="panel_summary">
                    <div className="ServiceSelect">
                        <FormControl className="form_serviceAdmin">
                            <Select
                            inputProps={{ "aria-label": "Without label" }}
                            >
                                <MenuItem value="selct">SELECT</MenuItem>
                            </Select>
                        </FormControl>
                    </div> 

                    <div className="ServiceCircleWrap">
                        <div className="service_circle_inner">
                            <div className="service_circle">
                                <span className="count">15</span>
                                <div className="title">Workspace</div>
                            </div>

                            <div className="service_circle">
                                <span className="count">8</span>
                                <div className="title">Project</div>
                            </div>

                            <div className="service_circle">
                                <span className="count">8</span>
                                <div className="title">Deployment</div>
                            </div>

                            <div className="service_circle">
                                <span className="count">4</span>
                                <div className="title">Pod</div>
                            </div>

                            <div className="service_circle">
                                <span className="count">12</span>
                                <div className="title">Service</div>
                            </div>

                            <div className="service_circle">
                                <span className="count">2</span>
                                <div className="title">Cronjob</div>
                            </div>

                            <div className="service_circle">
                                <span className="count">3</span>
                                <div className="title">Job</div>
                            </div>

                            <div className="service_circle">
                                <span className="count">5</span>
                                <div className="title">Volume</div>
                            </div>
                        </div>
                    </div>

                    <div className="ServiceRecentWrap">
                        <div className="ServiceRecentInner">
                            <div className="ServiceRecentTitle">Workspace Top 5 / 최신</div>
                            <div className="ServiceRecentListWrap">
                                <ul>
                                    <li><span>1</span>kube-node-lease</li>
                                    <li><span>2</span>kube-system</li>
                                    <li><span>3</span>default</li>
                                    <li><span>4</span>kubesphere-system</li>
                                    <li><span>5</span>kubesphere-monitoring-federated</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="ServiceRecentInner">
                            <div className="ServiceRecentTitle">Project Top 5 / 최신</div>
                            <div className="ServiceRecentListWrap">
                                <ul>
                                    <li><span>1</span>kube-node-lease</li>
                                    <li><span>2</span>kube-system</li>
                                    <li><span>3</span>default</li>
                                    <li><span>4</span>kubesphere-system</li>
                                    <li><span>5</span>kubesphere-monitoring-federated</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </PanelBox>

                <PanelBox className="panel_summary">
                    <div className="monitoringWrap">
                        <div className="monitoringTitle">Monitoring</div>
                        <div className="monitoringInner">
                            <div className="monitoringBox">
                                <div className="monitoringBoxTitle">Workspace 총 개수</div>
                                <div className="monitoringBoxCont">
                                    그래프 들어갈 자리
                                </div>
                            </div>

                            <div className="monitoringBox">
                                <div className="monitoringBoxTitle">Project 총 개수</div>
                                <div className="monitoringBoxCont">
                                    그래프 들어갈 자리
                                </div>
                            </div>

                            <div className="monitoringBox">
                                <div className="monitoringBoxTitle">Pod 총 개수</div>
                                <div className="monitoringBoxCont">
                                    그래프 들어갈 자리
                                </div>
                            </div>
                        </div>
                    </div>
                </PanelBox>
            </ServiceAdminWrap>
            
        </Layout>
    );
};
export default ServiceAdmin;
