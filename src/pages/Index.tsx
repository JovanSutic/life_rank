import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { trackPageview } from '../utils/analytics';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { faqData, mapCompass } from '../data/taxes';
import Newsletter from '../components/Basic/Newsletter';
import { getCityCards } from '../utils/apiCalls';
import { useQueries, type UseQueryResult } from '@tanstack/react-query';
import AsyncStateWrapper from '../components/AsyncWrapper';
import CitiesList from '../components/Cities/CitiesList';
import { flowCounties } from '../utils/saveNet';
import type { CityCardsResponse } from '../types/api.types';
import FlagElement from '../components/Basic/FlagElement';
import FaqElement from '../components/Basic/Faq';

function Index() {
  useEffect(() => {
    trackPageview('/');
  }, []);

  const contentRef = useRef<HTMLDivElement>(null);

  const queries = useQueries({
    queries: flowCounties.map((country) => ({
      queryKey: ['GET_CITY_CARDS', `${country}-3`],
      queryFn: () => getCityCards(country, 3),
      enabled: true,
      retry: 1,
      staleTime: 60 * 60 * 1000,
    })),
  });

  const handleScrollClick = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

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
              We help remote workers find their best tax residency
            </h2>
            <p className="mt-10 md:mt-14 text-lg md:text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              Discover a place where your remote income goes further. Find the perfect balance of
              tax savings and cost of living to build your ideal financial future.
            </p>
            <button
              onClick={handleScrollClick}
              className="mt-8 md:mt-10 cursor-pointer inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-blue-800 bg-white hover:bg-blue-50 transition-colors"
            >
              Find Your Optimal Location
              <ChevronRightIcon className="ml-2 h-5 w-5" />
            </button>
          </div>
        </section>

        {/* Featured Cities Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Find out your net opportunities in different cities
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
              Click on any city to access our quick and reliable tax calculators. At the end you
              will see your net earnings, local tax rates, and total financial impact. All for free.
            </p>
            <div className="flex flex-col gap-6" id="cities-start" ref={contentRef}>
              {queries.map((query: UseQueryResult<CityCardsResponse>, index: number) => (
                <div key={`cityGroup${index}`}>
                  <AsyncStateWrapper
                    isLoading={query.isFetching || query.isLoading}
                    isError={query.isError}
                    error={query.error}
                  >
                    <div key={flowCounties[index]} className="mt-12">
                      {/* Country Header Row */}
                      <div className="flex flex-col items-center justify-center space-y-4 mb-8">
                        <div className="flex gap-2 items-center">
                          <FlagElement country={flowCounties[index] || ''} />
                          <h3 className="text-3xl font-bold text-gray-800">
                            {flowCounties[index]}
                          </h3>
                        </div>

                        <Link
                          to={mapCompass[flowCounties[index]]}
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          Checkout {flowCounties[index]} on the Map
                          <ChevronRightIcon className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                      <CitiesList data={query.data?.data || []} />
                    </div>

                    <Link
                      to={`/cities/${flowCounties[index]}`}
                      className="mt-8 inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      See other cities in {flowCounties[index]}
                      <ChevronRightIcon className="ml-1 h-4 w-4" />
                    </Link>
                  </AsyncStateWrapper>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 text-center bg-gray-50">
          <Newsletter />
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 mb-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Some questions remote workers have about tax residency, income optimization, and
              relocation.
            </p>
            <FaqElement data={faqData} />
          </div>
        </section>
      </div>
    </>
  );
}

export default Index;
