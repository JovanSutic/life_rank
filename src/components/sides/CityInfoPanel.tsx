import { MapPinIcon } from '@heroicons/react/24/solid';
import { budgetTags, extractTagsFromContextData, safetyTags } from '../../utils/map';
import type { CityPanelData } from '../../types/map.types';
import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import TagList from './TagList';

const CityInfoPanel = ({ cityData }: { cityData: CityPanelData }) => {
  const [showStory, setShowStory] = useState(false);
  const { cityId, cityName, countryName, inhabitants, budgets, safety, contextualData } = cityData;
  const tags = useMemo(() => extractTagsFromContextData(contextualData), [contextualData?.id]);

  if (!cityData) return null;

  return (
    <div className="overflow-y-auto h-full pr-4 lg:pr-2 bg-white text-sm text-gray-800">
      <div className="sticky top-0 z-10 bg-white pb-3 border-b border-gray-200 mb-3">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <MapPinIcon className="w-5 h-5 text-blue-500" /> {cityName}, {countryName}
        </h2>
        <p className="text-gray-500 text-sm">Population: {inhabitants.toLocaleString()}</p>
      </div>

      <TagList tags={tags} />

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
              <span>{tag.text}</span>
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
            className="inline-block px-4 py-1.5 rounded bg-black text-white font-semibold text-sm hover:bg-gray-800"
          >
            🔧 Customize Your Budget
          </Link>
        </div>
      </section>

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

      {contextualData && (
        <section className="p-3 rounded-lg bg-indigo-50 border border-indigo-100 shadow-sm mb-3">
          <h3 className="text-md font-semibold uppercase tracking-wide text-indigo-800 mb-3">
            🌿 Lifestyle Overview
          </h3>

          <div className="space-y-2">
            <div>
              <strong>🌤️ Climate:</strong> {contextualData.climate}
            </div>
            <div>
              <strong>📅 Seasonality:</strong> {contextualData.seasonality}
            </div>
            <div>
              <strong>🌍 Expat Community:</strong> {contextualData.expatCommunity}
            </div>
            <div>
              <strong>🌲 Nature Access:</strong> {contextualData.natureAccess}
            </div>
            <div>
              <strong>🕺 Local Lifestyle:</strong> {contextualData.localLifestyle}
            </div>
            <div>
              <strong>🎭 Culture:</strong> {contextualData.cultureHighlights}
            </div>
            <div>
              <strong>⚽ Activities:</strong> {contextualData.sportsAndActivities}
            </div>
            <div>
              <strong>🎒 Tourism:</strong> {contextualData.tourismLevel}
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={() => setShowStory(!showStory)}
              className="text-indigo-800 font-semibold underline text-sm cursor-pointer"
            >
              {showStory ? 'Hide Local Insight' : 'Read the Local Insight'}
            </button>
            {showStory && (
              <p className="mt-2 text-gray-700 text-sm whitespace-pre-line">
                {contextualData.detailedStory}
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default CityInfoPanel;
