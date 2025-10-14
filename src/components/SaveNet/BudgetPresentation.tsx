import { formatCurrency } from '../../utils/saveNet';
import type { CurrencyOptions } from '../../types/budget.types';

interface BudgetCostData {
  name: string;
  description: string;
  num: number;
  savings?: string;
}

function YearlySavingsCard({
  year,
  savingsLowCost,
  savingsComfort,
  currency,
}: {
  year: string;
  savingsLowCost: number;
  savingsComfort: number;
  currency: CurrencyOptions;
}) {
  return (
    <div className="w-full bg-white p-2 space-y-2">
      <h3 className="text-base text-gray-500">{year}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="text-xl">🧺</div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600">Low Cost Budget</span>
            <span className="text-xl font-semibold text-blue-700 mt-1">
              {formatCurrency(savingsLowCost, currency)}
            </span>
            <span className="text-xs text-gray-400">Estimated savings</span>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-purple-50 border border-purple-100 rounded-xl p-4">
          <div className="text-xl">🌟</div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600">Comfort Budget</span>
            <span className="text-xl font-semibold text-purple-700 mt-1">
              {formatCurrency(savingsComfort, currency)}
            </span>
            <span className="text-xs text-gray-400">Estimated savings</span>
          </div>
        </div>
      </div>
    </div>
  );
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
  if (!costOfLiving || !netIncomeProjection) {
    return null;
  }

  return (
    <>
      <div className="w-full bg-white rounded-2xl space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Your Cost of Living in {city}
          </h3>
          <p className="text-base text-gray-500">{peopleTrack}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {costOfLiving.map((item, idx) => (
            <div
              key={item.name}
              className={`flex flex-col gap-2 border rounded-xl px-4 py-3 transition-all duration-200
              ${idx === 0 ? 'border-blue-200 bg-blue-50' : 'border-purple-200 bg-purple-50'}`}
            >
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-gray-900">
                    {formatCurrency(item.num, currency)}
                  </p>
                  <p className="text-sm text-gray-500">/year</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-2 mt-6">
        <div className="flex flex-col gap-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Savings Projection</h3>
        </div>
        <div>
          {netIncomeProjection.map((item) => (
            <YearlySavingsCard
              year={item.name}
              key={item.name}
              savingsLowCost={item.num - costOfLiving[0].num}
              savingsComfort={item.num - costOfLiving[1].num}
              currency={currency}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default BudgetPresentation;
