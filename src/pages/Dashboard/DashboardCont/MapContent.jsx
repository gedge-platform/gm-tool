import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { observer } from "mobx-react";
import dashboardStore from "../../../store/Dashboard";
import { address } from "react-dom-factories";
import { toJS } from "mobx";

const MapContent = observer(() => {
  const mapRef = useRef(null);

  const { edgeInfo, loadMapInfo, loadMapInfoList, point, x, y } =
    dashboardStore;

  const MAP_TILE = L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=0f6be85b-e0ce-41a2-af27-e96c56b394fb",
    {
      maxZoom: 20,
      attribution:
        '© <a href="https://stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    }
  );

  // Define the styles that are to be passed to the map instance:
  const mapStyles = {
    overflow: "hidden",
    width: "100%",
    height: "100vh",
  };

  const mapParams = {
    center: [37.481, 126.893],
    zoom: 10,
    zoomControl: true,
    maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
    layers: [MAP_TILE],
  };

  const CustomIcon = (color) =>
    new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

  const loadMapCluster = (idx) => {
    `
      <div class="leaflet-popup-title">
       ${edgeInfo[idx].address}
      </div>
      <div class="leaflet-popup-table">
      <table>
        <tr>
          <th>Cluster</th>
          <td>${edgeInfo[idx].clusterType}</td>
        </tr>
        <tr>
          <th rowspan="3">Status</th>
          <td>
            <div class="box run">
              <span class="tit">실행</span><span>7</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="box stop">
              <span class="tit">중지</span><span>2</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="box pause">
              <span class="tit">일시중지</span><span>1</span>
            </div>
          </td>
        </tr>
      </table>
    </div>
    `;
  };

  // This useEffect hook runs when the component is first mounted,
  // similar to componentDidMount() lifecycle method of class-based
  // components:
  useEffect(() => {
    loadMapInfo();
    console.log(x[0]);
    mapRef.current = L.map("map", mapParams);
    loadCluster();
    // console.log(y[0]);
    // const cluster = x.map((map, idx) => {
    //   L.marker([y[idx], map]),{
    //     icon: CustomIcon("green"),
    //   }.addTo(mapRef.current)
    // });
    // const cluster = L.marker([y, x], {
    //   icon: CustomIcon("green"),
    // }).addTo(mapRef.current);
    // const cluster2 = L.marker([37.681, 126.793], {
    //   icon: CustomIcon("violet"),
    // }).addTo(mapRef.current);
    // const cluster3 = L.marker([37.581, 127.003], {
    //   icon: CustomIcon("red"),
    // }).addTo(mapRef.current);

    // cluster.bindPopup(
    //   `
    //     <div class="leaflet-popup-title">
    //       SEOUL, Republic of Korea
    //     </div>
    //     <div class="leaflet-popup-table">
    //       <table>
    //         <tr>
    //           <th>Cluster</th>
    //           <td>AZURE</td>
    //         </tr>
    //         <tr>
    //           <th rowspan="3">Status</th>
    //           <td>
    //             <div class="box run">
    //               <span class="tit">실행</span><span>7</span>
    //             </div>
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>
    //             <div class="box stop">
    //               <span class="tit">중지</span><span>2</span>
    //             </div>
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>
    //             <div class="box pause">
    //               <span class="tit">일시중지</span><span>1</span>
    //             </div>
    //           </td>
    //         </tr>
    //       </table>
    //     </div>
    //   `
    // );
    // cluster2.bindPopup(
    //   `
    //     <div class="leaflet-popup-title">
    //         SEOUL, Republic of Korea
    //       </div>
    //     <div class="leaflet-popup-table">
    //       <table>
    //         <tr>
    //           <th>Cluster</th>
    //           <td>AZURE</td>
    //         </tr>
    //         <tr>
    //           <th rowspan="3">Status</th>
    //           <td>
    //             <div class="box run">
    //               <span class="tit">실행</span><span>7</span>
    //             </div>
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>
    //             <div class="box stop">
    //               <span class="tit">중지</span><span>2</span>
    //             </div>
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>
    //             <div class="box pause">
    //               <span class="tit">일시중지</span><span>1</span>
    //             </div>
    //           </td>
    //         </tr>
    //       </table>
    //     </div>
    //   `
    // );
    // cluster3.bindPopup(
    //   `
    //     <div class="leaflet-popup-title">
    //       SEOUL, Republic of Korea
    //     </div>
    //     <div class="leaflet-popup-table">
    //       <table>
    //         <tr>
    //           <th>Cluster</th>
    //           <td>AZURE</td>
    //         </tr>
    //         <tr>
    //           <th rowspan="3">Status</th>
    //           <td>
    //             <div class="box run">
    //               <span class="tit">실행</span><span>7</span>
    //             </div>
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>
    //             <div class="box stop">
    //               <span class="tit">중지</span><span>2</span>
    //             </div>
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>
    //             <div class="box pause">
    //               <span class="tit">일시중지</span><span>1</span>
    //             </div>
    //           </td>
    //         </tr>
    //       </table>
    //     </div>
    //   `
    // );
  }, []);

  console.log(x[0]);
  // console.log(y[0]);
  // console.log("page x "+ x[0]);
  const loadCluster = () => {
    console.log("dd " + y[0]);
    // mapRef.current = L.map("map", mapParams);
    x.map((map, idx) => {
      L.marker([y[idx], map]),
        {
          icon: CustomIcon("green"),
        }.addTo(mapRef.current);
      // loadMapCluster(idx)
    });
  };

  return (
    <div
      id="map"
      style={{ height: "100%", width: "100%", pointerEvents: "none" }}
      // 지도 크기 조정
    ></div>
  );
});

export default MapContent;
