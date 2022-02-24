import React from 'react';
import { ThemeProvider } from "styled-components";
import GlobalStyles from '@/styles/globalStyle';
import theme from "@/styles/theme";
import { ToastContainer } from 'react-toastify';
import { SideNavbar } from './SideNavbar';
import { MainContents } from './MainContents';

export const Layout = (props) => {
    const currentPage = props.currentPage;
    const currentPageTitle = props.currentPageTitle;
    const resize = props.resize;

    return (
        <ThemeProvider theme={theme}>
            <SideNavbar/>
            <MainContents
                currentPage={currentPage}
                currentPageTitle={currentPageTitle}
                resize={resize}
            >
                {props.children}
                <ToastContainer position="top-right" autoClose={10000} />
            </MainContents>
            <GlobalStyles/>
        </ThemeProvider>
    );
}
export default Layout;
