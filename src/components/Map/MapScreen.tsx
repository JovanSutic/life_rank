import { MapContainer, Marker, TileLayer, ZoomControl } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { City } from '../../types/api.types';
import type { MapData } from '../../types/map.types';
import BoundsListener from './BoundsListener';
import { MapResizer } from './MapResizer';

function MapScreen({
  position,
  zoom,
  pins,
  onBoundsChange,
  onPinClick,
}: {
  position: LatLngExpression;
  zoom: number;
  pins: City[];
  onBoundsChange?: (data: MapData) => void;
  onPinClick?: (city: City) => void;
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
        <MapResizer />
        <TileLayer
          {...{
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          }}
        />
        <ZoomControl position="bottomright" />
        <BoundsListener onBoundsChange={onBoundsChange} />

        {pins?.map((pin) => (
          <Marker
            key={pin.id}
            position={[pin.lat, pin.lng]}
            eventHandlers={{
              click: () => {
                if (onPinClick) {
                  onPinClick(pin);
                }
              },
            }}
          ></Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapScreen;
