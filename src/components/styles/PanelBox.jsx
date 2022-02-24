import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';

const PanelBox = styled.div`
  position: relative;
  background-color: #fff;
  border-top: 1px solid ${theme.colors.defaultDark};
  border-bottom: 1px solid #858f9c;
  padding: 0 1px;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
  }
  &::before {
    left: 0;
    border-left: 1px solid #c5cad0
  }
  &::after {
    right: 0;
    border-right: 1px solid #c5cad0
  }
  .panelTitBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 47px;
    padding: 0 8px;
    border: 1px solid #fff;
    border-bottom-color: ${theme.colors.defaultBorder};
    background-color: ${theme.colors.panelTit};
    .tit {
      padding-left: 12px;
      color: #071e3f;
      font-size: 13px;
      strong { color: #0090ff }
    }
    .date {
      color: #a1a7af;
      padding: 0 8px;
    }
  }
`;
export { PanelBox }
