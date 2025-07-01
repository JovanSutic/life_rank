import type { CurrencyOptions } from '../../types/budget.types';
import type { PanelTableItem } from '../../types/city.types';
import { getBudgetLabel } from '../../utils/map';

function PanelTable({
  data,
  currency,
  index,
  name,
  title,
  punchline,
}: {
  data: PanelTableItem[];
  title: string;
  punchline: string;
  currency: CurrencyOptions;
  index: number;
  name: string;
}) {
  return (
    <div className="bg-white p-4">
      <div className="text-center mb-6">
        <p className="font-bold text-sm md:text-base text-gray-800">{title}</p>
        <p className="text-sm text-gray-600 mt-1">{punchline}</p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-0">
        {data.map((item, i) => (
          <div
            key={name + i}
            className={`flex flex-col text-base md:text-lg w-full text-center lg:w-1/3 px-4 py-4 md:px-2
              ${i < data.length - 1 ? 'border-b lg:border-b-0 lg:border-r border-gray-200' : ''}
            `}
          >
            <span className="font-semibold text-gray-800 mb-1 md:mb-2">{item.title}</span>

            <span className="text-gray-900 text-sm md:text-base">
              {`${getBudgetLabel(currency, index, item.from, false)} - ${getBudgetLabel(currency, index, item.to, false)}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PanelTable;
