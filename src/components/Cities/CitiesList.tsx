import { Link } from 'react-router-dom';
import { formatCurrency, formatNumber } from '../../utils/saveNet';
import { safetyTags } from '../../utils/map';
import type { CardCity } from '../../types/api.types';

function CitiesList({ data }: { data: CardCity[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto bg-gray-50 p-6 py-10 rounded-2xl">
      {data.map((city) => (
        <div
          key={city.name}
          className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-blue-400"
        >
          <div className="w-full flex flex-col items-center">
            <div className="w-full flex flex-col">
              <div className="w-full flex justify-between pb-2">
                <h4
                  className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors
                           max-w-[calc(100%-100px)] overflow-hidden text-ellipsis whitespace-nowrap"
                  title={city.name}
                >
                  {city.name}
                </h4>
                <div className="flex space-x-2 text-sm font-semibold text-gray-700 mt-1">
                  {city.seaside && (
                    <span className="flex items-center space-x-1">
                      <span>🏖️</span>
                      <span>Seaside</span>
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-start items-center gap-2 mb-2">
                <span className="text-base font-base text-gray-500">Population</span>
                <span className="text-base font-semibold text-gray-700">
                  {formatNumber(city.size)}
                </span>
              </div>
            </div>
            <div className="w-full flex flex-col border-t border-gray-100 pt-6">
              <div className="flex flex-col items-start gap-2">
                <p className="text-base text-gray-400">Monthly cost of living</p>
                <div className="flex gap-2 items-end justify-center">
                  <span className="text-base font-semibold text-gray-800">from</span>
                  <span className="text-3xl font-bold text-blue-600">
                    {formatCurrency(city.costOfLiving, 'EUR')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 w-full border-t border-gray-100 pt-6 space-y-3 text-left">
            <div className="flex flex-col gap-2">
              {safetyTags(city.safetyRating).map((tag, idx) => (
                <div key={idx} className={`flex justify-between`}>
                  <span className="text-base font-base text-gray-500">{tag.label}:</span>
                  <span className="text-base font-semibold text-gray-700">
                    {tag.icon} {tag.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Link
            to={`/net-save?cityId=${city.id}`}
            className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent
                           text-sm font-medium rounded-xl shadow-sm text-white bg-blue-500 hover:bg-blue-600 transition-colors
                           overflow-hidden text-ellipsis whitespace-nowrap"
            title={`Calculate for ${city.name}`}
          >
            Calculate your tax rate
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CitiesList;
