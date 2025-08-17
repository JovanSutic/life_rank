import { formatCurrency } from '../../utils/saveNet';

function ComparisonBar({
  label,
  cost,
  low,
  net,
}: {
  label: string;
  cost: number;
  low: boolean;
  net: number;
}) {
  const percentage = (net / cost) * 100;
  const barWidth = `${Math.min(percentage, 100)}%`;
  const indicatorLeft = `${Math.min(percentage, 100)}%`;
  const isCovered = net >= cost;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-500 font-base">{label}</span>
        <span className={`font-semibold ${isCovered ? 'text-green-600' : 'text-red-500'}`}>
          {isCovered ? 'Covered! ✅' : 'Not Covered ❌'}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
        <div
          className={`rounded-full h-4 ${low ? 'bg-blue-500' : 'bg-green-500'} transition-all duration-500 ease-in-out`}
          style={{ width: barWidth }}
        ></div>
        <div
          className={`absolute h-6 w-1 rounded-full -top-1 ${low ? 'bg-blue-500' : 'bg-green-500'} transition-all duration-500 ease-in-out`}
          style={{ left: indicatorLeft }}
        ></div>
      </div>
    </div>
  );
}

function BudgetPresentation({ low, comfort, net }: { low: number; comfort: number; net: number }) {
  return (
    <div className="bg-white">
      {/* Data Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <div className="text-gray-500 text-sm md:text-base">Low-Cost Scenario</div>
          <div className="text-2xl md:text-3xl font-bold text-blue-500">{formatCurrency(low)}</div>
        </div>
        <div>
          <div className="text-gray-500 text-sm md:text-base">Comfortable Scenario</div>
          <div className="text-2xl md:text-3xl font-bold text-green-500">
            {formatCurrency(comfort)}
          </div>
        </div>
      </div>

      {/* Comparison Bars Section */}
      <div className="space-y-8">
        {/* User Input for Net Income */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <p className="text-gray-700 font-medium whitespace-nowrap">
            Your Annual Net Income:{' '}
            <span className="text-xl font-bold text-gray-700">{formatCurrency(net)}</span>
          </p>
        </div>

        {/* Low-Cost Comparison */}
        <ComparisonBar net={net} label="Ability to cover Low-Cost Scenario" cost={low} low={true} />

        {/* Comfortable Comparison */}
        <ComparisonBar
          net={net}
          label="Ability to cover Comfortable Scenario"
          cost={comfort}
          low={false}
        />
      </div>
    </div>
  );
}

export default BudgetPresentation;
