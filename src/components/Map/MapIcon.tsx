import L, { type PointExpression } from 'leaflet';
import ReactDOMServer from 'react-dom/server';

const createCustomIcon = (budget: number, name: string, mobile = false) => {
  const anchor: PointExpression = mobile ? [37, 34] : [42, 38];
  const iconHtml = ReactDOMServer.renderToString(
    <div className="relative w-18 md:w-20 h-auto">
      <div className="bg-blue-500 text-white p-1 rounded-md flex flex-col items-center justify-center shadow-lg">
        <p className="text-[9px] md:text-[10px] font-semibold leading-tight">{name}</p>
        <p className="text-[9px] md:text-[10px]  leading-tight">{`from ${budget.toLocaleString(
          undefined,
          {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }
        )}€`}</p>
      </div>
      <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-blue-500"></div>
    </div>
  );

  return L.divIcon({
    html: iconHtml,
    className: '',
    iconSize: [30, 20],
    iconAnchor: anchor,
  });
};

export default createCustomIcon;
