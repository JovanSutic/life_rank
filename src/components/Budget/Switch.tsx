import { useEffect, useState } from 'react';
import type { SwitchProps } from '../../types/budget.types';
import { colorMap } from './budgetMaps';

function Switch({ options, defaultValue, onChange, color = 'blue', className = '' }: SwitchProps) {
  const [active, setActive] = useState(defaultValue ?? options[0]);

  useEffect(() => {
    onChange(active);
  }, [active, onChange]);

  const styles = colorMap[color];

  const handleClick = (value: string) => {
    if (value !== active) {
      setActive(value);
    }
  };

  return (
    <div
      className={`
        relative flex w-full md:w-[280px] h-10 rounded-full p-1
        ${styles.bg} ${className}
      `}
    >
      <div
        className={`absolute top-1 left-1 w-[calc(50%-0.25rem)] h-8 rounded-full transition-all duration-300 ${styles.handle}`}
        style={{
          transform: active === options[0] ? 'translateX(0)' : 'translateX(100%)',
        }}
      ></div>

      {options.map((option) => {
        const isActive = option === active;
        return (
          <button
            key={option}
            onClick={() => handleClick(option)}
            className={`
              z-10 cursor-pointer flex-1 text-sm font-medium transition-colors duration-200
              ${isActive ? styles.text : styles.textInactive}
               rounded-full
            `}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Switch;
