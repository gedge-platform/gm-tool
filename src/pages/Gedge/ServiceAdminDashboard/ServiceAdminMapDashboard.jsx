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
  const currentPageTitle = Title.Dashboard;
  const mapRef = useRef();

  useEffect(() => {
    mapRef.current = L.map("serviceadminmap", mapParams);

    const pod = L.marker([37.681, 126.793], {
      icon: CustomIcon("violet"),
    }).addTo(mapRef.current);
    const pod2 = L.marker([37.4133351, -122.081267], {
      icon: CustomIcon("green"),
    }).addTo(mapRef.current);

    pod.bindPopup(
      `
                  <div class="leaflet-popup-title">
                      SEOUL, Republic of Korea
                    </div>
                  <div class="leaflet-popup-table">
                    <table>
                      <tr>
                        <th>Name</th>
                        <td>pod/inference2-7766c7b784-glptd</td>
                      </tr>
                      <tr>
                        <th>Status</th>
                        <td>Ready</td>
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
    pod2.bindPopup(
      `
                  <div class="leaflet-popup-title">
                  Mountain View, America
                  </div>
                  <div class="leaflet-popup-table">
                    <table>
                      <tr>
                        <th>Cluster</th>
                        <td>AZURE</td>
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
      <div
        id="serviceadminmap"
        style={{ height: "100%", width: "100%", pointerEvents: "none" }}
      ></div>
    </Layout>
  );
});

export default ServiceAdminMapDashboard;
