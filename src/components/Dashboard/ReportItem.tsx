import type { ReportItem as ReportItemType } from '../../types/api.types';

function ReportItem({ data, onClick }: { data: ReportItemType; onClick: () => void }) {
  const { createdAt, net, city, userData } = data;
  const incomesCount = userData.incomes.length;
  const dependentsCount = userData.dependents.length;

  const formattedDate = new Date(createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <button
      onClick={onClick}
      className="bg-white cursor-pointer rounded-xl shadow-md py-2 px-4  border border-gray-100 hover:shadow-lg transition-shadow h-full w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">{city.name}</h2>
      </div>

      <div className="text-xl font-bold text-blue-600">
        €{net.toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </div>

      <div className="flex justify-between text-sm text-gray-600 mt-4">
        <span>Incomes: {incomesCount}</span>
        <span>Dependents: {dependentsCount}</span>
      </div>

      <div className="flex mt-2 justify-end">
        <span className="text-sm text-gray-500 italic">{formattedDate}</span>
      </div>
    </button>
  );
}

export default ReportItem;
