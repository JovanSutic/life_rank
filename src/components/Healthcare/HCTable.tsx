import type { HealthMetricItem } from '../../types/city.types';

const HCTable = ({ headers = [], data = [] }: { headers: string[]; data: HealthMetricItem[] }) => {
  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden lg:block py-2 px-4 max-h-[450px] overflow-y-auto rounded-md shadow-md bg-white">
        <table className="w-full table-auto border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-sm text-gray-600">
              {headers.map((header, i) => (
                <th key={i} className="pb-2">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-gray-200">
                <td className="py-3 pr-4 text-sm text-gray-800 break-words">{row.name}</td>
                <td className="py-3 pr-4 text-sm text-gray-800 break-words">{row.value}</td>
                <td className="py-3 pr-4 text-sm text-gray-800 break-words">{row.bench}</td>
                <td className="py-3 pr-4 text-sm text-gray-800 break-words">{row.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden space-y-1 max-h-[486px] overflow-y-auto p-2 rounded-md shadow-md bg-white">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`${rowIndex < data.length - 1 && 'border-b border-gray-200'} py-4 space-y-1 text-sm`}
          >
            {/* Each data point stacked with its corresponding header */}
            <div className="flex justify-between">
              <span className="font-semibold text-gray-800">{headers[0]}</span>
              <span className="text-gray-800 text-right break-words max-w-[70%]">{row.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-800">{headers[1]}</span>
              <span className="text-gray-800 text-right break-words max-w-[70%]">{row.value}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-800">{headers[2]}</span>
              <span className="text-gray-800 text-right break-words max-w-[70%]">{row.bench}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-800">{headers[3]}</span>
              <span className="text-gray-800 text-right break-words max-w-[70%]">
                {row.comment}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HCTable;
