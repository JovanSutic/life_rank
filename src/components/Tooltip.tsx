import { type ReactNode } from 'react';

const Tooltip = ({ children, text }: { children: ReactNode; text: string }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute z-50 hidden group-hover:flex bottom-full left-0 mb-2 w-max max-w-xs px-3 py-1 bg-gray-800 text-white text-xs rounded shadow-md whitespace-normal pointer-events-none">
        <span>{text}</span>
      </div>
    </div>
  );
};

export default Tooltip;
