import NewsletterModal from '../Basic/NewsletterModal';
import { useMapStore } from '../../stores/mapStore';
import ResponsiveTable from '../Healthcare/ResponsiveTable';
import { Link } from 'react-router-dom';

const table1 = [
  {
    type: 'Income tax',
    rate: '34.9%',
    country: 'Italy',
    value: '$34,890',
  },
  {
    type: 'Regional and Municipal taxes',
    rate: '2.5%',
    country: 'Italy',
    value: '$2,500',
  },
  {
    type: 'Social contributions',
    rate: '26%',
    country: 'Italy',
    value: '$26,000',
  },
  {
    type: 'Foreign asset tax',
    rate: '0.2% + $40',
    country: 'Italy',
    value: '$240',
  },
  {
    type: 'Federal tax',
    rate: 'exempt',
    country: 'US',
    value: '$0',
  },
  {
    type: 'Self employed tax',
    rate: 'exempt',
    country: 'US',
    value: '$0',
  },
  {
    type: 'Total',
    rate: '63.63%',
    country: 'US + Italy',
    value: '$63,630',
  },
];
const table2 = [
  {
    type: 'Income tax',
    rate: '34.9% effective',
    country: 'Italy',
    value: '$34,890',
  },
  {
    type: 'Regional and Municipal taxes',
    rate: '2.5%',
    country: 'Italy',
    value: '$2,500',
  },
  {
    type: 'Social contributions',
    rate: 'exempt',
    country: 'Italy',
    value: '$0',
  },
  {
    type: 'Foreign asset tax',
    rate: '0.2% + $40',
    country: 'Italy',
    value: '$240',
  },
  {
    type: 'Federal tax',
    rate: 'exempt',
    country: 'US',
    value: '$0',
  },
  {
    type: 'Self employed tax',
    rate: '15.3%',
    country: 'US',
    value: '$15,300',
  },
  {
    type: 'Total',
    rate: '52.93%',
    country: 'US + Italy',
    value: '$52,930',
  },
];
const table3 = [
  {
    type: 'Income tax',
    rate: '3.88% effective',
    country: 'Italy',
    value: '$3,882',
  },
  {
    type: 'Regional and Municipal taxes',
    rate: '2.5%',
    country: 'Italy',
    value: '$2,500',
  },
  {
    type: 'Social contributions',
    rate: '20.23% effective',
    country: 'Italy',
    value: '$20,244',
  },
  {
    type: 'Foreign asset tax',
    rate: '0.2% + $40',
    country: 'Italy',
    value: '$240',
  },
  {
    type: 'Federal tax',
    rate: 'exempt',
    country: 'US',
    value: '$0',
  },
  {
    type: 'Self employed tax',
    rate: 'exempt',
    country: 'US',
    value: '$0',
  },
  {
    type: 'Total',
    rate: '24.7%',
    country: 'US + Italy',
    value: '$24,616',
  },
];
const table4 = [
  {
    type: 'Income tax',
    rate: '13.9% effective',
    country: 'Italy',
    value: '$13,900',
  },
  {
    type: 'Regional and Municipal taxes',
    rate: '1.25%',
    country: 'Italy',
    value: '$1,250',
  },
  {
    type: 'Social contributions',
    rate: '26%',
    country: 'Italy',
    value: '$26,000',
  },
  {
    type: 'Foreign asset tax',
    rate: '0.2% + $40',
    country: 'Italy',
    value: '$240',
  },
  {
    type: 'Federal tax',
    rate: 'exempt',
    country: 'US',
    value: '$0',
  },
  {
    type: 'Self employed tax',
    rate: 'exempt',
    country: 'US',
    value: '$0',
  },
  {
    type: 'Total',
    rate: '41.4%',
    country: 'US + Italy',
    value: '$41,390',
  },
];
const fed = [
  {
    tax: '10%',
    value: '$0 – $11,925',
  },
  {
    tax: '12%',
    value: '$11,926 – $48,475',
  },
  {
    tax: '22%',
    value: '$48,476 – $103,350',
  },
  {
    tax: '24%',
    value: '$103,351 – $197,300',
  },
  {
    tax: '32%',
    value: '$197,301 – $250,525',
  },
  {
    tax: '35%',
    value: '$250,526 – $626,350',
  },
  {
    tax: '37%',
    value: '$626,351+',
  },
];
const compare = [
  {
    state: 'California',
    tax: '~49%',
    comment: 'Federal income + SE tax (15.3%) + CA state tax (~9%)',
  },
  {
    state: 'Texas',
    tax: '~39–40%',
    comment: 'Federal + SE tax; no state income tax',
  },
  {
    state: 'Florida',
    tax: '~39–40%',
    comment: 'Same as Texas',
  },
  {
    state: 'Minnesota',
    tax: '~46%',
    comment: 'Federal + SE + MN state (~9.85%)',
  },
  {
    state: 'New York',
    tax: '~46–48%',
    comment: 'Federal + SE + NY state + local taxes',
  },
  {
    state: 'United Kingdom',
    tax: '~32–34%',
    comment: 'Income tax (20–40%) + NI (~9%)',
  },
  {
    state: 'Germany',
    tax: '~40–44%',
    comment: 'Income tax (14–45%) + social contributions + surcharge',
  },
  {
    state: 'Netherlands',
    tax: '~40–49%',
    comment: 'Income tax + social security (~27%)',
  },
];
const spare = [
  {
    state: 'California',
    tax: '60–85%',
  },
  {
    state: 'Texas',
    tax: '35–45%',
  },
  {
    state: 'Florida',
    tax: '40–50%',
  },
  {
    state: 'Minnesota',
    tax: '35–45%',
  },
  {
    state: 'New York',
    tax: '50–70%',
  },
  {
    state: 'United Kingdom',
    tax: '30–40%',
  },
  {
    state: 'Germany',
    tax: '20–30%',
  },
  {
    state: 'Netherlands',
    tax: '25–35%',
  },
];

