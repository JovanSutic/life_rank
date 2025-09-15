import type { DisplayItems, FaqItem, TaxRegime } from '../types/flow.types';

interface Regions {
  name: string;
  region: string;
}

export const currencyEnum = ['EUR', 'GBP', 'USD'] as const;

export const regionalWealthTaxDetails: Record<string, string> = {
  Andalusia:
    'Andalusia has a 100% tax bonus on the full tax liability. This effectively means no wealth tax is paid. However, this bonus is temporarily suspended for taxpayers who are liable for the national Solidarity Tax on Large Fortunes.',
  Catalonia:
    'Catalonia has its own progressive tax scale starting from 0.21% and reaching a top rate of 3.48% for wealth over €10,695,996.06. The minimum exemption is €500,000, and there are additional exemptions for family businesses and a €300,000 exemption for the primary residence. The tax is applied progressively, not as a single percentage on the total wealth.',
  'Valencian Community':
    'The Valencian Community applies its own progressive tax scale, with rates ranging from 0.25% to 3.5% for wealth above €10,695,996.06. The standard minimum exemption is €500,000.',
  Galicia:
    'Galicia applies a progressive tax scale with rates up to 3.5%. The minimum exemption is €700,000. It also offers specific deductions for assets such as rural land and historic properties, with some deductions reaching up to 100% on the portion of the tax corresponding to those assets.',
  Asturias:
    'Asturias applies the state-level tax scale, which is progressive with a highest rate of 3.5%. The minimum exemption is €700,000. There are no specific regional bonuses or unique exemptions.',
  'Canary Islands':
    'The Canary Islands apply the state-level tax scale, which is progressive with a highest rate of 3.5%. The minimum exemption is €700,000. There are no specific regional bonuses or unique exemptions.',
  Cantabria:
    "Cantabria has a 100% bonus, but it is only applicable to taxpayers with a net worth below €3,000,000 (after the €700,000 minimum exemption). If a taxpayer's net worth exceeds this limit, the bonus does not apply, and they must pay the tax according to the state scale.",
  'Castile and León':
    'Castile and León applies the state-level tax scale, which is progressive with a highest rate of 3.5%. The minimum exemption is €700,000. It offers specific exemptions for protected assets of individuals with disabilities.',
  Navarre:
    "Navarre has its own tax scale, with a highest rate of 3.5%. The minimum exemption is €550,000, and a special exemption of up to €300,000 is available for a taxpayer's primary residence.",
  'Basque Country':
    'The Basque Country has a different tax scale, with a maximum rate of 2.5%. The minimum exemption is higher at €800,000, and the exemption for a primary residence is also higher at up to €400,000.',
  'Region of Murcia':
    'The Region of Murcia applies the state-level tax scale, which is progressive with a highest rate of 3.5%. The minimum exemption is €700,000. There are no specific regional bonuses or unique exemptions.',
  'Community of Madrid':
    'The Community of Madrid applies a 100% tax bonus, effectively eliminating the wealth tax. This bonus is temporary and is in effect for as long as the national Solidarity Tax on Large Fortunes is also in place.',
};

export const regionsSpain: Record<string, Regions> = {
  '231': { name: 'A Corunna', region: 'Galicia' },
  '224': { name: 'Alicante', region: 'Valencian Community' },
  '243': { name: 'Almeria', region: 'Andalusia' },
  '219': { name: 'Barcelona', region: 'Catalonia' },
  '221': { name: 'Bilbao', region: 'Basque Country' },
  '242': { name: 'Cadiz', region: 'Andalusia' },
  '235': { name: 'Cartagena', region: 'Region of Murcia' },
  '245': { name: 'Castellon de la Plana', region: 'Valencian Community' },
  '237': { name: 'Cordoba', region: 'Andalusia' },
  '229': { name: 'Gijon', region: 'Asturias' },
  '241': { name: 'Girona', region: 'Catalonia' },
  '236': { name: 'Granada', region: 'Andalusia' },
  '248': { name: 'Huelva', region: 'Andalusia' },
  '225': { name: 'Las Palmas', region: 'Canary Islands' },
  '218': { name: 'Madrid', region: 'Community of Madrid' },
  '222': { name: 'Malaga', region: 'Andalusia' },
  '244': { name: 'Marbella', region: 'Andalusia' },
  '226': { name: 'Murcia', region: 'Region of Murcia' },
  '228': { name: 'Oviedo', region: 'Asturias' },
  '234': { name: 'Palma de Mallorca', region: 'Balearic Islands' },
  '247': { name: 'Pamplona', region: 'Navarre' },
  '239': { name: 'Salamanca', region: 'Castile and León' },
  '232': { name: 'San Sebastian', region: 'Basque Country' },
  '246': { name: 'Santa Cruz de Tenerife', region: 'Canary Islands' },
  '230': { name: 'Santander', region: 'Cantabria' },
  '220': { name: 'Seville', region: 'Andalusia' },
  '240': { name: 'Tarragona', region: 'Catalonia' },
  '223': { name: 'Valencia', region: 'Valencian Community' },
  '238': { name: 'Valladolid', region: 'Castile and León' },
  '233': { name: 'Vigo', region: 'Galicia' },
};

