import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { trackPageview } from '../utils/analytics';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { mapCompass } from '../data/spain';
import { getCityCards } from '../utils/apiCalls';
import { useQuery } from '@tanstack/react-query';
import AsyncStateWrapper from '../components/AsyncWrapper';
import { formatCurrency, formatNumber } from '../utils/saveNet';
import { safetyTags } from '../utils/map';

function CitiesPage() {
  useEffect(() => {
    trackPageview('/cities');
  }, []);

  const { country } = useParams();

  const {
    data: spainData,
    isLoading: spainIsLoading,
    isFetching: spainIsFetching,
    isError: spainIsError,
    error: spainError,
  } = useQuery({
    queryKey: ['GET_CITY_CARDS', `${country}-60`],
    queryFn: () => getCityCards('Spain', 60),
    enabled: true,
    retry: 1,
    staleTime: 60 * 60 * 1000,
  });

  return (
    <>
      <article>
        <title>{`LifeRank | Discover cities in ${country} where your remote income goes further.`}</title>
        <meta
          name="description"
          content={`LifeRank | Discover cities in ${country} where your remote income goes further.`}
        />
        <meta
          name="keywords"
          content={`taxes for remote workers in ${country}, optimal taxes for digital nomads in ${country}, cost of living for digital nomads in ${country}, cost of living in europe in ${country}`}
        />
      </article>
      <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
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
                <div className="mt-12">
                  {/* Country Header Row */}
                  <div className="flex flex-col items-center justify-center space-y-4 mb-8">
                    <h3 className="text-3xl font-bold text-gray-800">{country}</h3>
                    <Link
                      to={mapCompass[country || '']}
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
                            <h4
                              className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors
                           max-w-[calc(100%-100px)] overflow-hidden text-ellipsis whitespace-nowrap"
                              title={city.name}
                            >
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
                            <span className="text-sm font-semibold text-gray-700">Population:</span>
                            <span className="text-base font-semibold text-gray-800">
                              {formatNumber(city.size)}
                            </span>
                          </div>
                        </div>
                        <Link
                          to={`/net-save?cityId=${city.id}`}
                          className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent
                           text-sm font-medium rounded-xl shadow-sm text-white bg-blue-500 hover:bg-blue-600 transition-colors
                           overflow-hidden text-ellipsis whitespace-nowrap"
                          title={`Calculate for ${city.name}`}
                        >
                          Calculate for {city.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
                <Link
                  to="/"
                  className="mt-8 inline-flex items-center text-lg underline text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </AsyncStateWrapper>
          </div>
        </section>
      </div>
    </>
  );
}

export default CitiesPage;
