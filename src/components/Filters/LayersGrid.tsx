import type { LayerButton } from '../../types/map.types';

function LayersGrid({ buttons }: { buttons: LayerButton[] }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {buttons.map((btn, index) => (
        <button
          key={index}
          onClick={() => btn.onClick(btn.name)}
          className={`py-2 px-4 rounded transition text-center font-base ${
            btn.isActive
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'cursor-pointer bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {btn.name}
        </button>
      ))}
    </div>
  );
}

export default LayersGrid;
