import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import theme from "@/styles/theme";
import { NavScrollbar } from "@/components/scrollbars";
import { Title } from "@/pages";
import { useHistory } from "react-router-dom";
import { getItem } from "@/utils/sessionStorageFn";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import { observer } from "mobx-react";
import menuStore from "../../store/Menu";

const CustomTreeItem = styled(TreeItem)`
// & .MuiTreeItem-group {
//   margin-left: 0px;
// }
& .MuiTreeItem-content > .MuiTreeItem-label{
  position: relative;
  display: flex;
  padding: 15px 27px 15px 15px;
  font-size: 13px;
  align-items: center;
  min-height: 48px;
  font-weight: 700;
  color: #afbacb;
  text-decoration: none;  
  transition: 0.2s;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    transform: translateY(-50%);
    background-color: #485770;
    transition: background-color 0.2s;
  }
}
a {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 48px;
    color: #afbacb;
    text-decoration: none;
    transition: 0.2s;
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      transform: translateY(-50%);
      background-color: #485770;
      transition: background-color 0.2s;
    }
    &:hover,
    &.active {
      color: #fff;
      background-color: ${theme.colors.navActive};
      &::before {
        content: "";
        background-color: #fff;
      } 
    }

    &.active {
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 4px;
        background-color: #00d3ff;
      }
      & + .subMenu {
        display: block;
      }
    }
  }
}
`;

// const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
//   [`& .${treeItemClasses.label}`]: {
//     border: "solid blue 1px",
//     // borderRadius: theme.shape.borderRadius,
//     marginTop: 3,
//     marginBottom: 3,
//     fontSize: 13
//   }
// }));

const MenuNav = styled.nav`
  position: relative;
  color: #afbacb;
  font-size: 13px;
  flex-grow: 1;
  border-top: 0.5px solid #25304b;
  background-color: #2f3955;
  //ul {
  //  position: absolute;
  //  top: 0;
  //  right: 0;
  //  bottom: 0;
  //  left: 0;
  //  overflow-y: auto;
  //  border-top: 1px solid #06193c;
  //}
  li {
    background-color: #2f3955;
  }
  & .MuiTreeItem-content {
    border-bottom: 1px solid #25304b;
  }    
    a {
      position: relative;
      display: flex;
      align-items: center;
      min-height: 48px;
      padding: 15px 27px 15px 40px;
      color: #afbacb;
      text-decoration: none;
      transition: 0.2s;
      border-bottom: 0.5px solid #25304b;
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 27px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        transform: translateY(-50%);
        background-color: #485770;
        transition: background-color 0.2s;
      }
      &:hover,
      &.active {
        color: #fff;
        background-color: ${theme.colors.navActive};
        display: flex;
        &::before {
          background-color: #fff;
        }
      }
      &.active {
        &::after {
          content: "";
          border-bottom: 0.5px solid #25304b;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 4px;
        }
        & + .subMenu {
          display: block;
        }
      }
    }
    .navChildren {
      display: none;
      border-top: 0px solid #04102d;
      margin-bottom: 0px;
      position: relative;
      li {
        border-bottom-color: #04102d;
        a {
          min-height: 42px;
          padding-left: 35px;
          &::before {
            width: 4px;
            height: 4px;
            left: 25px;
          }
        }
      }
    }
  }
`;

