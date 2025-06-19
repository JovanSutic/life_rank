import type { ControlProps } from '../../types/budget.types';
import { colorMap } from '../../utils/budgetMaps';

function Switch({
  options,
  value,
  onChange,
  color = 'blue',
  className = '',
  name,
  type = 'medium',
}: ControlProps) {
  const styles = colorMap[color];

  const handleClick = (value: string) => {
    onChange(value, name);
  };

  return (
    <div
      className={`
        relative flex w-full ${type === 'small' ? 'h-8' : 'h-10'} rounded-full
        ${styles.bg} ${className}
      `}
    >
      <div
        className={`absolute top-1 left-1 w-[calc(50%-0.25rem)] ${type === 'small' ? 'h-6' : 'h-8'} rounded-full transition-all duration-300 ${styles.handle}`}
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
              z-10 cursor-pointer flex-1 ${type === 'small' ? 'text-xs' : 'text-sm font-medium'} transition-colors duration-200
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
