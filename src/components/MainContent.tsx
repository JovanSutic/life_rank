import MapScreen from './Map/MapScreen';
import useDeviceType from '../hooks/useDeviceType';
import type { City, CityFeel } from '../types/api.types';
import axios from 'axios';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import AsyncStateWrapper from './AsyncWrapper';
import type { MapData } from '../types/map.types';
import { useEffect, useState } from 'react';
import { useMapStore } from '../stores/mapStore';
import OnboardingOverlay from './OnboardingOverlay';

async function fetchCities(bounds?: {
  north: number;
  south: number;
  east: number;
  west: number;
}): Promise<CityFeel[]> {
  const north = 58.401711667608;
  const south = 35.137879119634185;
  const east = 40.73730468750001;
  const west = -8.041992187500002;
  try {
    const queryParams = bounds
      ? `?north=${bounds.north}&south=${bounds.south}&east=${bounds.east}&west=${bounds.west}&take=34&sortBy=rank&order=desc`
      : `?north=${north}&south=${south}&east=${east}&west=${west}&take=34&sortBy=rank&order=desc`;

    const res = await axios.get(`${import.meta.env.VITE_API_URL}/city-feel${queryParams}`);
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

  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('seenMapOnboarding');
    if (!seen) {
      setShowOverlay(true);
      localStorage.setItem('seenMapOnboarding', 'true');
    }
  }, []);

  const { toggleLeft, setRightOpen, setFocusCity } = useMapStore();
  const device = useDeviceType();

  const {
    data: cities,
    isError,
    error,
  } = useQuery({
    queryKey: ['GET_CITIES', bounds],
    queryFn: () => fetchCities(bounds ?? undefined),
    retry: 2,
    placeholderData: keepPreviousData,
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
      {showOverlay && <OnboardingOverlay onClose={() => setShowOverlay(false)} />}

      <AsyncStateWrapper isLoading={false} isError={isError} error={error}>
        <>
          <MapScreen
            position={[48.076498, 16.327318]}
            zoom={5}
            pins={cities || []}
            isMobile={device === 'mobile'}
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
