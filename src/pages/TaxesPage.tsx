import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { fetchCountryTax, fetchCurrency } from '../utils/apiCalls';
import { useQuery } from '@tanstack/react-query';
import NewsletterModal from '../components/Basic/NewsletterModal';
import AsyncStateWrapper from '../components/AsyncWrapper';
import { useMapStore } from '../stores/mapStore';
import SettingsButton from '../components/Basic/SettingsButton';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import ResponsiveTable from '../components/Healthcare/ResponsiveTable';
import { useMemo } from 'react';
import { getSpecialTaxGroup, getTaxGroup } from '../utils/city';
import type { IncomeTax, SpecialTax } from '../types/city.types';

const incomeHeaders = [
  { name: 'Attribute', field: 'attribute' },
  { name: 'Value', field: 'value' },
  { name: 'Comment', field: 'comment' },
];

// const vatItaly: IncomeTax[] = [
//   {
//     attribute: 'Standard VAT Rate',
//     value: '22%',
//     comment: 'Applies to most goods and services',
//   },
//   {
//     attribute: 'Reduced VAT Rates',
//     value: '10%, 5%, 4%',
//     comment: 'Lower rates apply to specific goods like food, medicines, books, etc.',
//   },
//   {
//     attribute: 'Filing Frequency',
//     value: 'Monthly or quarterly',
//     comment: 'Depends on turnover and taxpayer status',
//   },
// ];