const SideMenu = observer(() => {
  const history = useHistory();
  const userRole = getItem("userRole");
  const location = useLocation();
  const { expanded, setExpanded } = menuStore;

  const CustomNavLink = ({ to, exact, nodeId, children }) => {
    const location = useLocation();

    return (
      <NavLink
        to={to}
        exact={exact}
        activeClassName="active" // active 클래스 추가
        isActive={(match) => {
          // 만약 nodeId가 설정되어 있고, 현재 location.pathname이 해당 nodeId에 속하거나
          // 현재 location.pathname이 to prop과 일치한다면 true를 반환하여 isActive 클래스를 추가.
          return (nodeId && match) || to === location.pathname;
        }}
      >
        {children}
      </NavLink>
    );
  };

  // 메뉴 버튼을 눌렀을 때 하위 메뉴가 있는 메뉴는 Toggle 함수 사용
  const onNodeToggle = (e, nodeId) => {
    console.log("nodeId", nodeId);
    setExpanded(nodeId);
  };

  // 페이지 로드 시 메뉴 상태를 복원
  useEffect(() => {
    const savedExpanded = localStorage.getItem("menuExpanded");
    if (savedExpanded) {
      setExpanded(JSON.parse(savedExpanded));
    }
  }, [setExpanded]);

  // 메뉴가 변경될 때마다 상태를 저장
  useEffect(() => {
    localStorage.setItem("menuExpanded", JSON.stringify(expanded));
  }, [expanded]);

  useEffect(() => {
    // 노드와 관련된 정보를 매핑 (메뉴 depth nodeId 값에 따라 처리) - 관리자 일 경우
    const nodeAdminMappings = {
      "/total": [],
      "/platformDashboard": ["1"],
      "/edgeZone": ["1"],
      "/cloudZone": ["1"],
      "/adminZone": ["1"],
      "/loadbalancer": ["9", "8"],
      "/topology": ["9", "8"],
      "/storageDashboard": ["12", "8"],
      "/storage": ["12", "8"],
      "/volumes": ["8"],
      "/workSpace": ["15"],
      "/userProject": ["17", "15"],
      "/platformProject": ["17", "15"],
      "/workload": ["15"],
      "/faas": ["15"],
      "/template": ["15"],
      "/user": [],
      "/monitoring": [],
      "/configuration": [],
      "/certification": [],
    };

    // 노드와 관련된 정보를 매핑 (메뉴 depth nodeId 값에 따라 처리) - 사용자 일 경우
    const nodeUserMappings = {
      "/service": [],
      "/service/map": [],
      "/service/Workspace": [],
      "/service/project": [],
      "/service/workload": [],
      "/service/volumes": [],
    };

    // 매핑 시켜 놓은 nodeAdminMappings 에서 find를 통해 url과 nodeId 확인
    // userRole에 따라 적절한 매핑 정보 선택
    const nodeMappings =
      userRole === "PA" ? nodeAdminMappings : nodeUserMappings;

    const selectedNode = Object.keys(nodeAdminMappings).find(
      (path) => location.pathname === path
    );

    // 선택한 노드에 해당하는 정보가 있을 경우 해당 정보로 expanded 업데이트
    if (selectedNode) {
      setExpanded(nodeMappings[selectedNode]);
    } else {
      // 선택한 노드에 해당하는 정보가 없을 경우 빈 배열로 초기화
      setExpanded([]);
    }
  }, [location]);

  return (
    <MenuNav>
      <NavScrollbar>
        {userRole === "PA" ? (
          <ul>
            <TreeView
              sx={{ overflowY: "auto" }}
              aria-expanded={false}
              onNodeToggle={onNodeToggle}
              expanded={expanded}
            >
              <li>
                <CustomNavLink exact to="/total" activeClassName="active">
                  {Title.TotalDashboard}
                </CustomNavLink>
              </li>
              <CustomTreeItem nodeId="1" label={Title.Platform}>
                <li>
                  <CustomNavLink
                    nodeId="3"
                    // exact
                    to="/platformDashboard"
                    activeClassName="active"
                  >
                    {Title.Dashboard}
                  </CustomNavLink>
                </li>

                <li>
                  <CustomNavLink
                    nodeId="5"
                    exact
                    to="/edgeZone"
                    activeClassName="active"
                  >
                    {Title.EdgeZone}
                  </CustomNavLink>
                </li>
                <li>
                  <CustomNavLink
                    nodeId="6"
                    exact
                    to="/cloudZone"
                    activeClassName="active"
                  >
                    {Title.CloudZone}
                  </CustomNavLink>
                </li>

                <li>
                  <CustomNavLink
                    exact
                    to="/adminZone"
                    nodeId="7"
                    activeClassName="active"
                  >
                    {Title.AdminZone}
                  </CustomNavLink>
                </li>
              </CustomTreeItem>
              <CustomTreeItem nodeId="8" label={Title.Infra}>
                <CustomTreeItem nodeId="9" label={Title.NetWork}>
                  <li>
                    <CustomNavLink
                      exact
                      to="/loadbalancer"
                      nodeId="10"
                      activeClassName="active"
                    >
                      {Title.Loadbalancer}
                    </CustomNavLink>
                  </li>
                  <li>
                    <CustomNavLink
                      exact
                      to="/topology"
                      nodeId="11"
                      activeClassName="active"
                    >
                      {Title.Topology}
                    </CustomNavLink>
                  </li>
                </CustomTreeItem>
                {/* <li>
                  <CustomNavLink exact to="/storage" activeClassName="active">
                    {Title.Storage}
                  </CustomNavLink>
                </li> */}
                <CustomTreeItem nodeId="12" label={Title.Storage}>
                  <li>
                    <CustomNavLink
                      exact
                      to="/storageDashboard"
                      nodeId="13"
                      activeClassName="active"
                    >
                      {Title.StorageDashboard}
                    </CustomNavLink>
                  </li>
                  <li>
                    <CustomNavLink
                      exact
                      to="/storage"
                      nodeId="14"
                      activeClassName="active"
                    >
                      {Title.Storage}
                    </CustomNavLink>
                  </li>
                </CustomTreeItem>
                <li>
                  <CustomNavLink to="/volumes" activeClassName="active">
                    {Title.Volume}
                  </CustomNavLink>
                </li>
              </CustomTreeItem>
              <CustomTreeItem nodeId="15" label={Title.Service}>
                <li>
                  <CustomNavLink
                    exact
                    to="/workSpace"
                    nodeId="16"
                    activeClassName="active"
                  >
                    {Title.WorkSpace}
                  </CustomNavLink>
                </li>
                <CustomTreeItem nodeId="17" label={Title.Project}>
                  <li>
                    <CustomNavLink
                      exact
                      to="/userProject"
                      nodeId="18"
                      activeClassName="active"
                    >
                      {Title.CreateUser}
                    </CustomNavLink>
                  </li>
                  <li>
                    <CustomNavLink
                      exact
                      to="/platformProject"
                      activeClassName="active"
                    >
                      {Title.PlatformControl}
                    </CustomNavLink>
                  </li>
                </CustomTreeItem>
                <li>
                  <CustomNavLink exact to="/workload" activeClassName="active">
                    {Title.Workload}
                  </CustomNavLink>
                </li>
                <li>
                  <CustomNavLink exact to="/faas" activeClassName="active">
                    {Title.FaaS}
                  </CustomNavLink>
                </li>
                <li>
                  <CustomNavLink exact to="/template" activeClassName="active">
                    {Title.Template}
                  </CustomNavLink>
                </li>
              </CustomTreeItem>
              <li>
                <CustomNavLink to="/user" activeClassName="active">
                  {Title.PlatformUser}
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/monitoring" activeClassName="active">
                  {Title.Monitoring}
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/configuration" activeClassName="active">
                  {Title.Configuration}
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/certification" activeClassName="active">
                  {Title.Certification}
                </CustomNavLink>
              </li>
            </TreeView>
          </ul>
        ) : (
          <ul>
            <TreeView sx={{ overflowY: "auto" }} aria-expanded={false}>
              <li>
                <CustomNavLink exact to="/service" activeClassName="active">
                  {Title.ServiceAdminDashboard}
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink exact to="/service/map" activeClassName="active">
                  {Title.ServiceAdminMapDashboard}
                </CustomNavLink>
              </li>
              {/* <CustomTreeItem
                nodeId="1"
                label={Title.Platform}
                onNodeFocus={handleClick}
              >
                <li>
                  <CustomNavLink
                    nodeId="2"
                    exact
                    to="/service"
                    activeClassName="active"
                  >
                    {Title.ServiceAdminDashboard}
                  </CustomNavLink>
                </li>
                <li>
                  <CustomNavLink
                    nodeId="3"
                    exact
                    to="/service/map"
                    activeClassName="active"
                  >
                    {Title.ServiceAdminMapDashboard}
                  </CustomNavLink>
                </li>
              </CustomTreeItem> */}
              <li>
                <CustomNavLink to="/service/Workspace" activeClassName="active">
                  {Title.WorkSpace}
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/service/project" activeClassName="active">
                  {Title.Project}
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/service/workload" activeClassName="active">
                  {Title.Workload}
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/service/volumes" activeClassName="active">
                  {Title.Volume}
                </CustomNavLink>
              </li>
            </TreeView>
          </ul>
        )}
      </NavScrollbar>
    </MenuNav>
  );
});

export default SideMenu;
