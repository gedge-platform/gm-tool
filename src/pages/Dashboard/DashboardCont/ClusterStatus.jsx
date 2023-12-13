import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { dashboardStore, clusterStore } from "@/store";

const ClusterStatus = observer(() => {
  const { loadVMStatusCnt, configName } = dashboardStore;
  const { loadVMList, clusterList } = clusterStore;

  useEffect(() => {
    loadVMList();
    loadVMStatusCnt();
  }, []);

  console.log("clusterList: ", clusterList);
  // console.log("configName: ", configName);

  const clusterStatus = () => {
    let VMcount = 0;
    let runCount = 0;
    let stopCount = 0;
    let pauseCount = 0;
    // configName.map((e) => {
    //   if (clusterList.map((item) => item.ProviderName === e)) {
    //     VMcount++;
    //     if (item.VmStatus === "Suspended") {
    //       pauseCount++;
    //     }
    //   }
    // });
    configName.forEach((e) => {
      const providerExists = clusterList.some(
        (item) => item.ProviderName === e
      );
      console.log("providerExists: ", providerExists);
      if (providerExists) {
        VMcount++;
        const providerVM = clusterList.find((item) => item.ProviderName === e);
        if (providerVM.VmStatus === "Suspended") {
          pauseCount++;
        }
      }
    });
    console.log("VMcount: ", VMcount);
    console.log("clusterList2: ", clusterList);
    console.log("pauseCount: ", pauseCount);
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
      <div className="ClusterStatusBox">
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
      </div>
      {clusterStatus()}

      <div className="ClusterStatusBox">
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
      </div>

      {/* 스크롤 영역 테스트 */}
      <div className="ClusterStatusBox">
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
      </div>
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
