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
        } group-hover:flex bottom-full border border-gray-200 mb-2 w-[280px] px-3 py-1 bg-gray-100 text-gray-800 rounded text-xs shadow-md whitespace-normal pointer-events-none`}
        style={{ left: position }}
      >
        <span style={{ textAlign: 'left', fontWeight: '400' }}>{text}</span>
      </div>
    </div>
  );
};

export default Tooltip;
