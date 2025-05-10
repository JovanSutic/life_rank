import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

function MapScreen({ position, zoom }: { position: LatLngExpression; zoom: number }) {
  return (
    <div className="w-full h-full">
      <MapContainer
        className="w-full h-full"
        center={position}
        zoom={zoom}
        attributionControl={false}
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <TileLayer
          {...{
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          }}
        />
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
}

export default MapScreen;
