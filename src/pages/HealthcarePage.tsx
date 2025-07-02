import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { fetchCurrency, fetchHealthcare } from '../utils/apiCalls';
import { useQuery } from '@tanstack/react-query';
import NewsletterModal from '../components/Basic/NewsletterModal';
import AsyncStateWrapper from '../components/AsyncWrapper';
import { useMapStore } from '../stores/mapStore';
import SettingsButton from '../components/Basic/SettingsButton';
import SideTabs from '../components/Healthcare/SideTabs';
import PanelTable from '../components/Healthcare/PanelTable';
import HCTable from '../components/Healthcare/HCTable';
import type {
  HealthMetricItem,
  MissingSpecialtyItem,
  PanelTableItem,
  TierData,
} from '../types/city.types';
import HCTiersList from '../components/Healthcare/HCTiersList';
import HCRating from '../components/Healthcare/HCRating';
import HCMissingTable from '../components/Healthcare/HCMissingTable';
import { useMemo } from 'react';
import { getBudgetLabel } from '../utils/map';
import {
  calculateHealthcareScore,
  getHealthBenchmarks,
  getHealthPanels,
  getHealthPanelsText,
  getHealthTiers,
  getMissingSpec,
} from '../utils/city';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

function HealthCarePage() {
  const { name } = useParams();
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get('city');
  const countryParam = searchParams.get('country');
  const navigate = useNavigate();

  const {
    currency: currencyName,
    currencyIndex,
    newsLetterShow,
    toggleNewsletterShow,
  } = useMapStore();

  const { data: currency } = useQuery({
    queryKey: ['GET_CURRENCY'],
    queryFn: () => fetchCurrency(),
    retry: 2,
    staleTime: 60 * 60 * 1000,
  });

  const {
    data: countryData,
    isLoading: countryIsLoading,
    isFetching: countryIsFetching,
    isError: countryIsError,
    error: countryError,
  } = useQuery({
    queryKey: ['GET_HEALTHCARE_COUNTRY_DATA', countryParam],
    queryFn: () => fetchHealthcare(Number(countryParam), 'countryId'),
    enabled: !!countryParam,
    retry: 2,
    staleTime: 60 * 60 * 1000,
  });

  const {
    data: cityData,
    isLoading: cityIsLoading,
    isFetching: cityIsFetching,
    isError: cityIsError,
    error: cityError,
  } = useQuery({
    queryKey: ['GET_HEALTHCARE_CITY_DATA', idParam],
    queryFn: () => fetchHealthcare(Number(idParam), 'cityId'),
    enabled: !!idParam,
    retry: 2,
    staleTime: 60 * 60 * 1000,
  });

  const healthcareTiers: TierData[] = useMemo(() => {
    if (countryData) {
      return getHealthTiers(countryData);
    }
    return [];
  }, [countryData]);

  const healthcareTiersPricing: Record<string, PanelTableItem[]> = useMemo(() => {
    if (countryData) {
      return getHealthPanels(countryData);
    }
    return {};
  }, [countryData]);

  const missingSpecialties: MissingSpecialtyItem[] = useMemo(() => {
    if (cityData) {
      return getMissingSpec(cityData);
    }
    return [];
  }, [cityData]);

  const {
    healthcareList,
    healthcareScore,
  }: { healthcareList: HealthMetricItem[]; healthcareScore: number } = useMemo(() => {
    if (cityData) {
      const healthcareList = getHealthBenchmarks(cityData);
      const healthcareScore = calculateHealthcareScore(healthcareList);

      return {
        healthcareList,
        healthcareScore,
      };
    }
    return { healthcareList: [], healthcareScore: 0 };
  }, [cityData]);

  const travelTier = useMemo(() => {
    const travelTier: TierData = {
      title: '🟦 Travel Insurance – Short-Term Visitors',
      items: [
        'Access to emergency care in public hospitals (ER, ambulance)',
        'Coverage for acute illness and accidental injuries',
        `Required for Schengen Visa applicants (min. ${getBudgetLabel(currencyName, currencyIndex, 30000, false)} medical coverage)`,
        'No access to assigned GP or long-term specialist care via SSN',
        'Repatriation coverage often included in plans',
        `Typical cost: ${getBudgetLabel(currencyName, currencyIndex, 1.2, false)}–${getBudgetLabel(currencyName, currencyIndex, 4.5, false)}/day depending on age and coverage level`,
      ],
    };
    return travelTier;
  }, [currencyIndex]);

  if (
    !(countryIsLoading || countryIsFetching || cityIsLoading || cityIsFetching) &&
    !cityData?.length
  ) {
    return <div className="text-center text-2xl">Data is still not available for this city</div>;
  }
  return (
    <div className="relative flex flex-col min-h-screen w-full px-6 pb-6 pt-2">
      <NewsletterModal show={newsLetterShow} onClose={toggleNewsletterShow} />
      <AsyncStateWrapper
        isLoading={countryIsLoading || countryIsFetching || cityIsLoading || cityIsFetching}
        isError={countryIsError || cityIsError}
        error={countryError || cityError}
      >
        <div className="relative bg-white w-full lg:w-[764px] mx-auto pt-4">
          {currency && <SettingsButton currency={currency} type="dark" top={0} />}
          <div className="w-full">
            <h1 className="text-lg text-center lg:text-2xl font-bold text-gray-800 mb-2 ">
              Healthcare in {name}
            </h1>
          </div>

          <div className="bg-white pb-6 mb-6 pt-2 lg:px-0 flex flex-col">
            <div className="mb-8">
              <p className="text-sm md:text-base text-gray-800 mb-4">
                {
                  'Italy offers a universal public healthcare system known as the SSN (Servizio Sanitario Nazionale), which provides broad coverage to residents, including EU citizens and many non-EU residents with the right permits. In addition to the SSN, many residents choose to use private healthcare — either paying out of pocket or through private insurance — for faster access, specialist choice, or services not fully covered by the public system (like dental or mental health care).'
                }
              </p>
              <p className="text-sm md:text-base text-gray-800 mb-4">
                {
                  'Italy consistently ranks among the top 10–20 healthcare systems globally in terms of overall outcomes, life expectancy, and access, according to sources like the OECD and World Health Organization (WHO). However, quality and speed can vary by region, and understanding your insurance options is key to navigating care efficiently.'
                }
              </p>
              <div className="flex justify-center mt-2">
                <Link
                  to="/blog/healthcare-system-italy"
                  className="inline-block px-4 py-1.5 rounded-lg bg-gray-200 text-black font-semibold text-sm hover:bg-gray-300"
                >
                  🧾 Healthcare System in Italy
                </Link>
              </div>
            </div>
            <div className="bg-white mt-2">
              <HCRating score={healthcareScore} city={name || ''} />
            </div>

            <div className="mt-8">
              <p className="text-lg md:text-xl text-gray-800 font-semibold mb-4">
                Healthcare benchmarks
              </p>
              <p className="text-sm md:text-base text-gray-800 mb-4">
                {`The table bellow presents how ${name} healthcare system performs using international benchmarks like the OECD health indicators and the Euro Health Consumer Index (EHCI). These metrics give a clearer picture of service quality, access, and overall system performance, which can be useful when evaluating what to expect as a resident`}
              </p>
              <HCTable
                headers={['Metric', 'Estimate', 'Benchmark', 'Comment']}
                data={healthcareList}
              />
            </div>

            <div className="bg-white mt-6">
              <p className="text-lg md:text-xl text-gray-800 font-semibold mb-4">
                Not available services
              </p>
              <p className="text-sm md:text-base text-gray-800 mb-4">
                {
                  'Specialty services not available locally and typically require travel to a regional or national hospital.'
                }
              </p>
              <HCMissingTable
                headers={['Specialty', 'Comment', 'Alternative city']}
                data={missingSpecialties}
              />
              <p className="text-xs md:text-sm italic text-gray-800 mt-4">
                *Based on available online data of local and regional health service directories.
                For more accurate information you should verify directly with the local hospitals
                and clinics.
              </p>
            </div>

            <div className="mt-8 mb-8">
              <p className="text-lg md:text-xl text-gray-800 font-semibold mb-4">Insurance</p>
              <p className="text-sm md:text-base text-gray-800 mb-4">
                {
                  ' We have broken down health insurance into three practical tiers to help you choose what best fits your lifestyle, expectations, and budget. Each tier builds on the one before it, starting from the mandatory public system and scaling up to include faster, more personalized care through private insurance.'
                }
              </p>
              <HCTiersList data={healthcareTiers} />

              <div className="mt-6">
                <p className="text-base text-gray-800 font-semibold mb-4">Yearly price estimates</p>
                <SideTabs tabs={healthcareTiers.map((item) => item.title)}>
                  {Object.keys(healthcareTiersPricing)
                    .reverse()
                    .map((key: string) => {
                      const pricing = healthcareTiersPricing[key];
                      const text = getHealthPanelsText(key);
                      return (
                        <div key={key}>
                          <PanelTable
                            name="tier3"
                            title={text.title}
                            punchline={text.sub}
                            currency={currencyName}
                            index={currencyIndex}
                            data={pricing}
                          />
                        </div>
                      );
                    })}
                </SideTabs>
              </div>

              <div className="mt-6">
                <p className="text-base text-gray-800 font-semibold mb-4">
                  For tourists (stays up to 90 days)
                </p>
                <HCTiersList data={[travelTier]} />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center px-4 py-2 rounded-lg cursor-pointer bg-blue-600 text-white font-semibold text-md hover:bg-blue-700"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-1" />
                Go back
              </button>
            </div>
          </div>
        </div>
      </AsyncStateWrapper>
    </div>
  );
}

export default HealthCarePage;
