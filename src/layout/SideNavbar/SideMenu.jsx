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

  // 하위 메뉴가 없는 메뉴들은 선택 시 다른 하위 메뉴 expanded 삭제
  useEffect(() => {
    if (
      location.pathname === "/total" ||
      location.pathname === "/user" ||
      location.pathname === "/monitoring" ||
      location.pathname === "/configuration" ||
      location.pathname === "/certification"
    ) {
      setExpanded([]);
    }
  }, [location]);

  const handleClick = (event, nodeId) => {
    setExpanded(nodeId);
  };

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
                    nodeId="2"
                    // exact
                    to="/platformDashboard"
                    activeClassName="active"
                  >
                    {Title.Dashboard}
                  </CustomNavLink>
                </li>

                <li>
                  <CustomNavLink
                    nodeId="3"
                    exact
                    to="/edgeZone"
                    activeClassName="active"
                  >
                    {Title.EdgeZone}
                  </CustomNavLink>
                </li>
                <li>
                  <CustomNavLink
                    nodeId="4"
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
                    nodeId="5"
                    activeClassName="active"
                  >
                    {Title.AdminZone}
                  </CustomNavLink>
                </li>
              </CustomTreeItem>
              <CustomTreeItem nodeId="6" label={Title.Infra}>
                <li>
                  <CustomNavLink
                    exact
                    to="/storageDashboard"
                    nodeId="7"
                    activeClassName="active"
                  >
                    {Title.StorageDashboard}
                  </CustomNavLink>
                </li>

                <li>
                  <CustomNavLink to="/volumes" activeClassName="active">
                    {Title.Volume}
                  </CustomNavLink>
                </li>
              </CustomTreeItem>
              <CustomTreeItem nodeId="8" label={Title.Service}>
                <li>
                  <CustomNavLink
                    exact
                    to="/workSpace"
                    nodeId="9"
                    activeClassName="active"
                  >
                    {Title.WorkSpace}
                  </CustomNavLink>
                </li>
                <CustomTreeItem nodeId="10" label={Title.Project}>
                  <li>
                    <CustomNavLink
                      exact
                      to="/userProject"
                      nodeId="11"
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
