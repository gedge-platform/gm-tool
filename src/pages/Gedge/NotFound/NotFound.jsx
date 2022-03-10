import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 64px;
  font-weight: 600;

  a {
    padding-top: 12px;
    font-size: 24px;
    text-decoration: none;
    color: #1355ce;
  }
`;

const NotFound = () => {
  return (
    <Container>
      <p>404 Not Found</p>
      <NavLink to="/">메인페이지로</NavLink>
    </Container>
  );
};

export default NotFound;
