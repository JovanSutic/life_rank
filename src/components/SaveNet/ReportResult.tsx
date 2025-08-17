import {
  ArrowTrendingUpIcon,
  BanknotesIcon,
  ChartBarIcon,
  UserIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import type { City, DefValue, ReportDto } from '../../types/api.types';
import { formatCurrency, formatPercentage, getEssentialReportData } from '../../utils/saveNet';
import DisplayBox from '../Basic/DisplayBox';
import OtherTaxes from './OtherTaxes';
import { regionsSpain } from '../../data/spain';
import BudgetPresentation from './BudgetPresentation';
import { Link } from 'react-router-dom';

function Card({
  net,
  cumulativeTax,
  effectiveTax,
  style = 'normal',
}: {
  net: number;
  cumulativeTax: number;
  effectiveTax: number;
  style?: 'normal' | 'future';
}) {
  return (
    <div className="flex justify-center items-center font-sans mb-10">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative flex flex-col items-center p-4 bg-white rounded-2xl border border-gray-100 shadow-md transition-all duration-300 transform hover:scale-105">
          <div
            className={`p-3 mb-4 rounded-full ${style === 'normal' ? 'bg-blue-50' : 'bg-gray-50'}`}
          >
            <BanknotesIcon
              className={`${style === 'normal' ? 'text-blue-600' : 'text-gray-600'} w-8 h-8`}
            />
          </div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
            Annual Net Income
          </span>
          <span className="mt-2 text-2xl font-bold text-gray-900 animate-fade-in truncate w-full text-center">
            {formatCurrency(net)}
          </span>
        </div>

        <div className="relative flex flex-col items-center p-4 bg-white rounded-2xl border border-gray-100 shadow-md transition-all duration-300 transform hover:scale-105">
          <div
            className={`p-3 mb-4 rounded-full ${style === 'normal' ? 'bg-purple-50' : 'bg-gray-50'}`}
          >
            <ChartBarIcon
              className={`${style === 'normal' ? 'text-purple-600' : 'text-gray-600'} w-8 h-8`}
            />
          </div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
            Taxes & Contributions
          </span>
          <span className="mt-2 text-2xl font-bold text-gray-900 animate-fade-in truncate w-full text-center">
            {formatCurrency(cumulativeTax)}
          </span>
        </div>

        <div className="relative flex flex-col items-center p-4 bg-white rounded-2xl border border-gray-100 shadow-md transition-all duration-300 transform hover:scale-105">
          <div
            className={`p-3 mb-4 rounded-full ${style === 'normal' ? 'bg-green-50' : 'bg-gray-50'}`}
          >
            <ArrowTrendingUpIcon
              className={`${style === 'normal' ? 'text-green-600' : 'text-gray-600'} w-8 h-8`}
            />
          </div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
            Effective Tax Rate
          </span>
          <span className="mt-2 text-2xl font-bold text-gray-900 animate-fade-in truncate w-full text-center">
            {formatPercentage(effectiveTax * 100)}
          </span>
        </div>
      </div>
    </div>
  );
}

function ReportResult({
  data,
  city,
  capitalGains,
}: {
  data: ReportDto;
  city: City | undefined;
  capitalGains?: DefValue[];
}) {
  const { cumulativeTax, effectiveTax, earners, future, displayMessages } =
    getEssentialReportData(data);

  return (
    <div className="space-y-8">
      <section className="border-b border-gray-300 pb-8">
        <h3 className="text-xl font-bold mb-6 text-gray-800">Financial Summery</h3>
        <Card net={data.net} cumulativeTax={cumulativeTax} effectiveTax={effectiveTax} />
      </section>
      <section className="border-b border-gray-300 pb-8">
        <h3 className="text-xl font-bold mb-6 text-gray-800">Step-by-Step Breakdown</h3>
        {earners[0].length > 0 && (
          <>
            <div
              className={`inline-flex items-center px-3 py-1.5 rounded-full bg-blue-500 text-white mb-1`}
            >
              <UserIcon className="h-4 w-4" />
              <span className="text-sm font-medium">Income earner 1</span>
            </div>
            <div className="divide-y divide-gray-200 mb-4">
              {earners[0].map((item) => (
                <div
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4"
                  key={`0${item.name}`}
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-700">{item.name}</p>
                    <p className="text-sm text-gray-500 mt-1 italic pr-4">{item.explain}</p>
                    {item.calc && <p className="text-sm text-gray-500 mt-1 italic">{item.calc}</p>}
                  </div>
                  <div className="mt-2 sm:mt-0 text-right">
                    <span
                      // eslint-disable-next-line no-constant-condition
                      className={`font-semibold ${30 < 0 ? 'text-green-600' : 'text-gray-900'}`}
                    >
                      Total: {item.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {earners[1].length > 0 && (
          <>
            <div
              className={`inline-flex items-center px-3 py-1.5 rounded-full bg-blue-500 text-white mb-1`}
            >
              <UserIcon className="h-4 w-4" />
              <span className="text-sm font-medium">Income earner 2</span>
            </div>
            <div className="divide-y divide-gray-200">
              {earners[1].map((item) => (
                <div
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4"
                  key={`1${item.name}`}
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-700">{item.name}</p>
                    <p className="text-sm text-gray-500 mt-1 italic pr-4">{item.explain}</p>
                    {item.calc && <p className="text-sm text-gray-500 mt-1 italic">{item.calc}</p>}
                  </div>
                  <div className="mt-2 sm:mt-0 text-right">
                    <span
                      // eslint-disable-next-line no-constant-condition
                      className={`font-semibold ${30 < 0 ? 'text-green-600' : 'text-gray-900'}`}
                    >
                      Total: {item.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      <section className="border-b border-gray-300 pb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">What's Next? 2-Year Forecast</h3>
        <p className="font-light text-gray-500 mb-8">
          Curious about what's ahead? This two-year forecast breaks down your estimated tax outlook,
          highlighting how expiring reductions and allowances could affect your taxes in the coming
          years.
        </p>
        {future.map((item) => (
          <div key={`future${item.year}`}>
            <div
              className={`inline-flex items-center px-3 py-1.5 rounded-full bg-purple-500 text-white mb-4`}
            >
              <ClockIcon className="h-4 w-4" />
              <span className="text-sm font-medium">{`Year ${item.year}`}</span>
            </div>
            <Card
              net={item.net}
              cumulativeTax={item.cumulativeTax}
              effectiveTax={item.effectiveTax}
              style="future"
            />
          </div>
        ))}
        <div className="space-y-4">
          {displayMessages.map((item) => (
            <DisplayBox key={item.id} title={item.title} message={item.message} />
          ))}
        </div>
      </section>
      <section className="border-b border-gray-300 pb-8">
        <h3 className="text-xl font-bold mb-6 text-gray-800">Other Relevant Taxes</h3>
        <div>
          <OtherTaxes
            regionName={regionsSpain[data.cityId]?.region}
            capitalGainsData={capitalGains || []}
          />
        </div>
      </section>
      <section>
        <h3 className="text-xl font-bold mb-6 text-gray-800">The Cost of Living</h3>
        <div className="p-8 rounded-xl border border-gray-300 shadow-xl space-y-10">
          <div>
            <BudgetPresentation
              low={data.expensesLow}
              comfort={data.expensesComfort}
              net={data.net}
            />
          </div>
          <div className="w-full mt-6 flex flex-col items-center justify-center">
            <Link
              to="/europe?layerTypeId=1&centerLat=40.67267&centerLng=-3.86719&north=47.59167&south=32.95377&east=10.89844&west=-18.63281&zoom=6&budget=7000&size=9007199254740991&sea=false&rank=false&country=Spain"
              className="w-full block md:w-[300px] cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-6 rounded-lg transition-colors"
            >
              Check out other cities in {city?.country}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReportResult;
