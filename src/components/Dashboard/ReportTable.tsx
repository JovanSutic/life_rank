import { InformationCircleIcon } from '@heroicons/react/24/outline';
import type { CurrencyString, ReportDto } from '../../types/api.types';
import Tooltip from '../Basic/Tooltip';
import { currencyMap } from '../../utils/budgetMaps';
import type { CurrencyOptions } from '../../types/budget.types';
import { useMemo, useState } from 'react';
import { getCurrencyRate } from '../../utils/budget';
import { Link } from 'react-router-dom';

const getRightTypes = (baseArr: string[], findArr: string[], trim: boolean) => {
  if (trim) {
    return baseArr.filter((item) => {
      if (!findArr.includes(item)) return item;
    });
  }
  return baseArr;
};

function ReportTable({ report }: { report: ReportDto | undefined; cityName: string }) {
  const [currency, setCurrency] = useState<CurrencyString>('eur');
  const rate = useMemo(() => {
    return report?.userData?.rates ? getCurrencyRate(report!.userData!.rates!, currency, 'eur') : 1;
  }, [currency]);

  if (!report) return null;

  const grouped = report.costItems?.reduce<Record<number, typeof report.costItems>>((acc, item) => {
    if (!acc[item.incomeMaker]) acc[item.incomeMaker] = [];
    acc[item.incomeMaker].push(item);
    return acc;
  }, {});

  const formattedDate = new Date(report?.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const rowExplanations: Record<string, string> = {
    cumulative_net: 'The total net income from all income sources combined.',
    budget_low: 'Estimated annual expenses for a frugal lifestyle.',
    budget_comfort: 'Estimated annual expenses for a comfortable lifestyle.',
    savings_low: 'Potential savings when living with a frugal budget.',
    savings_comfort: 'Potential savings when living with a comfortable budget.',
  };

  const usTypes = ['us_income_tax', 'us_self_tax'];

  const typeOrder = [
    'allowance',
    'accounting',
    'taxable_income',
    'income_tax',
    'us_income_tax',
    'us_self_tax',
    'social_contributions',
    'effective_tax',
    'business_cost',
    'net',
  ];

  const typeExplanations: Record<string, string> = {
    allowance:
      'Allowances are amounts you can deduct from your taxable income, reducing the overall tax burden.',
    accounting:
      'Accounting costs represent fees paid for financial and tax reporting services related to your income.',
    taxable_income:
      'Taxable income is the portion of your income subject to taxation after all deductions and allowances.',
    income_tax: 'Income tax is the total amount of tax you owe based on your taxable income.',
    social_contributions:
      'Social contributions are mandatory payments that fund social security and related benefits.',
    effective_tax:
      'Effective tax represents the average tax rate you pay on your total taxable income.',
    business_cost:
      'Total cost of business is the amount you need to pay out of your gross income (taxes + expenses + social contributions).',
    net: 'Net income is your final income after all taxes, contributions, and expenses are deducted.',
    us_income_tax:
      'U.S. citizens and residents owe tax on all worldwide income, including earnings abroad.',
    us_self_tax:
      'Self-employed individuals usually pay U.S. Social Security and Medicare tax on foreign earnings unless exempt by a totalization agreement.',
  };

  const boldTypes = ['effective_tax', 'business_cost', 'net'];

  return (
    <>
      <div className="mb-2">
        <h1 className="text-xl font-semibold text-gray-800">
          Report for{' '}
          <span className="font-bold text-blue-500">
            {report.city?.name}, {report.city?.country}
          </span>
        </h1>
        <span className="text-gray-500 text-sm">Created on {formattedDate}</span>
      </div>
      <div className="flex flex-col mb-4 border-t border-gray-300 pt-2">
        <p className="text-base text-gray-500 mb-1 text-sm">
          Change currency (rate from create date):
        </p>
        <select
          className="border border-gray-300 rounded px-2 py-1"
          value={currency}
          name="currency-selector"
          onChange={(e) => setCurrency(e.target.value as CurrencyString)}
        >
          <option value="eur">Euro (€)</option>
          <option value="usd">US Dollar ($)</option>
          <option value="gbp">British Pound (£)</option>
        </select>
      </div>
      <div className="space-y-8">
        {Object.keys(grouped!)
          .sort((a, b) => Number(a) - Number(b))
          .map((incomeMakerKey) => {
            const items = grouped?.[Number(incomeMakerKey)];
            return (
              <div key={incomeMakerKey} className="relative rounded-lg shadow-sm">
                <div className="bg-gray-100 px-4 py-2 font-semibold">
                  Income Maker {Number(incomeMakerKey) + 1}
                  <span className="block font-medium text-sm text-gray-400">{`Gross income: ${currencyMap[report.userData.incomes[Number(incomeMakerKey)].currency.toUpperCase() as CurrencyOptions]}${report.userData.incomes[
                    Number(incomeMakerKey)
                  ].income.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}`}</span>
                </div>
                <div className="px-2">
                  <table className="w-full text-sm">
                    <tbody>
                      {getRightTypes(
                        typeOrder,
                        usTypes,
                        !report.userData.incomes[Number(incomeMakerKey)].isUSCitizen
                      ).map((type, typeIndex) => {
                        const matchingItems = items?.filter((i) => i.type === type);
                        const lastType = typeOrder.length - 1 === typeIndex;
                        if (matchingItems?.length === 0) return null;
                        return matchingItems?.map((item, index) => (
                          <tr
                            key={item.id}
                            className={
                              lastType && matchingItems.length - 1 === index
                                ? 'relative '
                                : 'relative border-b border-gray-300'
                            }
                          >
                            <td
                              className={`px-1 py-2 ${boldTypes.includes(type) ? 'font-semibold' : 'font-base'}`}
                            >
                              {item.label}
                              <Tooltip
                                text={
                                  usTypes.includes(type)
                                    ? item.note || typeExplanations[type]
                                    : typeExplanations[type]
                                }
                              >
                                <InformationCircleIcon className="h-4 w-4 inline-block ml-1 stroke-black" />
                              </Tooltip>
                            </td>
                            <td
                              className={`px-1 py-2 text-right ${boldTypes.includes(type) ? 'font-bold' : 'font-medium'} ${type === 'net' ? 'text-green-600' : 'text-gray-700'}`}
                            >
                              {`${type === 'effective_tax' ? '' : currencyMap[currency.toUpperCase() as CurrencyOptions]}${(type ===
                              'effective_tax'
                                ? item.amount
                                : item.amount * rate
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: type === 'effective_tax' ? 0 : 2,
                                maximumFractionDigits: type === 'effective_tax' ? 0 : 2,
                              })}${type === 'effective_tax' ? '%' : ''}`}
                            </td>
                          </tr>
                        ));
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}

        {/* Final Expenses & Savings */}
        <div className="rounded-lg shadow-sm">
          <div className="bg-gray-100 px-4 py-2 font-semibold">Budget & Savings Summary</div>
          <div className="px-2">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="px-1 py-2 font-semibold">
                    Cumulative Net
                    <Tooltip text={rowExplanations.cumulative_net}>
                      <InformationCircleIcon className="h-4 w-4 inline-block ml-1 stroke-black" />
                    </Tooltip>
                  </td>
                  <td className="px-1 py-2 text-right font-semibold text-green-600">
                    {currencyMap[currency.toUpperCase() as CurrencyOptions]}
                    {(rate * report.net).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="px-1 py-2">
                    Budget (Low){' '}
                    <Tooltip text={rowExplanations.budget_low}>
                      <InformationCircleIcon className="h-4 w-4 inline-block ml-1 stroke-black" />
                    </Tooltip>
                  </td>
                  <td className="px-1 py-2 text-right font-medium">
                    {currencyMap[currency.toUpperCase() as CurrencyOptions]}
                    {(rate * report.expensesLow).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="px-1 py-2">
                    Budget (Comfort){' '}
                    <Tooltip text={rowExplanations.budget_comfort}>
                      <InformationCircleIcon className="h-4 w-4 inline-block ml-1 stroke-black" />
                    </Tooltip>
                  </td>
                  <td className="px-1 py-2 text-right font-medium">
                    {currencyMap[currency.toUpperCase() as CurrencyOptions]}
                    {(rate * report.expensesComfort).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-1 py-2 font-semibold">
                    Savings Potential (Low){' '}
                    <Tooltip text={rowExplanations.savings_low}>
                      <InformationCircleIcon className="h-4 w-4 inline-block ml-1 stroke-black" />
                    </Tooltip>
                  </td>
                  <td
                    className={`px-1 py-2 text-right font-bold ${report.net - report.expensesLow < 0 ? 'text-red-600' : 'text-green-600'}`}
                  >
                    {currencyMap[currency.toUpperCase() as CurrencyOptions]}
                    {(rate * (report.net - report.expensesLow)).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-1 py-2 font-semibold">
                    Savings Potential (Comfort){' '}
                    <Tooltip text={rowExplanations.savings_comfort}>
                      <InformationCircleIcon className="h-4 w-4 inline-block ml-1 stroke-black" />
                    </Tooltip>
                  </td>
                  <td
                    className={`px-1 py-2 text-right font-bold ${report.net - report.expensesComfort < 0 ? 'text-red-600' : 'text-green-600'}`}
                  >
                    {currencyMap[currency.toUpperCase() as CurrencyOptions]}
                    {(rate * (report.net - report.expensesComfort)).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm font-light text-blue-700">
          <strong>Note:</strong> These numbers are a solid estimate based on current tax rules and
          average expenses. Real life may bring more costs, extra savings, or opportunities to
          optimize taxes—especially for families. Think of it as a very realistic guide, not a
          guarantee.
        </p>
      </div>
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-700">
          {`This report covers the basic tax, but your tax situation may change if you have investments,
          stocks, or other income sources. For full details, check the official tax page for ${report.city?.country}`}
        </p>
        <Link
          to={`/taxes/${report.city?.country}?country=${report.city?.countriesId || 1}`}
          className="inline-block mt-4 text-sm font-medium text-yellow-800 underline"
        >
          {`Learn more about taxes in ${report.city?.country}`}
        </Link>
      </div>
      <div className="flex justify-center mt-4 mb-4">
        <Link
          to="/dashboard"
          className="w-full block md:w-[320px] cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-6 rounded-lg transition-colors mt-4"
        >
          Back to the Dashboard
        </Link>
      </div>
    </>
  );
}

export default ReportTable;
