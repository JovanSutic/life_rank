import { useNavigate, useSearchParams } from 'react-router-dom';
import SaveNetForm from '../components/SaveNet/SaveNetForm';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCity, postPublicReport, postReport } from '../utils/apiCalls';
import AsyncStateWrapper from '../components/AsyncWrapper';
import WelcomeScreen from '../components/SaveNet/WelcomeScreen';
import TeaserScreen from '../components/SaveNet/TeaserScreen';
import InvalidScreen from '../components/SaveNet/InvalidScreen';
import { flowCounties } from '../utils/saveNet';
import type { ReportUserData } from '../types/api.types';
import { checkAndRefreshToken, getIdToken } from '../utils/token';
import TopLogo from '../components/Basic/TopLogo';
import { useMapStore } from '../stores/mapStore';
import { trackEvent } from '../utils/analytics';

function NetSavePage() {
  const [welcome, setWelcome] = useState<boolean>(true);
  const [invalidCity, setInvalidCity] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const { saveNetData } = useMapStore();
  const queryClient = useQueryClient();
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
    data: publicData,
    isPending: publicIsPending,
    isSuccess: publicIsSuccess,
    mutate: publicMutate,
    isError: publicIsError,
    error: publicError,
  } = useMutation({
    mutationFn: postPublicReport,
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
      await queryClient.invalidateQueries({ queryKey: ['GET_USER_REPORTS'] });
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
            trackEvent('net-flow-start');
            setWelcome(false);
          }}
        />
      );
    if (publicIsSuccess)
      return (
        <TeaserScreen
          cityName={cityData?.name || ''}
          netIncome={publicData.net}
          savings={publicData.save}
        />
      );
    return (
      <SaveNetForm sendData={sendData} cityId={Number(cityId) || 0} defaultValues={saveNetData} />
    );
  }

  useEffect(() => {
    if (citySuccess) {
      if (!flowCounties.includes(cityData.country)) {
        setInvalidCity(true);
      }
    }
  }, [citySuccess, cityData?.country]);

  useEffect(() => {
    if (saveNetData) {
      setWelcome(false);
    }
  }, []);

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
      <div className="relative flex flex-col min-h-screen w-full px-6 pb-6 pt-2">
        <div className="relative bg-white w-full lg:w-[764px] mx-auto pt-4">
          <TopLogo />
          <div className="mt-2">
            <AsyncStateWrapper
              isLoading={cityIsLoading || cityIsFetching || publicIsPending || isPending}
              isError={cityIsError || publicIsError}
              error={cityError || publicError}
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
