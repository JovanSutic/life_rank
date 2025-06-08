import { useMap } from 'react-leaflet';
import { useEffect, useRef } from 'react';
import type { LatLng } from 'leaflet';

function MapViewUpdater({
  center,
  zoom,
  isProgrammaticUpdate,
}: {
  center: [number, number];
  zoom: number;
  isProgrammaticUpdate: React.RefObject<boolean>;
}) {
  const map = useMap();
  const currentZoom = useRef(map.getZoom());

  useEffect(() => {
    if (currentZoom.current !== zoom || map.getCenter() !== (center as unknown as LatLng)) {
      isProgrammaticUpdate.current = true;
      map.setView(center, zoom, { animate: false });

      setTimeout(() => {
        isProgrammaticUpdate.current = false;
      }, 300);
    }
  }, [center[0], center[1], zoom, map]);

  return null;
}

export default MapViewUpdater;
