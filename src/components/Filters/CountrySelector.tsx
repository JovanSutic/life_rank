import { useState, useRef, useEffect } from 'react';
import FlagElement from '../Basic/FlagElement';

type CountrySelectorProps = {
  countries: string[];
  selectedCountry: string;
  onChange: (countryName: string) => void;
};

export default function CountrySelector({
  countries,
  selectedCountry,
  onChange,
}: CountrySelectorProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-xs" ref={dropdownRef}>
      <button
        type="button"
        className="w-full flex items-center justify-between border border-gray-300 rounded-lg bg-white py-2 px-4 shadow-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          {selectedCountry && <FlagElement country={selectedCountry} />}
          <span className="text-gray-900 font-semibold">{selectedCountry || 'Select country'}</span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul
          tabIndex={-1}
          role="listbox"
          aria-activedescendant={selectedCountry}
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white border border-gray-200 shadow-lg focus:outline-none"
        >
          {countries.map((name) => {
            const isSelected = selectedCountry === name;

            return (
              <li
                key={name}
                id={name}
                role="option"
                aria-selected={isSelected}
                className={`cursor-pointer select-none py-2 px-4 flex items-center gap-3 ${
                  isSelected
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => {
                  onChange(name);
                  setOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onChange(name);
                    setOpen(false);
                  }
                }}
                tabIndex={0}
              >
                <FlagElement country={name} />
                <span>{name}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
