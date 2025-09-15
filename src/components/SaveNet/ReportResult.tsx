import {
  ArrowTrendingUpIcon,
  BanknotesIcon,
  ChartBarIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import type { City, DefValue, ReportDto } from '../../types/api.types';
import { formatCurrency, formatPercentage, trackPeople } from '../../utils/saveNet';
import DisplayBox from '../Basic/DisplayBox';
import OtherTaxes from './OtherTaxes';
import { mapCompass, regionsSpain } from '../../data/taxes';
import BudgetPresentation from './BudgetPresentation';
import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useMapStore } from '../../stores/mapStore';
import type { CurrencyOptions } from '../../types/budget.types';
import { convertCurrencyInString } from '../../utils/city';
import { getEssentialReportData, getRegime } from '../../utils/reports';
import Tooltip from '../Basic/Tooltip';
import Modal from '../Basic/Modal';
import { CurrencySelector } from '../Basic/CurrencySelector';

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="space-y-6 mb-6">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <p className="text-sm md:text-base text-gray-600 mb-4">{subtitle}</p>
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
    <div className="w-full bg-gray-50 grid grid-cols-2 gap-2 px-4 py-2 border border-gray-200 shadow-lg rounded-xl">
      <div className="flex flex-col items-center">
        <p className="text-gray-400 mt-2 text-sm md:text-base">Annual Period</p>
        <div className="relative flex flex-col items-center p-4 transition-all duration-300 transform hover:scale-105">
          <div
            className={`p-3 mb-4 rounded-full ${style === 'normal' ? 'bg-blue-50' : 'bg-gray-50'}`}
          >
            <BanknotesIcon
              className={`${style === 'normal' ? 'text-blue-600' : 'text-gray-600'} w-8 h-8`}
            />
          </div>
          <div>
            <span className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider text-center">
              Net Income
            </span>
          </div>
          <span className="mt-2 text-2xl font-bold text-gray-900 animate-fade-in truncate w-full text-center">
            {formatCurrency(net, currency)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="">
          <div className="relative flex flex-col items-center px-2 py-1 transition-all duration-300 transform hover:scale-105">
            <div className={`p-1 rounded-full`}>
              <ChartBarIcon
                className={`${style === 'normal' ? 'text-purple-600' : 'text-gray-600'} w-5 h-5`}
              />
            </div>
            <div className="ml-[-12px]">
              <Tooltip text="This is the total annual amount of all mandatory payments you would make to the government. It includes  taxes and all required social contributions for unemployment, health care, and pension.">
                <InformationCircleIcon className="h-5 w-5 inline-block stroke-black align-bottom" />
              </Tooltip>
              <span className="ml-1 text-sm md:text-base font-base text-gray-500 tracking-wider text-center">
                Taxes
              </span>
            </div>

            <span className="mt-1 text-xl font-bold text-gray-900 animate-fade-in truncate w-full text-center">
              {formatCurrency(cumulativeTax, currency)}
            </span>
          </div>
        </div>

        <div className="">
          <div className="relative flex flex-col items-center px-4 py-1 transition-all duration-300 transform hover:scale-105">
            <div className={`p-1 rounded-full`}>
              <ArrowTrendingUpIcon
                className={`${style === 'normal' ? 'text-green-600' : 'text-gray-600'} w-5 h-5`}
              />
            </div>
            <div className="ml-[-12px]">
              <Tooltip text="This percentage shows the effective tax rate. It is calculated by dividing your total annual tax and social contributions by your gross annual income, providing a clear picture of your total tax burden.">
                <InformationCircleIcon className="h-5 w-5 inline-block stroke-black align-bottom" />
              </Tooltip>
              <span className="ml-1 text-sm md:text-base font-base text-gray-500 tracking-wider text-center">
                Tax Rate
              </span>
            </div>
            <span className="mt-1 text-xl font-bold text-gray-900 animate-fade-in truncate w-full text-center">
              {formatPercentage(effectiveTax * 100)}
            </span>
          </div>
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
  const { currency, currencyIndex } = useMapStore();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');

  const { cumulativeTax, effectiveTax, earners, future, displayMessages } = useMemo(() => {
    return getEssentialReportData(data, currencyIndex, currency, city?.country);
  }, [data.net, currencyIndex, currency]);

  const regimes = getRegime(data, city?.country || '');

  function getSection() {
    if (modalType === 'Breakdown') {
      return (
        <section className="border-b border-gray-300 pb-10 w-full overflow-y-auto max-h-[90vh]">
          <SectionHeader
            title="Step-by-Step Breakdown"
            subtitle="It is good to know how your tax figures are calculated. This information helps you understand how your final tax amount was determined, from your taxable base to the application of any allowances, reductions, and tax credits."
          />
          {earners[0].length > 0 && (
            <>
              <div className="bg-gray-100 p-4 rounded-2xl shadow-inner mt-4 mb-4">
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
                        <p className="font-medium md:text-lg text-gray-700">{item.name}</p>
                        <p className="text-sm md:text-base text-gray-500 mt-1 pr-4">
                          {item.explain}
                        </p>
                        {item.calc && (
                          <p className="text-sm md:text-base  text-gray-500 mt-1 italic">
                            {item.calc}
                          </p>
                        )}
                      </div>
                      <div className="mt-2 sm:mt-0 text-right">
                        <span className="font-semibold md:text-lg">Total: </span>
                        <span className="font-bold md:text-lg text-blue-500">{item.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <DisplayBox
                title={`${city?.country || ''} - ${regimes[0].regime}`}
                message={regimes[0].description}
                color="blue"
              />
            </>
          )}
          {earners[1].length > 0 && (
            <>
              <div className="bg-gray-100 p-4 rounded-2xl shadow-inner mt-10 mb-4">
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
              <DisplayBox
                title={`${city?.country || ''} - ${regimes[1].regime}`}
                message={regimes[1].description}
                color="blue"
              />
            </>
          )}
        </section>
      );
    }

    if (modalType === 'Other Taxes') {
      return (
        <section className="border-b border-gray-300 pb-10 w-full overflow-y-auto max-h-[90vh]">
          <SectionHeader
            title="Other Relevant Taxes"
            subtitle="Outline of other taxes that may be relevant to your financial situation. This information helps you be aware of other taxes which can potentially create new financial obligations for you."
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
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block md:w-[320px] cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-6 rounded-lg transition-colors"
              >
                Check out other taxes in {city?.country}
              </Link>
            </div>
          </div>
        </section>
      );
    }

    if (modalType === 'Cost of Living') {
      return (
        <section className="border-b border-gray-300 pb-10 w-full overflow-y-auto max-h-[90vh]">
          <SectionHeader
            title="The Cost of Living"
            subtitle={`Practical comparison of your net income with the estimated cost of living in ${city?.name}. This information helps you plan your budget and understand your lifestyle comfort level.`}
          />
          <div className="rounded-xl space-y-10">
            <div>
              <BudgetPresentation
                currency={currency}
                peopleTrack={trackPeople(data.userData)}
                city={city?.name || ''}
                costOfLiving={[
                  {
                    name: 'Low Cost Budget',
                    description:
                      'Represents the minimum cost required to cover essential necessities. It is budget-focused with limited non-essential spending.',
                    num: data.expensesLow * currencyIndex,
                    savings: 'Saving potential on Low Cost Budget',
                  },
                  {
                    name: 'Comfort Budget',
                    description:
                      'Represents spending needed for very good quality of life at this particular destination.',
                    num: data.expensesComfort * currencyIndex,
                    savings: 'Saving potential on Comfort Budget',
                  },
                ]}
                netIncomeProjection={[
                  {
                    name: '1st year',
                    description: `Net ${data.expensesLow < data.net ? 'higher then' : 'lower then'} low cost scenario & ${data.expensesComfort < data.net ? 'higher then' : 'lower then'} comfortable scenario`,
                    num: data.net * currencyIndex,
                  },
                  ...future.map((item) => ({
                    name: `${item.year} year`,
                    description: `Net ${data.expensesLow * currencyIndex < item.net ? 'higher then' : 'lower then'} low cost scenario & ${data.expensesComfort * currencyIndex < item.net ? 'higher then' : 'lower then'} comfortable scenario`,
                    num: item.net,
                  })),
                ]}
              />
            </div>
            <div className="w-full mt-6 flex flex-col items-center justify-center">
              <Link
                to={mapCompass[city?.country || 'Spain']}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block md:w-[320px] cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-6 rounded-lg transition-colors"
              >
                Cost of Living Map
              </Link>
            </div>
          </div>
        </section>
      );
    }
  }

  return (
    <div className="space-y-8">
      <Modal
        show={isModal}
        close={() => {
          setIsModal(false);
          setModalType('');
        }}
      >
        {getSection()}
      </Modal>
      <section className="border-b border-gray-300 pb-10">
        <SectionHeader
          title="Financial Summery"
          subtitle="Quick financial summery that presents most important income features. This information helps you see
          what you'll be paying and what you'll be taking home."
        />

        <hr className="border-gray-300" />

        <div className="flex flex-col items-end mt-4">
          <div className="max-w-[190px]">
            <CurrencySelector rates={data!.userData!.rates!} reverse={true} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4">{`1st year`}</h4>
            <Card
              net={data.net * currencyIndex}
              cumulativeTax={cumulativeTax}
              effectiveTax={effectiveTax}
              currency={currency}
            />
          </div>
          <div className="flex mt-4 md:mt-0">
            <div className="w-full flex flex-col self-end gap-4">
              <button
                className="cursor-pointer font-semibold text-lg text-blue-500 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg"
                onClick={() => {
                  setModalType('Breakdown');
                  setIsModal(true);
                }}
              >
                Calculation Breakdown
              </button>
              <button
                className="cursor-pointer font-semibold text-lg text-blue-500 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg"
                onClick={() => {
                  setModalType('Cost of Living');
                  setIsModal(true);
                }}
              >
                Cost of Living Check
              </button>
              <button
                className="cursor-pointer font-semibold text-lg text-blue-500 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg"
                onClick={() => {
                  setModalType('Other Taxes');
                  setIsModal(true);
                }}
              >
                Beyond Income Tax
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <SectionHeader
            title="What's Next?"
            subtitle="Your finances are evolving, as some reductions and reliefs can change with time. This information helps you see how your taxes and net will develop in the near future."
          />

          <hr className="border-gray-300" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            {future.map((item) => (
              <div key={`future${item.year}`} className="mb-8">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">{`${item.year} year`}</h4>
                <div className="flex">
                  <Card
                    net={item.net}
                    cumulativeTax={item.cumulativeTax}
                    effectiveTax={item.effectiveTax}
                    currency={currency}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {displayMessages.map((item) => (
              <DisplayBox
                key={item.id}
                title={item.title}
                message={convertCurrencyInString(item.message, currencyIndex, currency)}
              />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <DisplayBox
            title="Disclaimer: Important Information on Tax Calculations"
            message="These tax calculations are based on reliable data sources and give a strong, realistic estimate of your net income. However, individual outcomes may vary slightly depending on your personal circumstances"
            color="yellow"
          />
        </div>
      </section>
    </div>
  );
}

export default ReportResult;
