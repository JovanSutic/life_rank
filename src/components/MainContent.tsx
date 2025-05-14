import MapScreen from './Map/MapScreen';
import useDeviceType from '../hooks/useDeviceType';
import { getZoomSize } from '../utils/map';
import type { City } from '../types/api.types';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import AsyncStateWrapper from './AsyncWrapper';
import type { MapData } from '../types/map.types';
import { useState } from 'react';
import { useMapStore } from '../stores/mapStore';

async function fetchCities(bounds?: {
  north: number;
  south: number;
  east: number;
  west: number;
}): Promise<City[]> {
  const north = 58.401711667608;
  const south = 35.137879119634185;
  const east = 40.73730468750001;
  const west = -8.041992187500002;
  try {
    const queryParams = bounds
      ? `?north=${bounds.north}&south=${bounds.south}&east=${bounds.east}&west=${bounds.west}&take=30&sortBy=size&order=desc`
      : `?north=${north}&south=${south}&east=${east}&west=${west}&take=30&sortBy=size&order=desc`;

    const res = await axios.get(`${import.meta.env.VITE_API_URL}/cities${queryParams}`);
    return res.data.data;
  } catch (error) {
    console.error('Failed to fetch cities:', error);
    throw error;
  }
}

export default function MainContent() {
  const [bounds, setBounds] = useState<{
    north: number;
    south: number;
    east: number;
    west: number;
  } | null>(null);

  const { toggleLeft, setRightOpen, setFocusCity } = useMapStore();
  const device = useDeviceType();

  const {
    data: cities,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['GET_CITIES', bounds],
    queryFn: () => fetchCities(bounds ?? undefined),
    retry: 2,
  });

  if (!device) {
    return null;
  }

  const handleBoundsChange = (mapData: MapData) => {
    const { north, south, east, west } = mapData;
    setBounds({ north, south, east, west });
  };

  return (
    <div className="relative space-x-2 h-full">
      <AsyncStateWrapper isLoading={isLoading || isFetching} isError={isError} error={error}>
        <>
          <MapScreen
            position={[48.076498, 16.327318]}
            zoom={getZoomSize(device)}
            pins={cities || []}
            onBoundsChange={handleBoundsChange}
            onPinClick={(city: City) => {
              setRightOpen(true);
              setFocusCity(city);
            }}
          />
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xl md:text-2xl font-bold bg-transparent rounded-md z-[1000]">
            <span className="text-blue-800 text-shadow-lg">Life</span>
            <span className="text-gray-800 text-shadow-lg">Rank</span>
          </div>
          <button
            onClick={() => toggleLeft()}
            className="absolute cursor-pointer top-4 left-4 bg-white hover:bg-gray-100 text-black px-4 py-2 rounded shadow-md z-[1000]"
          >
            Filters
          </button>
        </>
      </AsyncStateWrapper>
    </div>
  );
}
