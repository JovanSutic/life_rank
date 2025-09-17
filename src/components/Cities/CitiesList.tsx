import { Link } from 'react-router-dom';
import { formatCurrency, formatNumber } from '../../utils/saveNet';
import { safetyTags } from '../../utils/map';
import type { CardCity } from '../../types/api.types';
import { useMapStore } from '../../stores/mapStore';

const AffordabilityTag = ({ amount }: { amount: number }) => {
  if (amount <= 1100) {
    return (
      <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-md whitespace-nowrap">
        💸 Affordable
      </span>
    );
  } else if (amount <= 1800) {
    return (
      <span className="text-xs font-semibold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-md whitespace-nowrap">
        👍 Mid-range
      </span>
    );
  } else {
    return (
      <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md whitespace-nowrap">
        💼 Higher Cost
      </span>
    );
  }
};

function SkeletonCityCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 animate-pulse">
      <div className="w-full flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="h-5 w-32 bg-gray-200 rounded" />
          <div className="h-5 w-20 bg-gray-200 rounded" />
        </div>

        {/* Population */}
        <div className="flex gap-2 items-center">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-12 bg-gray-200 rounded" />
        </div>

        {/* Cost section */}
        <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-6 w-24 bg-gray-200 rounded" />
          </div>
          <div className="h-3 w-40 bg-gray-100 rounded" />
        </div>

        {/* Safety tags */}
        <div className="border-t border-gray-100 pt-3 space-y-2">
          <div className="flex flex-col gap-2">
            <div className="h-3 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-48 bg-gray-200 rounded" />
            <div className="h-3 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
          </div>
        </div>

        {/* CTA button */}
        <div className="mt-6 h-10 bg-gray-200 rounded-xl w-full" />
      </div>
    </div>
  );
}

function CitiesList({
  data,
  loading,
  skeletonCount = 6,
}: {
  data: CardCity[];
  loading: boolean;
  skeletonCount?: number;
}) {
  const { currency, currencyIndex } = useMapStore();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto bg-gray-50 p-6 py-10 rounded-2xl">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonCityCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto bg-gray-50 p-6 py-10 rounded-2xl">
      {data.map((city) => (
        <div
          key={city.name}
          className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-200 
            transition-all duration-300 hover:shadow-lg hover:border-blue-500 hover:-translate-y-1"
        >
          <div className="w-full flex flex-col items-start">
            {/* Header: City Name + Seaside Tag */}
            <div className="w-full flex justify-between items-center pb-3">
              <h4
                className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors
                  max-w-[calc(100%-100px)] overflow-hidden text-ellipsis whitespace-nowrap"
                title={city.name}
              >
                {city.name}
              </h4>
              {city.seaside && (
                <div className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">
                  🏖️ Seaside
                </div>
              )}
            </div>

            {/* Meta: Population */}
            <div className="flex justify-start items-center gap-2 mb-4">
              <span className="text-xs text-gray-500 uppercase tracking-wide">Population</span>
              <span className="text-sm font-medium text-gray-700">{formatNumber(city.size)}</span>
            </div>

            {/* Cost Section */}
            <div className="w-full flex flex-col border-t border-gray-100 pt-3">
              <div className="flex items-center justify-between mb-1">
                <AffordabilityTag amount={city.costOfLiving} />
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-blue-600">
                    {formatCurrency(city.costOfLiving * currencyIndex, currency)}
                  </span>
                  <span className="text-sm text-gray-400">/mo</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-1 leading-snug">
                Estimated minimum to cover basic monthly expenses.
              </p>
            </div>

            {/* Safety Tags */}
            <div className="mt-4 w-full border-t border-gray-100 pt-3 space-y-2 text-left">
              <div className="flex flex-col gap-1">
                {safetyTags(city.safetyRating).map((tag, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col items-start gap-0.5 ${idx === 0 ? 'mb-1' : ''}`}
                  >
                    <p className="text-xs uppercase tracking-wide text-gray-400">{tag.label}</p>
                    <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      {tag.icon} {tag.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              to={`/net-save?cityId=${city.id}`}
              className="mt-6 w-full inline-flex items-center justify-center px-5 py-3 
                text-sm font-semibold rounded-xl shadow bg-blue-600 hover:bg-blue-700 
                text-white transition-all duration-200 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-blue-500"
              title={`Calculate for ${city.name}`}
              aria-label={`Calculate net income in ${city.name}`}
            >
              Calculate Your Net Income →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CitiesList;
