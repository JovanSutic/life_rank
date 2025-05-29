import { useState, type ReactNode } from 'react';

const Tooltip = ({ children, text }: { children: ReactNode; text: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleTooltip = () => setIsVisible((prev) => !prev);
  const hideTooltip = () => setIsVisible(false);

  return (
    <div className="relative inline-block" onClick={toggleTooltip} onMouseLeave={hideTooltip}>
      <div className="group cursor-pointer">{children}</div>

      <div
        className={`absolute z-50 ${
          isVisible ? 'flex' : 'hidden'
        } group-hover:flex bottom-full left-0 mb-2 w-max max-w-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs shadow-md whitespace-normal pointer-events-none`}
      >
        <span>{text}</span>
      </div>
    </div>
  );
};

export default Tooltip;
