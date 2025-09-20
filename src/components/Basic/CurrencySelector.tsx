import {
  CurrencyDollarIcon,
  CurrencyEuroIcon,
  CurrencyPoundIcon,
} from '@heroicons/react/24/outline';
import type { CurrencyOptions } from '../../types/budget.types';
import { useMapStore } from '../../stores/mapStore';
import { getCurrencyRate } from '../../utils/budget';
import type { CurrencyString } from '../../types/api.types';

const currencyData = {
  EUR: { icon: CurrencyEuroIcon, label: 'EUR' },
  USD: { icon: CurrencyDollarIcon, label: 'USD' },
  GBP: { icon: CurrencyPoundIcon, label: 'GBP' },
};

function CurrencySelector({ rates, reverse }: { rates: Record<string, number>; reverse: boolean }) {
  const { currency: activeCurrency, setCurrency } = useMapStore();

  const handleCurrencyChange = (currency: CurrencyOptions) => {
    const rate = reverse
      ? getCurrencyRate(rates, currency.toLowerCase() as CurrencyString, 'eur')
      : getCurrencyRate(rates, 'eur', currency.toLowerCase() as CurrencyString);

    setCurrency({ name: currency, index: rate });
  };

  return (
    <div className="flex flex-col items-start gap-2">
      {/* Label */}
      <p className="text-base font-medium text-gray-700">Display Currency</p>

      {/* Selector Buttons */}
      <div className="inline-flex divide-x divide-gray-200 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
        {Object.entries(currencyData).map(([key, { icon: Icon, label }]) => {
          const currency = key as CurrencyOptions;
          const isActive = activeCurrency === currency;

          return (
            <button
              key={currency}
              onClick={() => handleCurrencyChange(currency)}
              className={`flex cursor-pointer items-center gap-1 px-4 py-2 text-sm transition-colors duration-150
                ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CurrencySelector;
