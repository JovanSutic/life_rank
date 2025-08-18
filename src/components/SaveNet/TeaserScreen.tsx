import { useEffect } from 'react';
import { trackEvent } from '../../utils/analytics';
import type { City, CurrencyString, DefValue, ReportDto } from '../../types/api.types';
import ReportResult from './ReportResult';
import { getCurrencyRate } from '../../utils/budget';
import { useMapStore } from '../../stores/mapStore';
import type { CurrencyOptions } from '../../types/budget.types';

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

  useEffect(() => {
    trackEvent('net-flow-finish');
  }, []);

  return (
    <div className="w-full py-6 bg-white rounded-xl pt-6">
      <h1 className="text-xl md:text-2xl text-center font-bold text-blue-500 mb-8">
        Your Net Report for {city?.name}
      </h1>
      <div className="mb-8">
        <div className="flex flex-col mb-4 border-b border-gray-300 pb-4">
          <p className="text-base text-gray-500 mb-1 text-sm">Change display currency:</p>
          <select
            className="border border-gray-300 rounded px-2 py-1"
            value={currency.toLowerCase()}
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
        <ReportResult data={data} city={city} capitalGains={capitalGains} />
        <div className="w-full mt-10 flex flex-col items-center justify-center">
          <button
            onClick={reset}
            className="w-full block md:w-[300px] cursor-pointer font-semibold text-center py-2 px-6 rounded-lg border"
          >
            Back to the form
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeaserScreen;
