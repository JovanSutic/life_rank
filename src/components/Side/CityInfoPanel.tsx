import { MapPinIcon } from '@heroicons/react/24/solid';
import { budgetTags, getBudgetLabel, safetyTags } from '../../utils/map';
import type { CityPanelData } from '../../types/map.types';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useMapStore } from '../../stores/mapStore';
import { flowCounties } from '../../utils/saveNet';

const CityInfoPanel = ({ cityData }: { cityData: CityPanelData }) => {
  const { toggleNewsletterShow, currency, currencyIndex } = useMapStore();
  const [searchParams] = useSearchParams();

  const containerRef = useRef<HTMLDivElement>(null);
  const { cityId, cityName, countryName, inhabitants, budgets, safety, countryId } = cityData;
  const currentLayer = searchParams.get('layerTypeId');

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [cityData?.cityId]);

  if (!cityData) return null;

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto h-full pr-4 lg:pr-2 bg-white text-sm text-gray-800"
    >
      <div className="sticky top-0 z-10 bg-white pb-3 border-b border-gray-200 mb-3">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <MapPinIcon className="w-5 h-5 text-blue-500" /> {cityName}, {countryName}
        </h2>
        <p className="text-gray-500 text-sm">Population: {inhabitants.toLocaleString()}</p>
      </div>

      {flowCounties.includes(countryName) ? (
        <section className="p-3 rounded-lg bg-slate-50 border border-gray-200 shadow-sm mb-3">
          <h3 className="text-md font-bold text-center uppercase tracking-wide text-slate-700 mb-2">
            {`Thinking about relocation to ${cityName}?`}
          </h3>
          <Link
            to={`/net-save?cityId=${cityId}`}
            className="w-full text-center inline-block p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-200"
            aria-label={`Start net and save report for ${cityName}`}
          >
            {`See how much you will net & save here`}
          </Link>
        </section>
      ) : (
        <div className="flex justify-end pb-4">
          <div className="flex justify-end">
            <button
              onClick={toggleNewsletterShow}
              className="inline-block cursor-pointer px-4 py-1.5 rounded-lg bg-blue-500 text-white font-semibold text-sm hover:bg-blue-700"
            >
              📧 Subscribe to our newsletter
            </button>
          </div>
        </div>
      )}

      {/* {weather && (
        <section className="p-3 rounded-lg bg-blue-50 border border-blue-100 shadow-sm mb-3">
          <h3 className="text-md font-semibold uppercase tracking-wide text-blue-800 mb-3">
            ☀️ Weather
          </h3>
          <div className="flex flex-wrap gap-2">
            {climateTags(weather).map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
              >
                {tag.icon} {tag.label}
              </span>
            ))}
          </div>
          <div className="mt-3">
            <a
              href="https://www.accuweather.com/en/rs/belgrade/298198/weather-forecast/298198"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:underline"
            >
              Current weather info
              <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
            </a>
          </div>
        </section>
      )} */}

      {currentLayer !== '3' && (
        <section className="p-3 rounded-lg bg-slate-50 border border-gray-200 shadow-sm mb-3">
          <h3 className="text-md font-semibold uppercase tracking-wide text-slate-700 mb-3">
            💰 Estimated Monthly Budget
          </h3>
          <div className="space-y-2">
            {budgetTags(budgets).map((tag, idx) => (
              <div
                key={idx}
                className={`flex justify-between ${idx < 2 && 'border-b border-dotted'} pb-1`}
              >
                <span className="font-semibold">
                  {tag.icon} {tag.label}:
                </span>
                <span>{getBudgetLabel(currency, currencyIndex, tag.text, false)}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-slate-600 leading-relaxed">
            Curious how the budget changes for your lifestyle? You can customize it based on your
            needs.
          </div>

          <div className="mt-2 flex justify-end">
            <Link
              to={`/budget/${cityName}?id=${cityId}`}
              className="inline-block px-4 py-1.5 rounded-lg bg-gray-700 text-white font-semibold text-sm hover:bg-gray-800"
            >
              🔧 Customize Your Budget
            </Link>
          </div>
        </section>
      )}

      {currentLayer === '3' && (
        <section className="p-3 rounded-lg bg-slate-50 border border-gray-200 shadow-sm mb-3">
          <h3 className="text-md font-semibold uppercase tracking-wide text-slate-700 mb-3">
            {`💸  Taxes in ${countryName}`}
          </h3>
          <div className="mt-4 flex justify-end">
            <Link
              to={`/taxes/${countryName}?country=${countryId}`}
              className="inline-block px-4 py-1.5 rounded-lg bg-blue-100 text-blue-800 font-semibold text-sm hover:bg-blue-200"
            >
              💸 Learn about Taxes
            </Link>
          </div>
        </section>
      )}

      {/* {countryId && (
        <section className="p-3 rounded-lg bg-slate-50 border border-gray-200 shadow-sm mb-3">
          <h3 className="text-md font-semibold uppercase tracking-wide text-slate-700 mb-3">
            🚑 Healthcare Quality
          </h3>
          <div className="mt-4 flex justify-end">
            <Link
              to={`/healthcare/${cityName}?city=${cityId}&country=${countryId}`}
              className="inline-block px-4 py-1.5 rounded-lg bg-blue-100 text-blue-800 font-semibold text-sm hover:bg-blue-200"
            >
              🚑 Check out Healthcare
            </Link>
          </div>
        </section>
      )} */}

      <section className="p-3 rounded-lg bg-blue-50 border border-blue-100 shadow-sm mb-3">
        <h3 className="text-md font-semibold uppercase tracking-wide text-blue-800 mb-3">
          🛡️ Safety Overview
        </h3>
        <div className="space-y-2">
          {safetyTags(safety).map((tag, idx) => (
            <div
              key={idx}
              className={`flex justify-between ${idx < 2 && 'border-b border-dotted'} pb-1`}
            >
              <span className="font-semibold">{tag.label}:</span>
              <span>
                {tag.icon} {tag.description}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CityInfoPanel;