export const mapCompass: Record<string, string> = {
  Spain:
    '/europe?layerTypeId=2&centerLat=40.67267&centerLng=-3.86719&north=47.59167&south=32.95377&east=10.89844&west=-18.63281&zoom=6&budget=7000&size=9007199254740991&sea=false&rank=false&country=Spain',
  Portugal:
    '/europe?layerTypeId=2&centerLat=37.88388&centerLng=-6.25122&north=45.10487&south=29.87915&east=12.50244&west=-25.00488&zoom=6&budget=7000&size=9007199254740991&sea=false&rank=false&country=Portugal',
  Italy:
    '/europe?layerTypeId=2&centerLat=42.31362&centerLng=13.33384&north=45.78260&south=38.64234&east=22.71067&west=3.95701&zoom=7&budget=7000&size=9007199254740991&sea=false&rank=false&country=Italy',
  'Czech Republic':
    '/europe?layerTypeId=2&centerLat=49.53505&centerLng=15.48565&north=52.56887&south=46.30050&east=24.86248&west=6.10882&zoom=7&budget=7000&size=9007199254740991&sea=false&rank=false&country=Czech+Republic',
  Bulgaria:
    '/europe?layerTypeId=2&centerLat=42.05438&centerLng=26.25393&north=45.53809&south=38.36857&east=35.63077&west=16.87710&zoom=7&budget=7000&size=9007199254740991&sea=false&rank=false&country=Bulgaria',
  Serbia:
    '/europe?layerTypeId=2&centerLat=44.27530&centerLng=20.79809&north=47.69368&south=40.64585&east=23.07226&west=18.52392&zoom=7&budget=7000&size=9007199254740991&sea=false&rank=false&country=Serbia',
};

export const displayMessages: Record<string, DisplayItems[]> = {
  spain: [
    {
      id: 1,
      title: '20% Tax Base Reduction (First 2 Years)',
      message:
        'Newly registered self-employed individuals in Spain benefit from a 20% reduction on their taxable base during the first two years. This significantly lowers your income tax in the early phase. After this period, your tax burden will increase — which means lower net income unless offset by other deductions.',
    },
    {
      id: 2,
      title: 'Flat Social Security Contributions (Year 1)',
      message:
        'In your first year, Spain applies the "Tarifa Plana" — a flat €980 annual social security fee. This is a major cost saving compared to variable rates in later years, which are income-based and can increase your total tax burden significantly.',
    },
    {
      id: 3,
      title: 'Child-Related Tax Credits (Under Age 3)',
      message:
        'If you have children under 3, Spain offers both a tax allowance and a specific maternity tax credit (for working mothers, including self-employed). These reduce your effective tax rate but expire once your child turns 3, so plan accordingly.',
    },
  ],

  portugal: [
    {
      id: 1,
      title: '12-Month Social Security Exemption',
      message:
        'New freelancers in Portugal enjoy a full exemption from social security contributions for the first 12 months. This drastically boosts net income early on — but note: income must still be reported quarterly to Segurança Social.',
    },
    {
      id: 2,
      title: 'IRS Jovem: Tax Relief for Under 35',
      message:
        'If you’re under 35, the IRS Jovem program offers progressive income tax exemptions (25% to 100%) for up to 10 years. This applies to both freelance and salaried income, giving young professionals substantial early-career tax savings.',
    },
  ],

  italy: [
    {
      id: 1,
      title: 'Italy’s Forfettario Regime (Flat Tax)',
      message:
        'Italy’s Forfettario regime offers a flat tax on gross income (no VAT, minimal paperwork) for individuals earning under €85,000 annually. If you exceed this, you’ll automatically shift to the standard regime next year. Ideal for solo professionals seeking low taxes and simplicity.',
    },
  ],

  bulgaria: [
    {
      id: 1,
      title: 'EOOD: Bulgaria’s Optimal Tax Setup',
      message:
        'In Bulgaria, we use the EOOD structure — a single-owner LLC — to optimize for the 10% corporate tax rate. For couples, the most efficient setup is one EOOD (owned by one person) with the partner on a minimum salary. This approach significantly lowers social and health contributions compared to owning two separate companies.',
    },
  ],
};

