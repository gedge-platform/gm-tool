import axios from "axios";
import { observer } from "mobx-react";
import React, { useEffect, useLayoutEffect } from "react";
import dashboardStore from "../../../store/Dashboard";

const ClusterStatus = observer(() => {
  const {
    loadCredentialName,
    loadVMStatusCnt,
    loadVMCnt,
    // ConfigName,
    // vmCntList,
    vmStatusList,
    connectionconfig,
    ProviderName,
  } = dashboardStore;

  useEffect(() => {
    // loadCredentialName();
    // loadVMStatusCnt();
    // clusterStatus2();
  }, []);

  // console.log(vmStatusList);
  // if (vmStatusList === undefined) {
  //   loadVMStatusCnt();
  // } else {
  //   console.log(vmStatusList);
  //   return vmStatusList.map((val) => {
  //     <div className="ClusterStatusBox">
  //       <div className="ClusterStatusIcon azure"></div>
  //       <div className="ClusterStatusInfoBox">
  //         <div className="Count">
  //           10<span>{val.ConfigName}</span>
  //         </div>
  //         <div className="Count">
  //           10<span>VM</span>
  //         </div>
  //       </div>
  //       <div className="ClusterStatusList">
  //         <ul>
  //           <li className="run">
  //             <span className="tit">실행</span> <span>{val.running}</span>
  //           </li>
  //           <li className="stop">
  //             <span className="tit">중지</span> <span>{val.stop}</span>
  //           </li>
  //           <li className="pause">
  //             <span className="tit">일시중지</span> <span>{val.paused}</span>
  //           </li>
  //         </ul>
  //       </div>
  //     </div>;
  //   });
  // }

  //   console.log(vmStatusList);
  // return vmStatusList.map((val) => {
  //   <div className="ClusterStatusBox">
  //     <div className="ClusterStatusIcon azure"></div>
  //     <div className="ClusterStatusInfoBox">
  //       <div className="Count">10<span>{val.ConfigName}</span></div>
  //       <div className="Count">10<span>VM</span></div>
  //     </div>
  //     <div className="ClusterStatusList">
  //       <ul>
  //         <li className="run"><span className="tit">실행</span> <span>{val.running}</span></li>
  //         <li className="stop"><span className="tit">중지</span> <span>{val.stop}</span></li>
  //         <li className="pause"><span className="tit">일시중지</span> <span>{val.paused}</span></li>
  //       </ul>
  //     </div>
  //   </div>
  // });
  // };

  return (
    <div className="ClusterStatusWrap">
      {/* {clusterStatus2()}   */}
      {/* {dashboardstatus()} */}
      {/* {console.log(vmStatusList)}
      <div className="ClusterStatusBox">
        <div className="ClusterStatusIcon azure"></div>
        <div className="ClusterStatusInfoBox">
          <div className="Count">10<span>클러스터</span></div>
          <div className="Count"><span>VM</span></div>
        </div>
        <div className="ClusterStatusList">
          <ul>
            <li className="run"><span className="tit">실행</span> <span></span></li>
            <li className="stop"><span className="tit">중지</span> <span></span></li>
            <li className="pause"><span className="tit">일시중지</span> <span></span></li>
          </ul>
        </div>
      </div> */}
      {/* <div className="ClusterStatusBox">
        <div className="ClusterStatusIcon google"></div>
        <div className="ClusterStatusInfoBox">
          <div className="Count">10 <span>클러스터</span></div>
          <div className="Count">10 <span>VM</span></div>
        </div>
        <div className="ClusterStatusList">
          <ul>
            <li className="run"><span className="tit">실행</span> <span>7</span></li>
            <li className="stop"><span className="tit">중지</span> <span>2</span></li>
            <li className="pause"><span className="tit">일시중지</span> <span>1</span></li>
          </ul>
        </div>
      </div> */}

      {/* <div className="ClusterStatusBox">
                <div className="ClusterStatusIcon openstack"></div>
                <div className="ClusterStatusInfoBox">
                <div className="Count">10 <span>클러스터</span></div>
                    <div className="Count">10 <span>VM</span></div>
                </div>
                <div className="ClusterStatusList">
                    <ul>
                        <li className="run"><span className="tit">실행</span> <span>7</span></li>
                        <li className="stop"><span className="tit">중지</span> <span>2</span></li>
                        <li className="pause"><span className="tit">일시중지</span> <span>1</span></li>
                    </ul>
                </div>
            </div> */}

      {/* <div className="ClusterStatusBox">
                <div className="ClusterStatusIcon aws"></div>
                <div className="ClusterStatusInfoBox">
                    <div className="Count">10 <span>클러스터</span></div>
                    <div className="Count">10 <span>VM</span></div>
                </div>
                <div className="ClusterStatusList">
                    <ul>
                        <li className="run"><span className="tit">실행</span> <span>7</span></li>
                        <li className="stop"><span className="tit">중지</span> <span>2</span></li>
                        <li className="pause"><span className="tit">일시중지</span> <span>1</span></li>
                    </ul>
                </div>
            </div> */}

      {/* 스크롤 영역 테스트 */}
      {/* <div className="ClusterStatusBox">
                <div className="ClusterStatusIcon azure"></div>
                <div className="ClusterStatusInfoBox">
                <div className="Count">10 <span>클러스터</span></div>
                    <div className="Count">10 <span>VM</span></div>
                </div>
                <div className="ClusterStatusList">
                    <ul>
                        <li className="run"><span className="tit">실행</span> <span>7</span></li>
                        <li className="stop"><span className="tit">중지</span> <span>2</span></li>
                        <li className="pause"><span className="tit">일시중지</span> <span>1</span></li>
                    </ul>
                </div>
            </div> */}
    </div>
  );
});
export default ClusterStatus;