function HealthCarePage() {
  const { country: name } = useParams();
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get('country');
  const navigate = useNavigate();

  const {
    currency: currencyName,
    currencyIndex,
    newsLetterShow,
    toggleNewsletterShow,
  } = useMapStore();

  const { data: currency } = useQuery({
    queryKey: ['GET_CURRENCY'],
    queryFn: () => fetchCurrency(),
    retry: 2,
    staleTime: 60 * 60 * 1000,
  });

  const {
    data: countryData,
    isLoading: countryIsLoading,
    isFetching: countryIsFetching,
    isError: countryIsError,
    error: countryError,
  } = useQuery({
    queryKey: ['GET_TAX_COUNTRY_DATA', idParam],
    queryFn: () => fetchCountryTax(Number(idParam)),
    enabled: !!idParam,
    retry: 2,
    staleTime: 60 * 60 * 1000,
  });

  const personalIncomeTaxInfo: IncomeTax[] = useMemo(() => {
    if (countryData) {
      return getTaxGroup(countryData, 'income_tax', currencyIndex, currencyName);
    }
    return [];
  }, [countryData, currencyName, currencyIndex]);

  const highIncomeTax: SpecialTax[] = useMemo(() => {
    if (countryData) {
      return getSpecialTaxGroup(countryData, 'high_income_tax', currencyIndex, currencyName);
    }
    return [];
  }, [countryData, currencyIndex, currencyName]);

  const selfEmployedTax: SpecialTax[] = useMemo(() => {
    if (countryData) {
      return getSpecialTaxGroup(countryData, 'self_employed_tax', currencyIndex, currencyName);
    }
    return [];
  }, [countryData, currencyIndex, currencyName]);

  const socialContributionInfo: IncomeTax[] = useMemo(() => {
    if (countryData) {
      return getTaxGroup(countryData, 'social_security', currencyIndex, currencyName);
    }
    return [];
  }, [countryData, currencyName, currencyIndex]);

  const investmentIncomeTax: IncomeTax[] = useMemo(() => {
    if (countryData) {
      return getTaxGroup(countryData, 'investment_tax', currencyIndex, currencyName);
    }
    return [];
  }, [countryData, currencyName, currencyIndex]);

  const capitalGainsTax: IncomeTax[] = useMemo(() => {
    if (countryData) {
      return getTaxGroup(countryData, 'capital_gains_tax', currencyIndex, currencyName);
    }
    return [];
  }, [countryData, currencyName, currencyIndex]);

  const foreignRealEstateTax: IncomeTax[] = useMemo(() => {
    if (countryData) {
      return getTaxGroup(countryData, 'foreign_real_estate', currencyIndex, currencyName);
    }
    return [];
  }, [countryData, currencyName, currencyIndex]);

  const foreignAssetsTax: IncomeTax[] = useMemo(() => {
    if (countryData) {
      return getTaxGroup(countryData, 'foreign_assets_tax', currencyIndex, currencyName);
    }
    return [];
  }, [countryData, currencyName, currencyIndex]);

  const specialRegimesTax: SpecialTax[] = useMemo(() => {
    if (countryData) {
      return getSpecialTaxGroup(countryData, 'special_regime', currencyIndex, currencyName);
    }
    return [];
  }, [countryData, currencyIndex, currencyName]);

  const exitTax: IncomeTax[] = useMemo(() => {
    if (countryData) {
      return getTaxGroup(countryData, 'exit_tax', currencyIndex, currencyName);
    }
    return [];
  }, [countryData, currencyName, currencyIndex]);

  const giftInheritanceTax: IncomeTax[] = useMemo(() => {
    if (countryData) {
      return getTaxGroup(countryData, 'gift_tax', currencyIndex, currencyName);
    }
    return [];
  }, [countryData, currencyName, currencyIndex]);

  if ((!idParam || (countryData || []).length < 1) && !countryIsLoading) {
    return <div className="text-center text-2xl">Data is still not available for this country</div>;
  }

  return (
    <>
      <article>
        <title>{`Taxes quality in ${name} | LifeRank`}</title>
        <meta
          name="description"
          content={`Taxes in ${name} for expats and nomads looking for peaceful & affordable places`}
        />
        <meta
          name="keywords"
          content={`${name}, taxes, tax regime, income tax in ${name}, capital gains tax in ${name}, exit tax in ${name}`}
        />
      </article>
      <div className="relative flex flex-col min-h-screen w-full px-6 pb-6 pt-2">
        <NewsletterModal show={newsLetterShow} onClose={toggleNewsletterShow} />
        <AsyncStateWrapper
          isLoading={countryIsLoading || countryIsFetching}
          isError={countryIsError}
          error={countryError}
        >
          <div className="relative bg-white w-full lg:w-[764px] mx-auto pt-4">
            {currency && <SettingsButton currency={currency} type="dark" top={0} />}
            <div className="w-full">
              <h1 className="text-lg text-center lg:text-2xl font-bold text-gray-800 mb-2 ">
                Taxes in {name}
              </h1>
            </div>

            <div className="bg-white pb-6 mb-6 pt-2 lg:px-0 flex flex-col">
              <div className="mb-2">
                <p className="text-sm md:text-base text-gray-800 mb-4">
                  {`Here you’ll find taxes relevant for expats, digital nomads and people looking to relocate to ${name}. Whether you're planning a short stay or long-term move, local tax landscape can help you make better decisions.`}
                </p>
              </div>

              {personalIncomeTaxInfo.length > 0 && (
                <div className="bg-white pb-6 mb-6 pt-2 lg:px-0 flex flex-col">
                  <p className="text-lg md:text-xl text-gray-800 font-semibold mb-4">
                    Personal Income tax
                  </p>
                  <p className="text-sm md:text-base text-gray-800 mb-4">
                    {
                      'This tax applies to income earned from employment, freelance work, and other personal services. Most countries apply progressive rates, with potential deductions and allowances.'
                    }
                  </p>
                  <div>
                    <ResponsiveTable headers={incomeHeaders} data={personalIncomeTaxInfo} />
                  </div>
                </div>
              )}

              {highIncomeTax.length > 0 && (
                <div className="bg-white pb-6 mb-6 pt-2 lg:px-0 flex flex-col">
                  <p className="text-lg md:text-xl text-gray-800 font-semibold mb-4">
                    High Earnings
                  </p>
                  <p className="text-sm md:text-base text-gray-800 mb-4">
                    {`This tax applies to high individual earners, applied annually to income exceeding some define trashload usually connected to the country's average income.`}
                  </p>
                  {highIncomeTax.map((item) => (
                    <div className="mb-6" key={item.name}>
                      <p className="text-base text-gray-800 font-semibold mb-4">{item.name}</p>
                      <ResponsiveTable headers={incomeHeaders} data={item.values} />
                    </div>
                  ))}
                </div>
              )}

              {selfEmployedTax.length > 0 && (
                <div className="bg-white pb-6 mb-6 pt-2 lg:px-0 flex flex-col">
                  <p className="text-lg md:text-xl text-gray-800 font-semibold mb-4">
                    Self-employed options
                  </p>
                  <p className="text-sm md:text-base text-gray-800 mb-4">
                    {
                      'Self-employed individuals are often subject to different tax schemes or incentives. These can include simplified regimes or lower rates for small businesses or new professionals.'
                    }
                  </p>
                  {selfEmployedTax.map((item) => (
                    <div className="mb-6" key={item.name}>
                      <p className="text-base text-gray-800 font-semibold mb-4">{item.name}</p>
                      <ResponsiveTable headers={incomeHeaders} data={item.values} />
                    </div>
                  ))}
                </div>
              )}

              {socialContributionInfo.length > 0 && (
                <div className="bg-white pb-6 mb-6 pt-2 lg:px-0 flex flex-col">
                  <p className="text-lg md:text-xl text-gray-800 font-semibold mb-4">
                    Social Security Contributions
                  </p>
                  <p className="text-sm md:text-base text-gray-800 mb-4">
                    {
                      'Mandatory payments to the national social protection system. These contributions typically cover pensions, healthcare, and unemployment benefits and are required for both employees and the self-employed.'
                    }
                  </p>
                  <div>
                    <ResponsiveTable headers={incomeHeaders} data={socialContributionInfo} />
                  </div>
                </div>
              )}

              {investmentIncomeTax.length > 0 && (
                <div className="bg-white pb-6 mb-6 pt-2 lg:px-0 flex flex-col">
                  <p className="text-lg md:text-xl text-gray-800 font-semibold mb-4">
                    Investment income tax
                  </p>
                  <p className="text-sm md:text-base text-gray-800 mb-4">
                    {
                      'Dividends, bond yields, and interest earnings are usually taxed separately from employment income. A flat rate is common, though some countries may apply progressive rates or exemptions.'
                    }
                  </p>
                  <div>
                    <ResponsiveTable headers={incomeHeaders} data={investmentIncomeTax} />
                  </div>
                </div>
              )}

              {capitalGainsTax.length > 0 && (
                <div className="bg-white pb-6 mb-6 pt-2 lg:px-0 flex flex-col">
                  <p className="text-lg md:text-xl text-gray-800 font-semibold mb-4">
                    Capital gains tax
                  </p>
                  <p className="text-sm md:text-base text-gray-800 mb-4">
                    {
                      'Applies to the profit made from selling assets like stocks, property, or crypto. The rate and rules can vary based on the holding period, asset type, and residency status.'
                    }
                  </p>
                  <div>
                    <ResponsiveTable headers={incomeHeaders} data={capitalGainsTax} />
                  </div>
                </div>
              )}

              {foreignRealEstateTax.length > 0 && (
                <div className="bg-white pb-6 mb-6 pt-2 lg:px-0 flex flex-col">
                  <p className="text-lg md:text-xl text-gray-800 font-semibold mb-4">
                    Tax on Foreign Real Estate
                  </p>
                  <p className="text-sm md:text-base text-gray-800 mb-4">
                    {
                      'Real estate held abroad may be subject to an annual ownership tax and/or income tax on generated rent. This tax usually applies only to residents and can sometimes be offset by taxes paid abroad.'
                    }
                  </p>
                  <div>
                    <ResponsiveTable headers={incomeHeaders} data={foreignRealEstateTax} />
                  </div>
                </div>
              )}

              {foreignAssetsTax.length > 0 && (
                <div className="bg-white pb-6 mb-6 pt-2 lg:px-0 flex flex-col">
                  <p className="text-lg md:text-xl text-gray-800 font-semibold mb-4">
                    Tax on Foreign Financial Assets
                  </p>
                  <p className="text-sm md:text-base text-gray-800 mb-4">
                    {
                      'Some countries require residents to declare and pay a tax on foreign bank accounts, shares, crypto, and other financial assets. Rates are typically low, but reporting is mandatory.'
                    }
                  </p>
                  <div>
                    <ResponsiveTable headers={incomeHeaders} data={foreignAssetsTax} />
                  </div>
                </div>
              )}

              {specialRegimesTax.length > 0 && (
                <div className="bg-white pb-6 mb-6 pt-2 lg:px-0 flex flex-col">
                  <p className="text-lg md:text-xl text-gray-800 font-semibold mb-4">
                    Special Tax Regimes
                  </p>
                  <p className="text-sm md:text-base text-gray-800 mb-4">
                    {
                      'Special regimes may offer favorable tax treatment for foreign workers, retirees, or new residents. They are designed to attract high earners, pensioners, or skilled professionals.'
                    }
                  </p>
                  {specialRegimesTax.map((item) => (
                    <div className="mb-6" key={item.name}>
                      <p className="text-base text-gray-800 font-semibold mb-4">{item.name}</p>
                      <ResponsiveTable headers={incomeHeaders} data={item.values} />
                    </div>
                  ))}
                </div>
              )}

              {exitTax.length > 0 && (
                <div className="bg-white pb-6 mb-6 pt-2 lg:px-0 flex flex-col">
                  <p className="text-lg md:text-xl text-gray-800 font-semibold mb-4">Exit Tax</p>
                  <p className="text-sm md:text-base text-gray-800 mb-4">
                    {
                      'Exit tax is a tax on unrealized capital gains that applies when an individual gives up tax residency or citizenship, treating the person as if they sold their assets upon exit.'
                    }
                  </p>
                  <div>
                    <ResponsiveTable headers={incomeHeaders} data={exitTax} />
                  </div>
                </div>
              )}

              {giftInheritanceTax.length > 0 && (
                <div className="bg-white pb-6 mb-6 pt-2 lg:px-0 flex flex-col">
                  <p className="text-lg md:text-xl text-gray-800 font-semibold mb-4">
                    Gift & Inheritance Tax
                  </p>
                  <p className="text-sm md:text-base text-gray-800 mb-4">
                    {
                      'Tax is applied to the transfer of wealth either during life (gifts) or after death (inheritance). Rates and exemptions vary depending on the relationship between donor and recipient.'
                    }
                  </p>
                  <div>
                    <ResponsiveTable headers={incomeHeaders} data={giftInheritanceTax} />
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center px-4 py-2 rounded-lg cursor-pointer bg-blue-600 text-white font-semibold text-md hover:bg-blue-700"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-1" />
                  Go back
                </button>
              </div>
            </div>
          </div>
        </AsyncStateWrapper>
      </div>
    </>
  );
}

export default HealthCarePage;
