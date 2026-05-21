import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FeatureCollection } from 'geojson';

interface MapViewProps {
  geoData: FeatureCollection | null;
}

const MapView: React.FC<MapViewProps> = ({ geoData }) => {
  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom={false}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {geoData && <GeoJSON data={geoData} />}
    </MapContainer>
  );
};

export default MapView;