const headers1 = [
  { name: 'Tax type', field: 'type' },
  { name: 'Rate', field: 'rate' },
  { name: 'Country', field: 'country' },
  { name: 'Value', field: 'value' },
];
const headers2 = [
  { name: 'Tax Bracket', field: 'tax' },
  { name: 'Taxable Income Range', field: 'value' },
];
const headers3 = [
  { name: 'State/Country', field: 'state' },
  { name: 'Effective Tax Rate*', field: 'tax' },
  { name: 'Note', field: 'comment' },
];
const headers4 = [
  { name: 'State/Country', field: 'state' },
  { name: '% more expensive than Italy', field: 'tax' },
];

const list = [
  'You must have annual revenue under €85,000 per year',
  'You can’t be a partner in a company or SRL that does similar business',
  'You can’t work for your former employer in last 2 years, you must be a self employed (freelancer)',
  "You can't invoice mostly to one business you control via another structure",
  'You must be tax resident of Italy',
];

const list1 = [
  'You were not Italian tax residents for the past 3 tax periods',
  'You are a skilled worker, basically you need to have a university degree or 5 years of relevant working experience in a technical or regulated profession (medicine, law, architecture…)',
  'You can’t make more than €600K of income a year',
  'You have to commit to min 4 years on this tax regime or you will lose the benefits',
];

