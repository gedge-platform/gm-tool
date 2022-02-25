import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "@/styles/theme";
import SideUser from "./SideUser";
import SideMenu from "./SideMenu";
// import sideLogo from '@/images/layout/logo.png';
import sideLogo from "@/images/layout/logo-light.png";
import axios from "axios";
import { SERVER_URL } from "../../config";
import { getItem, setItem } from "../../utils/sessionStorageFn";

const SidebarArea = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${theme.sizes.sideNavWidth};
    display: flex;
    flex-direction: column;
    background-color: #0a2348;
    box-shadow: inset -1px 0 0 #04102d;
`;

const LogoArea = styled.div`
    height: 100px !important;
    background-color: ${theme.colors.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    text-align: center;
    color: white;
`;

const SideNavbar = () => {
    return (
        <SidebarArea>
            <LogoArea>
                <Link to="/">
                    <img src={sideLogo} alt="API GATEWAY" />
                </Link>
            </LogoArea>
            {/* <LogoArea>Hyperledger<br /> Fabric as a Service<br />(Big BlockChain Storage)</LogoArea> */}
            <SideUser />
            <SideMenu />
        </SidebarArea>
    );
};

export { SideNavbar };
