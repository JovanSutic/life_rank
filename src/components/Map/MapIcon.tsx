import { StarIcon } from '@heroicons/react/24/solid';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';

const createCustomIcon = () => {
  const iconHtml = ReactDOMServer.renderToString(
    <div className="relative w-7 h-7">
      <div className="bg-blue-500 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-lg">
        <StarIcon className="w-4 h-4" />
      </div>
      <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-blue-500"></div>
    </div>
  );

  return L.divIcon({
    html: iconHtml,
    className: '',
    iconSize: [30, 34],
    iconAnchor: [14, 32],
  });
};

export default createCustomIcon;
