import { useState, type ReactNode } from 'react';

const Tooltip = ({
  children,
  text,
  position,
}: {
  children: ReactNode;
  text: string;
  position: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleTooltip = () => setIsVisible((prev) => !prev);
  const hideTooltip = () => setIsVisible(false);

  return (
    <div className="relative inline-block" onClick={toggleTooltip} onMouseLeave={hideTooltip}>
      <div className="group cursor-pointer">{children}</div>

      <div
        className={`absolute z-50 ${
          isVisible ? 'flex' : 'hidden'
        } group-hover:flex bottom-full left-[${position}] mb-2 w-[280px] px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs shadow-md whitespace-normal pointer-events-none`}
      >
        <span className="text-left">{text}</span>
      </div>
    </div>
  );
};

export default Tooltip;
