import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { trackPageview } from '../utils/analytics';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { countryTaxHeadline, faqData, mapCompass } from '../data/taxes';
import Newsletter from '../components/Basic/Newsletter';
import { fetchCurrency, getCityCards } from '../utils/apiCalls';
import { useQuery } from '@tanstack/react-query';
import AsyncStateWrapper from '../components/AsyncWrapper';
import CitiesList from '../components/Cities/CitiesList';
import { flowCounties } from '../utils/saveNet';
import FaqElement from '../components/Basic/Faq';
import CurrencySelector from '../components/Basic/CurrencySelector';
import CountrySelector from '../components/Basic/CountrySelector';

function Index() {
  useEffect(() => {
    trackPageview('/');
  }, []);

  const contentRef = useRef<HTMLDivElement>(null);
  const [activeCountry, setActiveCountry] = useState<string>('Spain');

  const { data, isLoading, error, isFetching, isError } = useQuery({
    queryKey: ['GET_CITY_CARDS', `${activeCountry}-6`],
    queryFn: () => getCityCards(activeCountry, 6),
    enabled: !!activeCountry,
    retry: 1,
    staleTime: 60 * 60 * 1000,
  });

  const { data: currency } = useQuery({
    queryKey: ['GET_CURRENCY'],
    queryFn: () => fetchCurrency(),
    retry: 2,
    staleTime: 60 * 60 * 1000,
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
        <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20 md:py-32 md:pb-20 overflow-hidden">
          {/* Optional subtle SVG background for texture */}
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

          <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
            <div className="inline-flex items-center gap-2 text-yellow-300 text-sm font-medium uppercase tracking-wide mb-4">
              💼 For Remote Professionals
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Optimize Your Take-Home Pay
            </h1>

            <p className="mt-4 text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Compare tax rates, net income, and cost of living across European countries — find
              where your remote earnings goes the furthest.
            </p>

            <div className="mt-10 md:mt-12">
              <button
                onClick={handleScrollClick}
                className="inline-flex items-center cursor-pointer justify-center px-6 py-3 text-base font-semibold rounded-xl bg-white text-blue-700 hover:bg-blue-50 transition shadow"
              >
                Explore Countries & Cities
                <ChevronRightIcon className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-18 lg:py-22">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex flex-col items-center max-w-5xl mx-auto mt-8 md:mt-10 px-4 mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 max-w-3xl">
                Compare Net Earnings Across Cities
              </h2>
              <p className="mt-3 text-lg text-gray-600 max-w-3xl">
                Explore real tax rates and cost of living to see where your remote income goes the
                furthest. Click any city below to get a free, detailed breakdown of your take-home
                pay.
              </p>
            </div>

            <div
              className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:justify-between gap-6 md:gap-8 mb-4"
              ref={contentRef}
            >
              <div className="w-full md:flex md:self-start">
                <CurrencySelector rates={currency?.eur || { eur: 1 }} reverse={false} />
              </div>
              <div className="w-full md:w-1/2 max-w-xs mx-auto md:mx-0 order-2 md:order-2">
                <CountrySelector
                  countries={flowCounties}
                  selectedCountry={activeCountry}
                  onChange={(value) => setActiveCountry(value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-6" id="cities-start">
              <div>
                <AsyncStateWrapper
                  isLoading={isFetching || isLoading}
                  isError={isError}
                  error={error}
                >
                  <div className="max-w-5xl mx-auto mt-4 mb-4 space-y-3">
                    <div className="flex justify-end">
                      <Link
                        to={mapCompass[activeCountry]}
                        className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        View Map of {activeCountry} →
                      </Link>
                    </div>

                    <div className="w-full bg-blue-50 border-l-4 border-blue-500 rounded-lg p-2">
                      <p className="text-sm text-gray-800 font-medium mb-0.5">
                        Optimal effective tax rate (3-year average)
                      </p>
                      <p className="text-xl md:text-2xl font-bold text-blue-600 leading-tight">
                        {countryTaxHeadline[activeCountry]}
                      </p>
                    </div>
                  </div>

                  <CitiesList data={data?.data || []} loading={isFetching || isLoading} />

                  <Link
                    to={`/cities/${activeCountry}`}
                    className="mt-8 inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    See all cities in {activeCountry}
                    <ChevronRightIcon className="ml-1 h-4 w-4" />
                  </Link>
                </AsyncStateWrapper>
              </div>
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
