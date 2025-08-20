import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { trackPageview } from '../utils/analytics';
import { useEffect } from 'react';
import {
  PencilSquareIcon,
  CursorArrowRaysIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { mapCompass } from '../data/spain';
import Newsletter from '../components/Basic/Newsletter';
import { getCityCards } from '../utils/apiCalls';
import { useQuery } from '@tanstack/react-query';
import AsyncStateWrapper from '../components/AsyncWrapper';
import { formatCurrency, formatNumber } from '../utils/saveNet';
import { safetyTags } from '../utils/map';

interface HomeCity {
  name: string;
  cost: string;
  population: string;
  safety: string;
  isCoastal: boolean;
}

function Index() {
  useEffect(() => {
    trackPageview('/');
  }, []);

  const featuredCountries: Record<string, { flag: string; cities: HomeCity[] }> = {
    Spain: {
      flag: '🇪🇸',
      cities: [],
    },
  };

  const {
    data: spainData,
    isLoading: spainIsLoading,
    isFetching: spainIsFetching,
    isError: spainIsError,
    error: spainError,
  } = useQuery({
    queryKey: ['GET_CITY_CARDS', 'Spain-3'],
    queryFn: () => getCityCards('Spain', 3),
    enabled: true,
    retry: 1,
    staleTime: 60 * 60 * 1000,
  });

  return (
    <>
      <article>
        <title>{`LifeRank | Discover a place where your remote income goes further.`}</title>
        <meta
          name="description"
          content={`LifeRank | Discover a place where your remote income goes further.`}
        />
        <meta
          name="keywords"
          content={`taxes for remote workers, optimal taxes for digital nomads, cost of living for digital nomads, cost of living in europe`}
        />
      </article>
      <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20 md:py-32 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg
              className="w-full h-full opacity-10"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 L100,0 L100,100 L0,100 Z M50,0 Q60,10 70,0 T80,0 T90,0 T100,0"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div className="container w-full lg:w-[844px] mx-auto px-4 relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-sm text-shadow-lg">
              Live Better, Pay Less.
            </h1>
            <h2 className="mt-4 md:mt-2 text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-yellow-300 text-shadow-lg">
              A way to optime your finances through location arbitrage.
            </h2>
            <p className="mt-10 md:mt-14 text-lg md:text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              Discover a place where your remote income goes further. Find the perfect balance of
              tax savings and cost of living to build your ideal financial future.
            </p>
            <Link
              to="/cities/Spain"
              className="mt-8 md:mt-10 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-blue-800 bg-white hover:bg-blue-50 transition-colors"
            >
              Find Your Optimal Location
              <ChevronRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* New Section: Your Journey to Financial Freedom */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Unlock Your Financial Potential with Our Data
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              It's a simple, three-step process to get the clarity you need.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Step 1 */}
              <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 text-center transition-transform transform hover:scale-105 duration-300">
                <div className="p-4 bg-blue-100 rounded-full mb-4">
                  <CursorArrowRaysIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800">1. Choose the City</h4>
                <p className="mt-2 text-sm text-gray-600">
                  Start by clicking on a city to select your desired location. Use our list or map
                  display.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 text-center transition-transform transform hover:scale-105 duration-300">
                <div className="p-4 bg-blue-100 rounded-full mb-4">
                  <PencilSquareIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800">2. Fill Out the Form</h4>
                <p className="mt-2 text-sm text-gray-600">
                  Input your gross income and basic details into our free, easy-to-use calculator.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 text-center transition-transform transform hover:scale-105 duration-300">
                <div className="p-4 bg-blue-100 rounded-full mb-4">
                  <DocumentTextIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800">3. Get Your Report</h4>
                <p className="mt-2 text-sm text-gray-600">
                  Instantly receive a personalized report with a full breakdown of your net income,
                  taxes, and cost of living.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Cities Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Discover Your Next City
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
              Click on a city below to get a comprehensive, free report tailored to your situation.
            </p>

            {/* Loop through each country in the featuredCountries object */}
            <AsyncStateWrapper
              isLoading={spainIsFetching || spainIsLoading}
              isError={spainIsError}
              error={spainError}
            >
              <div>
                {Object.keys(featuredCountries).map((countryName) => (
                  <div key={countryName} className="mt-12">
                    {/* Country Header Row */}
                    <div className="flex flex-col items-center justify-center space-y-4 mb-8">
                      <h3 className="text-3xl font-bold text-gray-800">{countryName}</h3>
                      <Link
                        to={mapCompass[countryName]}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        See the Map
                        <ChevronRightIcon className="ml-1 h-4 w-4" />
                      </Link>
                    </div>

                    {/* Grid of City Cards for the current country */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto bg-gray-50 p-6 rounded-2xl">
                      {spainData?.data.map((city) => (
                        <div
                          key={city.name}
                          className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-blue-400"
                        >
                          <div className="w-full flex flex-col items-center">
                            <div className="w-full flex justify-between pb-2">
                              <h4 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {city.name}
                              </h4>
                              <div className="flex space-x-2 text-sm font-semibold text-gray-700 mt-1">
                                {city.seaside && (
                                  <span className="flex items-center space-x-1">
                                    <span>🏖️</span>
                                    <span>Seaside</span>
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="w-full flex flex-col space-x-2 text-sm font-semibold text-gray-700 border-t border-gray-100 pt-4">
                              {safetyTags(city.safetyRating).map((tag, idx) => (
                                <div key={idx} className={`flex justify-between pb-1`}>
                                  <span className="font-semibold">{tag.label}:</span>
                                  <span>
                                    {tag.icon} {tag.description}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4 w-full border-t border-gray-100 pt-4 space-y-3 text-left">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-semibold text-gray-700">
                                Cost of Living:
                              </span>
                              <span className="text-base font-semibold text-gray-800">
                                from {formatCurrency(city.costOfLiving, 'EUR')}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-semibold text-gray-700">
                                Population:
                              </span>
                              <span className="text-base font-semibold text-gray-800">
                                {formatNumber(city.size)}
                              </span>
                            </div>
                          </div>
                          <Link
                            to={`/net-save?cityId=${city.id}`}
                            className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                          >
                            Calculate for {city.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <Link
                  to="/cities/Spain"
                  className="mt-8 inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                  See All Cities
                  <ChevronRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </AsyncStateWrapper>
          </div>
        </section>

        <section className="py-20 px-4 text-center bg-gray-50">
          <Newsletter />
        </section>

        {/* Final Call to Action Section */}
        {/* <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 max-w-3xl mx-auto">
              Ready to See Your Financial Future?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Your personalized financial report is just a few clicks away.
            </p>
            <a
              href="#" // A placeholder for the link to the calculator
              className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              Start Calculating Now
              <ChevronRightIcon className="ml-2 h-5 w-5" />
            </a>
          </div>
        </section> */}
      </div>
    </>
  );
}

export default Index;
