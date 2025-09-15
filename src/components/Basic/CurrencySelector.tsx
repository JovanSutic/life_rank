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
  EUR: { icon: CurrencyEuroIcon, name: 'EUR' },
  USD: { icon: CurrencyDollarIcon, name: 'USD' },
  GBP: { icon: CurrencyPoundIcon, name: 'GBP' },
};

export function CurrencySelector({
  rates,
  reverse,
}: {
  rates: Record<string, number>;
  reverse: boolean;
}) {
  const { currency: activeCurrency, setCurrency } = useMapStore();

  const handleCurrencyChange = (currency: CurrencyOptions) => {
    const rate = reverse
      ? getCurrencyRate(rates, currency.toLowerCase() as CurrencyString, 'eur')
      : getCurrencyRate(rates, 'eur', currency.toLowerCase() as CurrencyString);

    setCurrency({ name: currency, index: rate });
  };

  return (
    <div className="inline-flex rounded-lg border border-gray-200 bg-white shadow-md">
      {Object.entries(currencyData).map(([key, { icon: Icon, name }]) => {
        const currency = key as CurrencyOptions;
        const isActive = activeCurrency === currency;
        return (
          <button
            key={currency}
            onClick={() => handleCurrencyChange(currency)}
            className={`
              flex flex-col cursor-pointer items-center justify-center py-2 px-5 transition-colors duration-200 ease-in-out
              ${
                isActive
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'text-gray-900 hover:bg-gray-100'
              }
              
              first:rounded-l-lg last:rounded-r-lg
            `}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs font-medium">{name}</span>
          </button>
        );
      })}
    </div>
  );
}
