import { useState, useRef, useLayoutEffect, type ReactNode } from 'react';

const Tooltip = ({ children, text }: { children: ReactNode; text: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [styles, setStyles] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggleTooltip = () => setIsVisible((prev) => !prev);
  const hideTooltip = () => setIsVisible(false);

  useLayoutEffect(() => {
    if (isVisible && tooltipRef.current && wrapperRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const wrapperRect = wrapperRef.current.getBoundingClientRect();

      let top = -tooltipRect.height - 8; // default above, with gap
      let left = (wrapperRect.width - tooltipRect.width) / 2;

      // If tooltip goes above viewport, place it below
      if (wrapperRect.top + top < 0) {
        top = wrapperRect.height + 8;
      }

      // Convert to viewport coords for clamping
      let viewportLeft = wrapperRect.left + left;

      // Clamp in viewport space
      const minViewportLeft = 4;
      const maxViewportLeft = window.innerWidth - tooltipRect.width - 4;
      viewportLeft = Math.max(minViewportLeft, Math.min(viewportLeft, maxViewportLeft));

      // Convert back to container-relative coords
      left = viewportLeft - wrapperRect.left;

      setStyles({ top, left });
    }
  }, [isVisible, text]);

  return (
    <div
      ref={wrapperRef}
      className="relative inline-block"
      onClick={toggleTooltip}
      onMouseLeave={hideTooltip}
    >
      <div className="group cursor-pointer">{children}</div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-50 w-[200px] border border-gray-200 px-3 py-1 bg-gray-100 text-gray-800 rounded text-xs shadow-md whitespace-normal"
          style={{
            top: styles.top,
            left: styles.left,
            position: 'absolute',
            fontWeight: '400',
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
