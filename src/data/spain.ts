import type { DisplayItems } from '../types/flow.types';

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
};

export const displayMessages: Record<string, DisplayItems[]> = {
  spain: [
    {
      id: 1,
      title: '20% Tax Base Reduction',
      message:
        'Every new self-employed individual in Spain receives a 20% reduction on their taxable base for the first two years. This important benefit lowers both your taxable base and your overall tax bill. Keep in mind that once this two-year period ends, your tax liability will increase, which will reduce your net income.',
    },
    {
      id: 2,
      title: '1st Year Flat Social Contributions',
      message:
        'The first year of self-employment utilizes the Tariffa Plana, a flat rate of €980 for annual social contributions. This benefit reduces costs significantly during the initial period. Following the first year, contributions are calculated on a variable basis, which affects the effective tax rate and net income.',
    },
  ],
  portugal: [
    {
      id: 1,
      title: 'First-Year Social Contributions Exemption',
      message:
        'New self-employed individuals are granted a full exemption from social security contributions for the first 12 months of activity. This measure is a key component of the Regime dos Trabalhadores Independentes (Independent Workers Regime), which aims to reduce the financial burden on new businesses. During this period, you are not required to make any payments, but you must still report your income to Segurança Social (Social Security) on a quarterly basis.',
    },
    {
      id: 2,
      title: 'Taxable base reduction for Young',
      message:
        'Young workers up to age 35 can benefit from the IRS Jovem scheme, which offers a progressive tax exemption for up to 10 years. This benefit, applicable to both independent and dependent work income, provides substantial financial relief to help young professionals start their careers. The financial relief is taxable income reduction that ranges from 25% up to 100% or applicable cash cap.',
    },
  ],
  italy: [
    {
      id: 1,
      title: 'Flat Tax',
      message:
        'If you are looking for the most simplified and predictable tax regime, you should consider Forfettario Regime. To qualify, you must have a gross annual revenue of less than €85,000. If your revenue exceeds this threshold, you will automatically be switched to a different tax regime the following year. There is a flat tax and no VAT. In general you do not need an accountant though it can help you navigate the Italian tax bureaucracy.',
    },
  ],
};

export const otherTaxesInitial: Record<string, DisplayItems[]> = {
  Spain: [
    {
      id: 1,
      title: '',
      message:
        "The Spanish Wealth Tax is an annual tax levied on the net value of a person's assets as of December 31st. Net worth is calculated by adding the value of all assets (e.g., real estate, investments, bank accounts) and then deducting any debts or liabilities (e.g., mortgages). Each Spanish region, or Autonomous Community, can set its own rules, rates, and exemptions, which can result in significant differences in tax liability depending on where you reside.",
    },
    {
      id: 2,
      title: 'The 60% Rule: The Tax Cap',
      message:
        'This rule caps your total tax burden. The combined amount of your income tax and wealth tax cannot exceed 60% of your taxable income for the year. This prevents a high wealth tax from becoming overwhelming, especially if your income is low.',
    },
    {
      id: 3,
      title: 'The 20% Rule: The Minimum Payment',
      message:
        "This rule is the flip side. While the 60% cap can reduce your wealth tax, it has a limit. You're always required to pay a minimum of 20% of your original wealth tax liability, even if the 60% cap would otherwise bring it lower or to zero.",
    },
  ],

  Portugal: [
    {
      id: 1,
      title: 'The NHR - IFICI',
      message:
        "The NHR (Non-Habitual Resident) regime in Portugal has been replaced by the new Tax Incentive for Scientific Research and Innovation (IFICI). This new program aims to attract highly qualified professionals in fields like technology, research, and innovation by offering significant tax benefits for a period of 10 years. The main benefit of the IFICI is a 20% flat personal income tax (IRS) rate on income from employment and self-employment earned in Portugal. This is a considerable reduction from the standard progressive rates. Additionally, foreign-sourced income such as salaries, dividends, and interest may be exempt from Portuguese taxation. It's important to note that the IFICI is more specific than the old NHR, targeting certain professions and roles within innovative companies, startups, and research entities.",
    },
  ],
  Italy: [
    {
      id: 1,
      title: '',
      message:
        "The **Tax on Foreign Financial Assets (IVAFE)** is an annual tax paid by Italian tax residents on the value of their financial assets held abroad. This tax is a flat rate (typically 0.2%) applied to the value of the assets, which include items like bank accounts, stocks, bonds, and investment funds. Its purpose is to monitor and tax a person's financial wealth outside of Italy, and it is reported annually in their tax declaration.",
    },
  ],
  'Czech Republic': [
    {
      id: 1,
      title: 'Combined income',
      message:
        'In the Czech Republic, your total taxable income is the sum of all earnings, including both your primary self-employment income and any investment and capital gains income you receive. This means that income from sources like dividends, interest, and bond yields is not taxed separately but is combined with your self-employed earnings. This consolidated figure serves as the basis for determining your annual tax liability, including whether you fall into the flat tax regime or a specific progressive tax bracket. Therefore, it is essential to account for all sources of income to ensure accurate tax calculations and compliance.',
    },
    {
      id: 2,
      title: 'VAT',
      message:
        "In the Czech Republic, the VAT threshold and the eligibility for the flat tax regime are directly linked. The current threshold for mandatory VAT registration is ~81K € of annual turnover in a 12-month period. If a self-employed individual's turnover exceeds this amount, they are required to register for VAT. Crucially, once you become a VAT eligible, you are automatically ineligible for the simplified flat tax regime.",
    },
  ],
};

export const otherTaxTitles: Record<string, string> = {
  Spain: 'Wealth Tax',
  Portugal: 'Special Tax Regimes',
  Italy: 'Tax on Foreign Financial Assets',
  'Czech Republic': '',
};
