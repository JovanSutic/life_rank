import { XMarkIcon } from '@heroicons/react/24/outline';
import { useMapStore } from '../../stores/mapStore';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  SocialType,
  type Budget,
  type CityContext,
  type CrimesSummary,
} from '../../types/api.types';
import AsyncStateWrapper from '../AsyncWrapper';
import CityInfoPanel from './CityInfoPanel';
import { useSearchParams } from 'react-router-dom';

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

async function fetchCityContext(cityId: number): Promise<CityContext> {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/city-context/city/${cityId}`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch city context:', error);
    throw error;
  }
}

export default function CitySide() {
  const { setRightOpen, focusCity } = useMapStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const removeParam = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('city');
    params.delete('cityId');
    setSearchParams(params);
    setRightOpen(false);
  };

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
    data: contextData,
    isLoading: contextIsLoading,
    isFetching: contextIsFetching,
    isError: contextIsError,
    error: contextError,
  } = useQuery({
    queryKey: ['GET_CITY_CONTEXT', focusCity?.id],
    queryFn: () => fetchCityContext(focusCity!.id),
    enabled: !!focusCity?.id,
    retry: 2,
    staleTime: 60 * 60 * 1000,
  });

  return (
    <div className="w-full h-full bg-white flex flex-col p-4">
      <div className="flex justify-end">
        <button
          onClick={() => {
            removeParam();
          }}
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
          contextIsLoading ||
          contextIsFetching
        }
        isError={isError || summaryIsError || contextIsError}
        error={error || summaryError || contextError}
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
            contextualData: contextData,
          }}
        />
      </AsyncStateWrapper>
    </div>
  );
}
