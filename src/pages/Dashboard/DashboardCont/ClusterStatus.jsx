import { observer } from "mobx-react";
import React, { useEffect } from "react";
import dashboardStore from "../../../store/Dashboard";

const ClusterStatus = observer(() => {
  const {
    loadCredentialName,
    loadVMCnt,
    ConfigName,
    Paused,
    Running,
    Stop,
    VMCnt,
    VMList,
    connectionconfig,
    ProviderName,
  } = dashboardStore;
  console.log(VMList);

  useEffect(() => {
    loadCredentialName();
  }, []);

  const clusterStatus = () => {
    return ConfigName.map((val) => (
        <div className="ClusterStatusBox">
        <div className="ClusterStatusIcon azure"></div>
        <div className="ClusterStatusInfoBox">
          <div className="Count">10<span>{val}</span></div>
          <div className="Count">{VMCnt} <span>VM</span></div>
        </div>
        <div className="ClusterStatusList">
          <ul>
            <li className="run"><span className="tit">실행</span> <span>{Running}</span></li>
            <li className="stop"><span className="tit">중지</span> <span>{Stop}</span></li>
            <li className="pause"><span className="tit">일시중지</span> <span>{Paused}</span></li>
          </ul>
        </div>
      </div>
    ));
  };
  

  return (
    <div className="ClusterStatusWrap">      
    {clusterStatus()}  
      {/* <div className="ClusterStatusBox">
        <div className="ClusterStatusIcon azure"></div>
        <div className="ClusterStatusInfoBox">
          <div className="Count">10<span>클러스터</span></div>
          <div className="Count">{VMCnt} <span>VM</span></div>
        </div>
        <div className="ClusterStatusList">
          <ul>
            <li className="run"><span className="tit">실행</span> <span>{Running}</span></li>
            <li className="stop"><span className="tit">중지</span> <span>{Stop}</span></li>
            <li className="pause"><span className="tit">일시중지</span> <span>{Paused}</span></li>
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
  