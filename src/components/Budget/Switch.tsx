import type { ControlProps } from '../../types/budget.types';
import { colorMap } from './budgetMaps';

function Switch({ options, value, onChange, color = 'blue', className = '', name }: ControlProps) {
  const styles = colorMap[color];

  const handleClick = (value: string) => {
    onChange(value, name);
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
          transform: value === options[0] ? 'translateX(0)' : 'translateX(100%)',
        }}
      ></div>

      {options.map((option) => {
        const isActive = option === value;
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
