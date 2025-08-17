import { useNavigate, useSearchParams } from 'react-router-dom';
import SaveNetForm from '../components/SaveNet/SaveNetForm';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchCity, getTaxDefValues, postPublicReport, postReport } from '../utils/apiCalls';
import AsyncStateWrapper from '../components/AsyncWrapper';
import WelcomeScreen from '../components/SaveNet/WelcomeScreen';
import TeaserScreen from '../components/SaveNet/TeaserScreen';
import InvalidScreen from '../components/SaveNet/InvalidScreen';
import { flowCounties } from '../utils/saveNet';
import type { ReportUserData } from '../types/api.types';
import { checkAndRefreshToken, getIdToken } from '../utils/token';
import TopLogo from '../components/Basic/TopLogo';
import { trackEvent } from '../utils/analytics';

function NetSavePage() {
  const [welcome, setWelcome] = useState<boolean>(true);
  const [invalidCity, setInvalidCity] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const cityId = searchParams.get('cityId');

  const {
    data: cityData,
    isSuccess: citySuccess,
    isLoading: cityIsLoading,
    isFetching: cityIsFetching,
    isError: cityIsError,
    error: cityError,
  } = useQuery({
    queryKey: ['GET_CITY_SAVE_NET', cityId],
    queryFn: () => fetchCity(Number(cityId)),
    enabled: !!cityId,
    retry: 2,
    staleTime: 60 * 60 * 1000,
  });

  const {
    data: taxData,
    isLoading: taxIsLoading,
    isFetching: taxIsFetching,
    isError: taxIsError,
    error: taxError,
  } = useQuery({
    queryKey: ['GET_COUNTY_CGT_DATA', cityData?.countriesId],
    queryFn: () => getTaxDefValues(Number(cityData?.countriesId)),
    enabled: !!cityData?.countriesId,
    retry: 2,
    staleTime: 60 * 60 * 1000,
  });

  const {
    data: publicData,
    isPending: publicIsPending,
    isSuccess: publicIsSuccess,
    mutate: publicMutate,
    isError: publicIsError,
    error: publicError,
  } = useMutation({
    mutationFn: postPublicReport,
    onSuccess: () => {
      setResult(true);
    },
  });

  const { isPending, isSuccess, mutate } = useMutation({
    mutationFn: postReport,
  });

  const sendData = async (data: ReportUserData) => {
    const isToken = await checkAndRefreshToken();
    if (!isToken) {
      publicMutate(data);
    } else {
      const token = getIdToken();
      mutate({ data, token });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard');
    }
  }, [isSuccess]);

  function getScreen() {
    if (invalidCity) return <InvalidScreen cityName={cityData?.name || ''} />;
    if (welcome)
      return (
        <WelcomeScreen
          cityName={cityData?.name || ''}
          onStart={() => {
            trackEvent('net-flow-result');
            setWelcome(false);
          }}
        />
      );
    if (publicIsSuccess && cityData && result)
      return (
        <TeaserScreen
          city={cityData}
          data={publicData}
          capitalGains={taxData?.[0].values}
          reset={() => {
            setResult(false);
          }}
        />
      );
    return <SaveNetForm sendData={sendData} cityId={Number(cityId) || 0} />;
  }

  useEffect(() => {
    if (citySuccess) {
      if (!flowCounties.includes(cityData.country)) {
        setInvalidCity(true);
      }
    }
  }, [citySuccess, cityData?.country]);

  return (
    <>
      <article>
        <title>{`Find out how much you can net in ${cityData?.name} | LifeRank`}</title>
        <meta
          name="description"
          content={`Net and save amounts in ${cityData?.name} for location independent workers`}
        />
        <meta
          name="keywords"
          content={`net amount in ${cityData?.name}, save amount in ${cityData?.name}  `}
        />
      </article>
      <div className="relative flex flex-col min-h-screen w-full px-4 pb-6 pt-2">
        <div className="relative bg-white w-full lg:w-[764px] mx-auto pt-4">
          <TopLogo />
          <div className="mt-2">
            <AsyncStateWrapper
              isLoading={
                cityIsLoading ||
                cityIsFetching ||
                publicIsPending ||
                isPending ||
                taxIsLoading ||
                taxIsFetching
              }
              isError={cityIsError || publicIsError || taxIsError}
              error={cityError || publicError || taxError}
            >
              {getScreen()}
            </AsyncStateWrapper>
          </div>
        </div>
      </div>
    </>
  );
}

export default NetSavePage;
