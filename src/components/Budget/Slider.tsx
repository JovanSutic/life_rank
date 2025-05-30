import type { ControlProps } from '../../types/budget.types';
import { colorMap } from '../../utils/budgetMaps';

function Slider({ options, value, onChange, color = 'blue', className = '', name }: ControlProps) {
  const styles = colorMap[color];
  const activeIndex = options.findIndex((opt) => opt === value);

  const handleClick = (value: string) => {
    onChange(value, name);
  };

  return (
    <div className={`relative w-full ${styles.bg} rounded-full px-1 py-1 ${className}`}>
      <div className="relative z-10 flex w-full gap-2">
        {options.map((option) => {
          const isActive = option === value;
          return (
            <button
              key={option}
              onClick={() => handleClick(option)}
              className={`flex-1 cursor-pointer text-sm font-medium py-2 rounded-full transition-colors duration-200
                ${isActive ? styles.text : styles.textInactive}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div
        className={`absolute top-1 bottom-1 left-1 rounded-full transition-all duration-300 ${styles.handle}`}
        style={{
          width: `calc((100%) / ${options.length})`,
          transform: `translateX(calc(${activeIndex} * ${window.innerWidth < 640 ? '96%' : '98%'} ))`,
        }}
      />
    </div>
  );
}

export default Slider;
