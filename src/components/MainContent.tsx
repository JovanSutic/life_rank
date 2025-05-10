import MapScreen from './MapScreen';
import MapLayout from './MapLayout';
import useDeviceType from '../hooks/useDeviceType';
import { getZoomSize } from '../utils/map';

export default function MainContent() {
  const { toggleLeft } = MapLayout.useLayout();
  const device = useDeviceType();

  if (!device) {
    return null;
  }

  return (
    <div className="relative space-x-2 h-full">
      <MapScreen position={[48.076498, 16.327318]} zoom={getZoomSize(device)} />
      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xl md:text-2xl font-bold bg-transparent rounded-md z-[1000]">
        <span className="text-blue-800 text-shadow-lg">Life</span>
        <span className="text-gray-800 text-shadow-lg">Rank</span>
      </div>
      <button
        onClick={toggleLeft}
        className="absolute cursor-pointer top-4 left-4 bg-white hover:bg-gray-100 text-black px-4 py-2 rounded shadow-md z-[1000]"
      >
        Filters
      </button>
    </div>
  );
}
