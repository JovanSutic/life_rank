import { useState, type ReactNode } from 'react';

const SideTabs = ({ tabs = [], children }: { tabs: string[]; children: ReactNode[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const colors: string[] = [
    'border-green-500 text-green-600',
    'border-amber-500 text-amber-600',
    'border-red-500 text-red-600',
  ];

  return (
    <div className="flex flex-col md:flex-row rounded-md shadow-md bg-white overflow-hidden">
      {/* Sidebar Tabs */}
      <div className="flex flex-row md:flex-col w-full md:w-1/4 bg-gray-50 border-r border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`text-center cursor-pointer md:text-left px-4 py-3 text-sm md:text-base font-medium w-full
              ${
                index === activeIndex
                  ? `bg-white font-semibold border-l-4 ${colors[index]}`
                  : 'text-gray-700 hover:bg-gray-100 border-l-4 border-transparent'
              }
              focus:outline-none transition-all duration-150 ease-in-out`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Panel */}
      <div className="w-full md:w-3/4 p-4 text-gray-800">
        {Array.isArray(children) ? children[activeIndex] : children}
      </div>
    </div>
  );
};

export default SideTabs;
