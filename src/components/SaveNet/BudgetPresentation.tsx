import { WalletIcon, TrophyIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from '../../utils/saveNet';
import type { CurrencyOptions } from '../../types/budget.types';
import Tooltip from '../Basic/Tooltip';

interface BudgetCostData {
  name: string;
  description: string;
  num: number;
}

function BudgetPresentation({
  costOfLiving,
  netIncomeProjection,
  city,
  currency,
  peopleTrack,
}: {
  costOfLiving: BudgetCostData[];
  netIncomeProjection: BudgetCostData[];
  city: string;
  currency: CurrencyOptions;
  peopleTrack: string;
}) {
  // Check if data is available before rendering
  if (!costOfLiving || !netIncomeProjection) {
    return null;
  }

  return (
    <>
      <div className="rounded-2xl shadow-lg border border-gray-200 px-2 py-6 mb-8">
        <div className="flex flex-col items-center gap-2 mb-8">
          <h3 className="text-sm md:text-base font-bold text-blue-500 uppercase">
            Cost of Living Info for {city}
          </h3>
          <p className="text-base text-gray-700">Your use case: {peopleTrack}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {costOfLiving.map((item, index) => (
            <div className="flex flex-col items-center gap-1" key={index}>
              <div className={`p-3 rounded-full ${index === 0 ? 'bg-blue-50' : 'bg-green-50'}`}>
                {index === 0 ? (
                  <WalletIcon className={`text-blue-700 w-8 h-8`} />
                ) : (
                  <TrophyIcon className={`text-green-700 w-8 h-8`} />
                )}
              </div>
              <div className="flex gap-1">
                <Tooltip text={item.description}>
                  <InformationCircleIcon className="h-5 w-5 inline-block stroke-black align-super" />
                </Tooltip>
                <p className="text-gray-500 text-sm md:text-base">{item.name}</p>
              </div>

              <p className="text-xl md:text-2xl font-bold">{formatCurrency(item.num, currency)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-2">
        <div className="flex flex-col items-center gap-2 mb-4">
          <h3 className="text-sm md:text-base font-bold text-blue-500 uppercase">
            Lifestyle & Savings Projection
          </h3>
        </div>
        <div>
          {netIncomeProjection.map((item, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-xl shadow-lg border border-gray-200 grid grid-cols-1 gap-4 items-center ${index !== netIncomeProjection.length - 1 ? 'border-b border-gray-300 mb-3' : ''}`}
            >
              <div className="w-full flex flex-col gap-1">
                <div className="w-full flex gap-6 items-center">
                  <p className="font-medium text-blue-700 text-base md:text-lg">{item.name}</p>
                  <p className="font-bold text-gray-800 text-lg md:text-xl">
                    Net: {formatCurrency(item.num, currency)}
                  </p>
                </div>
                <div className="w-full flex gap-2 items-center">
                  <p className="text-sm md:text-base text-gray-500 italic">{item.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-2">
                {costOfLiving.map((itemC, indexC) => (
                  <div className="flex flex-col items-start gap-1" key={indexC}>
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-semibold">{itemC.name}</p>
                      <p className="text-gray-500 text-sm md:text-base">{`(${formatCurrency(item.num, currency)} - ${formatCurrency(itemC.num, currency)})`}</p>
                    </div>
                    <div className="flex flex-col mt-4">
                      <p
                        className={`text-xl font-bold ${item.num - itemC.num < 0 ? 'text-red-500' : 'text-green-600'}`}
                      >
                        {formatCurrency(item.num - itemC.num, currency)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BudgetPresentation;
