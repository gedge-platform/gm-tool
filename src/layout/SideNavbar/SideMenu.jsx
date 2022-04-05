import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import theme from "@/styles/theme";
import { NavScrollbar } from "@/components/scrollbars";
import { SubTitle, Title } from "@/pages";
import { useHistory } from "react-router-dom";
import { getItem } from "@/utils/sessionStorageFn";

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
    
    a {
      position: relative;
      display: flex;
      align-items: center;
      min-height: 48px;
      padding: 15px 27px 15px 40px;
      color: #afbacb;
      text-decoration: none;
      transition: .2s;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 27px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        transform: translateY(-50%);
        background-color: #485770;
        transition: background-color .2s;
      }
      &:hover, &.active {
        color: #fff;
        background-color: ${theme.colors.navActive};
        &::before {
          background-color: #fff
        }
      }
      &.active {
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 4px;
          background-color:#00d3ff;
        }
        & + .subMenu {
          display: block
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
}
.open {
  .navChildren {
    display: block;
  }
}
`;

export const SideMenu = () => {
  const history = useHistory();
  const userRole = getItem("userRole");

  return (
    <MenuNav>
      <NavScrollbar>
        {userRole === "PA" ? (
          <ul>
            <li>
              <NavLink exact to="/" activeClassName="active">
                {Title.Dashboard}
              </NavLink>
            </li>
            <li>
              <NavLink to="/cluster" activeClassName="active">
                {Title.Cluster}
              </NavLink>
            </li>
            <li>
              <NavLink to="/workspace" activeClassName="active">
                {Title.WorkSpace}
              </NavLink>
            </li>
            <li>
              <NavLink to="/project" activeClassName="active">
                {Title.Project}
              </NavLink>
            </li>
            <li>
              <NavLink to="/configuration" activeClassName="active">
                {Title.Configuration}
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/component" activeClassName="active">
                {Title.Component}
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/volumes" activeClassName="active">
                {Title.Volume}
              </NavLink>
            </li>
            <li>
              <NavLink to="/monitoring" activeClassName="active">
                {Title.Monitoring}
              </NavLink>
            </li>
            <li>
              <NavLink to="/user" activeClassName="active">
                {Title.User}
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink exact to="/" activeClassName="active">
                {Title.Dashboard}
              </NavLink>
            </li>
            <li>
              <NavLink to="/service/project" activeClassName="active">
                {Title.Project}
              </NavLink>
            </li>
            <li>
              <NavLink to="/service/Workspace" activeClassName="active">
                {Title.WorkSpace}
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/service/appstore" activeClassName="active">
                {Title.Appstore}
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/service/workload" activeClassName="active">
                {Title.Workload}
              </NavLink>
            </li>
            <li>
              <NavLink to="/service/volume" activeClassName="active">
                {Title.Volume}
              </NavLink>
            </li>
          </ul>
        )}
      </NavScrollbar>
    </MenuNav>
  );
};

export default SideMenu;
