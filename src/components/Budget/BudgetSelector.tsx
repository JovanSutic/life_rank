import React, { useState } from 'react';

type BudgetOption = 'solo' | 'pair' | 'family';

type BudgetSelectorProps = {
  budgets: {
    solo: number;
    pair: number;
    family: number;
  };
  onChange: (value: BudgetOption) => void;
  defaultValue?: BudgetOption;
};

const labels = {
  solo: { emoji: '🧍', name: 'Solo' },
  pair: { emoji: '🧑‍🤝‍🧑', name: 'Pair' },
  family: { emoji: '👨‍👩‍👧‍👦', name: 'Family' },
};

const BudgetSelector: React.FC<BudgetSelectorProps> = ({
  budgets,
  onChange,
  defaultValue = 'solo',
}) => {
  const [active, setActive] = useState<BudgetOption>(defaultValue);

  const handleSelect = (key: BudgetOption) => {
    setActive(key);
    onChange(key);
  };

  return (
    <div className="flex gap-4 mb-6">
      {(['solo', 'pair', 'family'] as BudgetOption[]).map((key) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => handleSelect(key)}
            className={`flex-1 cursor-pointer rounded-lg p-2 text-center border transition-colors duration-200
              ${isActive ? 'bg-blue-100 border-blue-500 shadow-md' : 'bg-white border-gray-300'}
              hover:border-blue-400 hover:bg-blue-50`}
          >
            <div className="text-2xl mb-1">{labels[key].emoji}</div>
            <div className="text-sm font-medium text-gray-800 mb-1">{labels[key].name}</div>
            <div className="text-lg font-semibold text-blue-600">
              {budgets[key].toLocaleString()} €
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default BudgetSelector;
