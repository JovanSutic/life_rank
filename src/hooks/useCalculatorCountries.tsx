import { useQuery } from '@tanstack/react-query';
import { getCalculatorCountries } from '../utils/apiCalls';

export function useCalculatorCountries() {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['GET_CALCULATOR_COUNTRIES'],
    queryFn: () => getCalculatorCountries(),
    enabled: true,
    retry: 1,
    staleTime: 60 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  };
}
