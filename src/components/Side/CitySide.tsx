import { XMarkIcon } from '@heroicons/react/24/outline';
import { useMapStore } from '../../stores/mapStore';
import { useQuery } from '@tanstack/react-query';
import { SocialType } from '../../types/api.types';
import AsyncStateWrapper from '../AsyncWrapper';
import CityInfoPanel from './CityInfoPanel';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchBudgets, fetchCity, fetchSummary } from '../../utils/apiCalls';

export default function CitySide() {
  const { setRightOpen, setFocusCity, focusCity } = useMapStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const city = searchParams.get('city');
  const cityId = searchParams.get('cityId');

  useEffect(() => {
    if (cityId && city) {
      setRightOpen(true);
    } else {
      setRightOpen(false);
      setFocusCity(null);
    }
  }, [city, cityId]);

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
    data: exactData,
    isLoading: exactIsLoading,
    isFetching: exactIsFetching,
    isError: exactIsError,
    error: exactError,
  } = useQuery({
    queryKey: ['GET_CITY_EXACT', cityId],
    queryFn: () => fetchCity(Number(cityId)),
    enabled: !!cityId && !focusCity?.id,
    retry: 2,
    staleTime: 60 * 60 * 1000,
  });

  useEffect(() => {
    if (exactData?.id && !focusCity?.id) {
      setFocusCity(exactData);
    }
  }, [exactData?.id]);

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
          <XMarkIcon className="h-7 w-7" />
        </button>
      </div>
      <AsyncStateWrapper
        isLoading={
          isLoading ||
          isFetching ||
          summaryIsLoading ||
          summaryIsFetching ||
          exactIsLoading ||
          exactIsFetching
        }
        isError={isError || summaryIsError || exactIsError}
        error={error || summaryError || exactError}
      >
        <CityInfoPanel
          cityData={{
            cityId: focusCity?.id || 0,
            cityName: focusCity?.name || '',
            countryId: focusCity?.countriesId,
            countryName: focusCity?.country || '',
            inhabitants: focusCity?.size || 0,
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
          }}
        />
      </AsyncStateWrapper>
    </div>
  );
}
