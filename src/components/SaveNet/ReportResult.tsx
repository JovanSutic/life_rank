import { ArrowTrendingUpIcon, BanknotesIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import type { City, DefValue, ReportDto } from '../../types/api.types';
import {
  formatCurrency,
  formatPercentage,
  getEssentialReportData,
  trackPeople,
} from '../../utils/saveNet';
import DisplayBox from '../Basic/DisplayBox';
import OtherTaxes from './OtherTaxes';
import { mapCompass, regionsSpain } from '../../data/spain';
import BudgetPresentation from './BudgetPresentation';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useMapStore } from '../../stores/mapStore';
import type { CurrencyOptions } from '../../types/budget.types';
import { convertCurrencyInString } from '../../utils/city';

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="space-y-6 mb-8">
      <h3 className="text-lg font-bold mb-4 text-gray-800">{title}</h3>
      <p className="font-base text-gray-500 mb-8">{subtitle}</p>
    </div>
  );
}

function Card({
  net,
  cumulativeTax,
  effectiveTax,
  currency,
  style = 'normal',
}: {
  net: number;
  cumulativeTax: number;
  effectiveTax: number;
  currency: CurrencyOptions;
  style?: 'normal' | 'future';
}) {
  return (
    <div className="flex justify-center items-center font-sans">
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
            {formatCurrency(net, currency)}
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
            {formatCurrency(cumulativeTax, currency)}
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
  activeTab = 'Summery',
}: {
  data: ReportDto;
  city: City | undefined;
  capitalGains?: DefValue[];
  activeTab?: string;
}) {
  const { currency, currencyIndex } = useMapStore();

  const { cumulativeTax, effectiveTax, earners, future, displayMessages } = useMemo(() => {
    return getEssentialReportData(data, currencyIndex, currency, city?.country);
  }, [data, currencyIndex, currency]);

  function getSection() {
    if (activeTab === 'Breakdown') {
      return (
        <section className="border-b border-gray-300 pb-10">
          <SectionHeader
            title="Step-by-Step Breakdown"
            subtitle="This is a breakdown of your self-employment tax calculation. Use this detailed view to understand how your final tax amount was determined, from your taxable base to the application of any allowances, reductions, and tax credits."
          />
          {earners[0].length > 0 && (
            <div className="bg-gray-100 p-4 rounded-2xl shadow-inner mt-4">
              {earners.length > 1 && (
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Income earner 1</h4>
              )}

              <div className="space-y-4 my-2">
                {earners[0].map((item) => (
                  <div
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-xl shadow-md border border-gray-200"
                    key={`0${item.name}`}
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-700">{item.name}</p>
                      <p className="text-sm text-gray-500 mt-1 pr-4">{item.explain}</p>
                      {item.calc && (
                        <p className="text-sm text-gray-500 mt-1 italic">{item.calc}</p>
                      )}
                    </div>
                    <div className="mt-2 sm:mt-0 text-right">
                      <span className="font-semibold">Total: </span>
                      <span className="font-bold text-blue-500">{item.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {earners[1].length > 0 && (
            <div className="bg-gray-100 p-4 rounded-2xl shadow-inner mt-10">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Income earner 2</h4>
              <div className="space-y-4 mb-2">
                {earners[1].map((item) => (
                  <div
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-xl shadow-md border border-gray-200"
                    key={`1${item.name}`}
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-700">{item.name}</p>
                      <p className="text-sm text-gray-500 mt-1 pr-4">{item.explain}</p>
                      {item.calc && (
                        <p className="text-sm text-gray-500 mt-1 italic">{item.calc}</p>
                      )}
                    </div>
                    <div className="mt-2 sm:mt-0 text-right">
                      <span className="font-semibold">Total: </span>
                      <span className="font-bold text-blue-500">{item.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      );
    }

    if (activeTab === 'Forecast') {
      return (
        <section className="border-b border-gray-300 pb-10">
          <SectionHeader
            title="What's Next? 2-Year Forecast"
            subtitle="Curious about what's ahead? This two-year forecast breaks down your estimated tax outlook,
          highlighting how expiring reductions and allowances could affect your taxes in the coming
          years."
          />
          {future.map((item) => (
            <div key={`future${item.year}`} className="mb-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{`Year ${item.year}`}</h4>
              <Card
                net={item.net}
                cumulativeTax={item.cumulativeTax}
                effectiveTax={item.effectiveTax}
                currency={currency}
              />
            </div>
          ))}
          <div className="space-y-4">
            {displayMessages.map((item) => (
              <DisplayBox
                key={item.id}
                title={item.title}
                message={convertCurrencyInString(item.message, currencyIndex, currency)}
              />
            ))}
          </div>
        </section>
      );
    }

    if (activeTab === 'Other Taxes') {
      return (
        <section className="border-b border-gray-300 pb-10">
          <SectionHeader
            title="Other Relevant Taxes"
            subtitle="We outline other taxes that may be relevant to your financial situation. Take a look at brief explanation of Wealth Tax and Capital Gains Tax, which can create new financial obligations."
          />
          <div>
            <OtherTaxes
              regionName={regionsSpain[data.cityId]?.region}
              capitalGainsData={capitalGains || []}
              country={city?.country || ''}
            />
            <div className="w-full mt-6 px-4 flex flex-col items-center justify-center">
              <Link
                to={`/taxes/${city?.country}?country=${city?.countriesId}`}
                className="w-full block md:w-[300px] cursor-pointer bg-green-500 hover:bg-green-600 text-white text-center py-2 px-6 rounded-lg transition-colors"
              >
                Check out other taxes in {city?.country}
              </Link>
            </div>
          </div>
        </section>
      );
    }

    if (activeTab === 'Cost of Living') {
      return (
        <section className="border-b border-gray-300 pb-10">
          <SectionHeader
            title="The Cost of Living"
            subtitle={`We provide a practical comparison of your net income with the estimated cost of living in ${city?.name}. Use this information to better plan your budget and understand your financial comfort level in your new location.`}
          />
          <div className="rounded-xl space-y-10">
            <div>
              <BudgetPresentation
                currency={currency}
                peopleTrack={trackPeople(data.userData)}
                costOfLiving={[
                  {
                    name: 'Low Cost Scenario',
                    description:
                      'Represents the minimum cost required to cover essential necessities. It is budget-focused with limited non-essential spending.',
                    num: data.expensesLow * currencyIndex,
                  },
                  {
                    name: 'Comfortable Scenario',
                    description:
                      'It accounts for more than just the bare necessities, allowing for very good quality of life.',
                    num: data.expensesComfort * currencyIndex,
                  },
                ]}
                netIncomeProjection={[
                  {
                    name: 'Year 1',
                    description: `Net ${data.expensesLow < data.net ? 'higher then' : 'lower then'} low cost scenario & ${data.expensesComfort < data.net ? 'higher then' : 'lower then'} comfortable scenario`,
                    num: data.net * currencyIndex,
                  },
                  ...future.map((item) => ({
                    name: `Year ${item.year}`,
                    description: `Net ${data.expensesLow * currencyIndex < item.net ? 'higher then' : 'lower then'} low cost scenario & ${data.expensesComfort * currencyIndex < item.net ? 'higher then' : 'lower then'} comfortable scenario`,
                    num: item.net,
                  })),
                ]}
              />
            </div>
            <div className="w-full mt-6 flex flex-col items-center justify-center">
              <Link
                to={mapCompass[city?.country || 'Spain']}
                className="w-full block md:w-[300px] cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-6 rounded-lg transition-colors"
              >
                Cost of Living Map
              </Link>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="border-b border-gray-300 pb-10">
        <SectionHeader
          title="Financial Summery"
          subtitle="This is a quick summery of finances, for your usecase. This is helping you see
          what you'll be paying and what you'll be taking home in the first year of operation."
        />
        <Card
          net={data.net * currencyIndex}
          cumulativeTax={cumulativeTax}
          effectiveTax={effectiveTax}
          currency={currency}
        />
        <div className="mt-8">
          <DisplayBox
            title="Disclaimer: Important Information on Tax Calculations"
            message="Provided tax calculations are designed to be highly accurate and give you a strong estimate of your financial outcome. However, it is essential to understand that they are for informational purposes only and cannot be considered definitive. Your actual tax situation can be influenced by a number of factors that a simple calculator cannot account for. While our numbers are very close to what you would realistically achieve, you should always expect some possible (not substantial) differences."
            color="yellow"
          />
        </div>
      </section>
    );
  }

  return <div className="space-y-8">{getSection()}</div>;
}

export default ReportResult;
