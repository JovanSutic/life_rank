import { useMapEvent } from 'react-leaflet';
import type { Map as LeafletMap } from 'leaflet';
import { useState, useEffect, useRef } from 'react';
import type { MapData } from '../../types/map.types';
import { useMapStore } from '../../stores/mapStore';

const getBoundsData = (map: LeafletMap): MapData => {
  const bounds = map.getBounds();
  return {
    north: bounds.getNorth(),
    south: bounds.getSouth(),
    east: bounds.getEast(),
    west: bounds.getWest(),
    zoom: map.getZoom(),
  };
};

function BoundsListener({ onBoundsChange }: { onBoundsChange?: (bounds: MapData) => void }) {
  const { leftOpen, rightOpen } = useMapStore();
  const [suppressUpdate, setSuppressUpdate] = useState(false);
  const lastBoundsRef = useRef<MapData | null>(null);

  useEffect(() => {
    setSuppressUpdate(true);
    const timeout = setTimeout(() => {
      setSuppressUpdate(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [leftOpen, rightOpen]);

  const handleUpdate = (mapInstance: LeafletMap) => {
    if (suppressUpdate) return;
    const newBounds = getBoundsData(mapInstance);

    const hasChanged = JSON.stringify(lastBoundsRef.current) !== JSON.stringify(newBounds);
    if (hasChanged) {
      lastBoundsRef.current = newBounds;
      onBoundsChange?.(newBounds);
    }
  };

  useMapEvent('moveend', (e) => handleUpdate(e.target));
  useMapEvent('zoomend', (e) => handleUpdate(e.target));

  return null;
}

export default BoundsListener;
