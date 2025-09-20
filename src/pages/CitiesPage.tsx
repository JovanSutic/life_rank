import { trackPageview } from '../utils/analytics';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { mapCompass } from '../data/taxes';
import { getCityCards } from '../utils/apiCalls';
import { useQuery } from '@tanstack/react-query';
import AsyncStateWrapper from '../components/AsyncWrapper';
import CitiesList from '../components/Cities/CitiesList';
import TopLogo from '../components/Basic/TopLogo';
import FlagElement from '../components/Basic/FlagElement';

function CitiesPage() {
  useEffect(() => {
    trackPageview('/cities');
  }, []);

  const { country } = useParams();

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['GET_CITY_CARDS', `${country}-60`],
    queryFn: () => getCityCards({ sortBy: 'size', take: 35, country }),
    enabled: !!country,
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
        <TopLogo />
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Find out your net opportunities
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
              Click on any city to access our quick and reliable tax calculators. At the end you
              will see your net earnings, local tax rates, and total financial impact. All for free.
            </p>

            <AsyncStateWrapper isLoading={isLoading || isFetching} isError={isError} error={error}>
              <div>
                <div className="mt-12">
                  <div className="flex flex-col items-center justify-center space-y-4 mb-8">
                    <div className="flex gap-2 items-center">
                      <FlagElement country={country || ''} />
                      <h3 className="text-3xl font-bold text-gray-800">{country}</h3>
                    </div>
                    <Link
                      to={mapCompass[country || '']}
                      className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      View Map of {country} →
                    </Link>
                  </div>
                  <CitiesList data={data?.data || []} loading={isLoading || isFetching} />
                </div>

                <Link
                  to="/"
                  className="inline-flex mt-8 items-center text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
                >
                  ← Go Back to Home
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
