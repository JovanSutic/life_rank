import {
  ArrowTrendingUpIcon,
  BanknotesIcon,
  ChartBarIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import type { City, DefValue, ReportDto } from '../../types/api.types';
import { formatCurrency, formatPercentage, trackPeople } from '../../utils/saveNet';
import DisplayBox from '../Basic/DisplayBox';
import OtherTaxes from './OtherTaxes';
import { mapCompass, regionsSpain } from '../../data/taxes';
import BudgetPresentation from './BudgetPresentation';
import { useMemo, useState } from 'react';
import { useMapStore } from '../../stores/mapStore';
import type { CurrencyOptions } from '../../types/budget.types';
import { convertCurrencyInString } from '../../utils/city';
import { getDescriptionForType, getEssentialReportData, getRegime } from '../../utils/reports';
import Modal from '../Basic/Modal';
import CurrencySelector from '../Basic/CurrencySelector';
import type { BreakdownItem } from '../../types/flow.types';
import { Button } from '../Basic/Button';

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-base md:text-lg font-semibold text-gray-800">{title}</h2>
      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{subtitle}</p>
    </div>
  );
}

function IncomeBreakdownTable({ items, name = '' }: { items: BreakdownItem[]; name?: string }) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm">
      <div className="px-4 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Net Calculation for {name}</h3>
      </div>

      <div className="divide-y divide-gray-100">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-12 gap-2 items-start px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            {/* Name + Explain */}
            <div className="col-span-5">
              <p className="text-sm font-medium text-gray-800">{item.name}</p>
              <p className="text-xs text-gray-500">{item.explain}</p>
            </div>

            {/* Calculation */}
            <div className="col-span-4 text-sm text-gray-600 flex items-center justify-start font-mono">
              {item.calc}
            </div>

            {/* Total */}
            <div className="col-span-3 text-sm text-right font-semibold text-gray-900">
              {item.total}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IncomeSummaryCard({
  net,
  cumulativeTax,
  effectiveTax,
  currency,
}: {
  net: number;
  cumulativeTax: number;
  effectiveTax: number;
  currency: CurrencyOptions;
}) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-4 space-y-6 transition-all duration-300 hover:shadow-md hover:border-blue-500 hover:-translate-y-0.5">
      {/* NET INCOME */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-50 rounded-xl">
          <BanknotesIcon className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-500 tracking-wide">Net Income (Annual)</p>
          <p className="text-3xl font-bold text-gray-900 leading-snug tracking-tight">
            {formatCurrency(net, currency)}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* TAX DATA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Total Tax */}
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500 md:text-center tracking-wide">
            Taxes & Contributions
          </p>
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-gray-100 rounded-xl">
              <ChartBarIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-gray-900">
                {formatCurrency(cumulativeTax, currency)}
              </p>
            </div>
          </div>
        </div>

        {/* Effective Tax Rate */}
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500 md:text-center tracking-wide">Effective Tax Rate</p>
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-gray-100 rounded-xl">
              <ArrowTrendingUpIcon className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-gray-900">
                {formatPercentage(effectiveTax * 100)}
              </p>
            </div>
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
              <div className="mt-4 mb-4">
                <IncomeBreakdownTable
                  items={earners[0]}
                  name={earners.length > 1 ? 'earner 1' : ''}
                />
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
              <div className="mt-10 mb-4">
                <IncomeBreakdownTable items={earners[1]} name={'earner 2'} />
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
              <Button
                to={`/taxes/${city?.country}?country=${city?.countriesId}`}
                variant="neutral"
                isTarget
                className="w-full md:w-[320px]"
              >
                Check out other taxes in {city?.country}
              </Button>
            </div>
          </div>
        </section>
      );
    }

    if (modalType === 'Cost of Living') {
      return (
        <section className="border-b border-gray-300 pb-10 w-full overflow-y-auto max-h-[90vh]">
          <div className="rounded-xl space-y-10">
            <div>
              <BudgetPresentation
                currency={currency}
                peopleTrack={trackPeople(data.userData)}
                city={city?.name || ''}
                costOfLiving={[
                  {
                    name: '🧺 Low Cost Budget',
                    description:
                      'Represents the minimum cost required to cover essential necessities. It is budget-focused with limited non-essential spending.',
                    num: data.expensesLow * currencyIndex,
                    savings: 'Saving potential on Low Cost Budget',
                  },
                  {
                    name: '🌟 Comfort Budget',
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
              <Button
                to={mapCompass[city?.country || 'Spain']}
                variant="neutral"
                isTarget
                className="w-full md:w-[320px]"
              >
                Cost of Living Map
              </Button>
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

        <div className="flex flex-col items-end mt-8">
          <div className="w-full">
            <CurrencySelector rates={data!.userData!.rates!} reverse={true} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Left Column – Income Summary */}
          <div>
            <div className="mb-5">
              <h4 className="text-base font-semibold text-gray-700 tracking-wide uppercase">
                Year 1 Summary
              </h4>
            </div>
            <IncomeSummaryCard
              net={data.net * currencyIndex}
              cumulativeTax={cumulativeTax}
              effectiveTax={effectiveTax}
              currency={currency}
            />
          </div>

          {/* Right Column – Modal Triggers */}
          <div className="flex">
            <div className="w-full flex flex-col gap-3 self-end">
              {[
                {
                  label: 'Calculation Breakdown',
                  type: 'Breakdown',
                  icon: '🧮',
                },
                {
                  label: 'Cost of Living Check',
                  type: 'Cost of Living',
                  icon: '💸',
                },
                {
                  label: 'Beyond Income Tax',
                  type: 'Other Taxes',
                  icon: '📊',
                },
              ].map(({ label, type, icon }) => (
                <button
                  key={type}
                  onClick={() => {
                    setModalType(type);
                    setIsModal(true);
                  }}
                  className="flex items-center cursor-pointer gap-3 px-4 py-3 text-left bg-gray-50 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all group"
                >
                  <div className="text-xl">{icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 group-hover:text-blue-700">
                      {label}
                    </p>
                    <p className="text-xs text-gray-500">{getDescriptionForType(type)}</p>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <SectionHeader
            title="What's Next?"
            subtitle="Your finances are evolving, as some reductions and reliefs can change with time. This information helps you see how your taxes and net will develop in the near future."
          />

          <hr className="border-gray-300" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            {future.map((item) => (
              <div key={`future${item.year}`} className="mb-8">
                <h4 className="text-base font-semibold text-gray-700 tracking-wide uppercase mb-6">{`Year ${item.year} Summary`}</h4>
                <div className="flex">
                  <IncomeSummaryCard
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
