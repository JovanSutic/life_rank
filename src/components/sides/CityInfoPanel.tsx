import { MapPinIcon } from '@heroicons/react/24/solid';
import { budgetTags, climateTags, safetyTags } from '../../utils/map';
import type { CityPanelData } from '../../types/map.types';
import { Link } from 'react-router-dom';

const CityInfoPanel = ({ cityData }: { cityData: CityPanelData }) => {
  if (!cityData) return null;

  const { cityId, cityName, countryName, inhabitants, weather, budgets, safety } = cityData;

  return (
    <div className="overflow-y-auto h-full bg-white text-sm text-gray-800">
      <div className="sticky top-0 z-10 bg-white pb-3 border-b border-gray-200 mb-3">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <MapPinIcon className="w-5 h-5 text-blue-500" /> {cityName}, {countryName}
        </h2>
        <p className="text-gray-500 text-sm">Population: {inhabitants.toLocaleString()}</p>
      </div>

      {weather && (
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
          {/* <div className="mt-3">
            <a
              href="https://www.accuweather.com/en/rs/belgrade/298198/weather-forecast/298198"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:underline"
            >
              Current weather info
              <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
            </a>
          </div> */}
        </section>
      )}

      <section className="p-3 rounded-lg bg-gray-50 border border-gray-100 shadow-sm mb-3">
        <h3 className="text-md font-semibold uppercase tracking-wide text-gray-700 mb-3">
          💰 Estimated Monthly Budget
        </h3>
        <div className="flex flex-wrap gap-2">
          {budgetTags(budgets).map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-em"
            >
              {tag.icon} <span className="font-semibold">{tag.label}</span> {tag.text}
            </span>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Link
            to={`/budget/${cityName}?id=${cityId}`}
            className="inline-flex font-semibold text-md text-black underline"
          >
            Customize your budget
          </Link>
        </div>
      </section>

      <section className="p-3 rounded-lg bg-cyan-50 border border-cyan-100 shadow-sm mb-3">
        <h3 className="text-md font-semibold uppercase tracking-wide text-cyan-800 mb-3">
          🛡️ Safety Overview
        </h3>
        <div className="flex flex-wrap gap-2">
          {safetyTags(safety).map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-sm"
            >
              {tag.icon} <span className="font-semibold">{tag.label}:</span> {tag.description}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CityInfoPanel;
