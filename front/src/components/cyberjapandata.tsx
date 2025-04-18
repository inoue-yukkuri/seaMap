import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

const position: L.LatLngExpression = [35.5, 139.85];

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
        </MapContainer>
    );
};

export default CyberjapanData;
