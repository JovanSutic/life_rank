import React, { useState } from 'react';
import { SocialType } from '../../types/api.types';
import type { CurrencyOptions } from '../../types/budget.types';
import { getBudgetLabel } from '../../utils/map';

type BudgetSelectorProps = {
  budgets: {
    SOLO: number;
    PAIR: number;
    FAMILY: number;
  };
  onChange: (value: SocialType) => void;
  defaultValue?: SocialType;
  currency: CurrencyOptions;
  index: number;
};

const labels = {
  SOLO: { emoji: '🧍', name: 'Solo' },
  PAIR: { emoji: '🧑‍🤝‍🧑', name: 'Pair' },
  FAMILY: { emoji: '👨‍👩‍👧', name: 'Family' },
};

const BudgetSelector: React.FC<BudgetSelectorProps> = ({
  budgets,
  onChange,
  defaultValue = SocialType.SOLO,
  currency,
  index,
}) => {
  const [active, setActive] = useState<SocialType>(defaultValue);

  const handleSelect = (key: SocialType) => {
    setActive(key);
    onChange(key);
  };

  return (
    <div className="flex gap-4 mb-2 lg:mb-4">
      {[SocialType.SOLO, SocialType.PAIR, SocialType.FAMILY].map((key) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => handleSelect(key)}
            className={`flex-1 cursor-pointer rounded-lg p-1 lg:p-2 text-center border transition-colors duration-200
              ${isActive ? 'bg-blue-100 border-blue-500 shadow-md' : 'bg-white border-gray-300'}
              hover:border-blue-400 hover:bg-blue-50`}
          >
            <div className="text-2xl mb-1">{labels[key as SocialType].emoji}</div>
            <div className="text-sm font-medium text-gray-800 mb-1">{labels[key].name}</div>
            <div className="text-md lg:text-lg font-semibold text-blue-600">
              {getBudgetLabel(currency, index, budgets[key as SocialType], false)}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default BudgetSelector;
