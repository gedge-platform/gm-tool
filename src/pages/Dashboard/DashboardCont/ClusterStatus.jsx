import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { dashboardStore, clusterStore } from "@/store";
import { useState } from "react";

const ClusterStatus = observer(() => {
  const [VMList, setVMList] = useState({});
  const { loadVMStatusCnt, configName } = dashboardStore;
  const { loadVMList, clusterList } = clusterStore;

  useEffect(() => {
    loadVMList();
    loadVMStatusCnt();
  }, [VMList]);

  const clusterStatus = () => {
    let VMcount = 0;
    let runCount = 0;
    let stopCount = 0;
    let pauseCount = 0;

    configName.forEach((e) => {
      // 사용하려는 프로바이더명이 clusterList 배열에 존재하는지 확인
      const providerVMs = clusterList.filter(
        (item) => item.ProviderName === e.ProviderName
      );
      // 해당 프로바이더의 모든 VM에 대해 반복
      providerVMs.forEach((providerVM) => {
        VMcount++;

        // 해당 프로바이더의 VM 상태 확인
        if (providerVM.VmStatus === "Suspended") {
          pauseCount++;
        } else if (providerVM.VmStatus === "Running") {
          runCount++;
        } else if (providerVM.VmStatus === "Stop") {
          stopCount++;
        }
      });

      VMList[e.ProviderName] = {
        VMcount,
        pauseCount,
        runCount,
        stopCount,
      };

      VMcount = 0;
      pauseCount = 0;
      runCount = 0;
      stopCount = 0;
    });
  };

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
      {/* <div className="ClusterStatusBox">
        <div className="ClusterStatusIcon openstack"></div>
        <div className="ClusterStatusInfoBox">
          <div className="Count">
            1 <span>클러스터</span>
          </div>
          <div className="Count">
            3 <span>VM</span>
          </div>
        </div>
        <div className="ClusterStatusList">
          <ul>
            <li className="run">
              <span className="tit">실행</span> <span>3</span>
            </li>
            <li className="stop">
              <span className="tit">중지</span> <span>0</span>
            </li>
            <li className="pause">
              <span className="tit">일시중지</span> <span>0</span>
            </li>
          </ul>
        </div>
      </div> */}
      {clusterStatus()}
      {Object.keys(VMList).map((providerName) => {
        const e = VMList[providerName];

        return (
          <div className="ClusterStatusBox" key={providerName}>
            <div
              className={`ClusterStatusIcon ${
                providerName === "OPENSTACK"
                  ? "openstack"
                  : providerName === "AWS"
                  ? "aws"
                  : providerName === "GCP"
                  ? "google"
                  : "azure"
              }`}
            ></div>
            <div className="ClusterStatusInfoBox">
              <div className="Count">
                1 <span>클러스터</span>
              </div>
              <div className="Count">
                {e.VMcount} <span>VM</span>
              </div>
            </div>
            <div className="ClusterStatusList">
              <ul>
                <li className="run">
                  <span className="tit">실행</span>
                  <span>{e.runCount}</span>
                </li>
                <li className="stop">
                  <span className="tit">중지</span>
                  <span>{e.stopCount}</span>
                </li>
                <li className="pause">
                  <span className="tit">일시중지</span>
                  <span>{e.pauseCount}</span>
                </li>
              </ul>
            </div>
          </div>
        );
      })}

      {/* <div className="ClusterStatusBox">
        <div className="ClusterStatusIcon google"></div>
        <div className="ClusterStatusInfoBox">
          <div className="Count">
            1 <span>클러스터</span>
          </div>
          <div className="Count">
            3 <span>VM</span>
          </div>
        </div>
        <div className="ClusterStatusList">
          <ul>
            <li className="run">
              <span className="tit">실행</span> <span>3</span>
            </li>
            <li className="stop">
              <span className="tit">중지</span> <span>0</span>
            </li>
            <li className="pause">
              <span className="tit">일시중지</span> <span>0</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="ClusterStatusBox">
        <div className="ClusterStatusIcon aws"></div>
        <div className="ClusterStatusInfoBox">
          <div className="Count">
            1 <span>클러스터</span>
          </div>
          <div className="Count">
            3 <span>VM</span>
          </div>
        </div>
        <div className="ClusterStatusList">
          <ul>
            <li className="run">
              <span className="tit">실행</span> <span>3</span>
            </li>
            <li className="stop">
              <span className="tit">중지</span> <span>0</span>
            </li>
            <li className="pause">
              <span className="tit">일시중지</span> <span>0</span>
            </li>
          </ul>
        </div>
      </div> */}

      {/* 스크롤 영역 테스트 */}
      {/* <div className="ClusterStatusBox">
        <div className="ClusterStatusIcon"></div>

        <div className="ClusterStatusInfoBox">
          <div className="Count">
            <span>클러스터</span>
          </div>
          <div className="Count">
            <span>VM</span>
          </div>
        </div>
        <div className="ClusterStatusList">
          <ul>
            <li className="run">
              <span className="tit">실행</span> <span></span>
            </li>
            <li className="stop">
              <span className="tit">중지</span> <span></span>
            </li>
            <li className="pause">
              <span className="tit">일시중지</span> <span></span>
            </li>
          </ul>
        </div>
      </div> */}
      {/* <div className="ClusterStatusBox">
        <div className="ClusterStatusIcon"></div>

        <div className="ClusterStatusInfoBox">
          <div className="Count">
            <span>클러스터</span>
          </div>
          <div className="Count">
            <span>VM</span>
          </div>
        </div>
        <div className="ClusterStatusList">
          <ul>
            <li className="run">
              <span className="tit">실행</span> <span></span>
            </li>
            <li className="stop">
              <span className="tit">중지</span> <span></span>
            </li>
            <li className="pause">
              <span className="tit">일시중지</span> <span></span>
            </li>
          </ul>
        </div>
      </div> */}
    </div>
  );
});
export default ClusterStatus;
