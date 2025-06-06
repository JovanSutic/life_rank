import { XMarkIcon } from '@heroicons/react/24/outline';
import { useMapStore } from '../../stores/mapStore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Switch from '../Budget/Switch';
import ComboBox from './Combobox';
import CitySize from './CitySize';
import BudgetSlider from './BudgetSlider';
import { useSearchParams } from 'react-router-dom';
import { isEqualOrEmpty } from '../../utils/map';

const countries = [
  'USA',
  'Canada',
  'Germany',
  'France',
  'Spain',
  'Japan',
  'Australia',
  'Serbia',
  'Hungary',
];

const defaultFilters = {
  rank: 'Ranked cities',
  sea: 'All',
  size: Number.MAX_SAFE_INTEGER,
  budget: 7000,
  country: '',
};

export default function MapFilters() {
  const { setLeftOpen } = useMapStore();
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
    newParams.set('sea', filters.sea === 'All' ? 'false' : 'true');
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
    if (searchParams.get('sea') !== (filters.sea === 'All' ? 'false' : 'true')) return true;
    if (searchParams.get('rank') !== (filters.rank === 'All cities' ? 'false' : 'true'))
      return true;
    if (searchParams.get('budget') !== filters.budget.toString()) return true;
    if (!isEqualOrEmpty(searchParams.get('country'), filters.country)) return true;

    return false;
  }, [filters]);

  useEffect(() => {
    if (!setLeftOpen) {
      setFilters({
        size: Number(searchParams.get('size')),
        country: searchParams.get('country') || '',
        budget: Number(searchParams.get('budget')),
        sea: searchParams.get('sea') === 'true' ? 'Seaside' : 'All',
        rank: searchParams.get('rank') === 'true' ? 'Ranked cities' : 'All cities',
      });
    }
  }, [setLeftOpen]);

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="p-4 pb-1 flex justify-end">
        <button
          onClick={() => setLeftOpen(false)}
          aria-label="Close filters"
          className="text-2xl text-gray-500 hover:text-black cursor-pointer"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <h2 className="px-4 text-xl font-bold text-gray-900">Filters</h2>

      <div className="flex-1 overflow-y-auto px-4 pb-10 pt-6 space-y-6">
        <ComboBox
          options={countries}
          name="country"
          label="Country"
          onChange={handleControlChange}
        />

        <div>
          <label className="block text-sm font-medium mb-2">City population</label>
          <CitySize value={filters.size} onClick={handleControlChange} name="size" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Monthly budget</label>
          <BudgetSlider name="budget" value={filters.budget} onChange={handleControlChange} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Sea exposure</label>
          <Switch
            options={['Seaside', 'All']}
            name="sea"
            onChange={handleControlChange}
            value={filters.sea}
            color="gray"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Our ranking</label>
          <Switch
            options={['Ranked cities', 'All cities']}
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
          onClick={handleApplyFilters}
          className={`w-full ${isChanged ? 'bg-blue-500 hover:bg-blue-700 text-white cursor-pointer' : 'bg-gray-300 text-white cursor-not-allowed'} font-semibold py-2 px-4 rounded-md`}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
