import { XMarkIcon } from '@heroicons/react/24/outline';
import { useMapStore } from '../stores/mapStore';

export default function MapFilters() {
  const { setRightOpen, focusCity } = useMapStore();

  return (
    <div className="w-full h-full bg-white flex flex-col p-4">
      <div className="flex justify-end">
        <button
          onClick={() => setRightOpen(false)}
          aria-label="Close filters"
          className="text-2xl text-gray-500 hover:text-black cursor-pointer"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <h2 className="text-xl font-semibold mt-2">{focusCity?.name}</h2>

      <div className="mt-4"></div>
    </div>
  );
}