export const otherTaxesInitial: Record<string, DisplayItems[]> = {
  Spain: [
    {
      id: 1,
      title: 'Wealth Tax (Impuesto sobre el Patrimonio)',
      message:
        'Spain imposes an annual tax on your global net assets. This includes real estate, investments, and bank balances, minus debts like mortgages. The rules, rates, and exemptions vary by region — so where you live in Spain can significantly impact what you owe.',
    },
    {
      id: 2,
      title: '60% Rule: Total Tax Cap',
      message:
        'Spain caps your total combined income and wealth tax at 60% of your annual taxable income. If your wealth is high but income is low, this rule protects you from excessive taxation. It ensures your overall tax burden remains proportionate to your income.',
    },
    {
      id: 3,
      title: '20% Rule: Minimum Wealth Tax Payment',
      message:
        'Even if the 60% rule reduces your liability, Spain still requires you to pay at least 20% of your original wealth tax. This ensures everyone contributes a baseline amount, regardless of how the cap affects your calculation.',
    },
  ],

  Portugal: [
    {
      id: 1,
      title: 'IFICI – New NHR Replacement',
      message:
        'Portugal has replaced the NHR regime with IFICI — a 10-year tax incentive targeting highly skilled professionals in science, tech, and innovation. You get a flat 20% income tax rate on Portuguese earnings, plus potential exemptions on foreign income. It’s selective, but incredibly valuable if you qualify.',
    },
    {
      id: 2,
      title: 'VAT Threshold: €12,500',
      message:
        "If your annual revenue exceeds €12,500, you're required to register for VAT in Portugal. This means charging VAT on invoices and submitting returns. Below this threshold, you're VAT-exempt — a financial and administrative advantage for early-stage freelancers and small earners.",
    },
  ],

  Italy: [
    {
      id: 1,
      title: 'IVAFE – Tax on Foreign Financial Assets',
      message:
        "As a tax resident in Italy, you're required to pay IVAFE — a 0.2% annual tax on foreign-held financial assets (like overseas bank accounts, stocks, or funds). This applies to your global portfolio and must be reported in your annual tax return.",
    },
    {
      id: 2,
      title: 'Forfettario VAT Exemption',
      message:
        "Under the Forfettario regime, you're exempt from charging VAT until your revenue exceeds €85,000/year. If you go over, you must switch to the standard VAT system the next year — which adds compliance and reduces net income. Until then, you operate VAT-free with simplified rules.",
    },
  ],

  'Czech Republic': [
    {
      id: 1,
      title: 'Combined Income Taxation',
      message:
        'In the Czech Republic, self-employment income and investment gains are combined into one taxable base. This means your capital gains, dividends, and interest can push you into a higher tax bracket or make you ineligible for the flat tax — so full income transparency is key to accurate planning.',
    },
    {
      id: 2,
      title: 'VAT Threshold: CZK 2,000,000 (~€82,000)',
      message:
        'If your 12-month turnover exceeds CZK 2 million (~€82,000), VAT registration becomes mandatory. You must register within 15 days after month-end. Voluntary registration is also possible, which may be beneficial depending on your business model and expenses.',
    },
  ],

  Bulgaria: [
    {
      id: 1,
      title: '0% Capital Gains Tax in EEA',
      message:
        "Profits from selling stocks on any EEA-regulated exchange are completely tax-free in Bulgaria. There's no holding period requirement — sell in a week or a year, and you still pay 0%. It’s a major advantage for investors focused on EU markets.",
    },
    {
      id: 2,
      title: 'VAT Threshold: BGN 50,000 (~€25,655)',
      message:
        'If your turnover exceeds BGN 50,000 in any 12-month period, VAT registration is mandatory in Bulgaria. You must register within 7 days of passing the limit. Voluntary VAT registration is also allowed and can benefit some businesses by allowing expense-based deductions.',
    },
  ],

  Serbia: [
    {
      id: 1,
      title: 'VAT',
      message:
        "Value Added Tax (VAT) in Serbia is 20% and applies to most goods and services sold within the country, but it's generally not charged on income from foreign clients (export of services), which is considered VAT-exempt. Businesses working with foreign clients can still be VAT-registered, but they typically apply a 0% rate on exported services, meaning no VAT is charged to those clients.",
    },
    {
      id: 2,
      title: 'Additional high earnings tax',
      message:
        'Serbia applies an additional annual personal income tax (“porez na dohodak građana”) on individuals whose total yearly income exceeds a certain threshold set by the government. This surtax is calculated progressively and paid on top of regular taxes, typically affecting high earners, including entrepreneurs and company owners.',
    },
    {
      id: 3,
      title: 'Serbia - U.S. tax treaty',
      message:
        'Serbia does not have a double taxation treaty with the United States, which means that U.S. require careful tax planning and extra effort for being compliant with IRS obligations. Also, the lack of this treaty can result in more tax costs for investment incomes like bond coupons and stock dividends.',
    },
  ],
};

