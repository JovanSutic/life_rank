import { BanknotesIcon, ChartBarIcon } from '@heroicons/react/24/solid';
import { formatCurrency } from '../../utils/saveNet';
import type { CurrencyOptions } from '../../types/budget.types';

interface BudgetCostData {
  name: string;
  description: string;
  num: number;
}

function BudgetPresentation({
  costOfLiving,
  netIncomeProjection,
  currency,
}: {
  costOfLiving: BudgetCostData[];
  netIncomeProjection: BudgetCostData[];
  currency: CurrencyOptions;
}) {
  // Check if data is available before rendering
  if (!costOfLiving || !netIncomeProjection) {
    return null;
  }

  return (
    // Outer container with a soft, recessed background
    <div className="bg-gray-100 rounded-2xl shadow-inner px-4 py-6 mb-6">
      {/* Section 1: Annual Cost of Living */}
      <div className="flex items-center space-x-3 text-blue-600 mb-4">
        <BanknotesIcon className="h-5 w-5" />
        <h3 className="text-xl font-semibold">Annual Cost of Living</h3>
      </div>

      <div>
        {costOfLiving.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-md p-4 mb-3 grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
          >
            <div className="flex flex-col">
              <p className="font-bold text-gray-800 text-lg">{item.name}</p>
              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
            </div>

            <div className="flex flex-col items-start md:items-end">
              <span className="font-bold text-xl text-gray-900">
                {formatCurrency(item.num, currency)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* A separator for the next section */}
      <hr className="my-6 border-gray-200" />

      {/* Section 2: Annual Net Income Projection */}
      <div className="flex items-center space-x-3 text-green-600 mb-4">
        <ChartBarIcon className="h-5 w-5" />
        <h3 className="text-xl font-semibold">Annual Lifestyle Projection</h3>
      </div>

      {/* Individual cards for each projected year */}
      <div>
        {netIncomeProjection.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-md p-4 mb-3 grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
          >
            <div className="flex flex-col">
              <p className="font-medium text-gray-800 text-base">{item.name}</p>
              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
            </div>

            <div className="flex flex-col items-start md:items-end">
              <span className="font-bold text-lg text-gray-900">
                Net: {formatCurrency(item.num, currency)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BudgetPresentation;
