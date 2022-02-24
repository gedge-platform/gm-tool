import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import theme from "@/styles/theme";
import { Title, SubTitle } from "@/pages";
import { NavScrollbar } from "@/components/scrollbars";

import menuStore from "../../Store/MenuStore";
import { observer } from "mobx-react";
import axios from "axios";
import { SERVER_URL } from "../../config";
import { getItem, setItem } from "../../utils/sessionStorageFn";

const MenuNav = styled.nav`
  position: relative;
  color: #afbacb;
  font-size: 13px;
  flex-grow: 1;
  border-top: 1px solid #06193c;
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
    border-bottom: 1px solid #06193c;
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
          background-color: #ff4e00
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
          padding-left: 53px;
          &::before {
            width: 4px;
            height: 4px;
            left: 40px;
          }
        }
      }
    }

    &.hasChild:not(.open) a::after, &.hasChild:not(.open) a:hover::after {
      content: ' ';
      position: absolute;
      top: 50%;
      left: 25px;
      bottom: 1px;
      border-left: 3px solid transparent;
      transition: all .2s;
      width: 8px;
      height: 2px;
      border-radius: 0;
      background: #485770;
    }

    &.hasChild:not(.open) a::before, &.hasChild:not(.open) a:hover::before {
      content: ' ';
      position: absolute;
      top: 50%;
      left: 25px;
      width: 8px;
      height: 2px;
      background: #485770;
      transition: all .2s;
      transform: rotate(90deg);
      border-radius: 0;
    }

    &.hasChild:not(.open) a:hover::before,
    &.hasChild:not(.open) a:hover::after {
      background-color: #fff;
    }
  }
}
.open {
  .navChildren {
    display: block;
  }
}
`;

export const SideMenu = observer(() => {
  const menu1 = menuStore.menu1;
  const menu2 = menuStore.menu2;
  const menu3 = menuStore.menu3;
  const [role, setRole] = useState("");
  const menu1View = () => {
    menuStore.handleMenu1();
  };
  const toggleClass = () => {
    menuStore.handleMenu2();
  };

  const toggleClass2 = () => {
    menuStore.handleMenu3();
  };

  useEffect(async () => {
    await axios
      .get(`${SERVER_URL}/users/${getItem("user")}`, {
        auth: getItem("auth"),
      })
      .then(({ data: { data }, status }) => {
        setItem("info", data);
        setRole(data.role);
      });
  }, []);

  return (
    <MenuNav>
      <NavScrollbar>
        <ul>
          {/* <li><NavLink exact to="/" activeClassName="active">{Title.Dashboard}</NavLink></li> */}
          {/* <li><NavLink to="/TabList" activeClassName="active">{Title.TabList}</NavLink></li> */}
          <li className={`hasChild ${menu1}`} onClick={() => menu1View()}>
            <a href="javascript:void(0)">Dashboard</a>
            <ul className="navChildren">
              <li onClick={() => menu1View()}>
                <NavLink to="/dashboard" activeClassName="active">
                  {SubTitle.Dashboard.Dashboard}
                </NavLink>
              </li>
            </ul>
          </li>

          <li className={`hasChild ${menu2}`} onClick={() => toggleClass()}>
            <a href="javascript:void(0)">BlockChain</a>
            <ul className="navChildren">
              <li onClick={() => toggleClass()}>
                <NavLink to="/networks" activeClassName="active">
                  {SubTitle.Blockchain.Networks}
                </NavLink>
              </li>
              <li onClick={() => toggleClass()}>
                <NavLink to="/organization" activeClassName="active">
                  {SubTitle.Blockchain.Organization}
                </NavLink>
              </li>
              <li onClick={() => toggleClass()}>
                <NavLink to="/nodes" activeClassName="active">
                  {SubTitle.Blockchain.Nodes}
                </NavLink>
              </li>
              <li onClick={() => toggleClass()}>
                <NavLink to="/channels" activeClassName="active">
                  {SubTitle.Blockchain.Channels}
                </NavLink>
              </li>
              <li onClick={() => toggleClass()}>
                <NavLink to="/chaincodes" activeClassName="active">
                  {SubTitle.Blockchain.Chaincodes}
                </NavLink>
              </li>
            </ul>
          </li>

          {role === "ADMIN" ? (
            <li className={`hasChild ${menu3}`} onClick={() => toggleClass2()}>
              <a href="javascript:void(0)">Management</a>
              <ul className="navChildren">
                <li onClick={() => toggleClass2()}>
                  <NavLink to="/user" activeClassName="active">
                    {SubTitle.Management.user}
                  </NavLink>
                </li>
                <li onClick={() => toggleClass2()}>
                  <NavLink to="/cluster" activeClassName="active">
                    {SubTitle.Management.cluster}
                  </NavLink>
                </li>
              </ul>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </NavScrollbar>
    </MenuNav>
  );
});

export default SideMenu;
