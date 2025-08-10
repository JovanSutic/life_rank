import { useEffect } from 'react';
import { useMapStore } from '../stores/mapStore';
import TopLogo from '../components/Basic/TopLogo';

function DashboardPage() {
  const { setSaveNetData } = useMapStore();
  useEffect(() => {
    setSaveNetData(null);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen w-full px-6 pb-6 pt-2">
      <div className="relative bg-white w-full lg:w-[764px] mx-auto pt-4">
        <TopLogo />
        <h1 className="text-xl font-semibold text-center text-gray-800 mt-8">This is Dashboard</h1>
      </div>
    </div>
  );
}

export default DashboardPage;
