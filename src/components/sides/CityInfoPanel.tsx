import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { climateTags } from '../../utils/map';
import type { CityPanelData } from '../../types/map.types';
import Tooltip from '../Tooltip';
import { Link } from 'react-router-dom';
import { getSafetyLabel } from '../../utils/crime';

const CityInfoPanel = ({ cityData }: { cityData: CityPanelData }) => {
  if (!cityData) return null;

  const { cityId, cityName, countryName, inhabitants, climate, budgets, safety } = cityData;

  return (
    <div className="p-1 overflow-y-auto h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-semibold">
            {cityName}, {countryName}
          </h2>
          <p className="text-gray-600">Population: {inhabitants.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-md p-3 mb-6 shadow-sm">
        <h3 className="text-lg font-medium mb-2">Weather</h3>
        <div className="flex flex-wrap gap-2">
          {climateTags(climate).map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
            >
              <span>{tag.icon}</span> {tag.label}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-2">
          <a
            href="https://www.accuweather.com/en/rs/belgrade/298198/weather-forecast/298198"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-blue-600 hover:underline"
          >
            Current info on weather
            <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>

      <div className="bg-gray-50 rounded-md p-3 mb-6 shadow-sm">
        <h3 className="text-lg font-medium mb-2">Estimated Monthly Budget</h3>
        <ul className="space-y-1 text-gray-700">
          <li className="flex items-center gap-2">
            <Tooltip text={'Monthly cost for a single person living alone'}>
              <span className="text-gray-600">🧍 Solo:</span>
            </Tooltip>

            <span className="font-semibold text-blue-600">{budgets.solo.toLocaleString()} €</span>
          </li>
          <li className="flex items-center gap-2">
            <Tooltip text={'Monthly cost for two adults living together'}>
              <span className="text-gray-600">🧑‍🤝‍🧑 Pair:</span>
            </Tooltip>

            <span className="font-semibold text-blue-600">{budgets.pair.toLocaleString()} €</span>
          </li>
          <li className="flex items-center gap-2">
            <Tooltip text={'Monthly cost for a family of 4'}>
              <span className="text-gray-600">👨‍👩‍👧‍👦 Family:</span>
            </Tooltip>
            <span className="font-semibold text-blue-600">{budgets.family.toLocaleString()} €</span>
          </li>
        </ul>
        <div className="flex items-center justify-between mt-2">
          <Link
            to={`/budget/${cityName}?id=${cityId}`}
            rel="noopener noreferrer"
            className="flex items-center text-sm text-blue-600 hover:underline"
          >
            Customize your budget
          </Link>
        </div>
      </div>

      <div className="bg-gray-50 rounded-md p-3 mb-6 shadow-sm">
        <h3 className="text-lg font-medium mb-2">Safety Overview</h3>
        <ul className="space-y-1 text-gray-700">
          <li className="flex items-center gap-2">
            <Tooltip text={'Reflects general concern about crime in the city.'}>
              <span className="text-gray-600">Crime Concern:</span>
            </Tooltip>

            <span className="text-blue-700">
              {getSafetyLabel(safety.overallCrimeConcernIndex, 'crimeConcern')}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Tooltip text={'Measures how safe people feel walking around, especially at night.'}>
              <span className="text-gray-600">Personal Safety:</span>
            </Tooltip>

            <span className="text-blue-700">
              {getSafetyLabel(safety.personalSafetyScore, 'personalSafety')}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Tooltip text={'Indicates whether crime has been increasing recently.'}>
              <span className="text-gray-600">Crime Escalation:</span>
            </Tooltip>
            <span className="text-blue-700">
              {getSafetyLabel(safety.crimeEscalationIndicator, 'crimeEscalation')}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CityInfoPanel;
