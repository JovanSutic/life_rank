import MapScreen from './Map/MapScreen';
import useDeviceType from '../hooks/useDeviceType';
import type { City, CityFeel } from '../types/api.types';
import axios from 'axios';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import AsyncStateWrapper from './AsyncWrapper';
import type { MapData } from '../types/map.types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useMapStore } from '../stores/mapStore';
import OnboardingOverlay from './OnboardingOverlay';
import { debounce } from '../utils/map';
import { useSearchParams } from 'react-router-dom';

const NoResultsOverlay = ({ message = 'No results. Change the filters or move on the map.' }) => {
  return (
    <div className="absolute top-16 md:top-5 max-w-[320px] right-2 z-1000 flex items-center justify-center pointer-events-none">
      <div className="bg-red-400 text-white rounded-lg px-3 py-2 shadow-lg text-center text-sm sm:text-base">
        {message}
      </div>
    </div>
  );
};

async function fetchCities(params: URLSearchParams): Promise<CityFeel[]> {
  try {
    let queryParams = `?north=${params.get('north')}&south=${params.get('south')}&east=${params.get('east')}&west=${params.get('west')}&take=20&sortBy=rank&order=desc`;

    if (params.get('size')) {
      queryParams = `${queryParams}&size=${params.get('size')}`;
    }
    if (params.get('country')) {
      queryParams = `${queryParams}&country=${params.get('country')}`;
    }
    if (params.get('sea')) {
      queryParams = `${queryParams}&seaside=${params.get('sea')}`;
    }
    if (params.get('budget')) {
      queryParams = `${queryParams}&budget=${params.get('budget')}`;
    }
    if (params.get('rank') === 'true') {
      queryParams = `${queryParams}&rank=8`;
    }

    const res = await axios.get(`${import.meta.env.VITE_API_URL}/city-feel${queryParams}`);
    return res.data.data;
  } catch (error) {
    console.error('Failed to fetch cities:', error);
    throw error;
  }
}

export default function MainContent() {
  const [showOverlay, setShowOverlay] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const isProgrammaticUpdate = useRef(false);

  useEffect(() => {
    const seen = localStorage.getItem('seenMapOnboarding');
    if (!seen) {
      setShowOverlay(true);
      localStorage.setItem('seenMapOnboarding', 'true');
    }
  }, []);

  const { toggleLeft, setRightOpen, setFocusCity } = useMapStore();
  const device = useDeviceType();
  const lat = parseFloat(searchParams.get('centerLat') || '48.076498');
  const lng = parseFloat(searchParams.get('centerLng') || '16.327318');
  const zoom = parseFloat(searchParams.get('zoom') || '5');

  const {
    data: cities,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: [
      'GET_CITIES',
      `${searchParams.get('north')}-${searchParams.get('zoom')}-${searchParams.get('sea')}-${searchParams.get('size')}-${searchParams.get('country')}-${searchParams.get('rank')}-${searchParams.get('budget')}`,
    ],
    queryFn: () => fetchCities(searchParams ?? undefined),
    retry: 2,
    placeholderData: keepPreviousData,
  });

  const updateUrlWithMapState = (data: MapData) => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set('centerLat', data.center.lat.toFixed(5));
    newParams.set('centerLng', data.center.lng.toFixed(5));
    newParams.set('north', data.north.toFixed(5));
    newParams.set('south', data.south.toFixed(5));
    newParams.set('east', data.east.toFixed(5));
    newParams.set('west', data.west.toFixed(5));
    newParams.set('zoom', data.zoom.toString());

    setSearchParams(newParams, { replace: true });
  };

  const updateUrlWithCity = (city: City) => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set('city', city.name);
    newParams.set('cityId', city.id.toString());
    setSearchParams(newParams);

    setRightOpen(true);
    setFocusCity(city);
  };

  const handleBoundsChange = useMemo(
    () =>
      debounce((mapData: MapData) => {
        if (isProgrammaticUpdate.current) return;
        updateUrlWithMapState(mapData);
      }, 200),
    [
      `${searchParams.get('north')}-${searchParams.get('zoom')}-${searchParams.get('sea')}-${searchParams.get('size')}-${searchParams.get('country')}-${searchParams.get('rank')}-${searchParams.get('budget')}-${searchParams.get('cityId')}`,
    ]
  );

  if (!device) {
    return null;
  }

  return (
    <div className="relative space-x-2 h-full">
      {showOverlay && <OnboardingOverlay onClose={() => setShowOverlay(false)} />}
      {cities && cities.length === 0 && <NoResultsOverlay />}

      <AsyncStateWrapper
        isLoading={isLoading || isFetching}
        isError={isError}
        error={error}
        transparent={true}
      >
        <>
          <MapScreen
            position={[lat, lng]}
            zoom={zoom}
            pins={cities || []}
            isMobile={device === 'mobile'}
            onBoundsChange={handleBoundsChange}
            onPinClick={(city: City) => {
              updateUrlWithCity(city);
            }}
            isProgrammaticUpdate={isProgrammaticUpdate}
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
