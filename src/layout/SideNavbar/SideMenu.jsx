import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import theme from "@/styles/theme";
import { NavScrollbar } from "@/components/scrollbars";
import { Title } from "@/pages";
import { useHistory } from "react-router-dom";
import { getItem } from "@/utils/sessionStorageFn";
import TreeItem from '@mui/lab/TreeItem';
import { TreeView } from "@mui/lab";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ListItem, ListItemText } from "@mui/material";

const CustomTreeItem = styled(TreeItem)`
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
  border-top: 1px solid #25304b;
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
    border-bottom: 1px solid #25304b;
    background-color: #2f3955;
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
    .navChildren {
      display: none;
      border-top: 1px solid #04102d;
      margin-bottom: -1px;
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

  const handleClick = (event, nodeId)=> {
    setExpanded(nodeId);
  };

  return (
    <MenuNav>
      <NavScrollbar>
        {userRole === "PA" ? (

              <TreeView 
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />} 
              sx={{overflowY: 'auto'}} 
              aria-expanded={false}
              >
              <NavLink exact to="/" activeClassName="active">
                {Title.Dashboard}
              </NavLink>

                <CustomTreeItem nodeId="1" label={Title.Platform} onNodeFocus={handleClick} >
                  {/* <CustomTreeItem nodeId="2" label={
                    <ListItem button component="a" href="/edgeZone">
                      <ListItemText primary={Title.EdgeZone} />
                    </ListItem>
                  }>

                  </CustomTreeItem> */}
                  <NavLink nodeId="2" exact to="/edgeZone" activeClassName="active">
                  {Title.EdgeZone}
                  </NavLink>
                  <NavLink nodeId="3" exact to="/cloudZone" activeClassName="active">
                  {Title.CloudZone}
                  </NavLink>
                </CustomTreeItem>  
                <CustomTreeItem nodeId="4" label={Title.Infra} onNodeFocus={handleClick}>
                  <CustomTreeItem nodeId="5" label={Title.NetWork}>
                    <NavLink exact to="/roadbalancer" activeClassName="active">
                      {Title.Roadbalancer}
                    </NavLink>
                    <NavLink exact to="/topology" activeClassName="active">
                      {Title.Topology}
                    </NavLink>
                  </CustomTreeItem>
                  <NavLink exact to="/storage" activeClassName="active">
                    {Title.Storage}
                  </NavLink>
                </CustomTreeItem>
              <CustomTreeItem nodeId="9" label={Title.Service} onNodeFocus={handleClick}>
                  <NavLink exact to="/workSpace" activeClassName="active">
                    {Title.WorkSpace}
                  </NavLink>
                  <CustomTreeItem nodeId="11" label={Title.Project} onNodeFocus={handleClick}>
                    <NavLink exact to="/createUser" activeClassName="active">
                      {Title.CreateUser}
                    </NavLink>
                    <NavLink exact to="/platformControl" activeClassName="active">
                      {Title.PlatformControl}
                    </NavLink>
                  </CustomTreeItem>
                  <NavLink exact to="/template" activeClassName="active">
                    {Title.Template}
                  </NavLink>
                </CustomTreeItem>
              <NavLink to="/PlatformUser" activeClassName="active">
                {Title.PlatformUser}
              </NavLink>
              <NavLink to="/monitoring" activeClassName="active">
                {Title.Monitoring}
              </NavLink>
              <NavLink to="/configuration" activeClassName="active">
                {Title.Configuration}
              </NavLink>
              <NavLink to="/certification" activeClassName="active">
                {Title.Certification}
              </NavLink>
              </TreeView>

        ) : (
          <ul>
            <li>
              <NavLink exact to="/" activeClassName="active">
                {Title.Dashboard}
              </NavLink>
            </li>
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
              <NavLink to="/volumes" activeClassName="active">
                {Title.Volume}
              </NavLink>
            </li>
            <li>
              <NavLink to="/service/monitoring" activeClassName="active">
                {Title.Monitoring}
              </NavLink>
            </li>
          </ul>
        )}
      </NavScrollbar>
    </MenuNav>
  );
};

export default SideMenu;
