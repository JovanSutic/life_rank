import { XMarkIcon } from '@heroicons/react/24/outline';
import { useMapStore } from '../../stores/mapStore';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SocialType, type Budget, type CrimesSummary, type Weather } from '../../types/api.types';
import AsyncStateWrapper from '../AsyncWrapper';
import CityInfoPanel from './CityInfoPanel';

async function fetchBudgets(cityId: number): Promise<Budget[]> {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/social_lifestyle?cityId=${cityId}`
    );
    return res.data.data;
  } catch (error) {
    console.error('Failed to fetch budgets:', error);
    throw error;
  }
}

async function fetchSummary(cityId: number): Promise<CrimesSummary> {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/crimes/summary?cityId=${cityId}&yearId=16`
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch summary:', error);
    throw error;
  }
}

async function fetchWeather(cityId: number): Promise<Weather> {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/weathers/city/${cityId}`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch weather:', error);
    throw error;
  }
}

export default function CitySide() {
  const { setRightOpen, focusCity } = useMapStore();

  const {
    data: budgets,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['GET_BUDGETS', focusCity?.id],
    queryFn: () => fetchBudgets(focusCity!.id),
    enabled: !!focusCity?.id,
    retry: 2,
    staleTime: 60 * 60 * 1000,
  });

  const {
    data: summary,
    isLoading: summaryIsLoading,
    isFetching: summaryIsFetching,
    isError: summaryIsError,
    error: summaryError,
  } = useQuery({
    queryKey: ['GET_CRIME_SUMMARY', focusCity?.id],
    queryFn: () => fetchSummary(focusCity!.id),
    enabled: !!focusCity?.id,
    retry: 2,
    staleTime: 60 * 60 * 1000,
  });

  const {
    data: weather,
    isLoading: weatherIsLoading,
    isFetching: weatherIsFetching,
    isError: weatherIsError,
    error: weatherError,
  } = useQuery({
    queryKey: ['GET_WEATHER', focusCity?.id],
    queryFn: () => fetchWeather(focusCity!.id),
    enabled: !!focusCity?.id,
    retry: 2,
    staleTime: 60 * 60 * 1000,
  });

  return (
    <div className="w-full h-full bg-white flex flex-col p-4">
      <div className="flex justify-end">
        <button
          onClick={() => setRightOpen(false)}
          aria-label="Close filters"
          className="text-2xl text-gray-500 hover:text-black cursor-pointer"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <AsyncStateWrapper
        isLoading={
          isLoading ||
          isFetching ||
          summaryIsLoading ||
          summaryIsFetching ||
          weatherIsLoading ||
          weatherIsFetching
        }
        isError={isError || summaryIsError || weatherIsError}
        error={error || summaryError || weatherError}
      >
        <CityInfoPanel
          cityData={{
            cityId: focusCity?.id || 0,
            cityName: focusCity?.name || '',
            countryName: focusCity?.country || '',
            inhabitants: focusCity?.size || 0,
            climate: 'hot and rainy',
            budgets: {
              solo: budgets?.find((item) => item.type === SocialType.SOLO)?.avg_price || 0,
              pair: budgets?.find((item) => item.type === SocialType.PAIR)?.avg_price || 0,
              family: budgets?.find((item) => item.type === SocialType.FAMILY)?.avg_price || 0,
            },
            safety: {
              overallCrimeConcernIndex: summary?.overallCrimeConcernIndex || 0,
              personalSafetyScore: summary?.personalSafetyScore || 0,
              crimeEscalationIndicator: summary?.crimeEscalationIndicator || 0,
            },
            weather: weather,
          }}
        />
      </AsyncStateWrapper>
    </div>
  );
}
