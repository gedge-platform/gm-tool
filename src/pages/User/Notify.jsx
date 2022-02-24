import React, {useState} from 'react';
import Layout from "@/layout";
import { Title } from '@/pages';
import { PanelBox } from "@/components/styles/PanelBox";
import styled from 'styled-components';

const NotifyWrap = styled.div`
  .panel_notify {
    border-bottom-color: #c5cad0;
    min-height: 800px;
  }
`;
const NotifyList = styled.div`
  position: relative;
  padding: 30px;
  &::before {
    content: '';
    position: absolute;
    top: 30px;
    bottom: 30px;
    left: 36px;
    border-left: 3px solid #e0e2e5
  }
  ul {
    position: relative;
    padding-left: 14px;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -1px;
      width: 16px;
      height: 16px;
      border: 8px double #e0e2e5;
      border-radius: 50%;
      background: #fff;
    }
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: -1px;
      width: 16px;
      height: 16px;
      border: 8px double #e0e2e5;
      border-radius: 50%;
      background: #fff;
    }
  }
  li {
    position: relative;
    padding-left: 24px;
    display: flex;
    justify-content: flex-start;
    margin: -35px 0;
    &:first-child  {
      margin-top: 0
    }
    &:last-child  {
      margin-bottom: 0
    }
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      border-top: 2px dotted #e0e2e5;
      margin-top: -1px;
    }
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: -14px;
      width: 14px;
      height: 14px;
      border: 3px solid #e0e2e5;
      border-radius: 50%;
      background: #fff;
      transform: translateY(-50%);
    }
    .box {
      position: relative;
      width: calc(50% - 5px);
      border: 2px solid #e0e2e5;
      border-radius: 5px;
      padding: 16px 20px;
      background: linear-gradient(#fdfdfd,#f6f6f9);
      box-shadow: inset 0 0 1px #fff;
      line-height: 1.5em;
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: -8px;
        width: 14px;
        height: 14px;
        border: 3px solid #e0e2e5;
        border-radius: 50%;
        background: #fff;
        transform: translateY(-50%);
      }
    }    
    &:nth-child(even) {
      justify-content: flex-end;
      &::before {
        width: 60%
      }
    }
    &:nth-child(odd) {
      &::before {
        width: 24px;
      }
    }
    &.new {
      &::before, &::after,
      .box, .box::after {
        border-color: #ff5d4d
      }
    }
    .time {
      color: #6a7484;
      margin-bottom: 6px
    }
    .cont {
      font-size: 13px;
      color: #071e3f;
    }
  }
`;
const Notify = () => {
    const currentPage = Title.Notify;
    return (
        <Layout currentPage={currentPage}>
            <div className="headerOption">
                <div className="vmInfo">
                    <span>미확인 알림
                        <strong className="c3">2</strong>
                    </span>
                </div>
            </div>
            <NotifyWrap>
                <PanelBox className="panel_notify">
                    <NotifyList>
                        <ul>
                            <li className="new">
                                <div className="box">
                                    <div className="time">8 minutes ago</div>
                                    <div className="cont">
                                        1알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다.<br/>
                                        확인을 완료하면 앞에 빨간색 점이 점이 삭제됩니다.
                                    </div>
                                </div>
                            </li>
                            <li className="new">
                                <div className="box">
                                    <div className="time">8 minutes ago</div>
                                    <div className="cont">
                                        2알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다.<br/>
                                        확인을 완료하면 앞에 빨간색 점이 점이 삭제됩니다.
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="box">
                                    <div className="time">8 minutes ago</div>
                                    <div className="cont">
                                        3알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다.<br/>
                                        확인을 완료하면 앞에 빨간색 점이 점이 삭제됩니다.
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="box">
                                    <div className="time">8 minutes ago</div>
                                    <div className="cont">
                                        4알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다.<br/>
                                        확인을 완료하면 앞에 빨간색 점이 점이 삭제됩니다.<br/>
                                        알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다.<br/>
                                        확인을 완료하면 앞에 빨간색 점이 점이 삭제됩니다.<br/>
                                        알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다.<br/>
                                        확인을 완료하면 앞에 빨간색 점이 점이 삭제됩니다.<br/>
                                        알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다.<br/>
                                        확인을 완료하면 앞에 빨간색 점이 점이 삭제됩니다.<br/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="box">
                                    <div className="time">8 minutes ago</div>
                                    <div className="cont">
                                        5알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다. 알림이 내용이 표시 됩니다.<br/>
                                        확인을 완료하면 앞에 빨간색 점이 점이 삭제됩니다.
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </NotifyList>
                </PanelBox>
            </NotifyWrap>
        </Layout>
    );
}
export default Notify;
