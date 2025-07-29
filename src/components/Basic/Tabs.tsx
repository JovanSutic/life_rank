type TabsProps = {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
};

function Tabs({ tabs, activeTab, onTabClick }: TabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabClick(tab)}
            className={`py-2 px-4 font-medium text-sm focus:outline-none transition-all border-b-2 ${
              activeTab === tab
                ? 'border-blue-500 text-blue-600'
                : 'cursor-pointer border-transparent text-gray-600 hover:text-blue-500 hover:border-blue-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default Tabs;
