import React, { useState } from "react";
import styled from "styled-components";
import theme from "@/styles/theme";
import { CIconButton } from "@/components/buttons";
import { CDatePicker } from "@/components/textfields/CDatePicker";

const ActionArea = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin-right: 2px !important;
  }
`;
const SearchArea = styled.div`
  display: flex;
  align-items: center;
`;
const SearchBar = styled.div`
  display: flex;
  position: relative;
  margin-right: 8px;
  padding-right: 10px;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    right: -1px;
    height: 14px;
    transform: translateY(-50%);
    border-left: 1px solid #e0e2e5;
    border-right: 1px solid #fff;
  }
`;
const SearchBox = styled.div`
  position: relative;
  display: flex;
  height: 30px;
  border: 1px solid ${theme.colors.defaultDark};
  border-radius: 3px;
  margin-right: -10px;
  background-color: #fff;
  button {
    position: absolute;
    top: 0;
    right: 10px;
    margin-right: -1px;
    .ico {
      background-position-y: -40px;
    }
  }
  input {
    width: 250px;
    height: 100%;
    padding: 0 50px 0 10px;
    border: 0;
    background: transparent;
  }
`;

const CommActionBar = (props) => {
  const { reloadFunc } = props;
  const isSearch = props.isSearch;
  const isDate = props.isDate;
  const [active, setActive] = useState(false);

  const searchActive = () => {
    setActive(true);
  };
  const handleSearch = (id) => {};

  return (
    <div className="panelTitBar" style={{ border: "none", height: "45px" }}>
      <ActionArea>{props.children}</ActionArea>
      <SearchArea>
        {isSearch && (
          <SearchBar>
            {(active && (
              <SearchBox>
                <input
                  type="search"
                  placeholder="검색어를 입력해 주세요."
                  // onChange={}
                  // onKeyPress={}
                  // value={}
                />
                <CIconButton
                  icon="search"
                  tooltip="검색"
                  onClick={(e) => handleSearch(e)}
                />
              </SearchBox>
            )) || (
              <CIconButton
                icon="search"
                type="btn1"
                tooltip="검색"
                onClick={searchActive}
              />
            )}
          </SearchBar>
        )}

        {isDate && <CDatePicker />}

        <CIconButton
          icon="refresh"
          type="btn1"
          tooltip="새로고침"
          onClick={reloadFunc}
          style={{ border: "none !important" }}
        />
      </SearchArea>
    </div>
  );
};

export default CommActionBar;
