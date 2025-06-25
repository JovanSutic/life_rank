import { Link, useParams, useSearchParams } from 'react-router-dom';
import { fetchBudgets, fetchCity, fetchCityContext, fetchCurrency } from '../utils/apiCalls';
import { useQuery } from '@tanstack/react-query';
import NewsletterModal from '../components/Basic/NewsletterModal';
import AsyncStateWrapper from '../components/AsyncWrapper';
import BudgetSelector from '../components/Budget/BudgetSelector';
import { useMemo } from 'react';
import { SocialType } from '../types/api.types';
import { useMapStore } from '../stores/mapStore';
import SettingsButton from '../components/Basic/SettingsButton';
import BackButton from '../components/Basic/BackButton';
import { MapPinIcon } from '@heroicons/react/24/solid';
import ExpandableText from '../components/Basic/ExpendableText';
import useDeviceType from '../hooks/useDeviceType';
import SideTabs from '../components/City/SideTabs';
import PanelTable from '../components/City/PanelTable';
import HCTable from '../components/City/HCTable';
import type { HealthMetricItem, PanelTableItem, TierData } from '../types/city.types';
import HCTiersList from '../components/City/HCTiersList';

const healthcareTiers: TierData[] = [
  {
    title: '🟩 Tier 3 – SSN Only',
    items: [
      'Assigned general practitioner (GP / medico di base)',
      'Access to public specialists (with referral)',
      'Hospitalization and surgeries in public hospitals',
      'Emergency care (ambulance, ER)',
      'Partially reimbursed prescriptions',
      'Basic maternity, pediatric, and chronic disease coverage',
      'Low-income exemptions available via ISEE',
    ],
  },
  {
    title: '🟨 Tier 2 – SSN + Supplemental Private',
    items: [
      'Faster access to specialists and diagnostics (via private clinics)',
      'Partial coverage for private dental care, vision, and physiotherapy',
      'Some freedom to choose private doctors (without referral)',
      'Shorter wait times for key tests (MRI, CT, bloodwork)',
      'Optional English-speaking doctors in private network',
      'Semi-private hospital rooms or priority scheduling',
    ],
  },
  {
    title: '🟥 Tier 1 – SSN + Full Private',
    items: [
      'Full access to private hospitals and surgical clinics',
      'Direct specialist access (no referrals)',
      'Private mental health therapy and advanced diagnostics',
      'Concierge-style care and international coverage (on some plans)',
      'Full reimbursement for private treatments and second opinions',
      'Choice of doctor, language, and facility for nearly all services',
      'Travel/emergency coverage outside Italy (for global plans)',
    ],
  },
];

const tier1: PanelTableItem[] = [
  {
    title: 'Age 40-50',
    from: 4000,
    to: 4800,
  },
  {
    title: 'Age 50-60',
    from: 4300,
    to: 5000,
  },
  {
    title: 'Age 60-70',
    from: 4500,
    to: 5700,
  },
];
const tier2: PanelTableItem[] = [
  {
    title: 'Age 40-50',
    from: 1800,
    to: 2500,
  },
  {
    title: 'Age 50-60',
    from: 2000,
    to: 2800,
  },
  {
    title: 'Age 60-70',
    from: 2500,
    to: 3500,
  },
];
const tier3: PanelTableItem[] = [
  {
    title: 'Age 40-50',
    from: 387,
    to: 900,
  },
  {
    title: 'Age 50-60',
    from: 387,
    to: 900,
  },
  {
    title: 'Age 60-70',
    from: 387,
    to: 900,
  },
];

const healthcareList: HealthMetricItem[] = [
  {
    name: 'Doctors per 1k residents',
    value: '~3.4 (Puglia avg)',
    bench: 'OECD avg: 3.9',
    comment: 'Below average due to staffing shortages',
  },
  {
    name: 'Nurses  per 1k residents',
    value: '~4.6',
    bench: 'OECD avg: 8.8',
    comment: 'Significantly below; nurse gap affects care quality',
  },
  {
    name: 'Hospital beds per 1k residents',
    value: '~2.8',
    bench: 'OECD avg: 4.3',
    comment: 'Capacity limited by staff, not infrastructure',
  },
  {
    name: 'Average ER wait time',
    value: 'Often 6–12 hours',
    bench: 'EHCI target: <1 hour',
    comment: 'Far below standard; severe under-staffing at ERs',
  },
  {
    name: 'Access to specialists',
    value: 'Delayed (1–6 month wait without private)',
    bench: 'EHCI: Should be within 1 month',
    comment: 'Poor access in public system',
  },
  {
    name: 'Mortality amenable to healthcare',
    value: 'Not locally published; Puglia ~85/100k',
    bench: 'Italy avg: 71/100k',
    comment: 'Slightly worse than national average',
  },
  {
    name: 'Patient rights & choice',
    value: 'Moderate',
    bench: 'EHCI: High in Italy overall',
    comment: 'Taranto lacks English-speaking or digital booking tools',
  },
  {
    name: 'Availability of private care',
    value: 'Low but improving',
    bench: 'N/A',
    comment: 'Limited private hospital network; some diagnostics available',
  },
  {
    name: 'Health outcomes (life expectancy)',
    value: 'Puglia: ~82.4 years',
    bench: 'Italy avg: 83.6; OECD avg: ~81',
    comment: 'Slightly below national average',
  },
  {
    name: 'Public spending per capita (Puglia)',
    value: '~€2,050/year',
    bench: 'Italy avg: ~€2,500/year',
    comment: 'One of the lowest in Italy',
  },
];

