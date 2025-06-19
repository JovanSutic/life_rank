import { useState, useRef, useEffect } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import Switch from '../Budget/Switch';
import type { Currency } from '../../types/api.types';
import { useMapStore } from '../../stores/mapStore';
import type { CurrencyOptions } from '../../types/budget.types';

const SettingsButton = ({
  currency,
  type = 'light',
}: {
  currency: Currency;
  type?: 'light' | 'dark';
}) => {
  const [open, setOpen] = useState(false);
  const { setCurrency, currency: currencyNam } = useMapStore();
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="absolute top-4 right-2 lg:right-4  z-1000">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`p-2 rounded-full ${type === 'light' ? 'bg-white hover:bg-gray-100' : 'bg-gray-700 hover:bg-gray-600'} shadow cursor-pointer focus:outline-none`}
        aria-label="Settings"
      >
        <Cog6ToothIcon
          className={`h-6 w-6  ${type === 'light' ? 'text-gray-700' : 'text-white'}`}
        />
      </button>

      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 p-4 text-left"
        >
          <h4 className="font-semibold mb-2 text-md text-gray-800">Settings</h4>

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <label className="flex flex-col gap-1">
              <span>Currency</span>
              <Switch
                options={['EUR', 'USD']}
                name="currency"
                onChange={(value) => {
                  const index = value === 'EUR' ? 1 : currency.eur['usd'];
                  setCurrency({ name: value as CurrencyOptions, index });
                }}
                value={currencyNam}
                color="gray"
                type="small"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsButton;
