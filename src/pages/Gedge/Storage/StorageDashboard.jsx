import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "@/layout";
import { Title } from "@/pages";
import { PanelBox } from "@/components/styles/PanelBox";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import styled from "styled-components";
import Detail from "@/pages/Gedge/Platform/Detail";
import clusterStore from "@/store/Cluster";
import storageStore from "@/store/StorageClass";
import PieChart from "./PieChart"
import RadialBarChart from "./RadialBarChart"
const StoragePageWrap = styled.div`
  padding: 0 10px;
  .panel_summary {
    width: 100%;
    margin-bottom: 12px;
    background: #202842;
    border: 0;
    border-radius: 8px;
    &::before {
      display: none;
    }
  }
  .panel_table {
    width: 100%;
    padding: 10px;
    background: #202842;
    border: 0;
    border-radius: 8px;
  }
`;

const StorageDashboard = observer(() => {
  const currentPageTitle = Title.StorageDashboard;

  const [tabvalue, setTabvalue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const { clusterDetail, loadClusterList } = clusterStore;
  const { cephDashboard, loadStorageMonit } = storageStore;
  const history = useHistory();

  useLayoutEffect(() => {
    // loadClusterList("edge");



  }, []);

  useEffect(() => {
    loadStorageMonit();
  }, []);


  return (
    <Layout currentPageTitle={currentPageTitle}>
      <StoragePageWrap>
        <PanelBox className="panel_summary">
          <div className="storageBoxWrap">
            <div className="storageBox">
              <div className="storageBoxTitle">{cephDashboard.clusterStatus}</div>
              <div className="storageBoxTxt">Ceph Cluster Status</div>
            </div>

            <div className="storageBox">
              <div className="storageBoxTitle">{cephDashboard.ceph_osd_up} up, {cephDashboard.ceph_osd_in} in / {cephDashboard.ceph_osd_in} total</div>
              <div className="storageBoxTxt">OSDs</div>
            </div>

            <div className="storageBox">
              <div className="storageBoxTitle">{cephDashboard.ceph_pool_num}</div>
              <div className="storageBoxTxt">Pools</div>
            </div>

            <div className="storageBox">
              <div className="storageBoxTitle">{cephDashboard.ceph_pg_per_osd}</div>
              <div className="storageBoxTxt">PGs per OSD</div>
            </div>

            <div className="storageBox">
              <div className="storageBoxTitle">{cephDashboard.ceph_mon_quorum_status}</div>
              <div className="storageBoxTxt">Monitors</div>
            </div>

            <div className="storageBox">
              <div className="storageBoxTitle">{cephDashboard.ceph_mds_count}</div>
              <div className="storageBoxTxt">Active MDS</div>
            </div>
          </div>
        </PanelBox>

        <PanelBox className="panel_summary">
          <div className="storageCircleBoxWrap">
            <div className="storageCircleBox">
              <div className="storageCircleBoxTitle">Row Capacity</div>
              <div className="storageCircleBoxCont">
                <PieChart total={true} label={["avail", "used"]} value={[cephDashboard.ceph_cluster_total_avail_bytes, cephDashboard.ceph_cluster_total_used_bytes]} />
              </div>
              <div className="contTxt">
                <ul>
                  <li className="used">
                    <span className="tit">Used</span> <span>{cephDashboard.ceph_cluster_total_used_bytes} GiB</span>
                  </li>
                  <li className="avail">
                    <span className="tit">Avail</span> <span>{cephDashboard.ceph_cluster_total_avail_bytes} GiB</span>
                  </li>
                  <li className="total"> <span className="tit">Total</span> <span>{cephDashboard.ceph_cluster_total_bytes} GiB</span></li>
                  <li className="none"></li>
                </ul>
              </div>
            </div>

            <div className="storageCircleBox">
              <div className="storageCircleBoxTitle">OSD</div>
              <div className="storageCircleBoxCont">
                <PieChart total={false} label={["in", "out", "up", "down"]} value={[cephDashboard.ceph_osd_in, cephDashboard.ceph_osd_out, cephDashboard.ceph_osd_up, cephDashboard.ceph_osd_down]} />
                {/* 아래 Circle 의 원형 테두리는 예시임 실제 개발시에 CSS를 빼야함
                <div className="circle object">
                  <div className="circleCount">4.4k</div>
                  <div className="circleTxt">objects</div>
                </div> */}
              </div>
              <div className="contTxt">
                <ul>
                  <li className="clean">
                    <span className="tit">In</span> <span>{cephDashboard.ceph_osd_in}</span>
                  </li>
                  <li className="working">
                    <span className="tit">Out</span> <span>{cephDashboard.ceph_osd_out}</span>
                  </li>
                  <li className="warning">
                    <span className="tit">Up</span> <span>{cephDashboard.ceph_osd_up}</span>
                  </li>
                  <li className="unknown">
                    <span className="tit">Down</span> <span>{cephDashboard.ceph_osd_down}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="storageCircleBox">
              <div className="storageCircleBoxTitle">PG Status</div>
              <div className="storageCircleBoxCont">
                <PieChart total={false} label={["active", "clean"]} value={[cephDashboard.ceph_pg_active, cephDashboard.ceph_pg_clean]} />
                {/* 아래 Circle 의 원형 테두리는 예시임 실제 개발시에 CSS를 빼야함
                <div className="circle object">
                  <div className="circleCount">4.4k</div>
                  <div className="circleTxt">objects</div>
                </div> */}
              </div>
              <div className="contTxt">
                <ul>
                  <li className="clean">
                    <span className="tit">active</span> <span>{cephDashboard.ceph_pg_active}</span>
                  </li>
                  <li className="working">
                    <span className="tit">clean</span> <span>{cephDashboard.ceph_pg_clean}</span>
                  </li>
                  <li className="none"></li>
                  <li className="none"></li>
                </ul>
              </div>
            </div>
            <div className="storageCircleBox">
              <div className="storageCircleBoxTitle">Objects</div>
              <div className="storageCircleBoxCont">
                <PieChart total={true} label={["healthy", "misplaced", "degraded", "unfound"]} value={[cephDashboard.ceph_objects_healthy, cephDashboard.ceph_objects_misplaced, cephDashboard.ceph_objects_degraded, cephDashboard.ceph_objects_unfound]} />
                {/* 아래 Circle 의 원형 테두리는 예시임 실제 개발시에 CSS를 빼야함
                <div className="circle object">
                  <div className="circleCount">4.4k</div>
                  <div className="circleTxt">objects</div>
                </div> */}
              </div>
              <div className="contTxt">
                <ul>
                  <li className="clean">
                    <span className="tit">Healthy</span> <span>{cephDashboard.ceph_objects_healthy}</span>
                  </li>
                  <li className="working">
                    <span className="tit">Misplaced</span> <span>{cephDashboard.ceph_objects_misplaced}</span>
                  </li>
                  <li className="warning">
                    <span className="tit">Degraded</span> <span>{cephDashboard.ceph_objects_degraded}</span>
                  </li>
                  <li className="unknown">
                    <span className="tit">Unfound</span> <span>{cephDashboard.ceph_objects_unfound}</span>
                  </li>
                </ul>
              </div>
            </div>
            {/* 
            <div className="storageCircleBox">
              <div className="storageCircleBoxTitle">OSD Latency</div>
              <div className="storageCircleBoxCont">
                <RadialBarChart label={["read", "write"]} value={[cephDashboard.osd_read_latency, cephDashboard.osd_write_latency]} />
               
              </div>
              <div className="contTxt">
                <ul>
                  <li className="reads">
                    <span className="tit">Reads</span> <span>{cephDashboard.osd_read_latency} m/s</span>
                  </li>
                  <li className="writes">
                    <span className="tit">Writes</span> <span>{cephDashboard.osd_write_latency} m/s</span>
                  </li>
                  <li className="none"></li>
                  <li className="none"></li>
                </ul>
              </div>
            </div>

            <div className="storageCircleBox">
              <div className="storageCircleBoxTitle">Client IOPS</div>
              <div className="storageCircleBoxCont">
                <RadialBarChart label={["read", "write"]} value={[cephDashboard.read_iops, cephDashboard.write_iops]} />
              </div>
              <div className="contTxt">
                <ul>
                  <li className="reads">
                    <span className="tit">Reads</span> <span>{cephDashboard.read_iops}</span>
                  </li>
                  <li className="writes">
                    <span className="tit">Writes</span> <span>{cephDashboard.write_iops}</span>
                  </li>
                  <li className="none"></li>
                  <li className="none"></li>
                </ul>
              </div>
            </div>

            <div className="storageCircleBox">
              <div className="storageCircleBoxTitle">Client Throughput</div>
              <div className="storageCircleBoxCont">
                <RadialBarChart label={["read", "write"]} value={[cephDashboard.read_throughput, cephDashboard.write_throughput]} />
              </div>
              <div className="contTxt">
                <ul>
                  <li className="reads">
                    <span className="tit">Reads</span> <span>{cephDashboard.read_throughput} KB/s</span>
                  </li>
                  <li className="writes">
                    <span className="tit">Writes</span> <span>{cephDashboard.write_throughput} KB/s</span>
                  </li>
                  <li className="none"></li>
                  <li className="none"></li>
                </ul>
              </div>
            </div>*/}
          </div>
        </PanelBox>


        <PanelBox className="panel_summary">
          <div className="storageCircleBoxWrap">
            <div className="storageCircleBox2">
              <div className="storageCircleBoxTitle2">Workspace 총 개수</div>
              <div className="storageCircleBoxCont2">
                <PieChart total={true} label={["healthy", "misplaced", "degraded", "unfound"]} value={[cephDashboard.ceph_objects_healthy, cephDashboard.ceph_objects_misplaced, cephDashboard.ceph_objects_degraded, cephDashboard.ceph_objects_unfound]} />
              </div>
            </div>

            <div className="storageCircleBox2">
              <div className="storageCircleBoxTitle2">Project 총 개수</div>
              <div className="storageCircleBoxCont2">
                <PieChart total={true} label={["healthy", "misplaced", "degraded", "unfound"]} value={[cephDashboard.ceph_objects_healthy, cephDashboard.ceph_objects_misplaced, cephDashboard.ceph_objects_degraded, cephDashboard.ceph_objects_unfound]} />
              </div>
            </div>

            <div className="storageCircleBox2">
              <div className="storageCircleBoxTitle2">Pod 총 개수</div>
              <div className="storageCircleBoxCont2">
                <PieChart total={true} label={["healthy", "misplaced", "degraded", "unfound"]} value={[cephDashboard.ceph_objects_healthy, cephDashboard.ceph_objects_misplaced, cephDashboard.ceph_objects_degraded, cephDashboard.ceph_objects_unfound]} />
              </div>
            </div>
          </div>

        </PanelBox>
        {/* <div className="storageCircleBoxWrap">
              <div className="storageCircleBox2">
                <div className="storageCircleBoxTitle">Row Capacity</div>
                <div className="storageCircleBoxCont">
                  <PieChart total={true} label={["avail", "used"]} value={[cephDashboard.ceph_cluster_total_avail_bytes, cephDashboard.ceph_cluster_total_used_bytes]} />
                </div>
              </div>
              <div className="storageCircleBox2">
                <div className="storageCircleBoxTitle">Row Capacity</div>
                <div className="storageCircleBoxCont">
                  <PieChart total={true} label={["avail", "used"]} value={[cephDashboard.ceph_cluster_total_avail_bytes, cephDashboard.ceph_cluster_total_used_bytes]} />
                </div>
              </div>
              <div className="storageCircleBox2">
                <div className="storageCircleBoxTitle">Row Capacity</div>
                <div className="storageCircleBoxCont">
                  <PieChart total={true} label={["avail", "used"]} value={[cephDashboard.ceph_cluster_total_avail_bytes, cephDashboard.ceph_cluster_total_used_bytes]} />
                </div>
              </div>
            </div> */}
        {/* </CReflexBox> */}
        {/* </div> */}
      </StoragePageWrap>
    </Layout>
  );
});
export default StorageDashboard;
