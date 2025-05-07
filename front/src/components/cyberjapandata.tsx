import React, { useState } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import L from "leaflet";

const position: L.LatLngExpression = [35.5, 139.85];

// 地図情報を表示するコンポーネント
const MapInfo: React.FC = () => {
  const [coordinates, setCoordinates] = useState({
    lat: position[0],
    lng: position[1],
  });
  const [scale, setScale] = useState<number>(0);

  const map = useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      setCoordinates({ lat: center.lat, lng: center.lng });
    },
    zoomend: () => {
      // ズームレベルから縮尺を計算
      const zoom = map.getZoom();
      const metersPerPixel =
        (40075016.686 * Math.abs(Math.cos((coordinates.lat * Math.PI) / 180))) /
        Math.pow(2, zoom + 8);
      setScale(Math.round(metersPerPixel * 1000)); // 縮尺を計算（1:XXX形式）
    },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: "50px",
        width: "15%",
        height: "30%",
        backgroundColor: "black",
        color: "white",
        opacity: 0.7,
        padding: "10px",
        zIndex: 1000,
        borderRadius: "4px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0", fontSize: "1rem" }}>地図情報</h3>
      <div style={{ fontSize: "0.9rem" }}>
        <p style={{ margin: "5px 0" }}>緯度: {coordinates.lat.toFixed(6)}°</p>
        <p style={{ margin: "5px 0" }}>経度: {coordinates.lng.toFixed(6)}°</p>
        <p style={{ margin: "5px 0" }}>縮尺: 1:{scale}</p>
      </div>
    </div>
  );
};

const CyberjapanData: React.FC = () => {
  return (
    <MapContainer
      center={position as L.LatLngTuple}
      zoom={11}
      style={{ height: "100vh", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html">地理院タイル</a>'
        url="https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png"
        maxZoom={18}
      />
      <MapInfo />
    </MapContainer>
  );
};

export default CyberjapanData;
