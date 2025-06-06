import React from 'react';

interface BudgetSliderProps {
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number, position: string) => void;
  name: string;
  value: number;
}

function getNumberString(num: number) {
  return `${num.toString().substring(0, 1)}K €`;
}

const BudgetSlider: React.FC<BudgetSliderProps> = ({
  min = 1000,
  max = 7000,
  step = 1000,
  onChange,
  name,
  value,
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    onChange(newValue, name);
  };

  return (
    <div className="relative w-full">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleInput}
        className="w-full h-2 appearance-none bg-transparent cursor-pointer rounded"
        style={{
          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
        }}
      />

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 9999px;
          background: white;
          border: 2px solid #3b82f6;
          margin-top: -4px;
        }

        input[type='range']::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 9999px;
          background: white;
          border: 2px solid #3b82f6;
        }

        input[type='range']::-webkit-slider-runnable-track {
          height: 8px;
          border-radius: 9999px;
        }

        input[type='range']::-moz-range-track {
          height: 8px;
          border-radius: 9999px;
        }
      `}</style>

      <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
        {[...Array((max - min) / step + 1)].map((_, index) => {
          const marker = min + index * step;
          return (
            <span key={marker} className="font-semibold">
              {getNumberString(marker)}
            </span>
          );
        })}
      </div>
      <div className="text-right text-sm mt-2 text-blue-500 font-medium">
        Monthly budget up to {value} €
      </div>
    </div>
  );
};

export default BudgetSlider;
