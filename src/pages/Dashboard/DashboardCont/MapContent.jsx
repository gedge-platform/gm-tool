import React, { useEffect, useRef } from "react";
import L from "leaflet";

const MapContent = () => {
  //   const mapFunc = () => {
  //     const map = L.map("map", { crs: L.CRS.Simple }).setView([0, 0], 4);
  //     L.tileLayer(
  //       "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  //       {
  //         maxZoom: 20,
  //         attribution:
  //           '© <a href="https://stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  //       }
  //     ).addTo(map);
  //     map.setMaxBounds(L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)));
  //   };

  //   useEffect(() => {
  //     mapFunc();
  //   }, []);

  const mapRef = useRef(null);

  const MAP_TILE = L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
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

  // This useEffect hook runs when the component is first mounted,
  // similar to componentDidMount() lifecycle method of class-based
  // components:
  useEffect(() => {
    mapRef.current = L.map("map", mapParams);
  });
  return (
    <div
      id="map"
      style={{ height: "100%", width: "100%", pointerEvents: "none" }}
    ></div>
  );
};

export default MapContent;
