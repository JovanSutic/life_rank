import { MapContainer, Marker, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { City, Layer } from '../../types/api.types';
import type { MapData } from '../../types/map.types';
import BoundsListener from './BoundsListener';
import { MapResizer } from './MapResizer';
import createCustomIcon from './MapIcon';
import MapViewUpdater from './MapUpdater';
import { trackEvent } from '../../utils/analytics';
import { useMapStore } from '../../stores/mapStore';
import { getBudgetLabel } from '../../utils/map';

function MapScreen({
  position,
  zoom,
  pins,
  onBoundsChange,
  onPinClick,
  isMobile = false,
  isProgrammaticUpdate,
}: {
  position: [number, number];
  zoom: number;
  pins: Layer[];
  onBoundsChange?: (data: MapData) => void;
  onPinClick?: (city: City) => void;
  isMobile?: boolean;
  isProgrammaticUpdate: React.RefObject<boolean>;
}) {
  const { currency, currencyIndex } = useMapStore();
  return (
    <div className="w-full h-full">
      <MapContainer
        className="w-full h-full"
        center={position}
        zoom={zoom}
        attributionControl={false}
        doubleClickZoom={false}
        scrollWheelZoom={true}
        zoomControl={false}
        maxBounds={[
          [25.0, -25.0],
          [70.0, 54.0],
        ]}
        maxBoundsViscosity={1.0}
        minZoom={5}
        maxZoom={9}
      >
        <MapViewUpdater center={position} zoom={zoom} isProgrammaticUpdate={isProgrammaticUpdate} />
        <MapResizer />
        <TileLayer
          {...{
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          }}
        />
        {!isMobile && <ZoomControl position="bottomright" />}

        <BoundsListener onBoundsChange={onBoundsChange} />

        {pins?.map((pin) => (
          <Marker
            key={pin.id}
            position={[pin.city.lat, pin.city.lng]}
            icon={createCustomIcon(
              getBudgetLabel(currency, currencyIndex, pin.value, true),
              pin.city.name,
              isMobile
            )}
            eventHandlers={{
              click: () => {
                if (onPinClick) {
                  onPinClick(pin.city);
                  trackEvent('map-city-click', {
                    name: pin.city.name,
                    id: pin.cityId,
                  });
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