function NomadBlog() {
  const { newsLetterShow, toggleNewsletterShow } = useMapStore();

  return (
    <>
      <article>
        <title>{`Italy Digital Nomad Visa 2025: Full Tax Breakdown for Freelancers | LifeRank`}</title>
        <meta
          name="description"
          content={`Learn how Italy's digital nomad visa affects your taxes in 2025. Compare tax regimes like Forfettario & Impatriati vs. US, UK, and Netherlands rates.`}
        />
        <meta
          name="keywords"
          content={`regime forfettario italy 2025, lavoratori impatriati tax benefits, taxes for digital nomads in italy, italy vs us freelance taxes, italian tax system for remote workers`}
        />
      </article>
      <div className="w-full lg:w-[764px] mx-auto px-4 pt-4 md:pt-8 pb-2 text-gray-800">
        <h1 className="text-2xl text-center font-bold mb-6">
          Italy Digital Nomad Visa 2025: Full Tax Breakdown for Freelancers
        </h1>
        <NewsletterModal show={newsLetterShow} onClose={toggleNewsletterShow} />

        <section className="mb-8">
          <h4 className="text-lg md:text-xl font-semibold mb-2">Introduction</h4>
          <p className="text-sm md:text-base leading-relaxed">
            This text is about the taxes and income aspect of the potential use of the digital nomad
            visa in Italy. It is not about the procedure of getting the visa. There is no
            information on the visa requirements, procedure, documentation and validity. I assume
            that you know all visa requirements, you understand the process and you are considering
            if getting this visa and residing long term in Italy would be a good choice for you.
          </p>
        </section>

        <section className="mb-8 ">
          <div className="flex justify-center">
            <Link
              to={`/taxes/Italy?country=1`}
              className="inline-block px-4 py-1.5 rounded-lg bg-blue-100 text-blue-800 font-semibold text-sm hover:bg-blue-200"
            >
              💸 Learn about Taxes
            </Link>
          </div>
        </section>

        <section className="mb-8">
          <h4 className="text-lg md:text-xl font-semibold mb-2">
            Taxes are very relevant for digital nomads (visa)
          </h4>
          <p className="text-sm md:text-base leading-relaxed mb-2">
            Once you enter the country with a digital nomad visa, you are required (within the first
            8 days) to apply for the residence permit (permesso di soggiorno) in the local police.
            When you get this permit you are a foreigner that can legally stay in Italy for a year
            and you can choose to become a temporary resident. Registering your residency is not
            required, but if you wanna use Italian tax schemes you need to register in the local
            Municipality and get your tax ID (Partita IVA).
          </p>
          <p className="text-sm md:text-base leading-relaxed">
            You can legally stay with only your residence permit (permesso di soggiorno), but if you
            stay in Italy for 183 days (in a year) you will legally be an Italian tax resident and
            their tax authority has the full right to ask you to pay local taxes. So if you are
            planning to be a digital nomad in Italy, you should be planning your taxes as well.
            Below I will show you different scenarios and the final cost effects for each of them.
            Not planning your taxes can have a huge impact on your budget.
          </p>
        </section>

        <section className="mb-8">
          <h4 className="text-lg md:text-xl font-semibold mb-2">
            Scenario 1: Not applying for Italian tax regimes
          </h4>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            So let’s assume you are a Sole Proprietor in the US. You get a digital nomad visa and
            move to Italy. You get your residence permit (permesso di soggiorno) and you continue to
            do all your business as a US Sole Proprietor. You are not breaking any law, you are
            legally in the country and you are legally working. But how much would you net? Let’s
            assume you are making $100K a year.
          </p>
          <div className="mb-4">
            <ResponsiveTable headers={headers1} data={table1} />
          </div>

          <p className="text-sm md:text-base leading-relaxed mb-4">
            Now there is a way to opt out from the Italian social contributions if you US
            Certificate of Coverage and you wanna pay for the self employed tax in the US. This is a
            bit better scenario but also very expensive.
          </p>

          <div className="mb-4">
            <ResponsiveTable headers={headers1} data={table2} />
          </div>

          <p className="text-sm md:text-base leading-relaxed mb-4">
            The worst case you will be netting only $32,370 out of $100.000 income. Better scenario,
            netting $47,070, can be attained if you have a US Certificate of Coverage from the U.S.
            Social Security Administration, but you need to get this even before you get to Italy.
          </p>

          <p className="text-sm md:text-base leading-relaxed mb-4">
            Italy is taxing your foreign kept financial assets with 0.2%. If you have money in the
            bank which is not an investment, you will only have to pay 40$ for each bank account
            that has more then $6k. But if you have money in financial assets like stocks, ETFs and
            bonds you will have to pay 0.2% taxes annually, on the value of all of those assets. In
            this scenario I have used $100K as an example of your potential foreign financial assets
            and one bank account where you hold more than $6K.
          </p>
        </section>

        <section className="mb-8 ">
          <p className="text-center text-lg md:text-xl mb-2">You like this content?</p>
          <div className="flex justify-center">
            <button
              onClick={toggleNewsletterShow}
              className="inline-block cursor-pointer px-4 py-1.5 rounded-lg bg-blue-500 text-white font-semibold text-sm hover:bg-blue-700"
            >
              📧 Subscribe to our newsletter
            </button>
          </div>
        </section>

        <section className="mb-8">
          <h4 className="text-lg md:text-xl font-semibold mb-2">
            Scenario 2: Regime Forfettario (Flat Tax for Small Freelancers/Entrepreneurs)
          </h4>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            You get a digital nomad visa and move to Italy. You get your residence permit, register
            your residency and get your tax ID and apply for the Regime Forfettario flat tax.
          </p>
          <p className="text-sm md:text-base font-bold leading-relaxed mb-4">
            But there are few conditions for this tax regime
          </p>
          <div className="mb-4">
            {list.map((item) => (
              <p className="text-sm md:text-base text-gray-800 mb-4 pb-2 border-b border-gray-200">
                ✅ {item}
              </p>
            ))}
          </div>
          <div className="mb-4">
            <ResponsiveTable headers={headers1} data={table3} />
          </div>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            If you are meeting these conditions you can net $74,900 on €85.000 ($99,515) income. You
            are getting 5% tax income tax on 78% of your income (3.88% effective tax) for the first
            5 years, then the tax income moves to 15%. You are paying 26% for social contribution,
            but also on a tax base of 78% of your income (20.23% effective tax). Bottom line, the
            first 5 years you are paying around 24% tax, after the initial 5 years effective tax
            moves up to 32%.
          </p>
        </section>

        <section className="mb-8">
          <h4 className="text-lg md:text-xl font-semibold mb-2">
            Scenario 3: Lavoratori Impatriati (Impatriate Workers Regime)
          </h4>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            If you are not meeting the conditions for the Regime Forfettario or you are making well
            more than €85K it would be the best to use this impatriate workers regime which is open
            to new employees or self-employed people.
          </p>
          <p className="text-sm md:text-base font-bold leading-relaxed mb-4">
            But there are few conditions for this tax regime
          </p>
          <div className="mb-4">
            {list1.map((item) => (
              <p className="text-sm md:text-base text-gray-800 mb-4 pb-2 border-b border-gray-200">
                ✅ {item}
              </p>
            ))}
          </div>
          <div className="mb-1">
            <ResponsiveTable headers={headers1} data={table4} />
          </div>
          <p className="text-sm md:text-base italic leading-relaxed mb-4">
            *Calculation, for simplicity reasons, is done on $100K annual income.
          </p>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            With Lavoratori Impatriati you will be taxed on 50% of your income using Italian
            progressive income tax - 23%: up to €28,000, then 35%: €28,001–€50,000 and 43%: above
            €50,000 of income. So if you are making $100K a year you will pay income taxes only for
            $50K, around 27%, but if you spread it out to the full amount of income your effective
            income tax would be 13.9%. Be aware that if you are making more annual income this
            effective rate will be higher, because part of your income will cross the highest income
            tax bracket and that will increase the effective income tax.
          </p>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            You will have to pay 26% for the social contributions on the full amount of the income.
            If your annual income is lower than $130K you will be exempt from the US federal tax,
            but everything that you make on top of that will be taxed progressively according to the
            table below.
          </p>
          <div className="mb-4">
            <ResponsiveTable headers={headers2} data={fed} />
          </div>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            Lavoratori Impatriati is only for people that want to commit to 4 years of staying in
            Italy and being a tax resident in this regime. If you decide to leave earlier. your
            taxes, for all years you have been using this regime, would be recalculated without the
            50% taxed income reduction and you will be in obligation to pay off that difference.
          </p>
        </section>

        <section className="mb-8">
          <h4 className="text-lg md:text-xl font-semibold mb-2">Pros and Cons</h4>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            Not applying tax regimes can be an option for US sole proprietors that are making above
            €85K, or for some other reason are not eligible for the Regime Forfettario, and can’t or
            do not want to stay in Italy for 4 years which is a condition of Lavoratori Impatriati.
          </p>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            Con is the higher effective tax, but if you are making a large annual income and you do
            not wanna commit to life in Italy for the next four years, that can be an option. But,
            make sure to get a US Certificate of Coverage that will give you the option for 53.9%
            tax. Apart from time flexibility you will not waste any time and energy on slow Italian
            bureaucracy.
          </p>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            Regime Forfettario is the best option if you are making €85K or less. You have to make
            sure not to pass this income limit and you will be entering Italian bureaucracy that can
            give you some pain. But at the end you will have the lowest tax.
          </p>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            Lavoratori Impatriati is a good option if you wanna stay long term and you are making
            more than €85K. Cons are required minimum time for using this tax regime (4 years),
            41.4% of tax which is not ideal and dealing with Italian bureaucracy. But this can be a
            valid option for someone that is making between €85K and €600K a year, that is look for
            a longer and more stable stay. This regime can be extended to another 3 years and the
            effective tax rate can be lower if you have a dependent kid with you in Italy, lowering
            your taxable income by 60%.
          </p>
        </section>

        <section className="mb-8">
          <h4 className="text-lg md:text-xl font-semibold mb-2">Comparing effective tax rates </h4>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            So we have compared the different tax options for digital nomads but how are these
            compared to what they have in their home countries. Is this something that will let them
            have more money in the end or not?
          </p>
          <div className="mb-1">
            <ResponsiveTable headers={headers3} data={compare} />
          </div>
          <p className="text-sm md:text-base italic leading-relaxed mb-4">
            *These are the effective tax approximations for self-employed (freelancers) in a few
            states and countries. Calculation, for simplicity reasons, is done on $100K annual
            income.
          </p>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            Compared to effective tax rates in the table above, Regime Forfettario's effective tax
            rate looks very favorable. So freelancers from these places can make some gains in net
            income if they are not making above €85K and are willing to relocate to Italy.
          </p>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            There is an additional financial benefit that should also be mentioned, the difference
            in the cost of living in these places, so some parts of Italy can be a lot cheaper than
            California or some places in the UK and Netherlands. You can look at these living cost
            differences also as a form of tax, or in the case of lower costs as tax benefits.
          </p>
          <div className="mb-4">
            <ResponsiveTable headers={headers4} data={spare} />
          </div>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            These differences in living costs depend on a lot of factors but in general Italy
            (especially the southern regions) is cheaper than all these places. So, if you are, for
            example, from California (or other US states) and you are making around $100K a year as
            a location independent professional, an Italian digital nomad visa with Regime
            Forfettario would be a good choice for you as you would net more money in a place that
            is a lot cheaper.
          </p>
        </section>

        <section className="mb-8 ">
          <div className="flex justify-center">
            <Link
              to="/europe?centerLat=48.07649&centerLng=16.32731&north=58.40171&south=35.13787&east=40.73730&west=-8.04199&zoom=5&budget=7000&size=1000000&sea=false&rank=false"
              className="inline-block px-4 py-1.5 rounded-lg bg-blue-100 text-blue-800 font-semibold text-sm hover:bg-blue-200"
            >
              🗺️ Explore the Map
            </Link>
          </div>
        </section>

        <section className="mb-8">
          <h4 className="text-lg md:text-xl font-semibold mb-2">Conclusion</h4>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            There are places around the world that offer lower tax schemes for digital nomads or
            other temporary residents, but Italy is not that bad if you are not a very high earner.
            Making around $100K a year will get you a great lifestyle in Italy, and a solid 24% tax
            rate which would enable you to net more money than if you stay at home. You have to
            prepare for it and lose some time and energy in the maze of Italian bureaucracy, but in
            the end it is a small cost for what you can get.
          </p>
        </section>
      </div>
    </>
  );
}

export default NomadBlog;
