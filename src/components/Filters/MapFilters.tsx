import { XMarkIcon } from '@heroicons/react/24/solid';
import { useMapStore } from '../../stores/mapStore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Switch from '../Budget/Switch';
import ComboBox from './Combobox';
import CitySize from './CitySize';
import BudgetSlider from './BudgetSlider';
import { useSearchParams } from 'react-router-dom';
import { isEqualOrEmpty } from '../../utils/map';
import { trackEvent } from '../../utils/analytics';

const countries = [
  'Albania',
  'Armenia',
  'Austria',
  'Azerbaijan',
  'Belarus',
  'Belgium',
  'Bosnia and Herzegovina',
  'Bulgaria',
  'Croatia',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Georgia',
  'Germany',
  'Greece',
  'Hungary',
  'Ireland',
  'Italy',
  'Latvia',
  'Lithuania',
  'Moldova',
  'Montenegro',
  'Netherlands',
  'North Macedonia',
  'Norway',
  'Poland',
  'Portugal',
  'Romania',
  'Russia',
  'Serbia',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
  'Switzerland',
  'Ukraine',
  'United Kingdom',
];

const defaultFilters = {
  rank: 'Our picks',
  sea: "Don't care",
  size: 1000000,
  budget: 7000,
  country: '',
};

export default function MapFilters() {
  const { setLeftOpen, leftOpen, currency, currencyIndex } = useMapStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState(defaultFilters);

  const handleControlChange = useCallback(
    (value: string | number, position: string) => {
      setFilters({
        ...filters,
        [position]: value,
      });
    },
    [filters]
  );

  const handleApplyFilters = () => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set('size', filters.size.toString());
    newParams.set('sea', filters.sea === "Don't care" ? 'false' : 'true');
    newParams.set('rank', filters.rank === 'All cities' ? 'false' : 'true');
    newParams.set('budget', filters.budget.toString());
    if (filters.country) {
      newParams.set('country', filters.country);
    } else {
      newParams.delete('country');
    }

    setSearchParams(newParams, { replace: true });
    setLeftOpen(false);
  };

  const isChanged = useMemo(() => {
    if (searchParams.get('size') !== filters.size.toString()) return true;
    if (searchParams.get('sea') !== (filters.sea === "Don't care" ? 'false' : 'true')) return true;
    if (searchParams.get('rank') !== (filters.rank === 'All cities' ? 'false' : 'true'))
      return true;
    if (searchParams.get('budget') !== filters.budget.toString()) return true;
    if (!isEqualOrEmpty(searchParams.get('country'), filters.country)) return true;

    return false;
  }, [filters]);

  useEffect(() => {
    if (leftOpen) {
      setFilters({
        size: Number(searchParams.get('size')),
        country: searchParams.get('country') || '',
        budget: Number(searchParams.get('budget')),
        sea: searchParams.get('sea') === 'true' ? 'Yes' : "Don't care",
        rank: searchParams.get('rank') === 'true' ? 'Our picks' : 'All cities',
      });
    }
  }, [leftOpen]);

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="p-4 pb-0 flex justify-end">
        <button
          onClick={() => setLeftOpen(false)}
          aria-label="Close filters"
          className="text-2xl text-gray-500 hover:text-black cursor-pointer"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-10 pt-6 space-y-4">
        <div className="pb-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700 mb-3">
            🌍 country
          </h3>
          <ComboBox
            options={countries}
            name="country"
            value={filters.country}
            onChange={handleControlChange}
          />
        </div>

        <div className="pb-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700 mb-3">
            🧑‍🤝‍🧑 city population
          </h3>
          <CitySize value={filters.size} onClick={handleControlChange} name="size" />
        </div>

        <div className="pb-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700 mb-3">
            💰 Monthly budget
          </h3>
          <BudgetSlider
            name="budget"
            value={filters.budget}
            onChange={handleControlChange}
            currency={currency}
            currencyIndex={currencyIndex}
          />
        </div>

        <div className="pb-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700 mb-3">
            🏖️ Prefer coastlines?
          </h3>
          <Switch
            options={['Yes', "Don't care"]}
            name="sea"
            onChange={handleControlChange}
            value={filters.sea}
            color="gray"
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700 mb-3">
            🌐 Cities to see
          </h3>
          <Switch
            options={['Our picks', 'All cities']}
            name="rank"
            onChange={handleControlChange}
            value={filters.rank}
            color="gray"
          />
        </div>
      </div>

      <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200">
        <button
          disabled={!isChanged}
          onClick={() => {
            trackEvent('filter-apply');
            handleApplyFilters();
          }}
          className={`w-full ${isChanged ? 'bg-blue-500 hover:bg-blue-700 text-white cursor-pointer' : 'bg-gray-300 text-white cursor-not-allowed'} font-semibold py-2 px-4 rounded-md`}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