function CityPage() {
  const { name } = useParams();
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get('id');
  const device = useDeviceType();

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
    data: exactData,
    isLoading: exactIsLoading,
    isFetching: exactIsFetching,
    isError: exactIsError,
    error: exactError,
  } = useQuery({
    queryKey: ['GET_CITY_EXACT', idParam],
    queryFn: () => fetchCity(Number(idParam)),
    enabled: !!idParam,
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
    queryKey: ['GET_CITY_CONTEXT', idParam],
    queryFn: () => fetchCityContext(Number(idParam || 0)),
    enabled: !!idParam,
    retry: 2,
    staleTime: 60 * 60 * 1000,
  });

  const {
    data: budgets,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['GET_BUDGETS', idParam],
    queryFn: () => fetchBudgets(Number(idParam || 0)),
    enabled: !!idParam,
    retry: 2,
  });

  const budgetData = useMemo(() => {
    return {
      SOLO: budgets?.find((item) => item.type === SocialType.SOLO)?.avg_price || 0,
      PAIR: budgets?.find((item) => item.type === SocialType.PAIR)?.avg_price || 0,
      FAMILY: budgets?.find((item) => item.type === SocialType.FAMILY)?.avg_price || 0,
    };
  }, [budgets]);

  console.log(contextData);

  if (Number(idParam) !== 267 || name !== 'Taranto') {
    return <div>Data is still not available for this city</div>;
  }
  return (
    <div className="relative flex flex-col min-h-screen w-full px-2 pb-6 pt-2">
      <NewsletterModal show={newsLetterShow} onClose={toggleNewsletterShow} />
      <AsyncStateWrapper
        isLoading={
          contextIsLoading ||
          contextIsFetching ||
          isLoading ||
          isFetching ||
          exactIsLoading ||
          exactIsFetching
        }
        isError={contextIsError || isError || exactIsError}
        error={contextError || error || exactError}
      >
        <div className="relative bg-white w-full lg:w-[764px] mx-auto pt-4">
          {currency && <SettingsButton currency={currency} type="dark" />}
          <BackButton />
          <div className="w-full">
            <h1 className="text-lg text-center lg:text-2xl font-semibold text-gray-800 mb-2 ">
              {name} insights
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pb-6 mb-6 md:gap-4 mt-10 lg:mt-8">
            <div className="md:py-2 px-6 md:px-4">
              <div className="w-full rounded-xl overflow-hidden border border-gray-300 shadow">
                <img
                  className="w-max-full"
                  src="https://www.celebritycruises.com/blog/content/uploads/2022/03/taranto-italy-history-street-1024x678.jpg"
                  alt="taranto-pic"
                />
              </div>
              <div className="mt-1 flex flex-col items-center py-2">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5 text-blue-500" /> {exactData?.name},{' '}
                  {exactData?.country}
                </h2>
                <p className="text-gray-500 text-base">
                  Population: {exactData?.size.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-center mb-2">
                <Link
                  to="/europe?centerLat=41.96999&centerLng=14.72409&north=46.12106&south=35.03250&east=18.84397&west=10.60422&zoom=6&budget=7000&size=1000000&sea=false&rank=false&country=Italy&centerLat=40.80781"
                  className="inline-block px-4 py-1.5 rounded-lg bg-blue-700 text-white font-semibold text-sm hover:bg-blue-800"
                >
                  🗺️ See it on the map
                </Link>
              </div>
            </div>
            <div className="px-4">
              <ExpandableText
                text={contextData?.detailedStory || ''}
                limit={device === 'mobile' ? 140 : 400}
              />
            </div>
          </div>

          <div className="bg-white pb-6 mb-6 pt-2 px-4 lg:px-0 flex flex-col">
            <div className="mb-8">
              <h4 className="text-gray-800 font-semibold text-xl md:text-2xl mb-4 text-left">
                Healthcare
              </h4>
              <p className="text-sm md:text-base text-gray-800 mb-4">
                {
                  'Italy offers a universal public healthcare system known as the SSN (Servizio Sanitario Nazionale), which provides broad coverage to residents, including EU citizens and many non-EU residents with the right permits. The system is tax-funded, regionally managed, and includes general practitioners, hospitals, emergency care, and basic specialist services. In addition to the SSN, many residents choose to use private healthcare — either paying out of pocket or through private insurance — for faster access, specialist choice, or services not fully covered by the public system (like dental or mental health care).'
                }
              </p>
              <p className="text-sm md:text-base text-gray-800 mb-4">
                {
                  'Italy consistently ranks among the top 10–20 healthcare systems globally in terms of overall outcomes, life expectancy, and access, according to sources like the OECD and World Health Organization (WHO). However, quality and speed can vary by region, and understanding your insurance options is key to navigating care efficiently.'
                }
              </p>
              <div className="flex justify-center mt-2">
                <Link
                  to="/"
                  className="inline-block px-4 py-1.5 rounded-lg bg-gray-200 text-black font-semibold text-sm hover:bg-gray-300"
                >
                  🧾 Italian Healthcare Explained
                </Link>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-lg md:text-xl text-gray-800 font-semibold mb-4">Insurance</p>
              <p className="text-sm md:text-base text-gray-800 mb-4">
                {
                  ' We have broken down health insurance into three practical tiers to help you choose what best fits your lifestyle, expectations, and budget. Each tier builds on the one before it, starting from the mandatory public system and scaling up to include faster, more personalized care through private insurance.'
                }
              </p>
              <HCTiersList data={healthcareTiers} />
              <div className="mt-6">
                <p className="text-base text-gray-800 font-semibold mb-4">Yearly price estimates</p>
                <SideTabs
                  tabs={['Tier 3: SSN Only', 'Tier 2: SSN + Private Addon', 'Tier 1: Full Private']}
                >
                  <div>
                    <PanelTable
                      name="tier3"
                      title="Great for saving money, but be ready to wait."
                      punchline="Ideal for budget-conscious or long-term residents comfortable navigating the public system."
                      currency={currencyName}
                      index={currencyIndex}
                      data={tier3}
                    />
                  </div>

                  <div>
                    <PanelTable
                      name="tier2"
                      title="Balanced and flexible — faster care without breaking the bank."
                      punchline="Perfect for expats who want quicker access and better comfort, but still rely on the public system as a backbone."
                      currency={currencyName}
                      index={currencyIndex}
                      data={tier2}
                    />
                  </div>

                  <div>
                    <PanelTable
                      name="tier1"
                      title="Top-tier comfort, speed, and choice — but you’ll pay for it."
                      punchline="Best for retirees or professionals who want premium care, international options, and minimal bureaucracy."
                      currency={currencyName}
                      index={currencyIndex}
                      data={tier1}
                    />
                  </div>
                </SideTabs>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-lg md:text-xl text-gray-800 font-semibold mb-4">
                Healthcare benchmarks
              </p>
              <p className="text-sm md:text-base text-gray-800 mb-4">
                {
                  'The table bellow presents how Tarant healthcare system performs using international benchmarks like the OECD health indicators and the Euro Health Consumer Index (EHCI). These metrics give a clearer picture of service quality, access, and overall system performance, which can be useful when evaluating what to expect as a resident'
                }
              </p>
              <HCTable
                headers={['Metric', 'Estimate', 'Benchmark', 'Comment']}
                data={healthcareList}
              />
            </div>

            <div className="bg-white p-4 mt-4">
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700">
                <li>
                  Public healthcare in Taranto is low-cost and offers full national coverage, but
                  suffers from long wait times and limited service availability.
                </li>
                <li>
                  Key quality indicators like emergency care performance and doctor availability are
                  below national averages, reflecting broader regional disparities.
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white pb-6 mb-6 pt-2 px-4 lg:px-0 flex flex-col">
            <h4 className="text-gray-800 font-semibold text-lg md:text-xl mb-4 text-left">
              Budget
            </h4>
            <BudgetSelector
              budgets={{
                SOLO: budgetData.SOLO,
                PAIR: budgetData.PAIR,
                FAMILY: budgetData.FAMILY,
              }}
              currency={currencyName}
              index={currencyIndex}
              onChange={() => null}
            />
            <div className="flex justify-center md:justify-end mt-2 lg:mt-0">
              <Link
                to={`/budget/${name}?id=${idParam}`}
                className="inline-block px-4 py-1.5 rounded-lg bg-gray-700 text-white font-semibold text-sm hover:bg-gray-800"
              >
                🔧 Customize Your Budget
              </Link>
            </div>
          </div>
        </div>
      </AsyncStateWrapper>
    </div>
  );
}

export default CityPage;
