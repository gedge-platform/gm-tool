import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import theme from "@/styles/theme";
import { NavScrollbar } from "@/components/scrollbars";
import { Title } from "@/pages";
import { useHistory } from "react-router-dom";
import { getItem } from "@/utils/sessionStorageFn";
import { TreeItem, TreeView } from "@mui/x-tree-view";

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

export const SideMenu = () => {
  const history = useHistory();
  const userRole = getItem("userRole");

  // const [open, setOpen] = React.useState(true);
  const [expanded, setExpanded] = useState(false);

  // const handleClick = () => {
  //   setOpen(!open);
  // };

  const handleClick = (event, nodeId) => {
    setExpanded(nodeId);
  };

  return (
    <MenuNav>
      <NavScrollbar>
        {userRole === "PA" ? (
          <ul>
            <TreeView sx={{ overflowY: "auto" }} aria-expanded={false}>
              <li>
                <NavLink exact to="/total" activeClassName="active">
                  {Title.TotalDashboard}
                </NavLink>
              </li>
              <CustomTreeItem
                nodeId="1"
                label={Title.Platform}
                onNodeFocus={handleClick}
              >
                <li>
                  <NavLink
                    nodeId="3"
                    // exact
                    to="/platformDashboard"
                    activeClassName="active"
                  >
                    {Title.Dashboard}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    nodeId="5"
                    exact
                    to="/edgeZone"
                    activeClassName="active"
                  >
                    {Title.EdgeZone}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    nodeId="6"
                    exact
                    to="/cloudZone"
                    activeClassName="active"
                  >
                    {Title.CloudZone}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    exact
                    to="/adminZone"
                    nodeId="7"
                    activeClassName="active"
                  >
                    {Title.AdminZone}
                  </NavLink>
                </li>
              </CustomTreeItem>
              <CustomTreeItem
                nodeId="8"
                label={Title.Infra}
                onNodeFocus={handleClick}
              >
                <CustomTreeItem nodeId="9" label={Title.NetWork}>
                  <li>
                    <NavLink
                      exact
                      to="/loadbalancer"
                      nodeId="10"
                      activeClassName="active"
                    >
                      {Title.Loadbalancer}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      exact
                      to="/topology"
                      nodeId="11"
                      activeClassName="active"
                    >
                      {Title.Topology}
                    </NavLink>
                  </li>
                </CustomTreeItem>
                {/* <li>
                  <NavLink exact to="/storage" activeClassName="active">
                    {Title.Storage}
                  </NavLink>
                </li> */}
                <CustomTreeItem nodeId="12" label={Title.Storage}>
                  <li>
                    <NavLink
                      exact
                      to="/storageDashboard"
                      nodeId="13"
                      activeClassName="active"
                    >
                      {Title.StorageDashboard}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      exact
                      to="/storage"
                      nodeId="14"
                      activeClassName="active"
                    >
                      {Title.Storage}
                    </NavLink>
                  </li>
                </CustomTreeItem>
                <li>
                  <NavLink to="/volumes" activeClassName="active">
                    {Title.Volume}
                  </NavLink>
                </li>
              </CustomTreeItem>
              <CustomTreeItem
                nodeId="15"
                label={Title.Service}
                onNodeFocus={handleClick}
              >
                <li>
                  <NavLink
                    exact
                    to="/workSpace"
                    nodeId="16"
                    activeClassName="active"
                  >
                    {Title.WorkSpace}
                  </NavLink>
                </li>
                <CustomTreeItem
                  nodeId="17"
                  label={Title.Project}
                  onNodeFocus={handleClick}
                >
                  <li>
                    <NavLink
                      exact
                      to="/userProject"
                      nodeId="18"
                      activeClassName="active"
                    >
                      {Title.CreateUser}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      exact
                      to="/platformProject"
                      activeClassName="active"
                    >
                      {Title.PlatformControl}
                    </NavLink>
                  </li>
                </CustomTreeItem>
                <li>
                  <NavLink exact to="/workload" activeClassName="active">
                    {Title.Workload}
                  </NavLink>
                </li>
                <li>
                  <NavLink exact to="/faas" activeClassName="active">
                    {Title.FaaS}
                  </NavLink>
                </li>
                <li>
                  <NavLink exact to="/template" activeClassName="active">
                    {Title.Template}
                  </NavLink>
                </li>
              </CustomTreeItem>
              <li>
                <NavLink to="/user" activeClassName="active">
                  {Title.PlatformUser}
                </NavLink>
              </li>
              <li>
                <NavLink to="/monitoring" activeClassName="active">
                  {Title.Monitoring}
                </NavLink>
              </li>
              <li>
                <NavLink to="/configuration" activeClassName="active">
                  {Title.Configuration}
                </NavLink>
              </li>
              <li>
                <NavLink to="/certification" activeClassName="active">
                  {Title.Certification}
                </NavLink>
              </li>
            </TreeView>
          </ul>
        ) : (
          <ul>
            <TreeView sx={{ overflowY: "auto" }} aria-expanded={false}>
              <li>
                <NavLink exact to="/service" activeClassName="active">
                  {Title.ServiceAdminDashboard}
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/service/map" activeClassName="active">
                  {Title.ServiceAdminMapDashboard}
                </NavLink>
              </li>
              {/* <CustomTreeItem
                nodeId="1"
                label={Title.Platform}
                onNodeFocus={handleClick}
              >
                <li>
                  <NavLink
                    nodeId="2"
                    exact
                    to="/service"
                    activeClassName="active"
                  >
                    {Title.ServiceAdminDashboard}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    nodeId="3"
                    exact
                    to="/service/map"
                    activeClassName="active"
                  >
                    {Title.ServiceAdminMapDashboard}
                  </NavLink>
                </li>
              </CustomTreeItem> */}
              <li>
                <NavLink to="/service/Workspace" activeClassName="active">
                  {Title.WorkSpace}
                </NavLink>
              </li>
              <li>
                <NavLink to="/service/project" activeClassName="active">
                  {Title.Project}
                </NavLink>
              </li>
              <li>
                <NavLink to="/service/workload" activeClassName="active">
                  {Title.Workload}
                </NavLink>
              </li>
              <li>
                <NavLink to="/service/volumes" activeClassName="active">
                  {Title.Volume}
                </NavLink>
              </li>
            </TreeView>
          </ul>
        )}
      </NavScrollbar>
    </MenuNav>
  );
};

export default SideMenu;