export const otherTaxTitles: Record<string, string> = {
  Spain: 'Wealth Tax',
  Portugal: 'Special Tax Regimes',
  Italy: 'Tax on Foreign Financial Assets',
  'Czech Republic': '',
  Bulgaria: '',
  Serbia: '',
};

export const faqData: FaqItem[] = [
  {
    question: 'How can changing my tax residency help me increase my net income?',
    answer:
      'By relocating to a country with lower income taxes or favorable tax treaties, you can legally reduce your tax burden and retain more of your earnings — sometimes by tens of thousands of dollars per year. Our tool shows you the impact based on your specific income and lifestyle.',
  },
  {
    question: 'How accurate are you calculators?',
    answer:
      'Our calculators use up-to-date tax data, cost of living indexes, and purchasing power metrics from trusted international sources. They’re designed to give you a realistic estimate, not a legal or financial guarantee — but they’re a solid first step in your decision-making.',
  },
  {
    question: 'What is the difference between tax residency and citizenship?',
    answer:
      'Your citizenship doesn’t change unless you go through a legal process to renounce it. Your tax residency, however, can change when you meet certain criteria in another country (like number of days, center of economic interest, etc.). Many remote workers keep their citizenship but shift tax residency for financial optimization.',
  },
  {
    question: 'What are the risks of not properly changing my tax residency?',
    answer:
      'If you don’t follow the correct procedures, you may be taxed by both your home country and your new one — or be penalized for tax evasion. We help you understand the steps to take so you stay compliant while optimizing your finances.',
  },
  {
    question: 'Do I need a visa or residency permit to change my tax residency?',
    answer:
      'In most cases, yes. Establishing tax residency typically requires legal presence through a long-term visa, digital nomad visa, or residency permit. Many countries now offer specific remote work visas that make this process easier.',
  },
  {
    question: 'How does cost of living affect the value of my take-home pay?',
    answer:
      'A $100,000 salary in a high-cost city like San Francisco doesn’t go nearly as far as in a tax-friendly, low-cost city like Lisbon or Tbilisi. Our rankings help you compare purchasing power, not just tax rates.',
  },
  {
    question:
      'Can I maintain my current citizenship while being a tax resident in another country?',
    answer:
      "Yes, absolutely. Most people who optimize for tax still keep their original citizenship. It's about where you are legally considered a tax resident, not your passport.",
  },
  {
    question: 'What’s the first step to relocating for tax benefits?',
    answer:
      'Use our free tool to see how different locations affect your finances. From there, you can research other important topics like visa options, city feel, lifestyle possibilities, healthcare etc. Very soon we will be able to help you with all those aspects.',
  },
  {
    question: 'Can I optimize my taxes even if I have a partner or family?',
    answer:
      'Yes. Many countries offer favorable tax treatment for families or couples, and we help you compare scenarios for solo moves vs. moving as a household. You can select your life setup in the tool.',
  },
];

