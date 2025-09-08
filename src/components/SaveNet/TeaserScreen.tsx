import { useEffect, useState } from 'react';
import { trackEvent } from '../../utils/analytics';
import type { City, CurrencyString, DefValue, ReportDto } from '../../types/api.types';
import ReportResult from './ReportResult';
import { getCurrencyRate } from '../../utils/budget';
import { useMapStore } from '../../stores/mapStore';
import type { CurrencyOptions } from '../../types/budget.types';
import Tabs from '../Basic/Tabs';
import { Link } from 'react-router-dom';

function TeaserScreen({
  city,
  data,
  capitalGains,
  reset,
}: {
  city: City | undefined;
  data: ReportDto;
  capitalGains?: DefValue[];
  reset: () => void;
}) {
  const { currency, setCurrency } = useMapStore();
  const [tab, setTab] = useState('Summery');

  useEffect(() => {
    trackEvent('net-flow-finish');
  }, []);

  return (
    <div className="w-full py-6 bg-white rounded-xl pt-6">
      <h1 className="text-xl md:text-2xl text-center font-bold text-blue-500 mb-6 md:mb-8">
        Your Net Calculation for {city?.name}
      </h1>
      <div className="flex flex-col mb-4">
        <p className="text-base text-gray-500 mb-1 text-sm">Change display currency:</p>
        <select
          className="border border-gray-300 rounded px-2 py-1 w-full lg:w-[240px]"
          value={currency.toLowerCase()}
          name="currency-selector"
          onChange={(e) => {
            const rate = getCurrencyRate(
              data!.userData!.rates!,
              e.target.value as CurrencyString,
              'eur'
            );
            setCurrency({ name: e.target.value.toUpperCase() as CurrencyOptions, index: rate });
          }}
        >
          <option value="eur">Euro (€)</option>
          <option value="usd">US Dollar ($)</option>
          <option value="gbp">British Pound (£)</option>
        </select>
      </div>
      <div className="mb-4">
        <Tabs
          tabs={['Summery', 'Breakdown', 'Cost of Living', 'Other Taxes']}
          activeTab={tab}
          onTabClick={(tab: string) => setTab(tab)}
        />
      </div>
      <div className="mb-8">
        <ReportResult data={data} city={city} capitalGains={capitalGains} activeTab={tab} />
        <div className="w-full mt-10 flex flex-col items-center justify-center gap-6">
          <button
            onClick={reset}
            className="w-full block md:w-[320px] py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white cursor-pointer"
          >
            Reset calculator for {city?.name}
          </button>

          <Link
            to={`/cities/${city?.country}`}
            className="cursor-pointer font-semibold text-center text-base text-gray-500 hover:underline "
          >
            Back to cities in {city?.country}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TeaserScreen;
