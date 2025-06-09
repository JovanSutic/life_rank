import React from 'react';

interface CitySizeOption {
  label: string;
  value: number;
}

interface CitySizeFilterProps {
  onClick: (value: number, position: string) => void;
  value: number;
  name: string;
}

const citySizes: CitySizeOption[] = [
  { label: '< 200K', value: 200000 },
  { label: '< 500K', value: 500000 },
  { label: '< 1M', value: 1000000 },
  { label: '1M+', value: Number.MAX_SAFE_INTEGER },
];

const CitySize: React.FC<CitySizeFilterProps> = ({ onClick, value, name }) => {
  const handleClick = (value: number) => {
    onClick(value, name);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {citySizes.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          className={`text-sm font-semibold px-4 py-2 rounded-lg border text-center transition
              ${
                value === option.value
                  ? 'bg-gray-700 text-white border-gray-700'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 cursor-pointer'
              }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default CitySize;