export const taxRegimes: Record<string, TaxRegime> = {
  spain_autonomo: {
    country: 'Spain',
    regime: 'Autónomo',
    description:
      "You're seeing calculations based on the Autónomo (self-employed) regime in Spain. This includes mandatory contributions to the Spanish Social Security system (RETA) and progressive income tax (IRPF). Special first-year reductions may apply.",
  },

  portugal_simplified: {
    country: 'Portugal',
    regime: 'Simplified Regime',
    description:
      'This result uses the Simplified Tax Regime in Portugal, commonly chosen by freelancers and self-employed professionals. A fixed percentage of income is assumed as expenses, which reduces your taxable base automatically.',
  },

  portugal_organized: {
    country: 'Portugal',
    regime: 'Organized Regime',
    description:
      "You're viewing results for the Organized Accounting Regime in Portugal. This regime allows you to deduct real business expenses but requires proper bookkeeping. It may be optimal for higher-income or expense-heavy profiles.",
  },

  italy_ordinario: {
    country: 'Italy',
    regime: 'Ordinario Regime',
    description:
      'These figures are based on Italy’s Ordinario regime, the standard taxation method with progressive income tax and detailed expense reporting. Suitable for individuals with complex income and high costs.',
  },

  italy_forfettario: {
    country: 'Italy',
    regime: 'Forfettario Regime',
    description:
      'This uses Italy’s Forfettario regime, a simplified flat-tax regime for small business earners. It applies a fixed cost coefficient to determine taxable income, often resulting in very low effective tax rates.',
  },

  italy_regime_impatriati: {
    country: 'Italy',
    regime: 'Regime Impatriati',
    description:
      "You're seeing results under Italy’s Regime Impatriati — a favorable regime for individuals relocating to Italy. It can exclude a large portion of foreign income from taxation for several years.",
  },

  czech_flat_tax: {
    country: 'Czech Republic',
    regime: 'Flat Tax',
    description:
      'This uses the Flat Tax Regime in the Czech Republic. It offers simplified administration and a predictable tax burden for qualifying self-employed individuals.',
  },

  czech_regular_self_employed: {
    country: 'Czech Republic',
    regime: 'Regular Self-Employed',
    description:
      "You're seeing results under the Regular Self-Employed regime in the Czech Republic, with income tax, social security, and health insurance calculated from real or estimated income.",
  },

  bulgaria_eood: {
    country: 'Bulgaria',
    regime: 'EOOD (Single-Person LLC.)',
    description:
      'This calculation is based on operating through an EOOD (Single-Person Ltd.) in Bulgaria. It includes corporate tax, dividend distribution, and social security contributions typically used by remote workers for tax efficiency.',
  },
  bulgaria_self_employed: {
    country: 'Bulgaria',
    regime: 'Self-Employed (Freelancer)',
    description:
      'This calculation is based on registering as a self-employed individual in Bulgaria. It includes a 25% reduction in the taxable base, 10% personal income tax, and mandatory social security contributions, which can be declared within a legal income base range. This setup offers simplicity and flexibility for high-earning freelancers while maintaining full compliance with Bulgarian tax laws.',
  },
  serbia_llc: {
    country: 'Serbia',
    regime: 'Serbian LLC - Društvo sa ograničenom odgovornošću',
    description:
      'This calculation is based on registering a company as LLC, a legal entity where the owner’s liability is limited to the invested capital. It involves full bookkeeping, 15% corporate income tax on profit, and 15% tax on dividends, but allows for broader business activities, expense deductions, and scalability for growing operations.',
  },
  serbia_flat: {
    country: 'Serbia',
    regime: 'Flat Rate Tax - Paušalni porez',
    description:
      'This calculation is based on registering as flat-rate tax, that is a tax system where taxes are pre-calculated by the tax authority based on the type of activity and location, not on actual income. It offers simplified (almost none) accounting and predictable monthly costs, making it attractive for entrepreneurs with lower yearly incomes.',
  },
  serbia_bookkeeping: {
    country: 'Serbia',
    regime: 'Self employed with bookkeeping',
    description:
      'This calculation is based on registering as self employed with mandatory bookkeeping (not simplified) that allows you to pay yourself a minimal salary with income tax and complete social contributions and withdraw your profits with paying profit tax that is significantly lower that total of income tax and complete social contributions.',
  },
};

export const countryTaxHeadline: Record<string, string> = {
  Spain: '~19.5%',
  Portugal: '~10%',
  Italy: '~21%',
  'Czech Republic': '~12%',
  Bulgaria: '~15%',
  Serbia: '~8.5%',
};
