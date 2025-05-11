import { MapContainer, Marker, Popup, TileLayer, useMapEvent, ZoomControl } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { City } from '../types/api.types';

function ZoomListener({ onZoomChange }: { onZoomChange?: (zoom: number) => void }) {
  useMapEvent('zoomend', (event) => {
    const newZoom = event.target.getZoom();
    if (onZoomChange) {
      onZoomChange(newZoom);
    }
  });

  return null;
}

function MapScreen({
  position,
  zoom,
  pins,
  onZoomChange,
}: {
  position: LatLngExpression;
  zoom: number;
  pins: City[];
  onZoomChange?: (zoom: number) => void;
}) {
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
        <ZoomListener onZoomChange={onZoomChange} />

        {pins?.map((pin) => (
          <Marker key={pin.id} position={[pin.lat, pin.lng]}>
            <Popup>{pin.name ?? `Pin ${pin.id}`}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapScreen;
