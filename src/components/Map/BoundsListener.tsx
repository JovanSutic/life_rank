import { useMap, useMapEvent } from 'react-leaflet';
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
    center: map.getCenter(),
  };
};

function BoundsListener({ onBoundsChange }: { onBoundsChange?: (bounds: MapData) => void }) {
  const { leftOpen, rightOpen } = useMapStore();
  const [suppressUpdate, setSuppressUpdate] = useState(false);
  const lastBoundsRef = useRef<MapData | null>(null);
  const isDraggingRef = useRef(false);
  const map = useMap();

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

  useMapEvent('zoomend', (e) => handleUpdate(e.target));

  useEffect(() => {
    const handleDragStart = () => {
      isDraggingRef.current = true;
    };

    const handleDragEnd = () => {
      isDraggingRef.current = false;
      handleUpdate(map);
    };

    map.on('dragstart', handleDragStart);
    map.on('dragend', handleDragEnd);

    return () => {
      map.off('dragstart', handleDragStart);
      map.off('dragend', handleDragEnd);
    };
  }, [map]);

  return null;
}

export default BoundsListener;
