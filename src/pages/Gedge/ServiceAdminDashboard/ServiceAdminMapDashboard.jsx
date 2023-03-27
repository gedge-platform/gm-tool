import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { observer } from "mobx-react";
import styled from "styled-components";
import Layout from "@/layout";
import { Title } from "@/pages";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";

const LeafletContainer = styled.div`
  width: 600px;
  height: 600px;
  margin: 10px;
`;

const ServiceAdminMapDashboard = observer(() => {
  const currentPageTitle = "Pod 대시보드";
  const mapRef = useRef();

  useEffect(() => {
    mapRef.current = L.map("serviceadminmap", mapParams);

    const ilsanPod = L.marker([37.6637621, 126.7689594], {
      icon: CustomIcon("red"),
    }).addTo(mapRef.current);

    const ilsanPod2 = L.marker([37.6641716, 126.7686815], {
      icon: CustomIcon("blue"),
    }).addTo(mapRef.current);

    const americaPod1 = L.marker([40.09341, -82.75018], {
      icon: CustomIcon("red"),
    }).addTo(mapRef.current);

    ilsanPod.bindPopup(
      `
                  <div class="leaflet-popup-title">
                  경기도 고양시 일산동구 중앙로 1333
                    </div>
                  <div class="leaflet-popup-table">
                    <table>
                      <tr>
                        <th>Name</th>
                        <td>pod/inference2-7766c7b784-glptd</td>
                      </tr>
                      <tr>
                        <th>Status</th>
                        <td>Running</td>
                      </tr>
                      <tr>
                        <th>IP</th>
                        <td>10.244.8.100</td>
                      </tr>
                      <tr>
                        <th>Node</th>
                        <td>gedgew01</td>
                      </tr>
                    </table>
                  </div>
                `
    );
    ilsanPod2.bindPopup(
      `
      <div class="leaflet-popup-title">
      경기도 고양시 일산동구 중앙로 1333
        </div>
      <div class="leaflet-popup-table">
        <table>
          <tr>
            <th>Name</th>
            <td>pod/postprocess2-8b65c487b-ttdvv</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>Running</td>
          </tr>
          <tr>
            <th>IP</th>
            <td>10.244.8.103</td>
          </tr>
          <tr>
            <th>Node</th>
            <td>gedgew01</td>
          </tr>
        </table>
      </div>
                `
    );
    americaPod1.bindPopup(
      `
      <div class="leaflet-popup-title">
      2570 Beech Rd NW, Johnstown, OH 43031 미국
        </div>
      <div class="leaflet-popup-table">
        <table>
          <tr>
            <th>Name</th>
            <td>preprocess2-5b786958f6-dsdpj</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>Running</td>
          </tr>
          <tr>
            <th>IP</th>
            <td>10.244.0.5</td>
          </tr>
          <tr>
            <th>Node</th>
            <td>aws-edge-1</td>
          </tr>
        </table>
      </div>
                `
    );
  }, []);

  const MAP_TILE = L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=0f6be85b-e0ce-41a2-af27-e96c56b394fb",
    {
      maxZoom: 20,
      attribution:
        '© <a href="https://stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    }
  );

  const mapStyles = {
    overflow: "hidden",
    width: "100%",
    height: "100vh",
  };

  const mapParams = {
    center: [37.5587619, 126.974145],
    zoom: 2,
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

  return (
    <Layout currentPageTitle={currentPageTitle}>
      <>
        {" "}
        <div
          id="serviceadminmap"
          style={{ height: "100%", width: "100%" }}
        ></div>
      </>
    </Layout>
  );
});

export default ServiceAdminMapDashboard;
