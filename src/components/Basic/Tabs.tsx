import { useEffect, useRef, useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

type TabsProps = {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
};

function Tabs({ tabs, activeTab, onTabClick }: TabsProps) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [showIndicator, setShowIndicator] = useState(true);

  // Function to check if the user has scrolled to the end
  const handleScroll = () => {
    if (tabsRef.current) {
      const { scrollWidth, scrollLeft, clientWidth } = tabsRef.current;
      // Hide the indicator if the scroll position is at or near the end
      setShowIndicator(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    // Check initial scroll state when the component mounts
    handleScroll();
    const currentTabsRef = tabsRef.current;
    if (currentTabsRef) {
      currentTabsRef.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (currentTabsRef) {
        currentTabsRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="relative py-2">
      <nav
        ref={tabsRef}
        onScroll={handleScroll}
        className="flex flex-nowrap space-x-4 overflow-x-auto scrollbar-hide"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabClick(tab)}
            className={`
              flex-shrink-0 py-2 px-4 font-medium text-base transition-all border-b-2
              ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'cursor-pointer border-transparent text-gray-600 hover:text-blue-500 hover:border-blue-300'
              }
            `}
          >
            {tab}
          </button>
        ))}
      </nav>
      {/* Scroll indicator using a gradient */}
      {showIndicator && tabs.length > 3 && (
        <div className="absolute right-0 top-0 bottom-0 pointer-events-none">
          <span className="text-xs flex gap-1 items-center w-[46px]">
            scroll <ArrowRightIcon className="w-3 h-3" />
          </span>
        </div>
      )}
    </div>
  );
}

export default Tabs;
