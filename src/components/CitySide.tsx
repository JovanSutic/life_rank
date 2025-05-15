import { ArrowTopRightOnSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useMapStore } from '../stores/mapStore';
import { climateTags } from '../utils/map';
import type { CityPanelData } from '../types/map.types';
import Tooltip from './Tooltip';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Budget } from '../types/api.types';
import AsyncStateWrapper from './AsyncWrapper';

const CityInfoPanel = ({ cityData }: { cityData: CityPanelData }) => {
  if (!cityData) return null;

  const { cityName, countryName, inhabitants, climate, budgetSolo, budgetPair, budgetFamily } =
    cityData;

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

            <span className="font-semibold text-blue-600">{budgetSolo.toLocaleString()} €</span>
          </li>
          <li className="flex items-center gap-2">
            <Tooltip text={'Monthly cost for two adults living together'}>
              <span className="text-gray-600">🧑‍🤝‍🧑 Pair:</span>
            </Tooltip>

            <span className="font-semibold text-blue-600">{budgetPair.toLocaleString()} €</span>
          </li>
          <li className="flex items-center gap-2">
            <Tooltip text={'Monthly cost for a family of 4'}>
              <span className="text-gray-600">👨‍👩‍👧‍👦 Family:</span>
            </Tooltip>
            <span className="font-semibold text-blue-600">{budgetFamily.toLocaleString()} €</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

async function fetchBudgets(cityId: number): Promise<Budget[]> {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/social_lifestyle?cityId=${cityId}`
    );
    return res.data.data;
  } catch (error) {
    console.error('Failed to fetch budgets:', error);
    throw error;
  }
}

export default function CitySide() {
  const { setRightOpen, focusCity } = useMapStore();

  const {
    data: budgets,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['GET_BUDGETS', focusCity?.id],
    queryFn: () => fetchBudgets(focusCity!.id),
    enabled: !!focusCity?.id,
    retry: 2,
  });

  console.log(budgets);

  return (
    <div className="w-full h-full bg-white flex flex-col p-4">
      <div className="flex justify-end">
        <button
          onClick={() => setRightOpen(false)}
          aria-label="Close filters"
          className="text-2xl text-gray-500 hover:text-black cursor-pointer"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <AsyncStateWrapper isLoading={isLoading || isFetching} isError={isError} error={error}>
        <CityInfoPanel
          cityData={{
            cityName: focusCity?.name || '',
            countryName: focusCity?.country || '',
            inhabitants: focusCity?.size || 0,
            climate: 'hot and rainy',
            budgetSolo: budgets?.[0]?.avg_price || 0,
            budgetPair: 2000,
            budgetFamily: 3000,
          }}
        />
      </AsyncStateWrapper>
    </div>
  );
}
