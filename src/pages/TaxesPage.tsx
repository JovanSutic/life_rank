import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { fetchCurrency } from '../utils/apiCalls';
import { useQuery } from '@tanstack/react-query';
import NewsletterModal from '../components/Basic/NewsletterModal';
import AsyncStateWrapper from '../components/AsyncWrapper';
import { useMapStore } from '../stores/mapStore';
import SettingsButton from '../components/Basic/SettingsButton';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import ResponsiveTable from '../components/Healthcare/ResponsiveTable';

interface IncomeTax {
  attribute: string;
  value: string;
  comment: string;
}

const incomeHeaders = [
  { name: 'Attribute', field: 'attribute' },
  { name: 'Value', field: 'value' },
  { name: 'Comment', field: 'comment' },
];

const INPSInfo: IncomeTax[] = [
  {
    attribute: 'What is INPS?',
    value: 'Italian Social Security Institute',
    comment:
      'The public body managing pensions, social welfare, and social security contributions in Italy',
  },
  {
    attribute: 'Who pays INPS?',
    value: 'Employees, Self-employed, Employers',
    comment: 'Mandatory for most workers to fund pensions and social benefits',
  },
  {
    attribute: 'Contribution Rates',
    value: 'Around 24% - 33%',
    comment: 'Varies by employment type and income, typically around 26% for self-employed',
  },
  {
    attribute: 'Purpose',
    value: 'Pensions, Unemployment benefits, Maternity leave, Health care',
    comment: 'Provides financial support and social safety nets',
  },
  {
    attribute: 'Calculation Base',
    value: 'Gross income or declared taxable income',
    comment:
      'Contributions calculated as a percentage of income or fixed amounts depending on status',
  },
  {
    attribute: 'Payment Frequency',
    value: 'Monthly or quarterly',
    comment: 'Depends on employment status and specific rules',
  },
  {
    attribute: 'Effect on Taxes',
    value: 'Separate from income tax',
    comment: 'INPS contributions are additional payments, not deducted from IRPEF',
  },
];
const personalIncomeTaxInfo: IncomeTax[] = [
  {
    attribute: 'Tax Brackets',
    value: '5 brackets',
    comment: 'Progressive rates from 23% up to 43% based on income levels',
  },
  {
    attribute: 'Lowest Rate',
    value: '23%',
    comment: 'Applies to income up to €15,000',
  },
  {
    attribute: 'Highest Rate',
    value: '43%',
    comment: 'Applies to income over €50,000',
  },
  {
    attribute: 'Additional Regional Tax',
    value: '0.7% - 3.33%',
    comment: 'Varies by region, added on top of national IRPEF',
  },
  {
    attribute: 'Additional Municipal Tax',
    value: '0% - 0.9%',
    comment: 'Varies by municipality, added on top of national IRPEF',
  },
  {
    attribute: 'INPS Contributions',
    value: '~26%',
    comment: 'Social security contributions paid separately by employee or self-employed',
  },
  {
    attribute: 'Effective Tax Rate',
    value: '~30% - 50%',
    comment: 'Combined IRPEF + regional + municipal + INPS, varies by income and deductions',
  },
  {
    attribute: 'Tax Base',
    value: 'Gross income minus deductible expenses',
    comment: 'Includes allowable deductions such as social contributions, work expenses, etc.',
  },
  {
    attribute: 'Filing Frequency',
    value: 'Annual',
    comment: 'Tax return is submitted once per year',
  },
];
const smallFlatFreelancers: IncomeTax[] = [
  {
    attribute: 'Eligibility Limit',
    value: '€85,000',
    comment: 'Max annual revenue to qualify',
  },
  {
    attribute: 'Initial Tax Rate',
    value: '5%',
    comment: 'Tax rate for the first 5 years',
  },
  {
    attribute: 'Subsequent Tax Rate',
    value: '15%',
    comment: 'Tax rate after first 5 years',
  },
  {
    attribute: 'Tax Base Coefficient',
    value: '78%',
    comment: 'Percentage of revenue considered taxable',
  },
  {
    attribute: 'INPS Rate',
    value: '~26%',
    comment: 'Social security contribution rate (may vary)',
  },
  {
    attribute: 'Regional Tax',
    value: '0.7% - 3.33%',
    comment: 'Varies by region',
  },
  {
    attribute: 'Municipal Tax',
    value: '0% - 0.9%',
    comment: 'Varies by municipality',
  },
  {
    attribute: 'Effective Tax Rate',
    value: '~24-35%',
    comment:
      'Approximate combined tax + INPS + local taxes effective rate, first 5 years lower then higher.',
  },
];
const newForeignWork: IncomeTax[] = [
  {
    attribute: 'Income Tax Reduction',
    value: '50% (standard)',
    comment: '50% of income excluded from IRPEF taxable base',
  },
  {
    attribute: 'Income Tax Reduction',
    value: '60% (with dependent kids)',
    comment: 'Increased reduction for taxpayers with 3 or more dependent children',
  },
  {
    attribute: 'INPS Rate',
    value: '~26%',
    comment: 'Social security contributions on full income',
  },
  {
    attribute: 'Regional Tax',
    value: '0.7% - 3.33%',
    comment: 'Varies by region',
  },
  {
    attribute: 'Municipal Tax',
    value: '0% - 0.9%',
    comment: 'Varies by municipality',
  },
  {
    attribute: 'Effective IRPEF Rate',
    value: '~7.5% - 18.5%',
    comment: 'Estimated IRPEF rate on reduced taxable income',
  },
  {
    attribute: 'Effective Total Tax Rate',
    value: '~34% - 42%',
    comment:
      'Combined IRPEF + INPS + local taxes effective tax rate (varies by income and deductions)',
  },
  {
    attribute: 'Eligibility Duration',
    value: 'Up to 5 years',
    comment: 'Period for tax relief',
  },
];
const investmentIncomeTax: IncomeTax[] = [
  {
    attribute: 'Tax Rate',
    value: '26%',
    comment:
      'Flat rate applied to dividends, interest, and bond yields from private/non-government sources',
  },
  {
    attribute: 'Government Bond Exemption',
    value: '12.5%',
    comment: 'Reduced rate for interest from Italian government bonds and some qualifying EU bonds',
  },
  {
    attribute: 'Declared Through',
    value: 'Annual Tax Return',
    comment:
      'Generally withheld at source if received through an Italian financial institution; otherwise declared by taxpayer',
  },
  {
    attribute: 'Applicable Income Types',
    value: 'Dividends, bank interest, bond yields',
    comment:
      'Applies to both domestic and foreign investment income unless exempted by a tax treaty',
  },
  {
    attribute: 'Double Taxation Relief',
    value: 'Available via DTA',
    comment:
      'Foreign taxes paid may be credited against Italian tax, subject to limits and treaties',
  },
];
const capitalGainsTax: IncomeTax[] = [
  {
    attribute: 'Tax Rate',
    value: '26%',
    comment:
      'Flat rate on capital gains from the sale of financial assets such as stocks, crypto, and funds',
  },
  {
    attribute: 'Exemptions',
    value: '€2,000 or time-based exemptions',
    comment:
      'Some long-term holdings (e.g., non-substantial shares held over 5 years) may be exempt',
  },
  {
    attribute: 'Declared Through',
    value: 'Annual Tax Return (Modello Redditi)',
    comment:
      'Gains must be reported unless tax is withheld at source by an Italian financial intermediary',
  },
  {
    attribute: 'Offsetting Losses',
    value: 'Allowed (up to 4 years)',
    comment: 'Capital losses can offset future capital gains within the same income category',
  },
  {
    attribute: 'Applicable Assets',
    value: 'Stocks, crypto, ETFs, derivatives, funds, foreign assets',
    comment: 'Includes both domestic and foreign assets subject to Italian tax residency rules',
  },
];
const resNonDomFlatTax: IncomeTax[] = [
  {
    attribute: 'Eligibility',
    value: 'Non-resident for ≥9 of previous 10 years',
    comment: 'Must transfer tax residency to Italy',
  },
  {
    attribute: 'Flat Tax Amount',
    value: '€200,000 (post‑Aug 2024)',
    comment: 'Annual lump-sum tax on all foreign‑sourced income',
  },
  {
    attribute: 'Family Members',
    value: '€25,000/year each',
    comment: 'Optional extension to spouse/children etc.',
  },
  {
    attribute: 'Coverage',
    value: 'Foreign income/assets',
    comment: 'Includes foreign earnings, investments, real estate, capital gains',
  },
  {
    attribute: 'Excluded Income',
    value: 'Italian-sourced income',
    comment: 'Still taxed normally under IRPEF/brackets',
  },
  {
    attribute: 'Other Exemptions',
    value: 'IVIE, IVAFE, RW, inheritance tax',
    comment: 'Exemption from wealth taxes and foreign reporting',
  },
  {
    attribute: 'Significant Ownership Exception',
    value: '>20% (private) or >2% (public)',
    comment:
      'If ownership exceeds these thresholds, foreign capital gains may not be exempt under the Res Non-Dom regime',
  },
  {
    attribute: 'Duration',
    value: 'Up to 15 years',
    comment: 'Option can be terminated anytime without clawback',
  },
  {
    attribute: 'Capital Gains Exception',
    value: 'Qualified shareholdings',
    comment: 'Gains on significant share sales first 5 yrs are taxed separately',
  },
];
const retireeSouth: IncomeTax[] = [
  {
    attribute: 'Flat Tax Rate',
    value: '7%',
    comment: 'Fixed substitute tax on all foreign-sourced income for qualifying retirees',
  },
  {
    attribute: 'Eligibility',
    value: 'Must receive a pension from a recognized foreign institution',
    comment: 'Applies to retirees with a stable pension income from abroad.',
  },
  {
    attribute: 'Eligibility – Residency Location',
    value: 'Municipality <20 000 in Southern Italy or certain earthquake zones',
    comment: 'Must become tax resident in eligible municipality (Sicily, Calabria, etc.)',
  },
  {
    attribute: 'Eligibility – Prior Residency',
    value: 'Non-resident for ≥5 years',
    comment: 'Must not have been Italian tax resident in the 5 years prior',
  },
  {
    attribute: 'Eligible Income',
    value: 'Foreign pension, dividends, interest, capital gains, rental income',
    comment: 'Covers all foreign-source personal income',
  },
  {
    attribute: 'Wealth Tax & Reporting',
    value: 'Exempt',
    comment: 'No IVIE/IVAFE and no RW asset reporting required',
  },
  {
    attribute: 'Duration',
    value: 'Up to 10 years',
    comment: 'Regime applies for ten consecutive tax years',
  },
];
const foreignRealEstateTax: IncomeTax[] = [
  {
    attribute: 'IVIE Tax Rate',
    value: '0.76%',
    comment:
      'Annual tax on the cadastral value of foreign real estate owned by Italian tax residents',
  },
  {
    attribute: 'IVIE Tax Base',
    value: 'Cadastral value (adjusted by coefficients)',
    comment: 'Used instead of market value for tax calculation',
  },
  {
    attribute: 'Rental Income Tax Rate',
    value: '26%',
    comment:
      'Tax rate applied to net income (gross rent minus deductible expenses) from renting foreign properties',
  },
  {
    attribute: 'Tax Credit',
    value: 'Yes',
    comment: 'Credit for foreign taxes paid on rental income to avoid double taxation',
  },
  {
    attribute: 'Reduction',
    value: '0 for Res Non-Dom or 7% for Southern Pension Regime',
    comment:
      'Under these two regimes, the standard rental income tax rate is replaced with a reduced rate.',
  },
];
const IVAFE: IncomeTax[] = [
  {
    attribute: 'Tax Base',
    value: 'Value of foreign financial assets',
    comment: 'Includes stocks, bonds, bank accounts held abroad',
  },
  {
    attribute: 'Tax Rate',
    value: '0.2%',
    comment: 'Annual tax applied on the total value of foreign financial assets',
  },
  {
    attribute: 'Tax Flat',
    value: '€34.20',
    comment: 'Annual tax applied on each foreign bank account',
  },
  {
    attribute: 'Tax Credit',
    value: 'Available',
    comment: 'Tax paid abroad on the same assets can be credited to avoid double taxation',
  },
  {
    attribute: 'Declaration',
    value: 'Required',
    comment: 'Must be declared in Italian tax return (Quadro RW)',
  },
  {
    attribute: 'Applicability',
    value: 'Italian tax residents',
    comment: 'Applies to all Italian residents holding foreign financial assets',
  },
  {
    attribute: 'Exemptions',
    value: 'Res Non-Dom only',
    comment:
      'Those under the Res Non-Dom regime are exempt; other regimes like the 7% southern pensioner regime must still pay IVAFE.',
  },
];
const giftInheritanceTax: IncomeTax[] = [
  {
    attribute: 'Tax Applicability',
    value: 'Worldwide assets (for residents)',
    comment:
      'Applies to all gifts/inheritances received by Italian tax residents, regardless of origin',
  },
  {
    attribute: 'Spouse/Children Rate',
    value: '4%',
    comment: 'Applies above €1,000,000 exemption per recipient',
  },
  {
    attribute: 'Siblings Rate',
    value: '6%',
    comment: 'Applies above €100,000 exemption per recipient',
  },
  {
    attribute: 'Other Relatives Rate',
    value: '6%',
    comment: 'No exemption threshold',
  },
  {
    attribute: 'Non-Relatives Rate',
    value: '8%',
    comment: 'No exemption threshold; applies to unrelated recipients',
  },
  {
    attribute: 'Resident Scope',
    value: 'Applies if recipient is Italian tax resident',
    comment: 'Foreign recipients taxed only if assets are in Italy',
  },
  {
    attribute: 'Exemptions for Expats',
    value: 'None specific',
    comment:
      'No special regime for expats; applies same as residents once tax residency is established',
  },
];
const exitTaxItaly: IncomeTax[] = [
  {
    attribute: 'Ownership Threshold - Private Companies',
    value: '≥ 20%',
    comment: 'Applies only if owning 20% or more of private company shares',
  },
  {
    attribute: 'Ownership Threshold - Listed Companies',
    value: '≥ 2%',
    comment: 'Applies only if owning 2% or more of listed company shares',
  },
  {
    attribute: 'Tax Base',
    value: 'Capital gains accrued up to the date of exit',
    comment: 'Tax applies only on unrealized capital gains accrued while Italian tax resident',
  },
  {
    attribute: 'Applicable Asset Types',
    value: 'Equity shares in companies (private and public)',
    comment: 'Includes shares in private companies and listed companies with significant ownership',
  },
  {
    attribute: 'Excluded Assets',
    value: 'Bonds, ETFs, other financial instruments',
    comment: 'No exit tax on bonds or ETFs regardless of amount held',
  },
  {
    attribute: 'Tax Rate',
    value: '26%',
    comment: 'Flat tax on accrued capital gains',
  },
  {
    attribute: 'Valuation',
    value: 'Fair market value at exit date',
    comment: 'Capital gains = exit value minus acquisition cost',
  },
  {
    attribute: 'Payment Timing',
    value: 'Due upon residency transfer',
    comment: 'Tax due when moving tax residency out of Italy',
  },
  {
    attribute: 'Payment Deferral',
    value: 'Up to 6 years installment plan',
    comment: 'Tax can be deferred and paid in installments over 6 years upon request',
  },
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

  console.log(idParam);
  console.log(currencyName);
  console.log(currencyIndex);

  if (!idParam) {
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
        <AsyncStateWrapper isLoading={false} isError={false} error={{}}>
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
                  {
                    'Here you’ll find how this city ranks for healthcare quality, what services are available, where English-speaking care can be found, and what kind of insurance options you might need. Whether you’re staying short-term or settling in, this is what healthcare here looks like.'
                  }
                </p>
              </div>

              <div className="bg-white pb-6 mb-6 pt-2 lg:px-0 flex flex-col">
                <p className="text-lg md:text-xl text-gray-800 font-semibold mb-4">
                  Personal Income tax
                </p>
                <p className="text-sm md:text-base text-gray-800 mb-4">
                  {
                    'This tax applies to income earned from employment, freelance work, and other personal services. Most countries apply progressive rates, with potential deductions and allowances..'
                  }
                </p>
                <div>
                  <ResponsiveTable headers={incomeHeaders} data={personalIncomeTaxInfo} />
                </div>
              </div>

              <div className="bg-white pb-6 mb-6 pt-2 lg:px-0 flex flex-col">
                <p className="text-lg md:text-xl text-gray-800 font-semibold mb-4">
                  Self-employed options
                </p>
                <p className="text-sm md:text-base text-gray-800 mb-4">
                  {
                    'Self-employed individuals are often subject to different tax schemes or incentives. These can include simplified regimes or lower rates for small businesses or new professionals.'
                  }
                </p>
                <div className="mb-4">
                  <p className="text-base text-gray-800 font-semibold mb-4">
                    Regime Forfettario (Flat Tax for Small Entrepreneurs)
                  </p>
                  <ResponsiveTable headers={incomeHeaders} data={smallFlatFreelancers} />
                </div>

                <div className="mb-4">
                  <p className="text-base text-gray-800 font-semibold mb-4">
                    Lavoratori Impatriati (Impatriate Workers Regime)
                  </p>
                  <ResponsiveTable headers={incomeHeaders} data={newForeignWork} />
                </div>
              </div>

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
                  <ResponsiveTable headers={incomeHeaders} data={INPSInfo} />
                </div>
              </div>

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
                  <ResponsiveTable headers={incomeHeaders} data={IVAFE} />
                </div>
              </div>

              <div className="bg-white pb-6 mb-6 pt-2 lg:px-0 flex flex-col">
                <p className="text-lg md:text-xl text-gray-800 font-semibold mb-4">
                  Special Tax Regimes
                </p>
                <p className="text-sm md:text-base text-gray-800 mb-4">
                  {
                    'Special regimes may offer favorable tax treatment for foreign workers, retirees, or new residents. They are designed to attract high earners, pensioners, or skilled professionals.'
                  }
                </p>
                <div className="mb-4">
                  <p className="text-base text-gray-800 font-semibold mb-4">
                    Flat Tax for Ultra-Wealthy (Res Non-Dom)
                  </p>
                  <ResponsiveTable headers={incomeHeaders} data={resNonDomFlatTax} />
                </div>

                <div className="mb-4">
                  <p className="text-base text-gray-800 font-semibold mb-4">
                    Pension Tax for Retirees in South
                  </p>
                  <ResponsiveTable headers={incomeHeaders} data={retireeSouth} />
                </div>
              </div>

              <div className="bg-white pb-6 mb-6 pt-2 lg:px-0 flex flex-col">
                <p className="text-lg md:text-xl text-gray-800 font-semibold mb-4">Exit Tax</p>
                <p className="text-sm md:text-base text-gray-800 mb-4">
                  {
                    'Tax is applied to the transfer of wealth either during life (gifts) or after death (inheritance). Rates and exemptions vary depending on the relationship between donor and recipient.'
                  }
                </p>
                <div>
                  <ResponsiveTable headers={incomeHeaders} data={exitTaxItaly} />
                </div>
              </div>

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
