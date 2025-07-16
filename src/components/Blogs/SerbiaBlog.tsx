import NewsletterModal from '../Basic/NewsletterModal';
import { useMapStore } from '../../stores/mapStore';
import ResponsiveTable from '../Healthcare/ResponsiveTable';
import { Link } from 'react-router-dom';

const table1 = [
  {
    type: 'Fixed taxable income',
    rate: '',
    country: 'Serbia',
    value: '€9,450',
  },
  {
    type: 'Income tax',
    rate: '10%',
    country: 'Serbia',
    value: '€945',
  },
  {
    type: 'Regional and Municipal taxes',
    rate: 'none',
    country: 'Serbia',
    value: '€0',
  },
  {
    type: 'Social contributions',
    rate: '36.55%',
    country: 'Serbia',
    value: '€3,460',
  },
  {
    type: 'Ecology tax',
    rate: '4 * €42.5',
    country: 'Serbia',
    value: '€170',
  },
  {
    type: 'Federal tax',
    rate: 'exempt',
    country: 'US',
    value: '€0',
  },
  {
    type: 'Self employed tax',
    rate: 'exempt',
    country: 'US',
    value: '€0',
  },
  {
    type: 'Total',
    rate: '8.9%',
    country: 'US + Serbia',
    value: '€4,572',
  },
];
const table2 = [
  {
    type: 'Annual gross salary',
    rate: '',
    country: 'Serbia',
    value: '€5,120',
  },
  {
    type: 'Taxes on the salary',
    rate: '4.33%',
    country: 'Serbia',
    value: '€222',
  },
  {
    type: 'Social contributions on the salary',
    rate: '35.15%',
    country: 'Serbia',
    value: '€1,800',
  },
  {
    type: 'Business expenses (only salary)',
    rate: '7.5%',
    country: 'Serbia',
    value: '€5,120',
  },
  {
    type: 'Pre tax income',
    rate: '92.5%',
    country: 'Serbia',
    value: '€63,170',
  },
  {
    type: 'Profit tax',
    rate: '10%',
    country: 'Serbia',
    value: '€6,317',
  },
  {
    type: 'Eco tax',
    rate: '',
    country: 'Serbia',
    value: '€170',
  },
  {
    type: 'Federal tax',
    rate: 'exempt',
    country: 'US',
    value: '€0',
  },
  {
    type: 'Self employed tax',
    rate: 'exempt',
    country: 'US',
    value: '€0',
  },
  {
    type: 'Effective tax',
    rate: '12.7%',
    country: 'US + Serbia',
    value: '€8,713',
  },
  {
    type: 'Non-salary income',
    rate: '83%',
    country: 'Serbia',
    value: '€56,683',
  },
  {
    type: 'Salary income',
    rate: '4.3%',
    country: 'Serbia',
    value: '€2,898',
  },
  {
    type: 'Net income',
    rate: '87.3%',
    country: 'Serbia',
    value: '€59,581',
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
    tax: '100–135%',
  },
  {
    state: 'Texas',
    tax: '65–100%',
  },
  {
    state: 'Florida',
    tax: '60–90%',
  },
  {
    state: 'Minnesota',
    tax: '60–80%',
  },
  {
    state: 'New York',
    tax: '80–110%',
  },
  {
    state: 'United Kingdom',
    tax: '50–60%',
  },
  {
    state: 'Germany',
    tax: '40–60%',
  },
  {
    state: 'Netherlands',
    tax: '50–60%',
  },
];

const headers1 = [
  { name: 'Tax type', field: 'type' },
  { name: 'Rate', field: 'rate' },
  { name: 'Country', field: 'country' },
  { name: 'Value', field: 'value' },
];
const headers3 = [
  { name: 'State/Country', field: 'state' },
  { name: 'Effective Tax Rate*', field: 'tax' },
  { name: 'Note', field: 'comment' },
];
const headers4 = [
  { name: 'State/Country', field: 'state' },
  { name: '% more expensive than Serbia', field: 'tax' },
];

const list = ['Have your annual revenue under €51,200'];
const list1 = [
  'You need to hire an accountant that will be managing your bookkeeping',
  'For all your business expenses you need to have valid receipts',
  'You need to have your annual income lower than €68,295',
  'If all your income is coming from a foreign country you can use this tax format and surpasses €68,295 limit',
];

function SerbiaBlog() {
  const { newsLetterShow, toggleNewsletterShow } = useMapStore();

  return (
    <>
      <article>
        <title>{`Serbia self employed taxes: Great opportunity for Freelancers and Digital Nomads | LifeRank`}</title>
        <meta
          name="description"
          content={`Learn what options for self employment is Serbia offering and how much you can gain from them.`}
        />
        <meta
          name="keywords"
          content={`serbia taxes, taxes for digital nomads, low taxes, best places for low income digital nomads, best place for low income expats, serbia for freelancers, digital nomads in serbia`}
        />
      </article>
      <div className="w-full lg:w-[764px] mx-auto px-4 pt-4 md:pt-8 pb-2 text-gray-800">
        <h1 className="text-2xl text-center font-bold mb-6">
          Serbia self employed taxes: Great opportunity for Freelancers and Digital Nomads
        </h1>
        <NewsletterModal show={newsLetterShow} onClose={toggleNewsletterShow} />

        <section className="mb-8">
          <h4 className="text-lg md:text-xl font-semibold mb-2">Introduction</h4>
          <p className="text-sm md:text-base leading-relaxed mb-2">
            This text is about self employment taxes in Serbia and the opportunity for expats and
            digital nomads to take advantage of these taxes to make more money. There will be no
            deep dive into requirements for the digital nomad visa or any other visa requirements.
            This text is focused on explaining what options do self-employed people have if they
            consider moving to Serbia.
          </p>
        </section>

        <section className="mb-8 ">
          <div className="flex justify-center">
            <Link
              to={`/taxes/Serbia?country=6`}
              className="inline-block px-4 py-1.5 rounded-lg bg-blue-100 text-blue-800 font-semibold text-sm hover:bg-blue-200"
            >
              💸 Learn about Taxes
            </Link>
          </div>
        </section>

        <section className="mb-8">
          <h4 className="text-lg md:text-xl font-semibold mb-2">
            Serbian visa and long term residency
          </h4>
          <p className="text-sm md:text-base leading-relaxed mb-2">
            At the moment Serbian Digital Nomad Visa is still in the making, but there are other
            possibilities that will enable you to stay long term in the country. Maybe the best
            option, and perfectly aligned with following information, is the residency for self
            employed. Where people can stay in the country provided that they become entrepreneurs
            or open a company. This article is not about the procedure how this can be done, but you
            should know that currently not having official visa for digital nomads is not an
            insurmountable obstacle for long term residency. Also, it is good to know that US, EU,
            Canadian, Australian and citizens of additional 120 countries can travel to Serbia visa
            free.
          </p>
        </section>

        <section className="mb-8">
          <h4 className="text-lg md:text-xl font-semibold mb-2">
            Scenario 1: Flat Tax for Entrepreneurs
          </h4>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            This is the most simplified way of taxation where the tax authority is defining the
            taxable income base, depending on your location and business activity. You as an
            entrepreneur, are responsible of paying income tax and the social contribution for this
            taxable base independently of your income. You can have larger or smaller income but you
            will be taxed on the fixed income amount set by the tax authorities.
          </p>
          <p className="text-sm md:text-base font-bold leading-relaxed mb-4">
            To be eligible for this tax format you only need to:
          </p>
          <div className="mb-4">
            {list.map((item) => (
              <p className="text-sm md:text-base text-gray-800 mb-4 pb-2 border-b border-gray-200">
                ✅ {item}
              </p>
            ))}
          </div>
          <div className="mb-1">
            <ResponsiveTable headers={headers1} data={table1} />
          </div>
          <p className="text-sm md:text-base italic leading-relaxed mb-4">
            *The tax calculations above are done on maximum allowed income for this tax format
            (€51,200) with new entrepreneur deduction applied. In subsequent years effective tax
            would rise a few percent (up to 5% increase).
          </p>

          <p className="text-sm md:text-base leading-relaxed mb-4">
            Each year tax authorities are defining new fixed taxable income amount for all locations
            and business activities, so your effective tax would be changed in future years of
            making business. Also, for newly registered entrepreneurs there is a reduction applied
            on the fixed taxable income amount. But, if you are a digital worker and a new
            entrepreneur making annual income of €51,200 (allowed maximum for this tax format) you
            would be able to net as much as €46,600 without any need for bookkeeping.
          </p>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            This tax format doesn't allow business expenses or other deductibles, the taxable income
            is defined and fixed for a single year. What you earn apart from the effective tax you
            are required to pay (income tax, eco tax and social contribution on taxable income) is
            treated like personal money. There is no additional taxation.
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
            Scenario 2: Tax for Entrepreneurs with mandatory bookkeeping
          </h4>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            All entrepreneurs that cross the limit of €51,200 income in a single calendar year are
            required to keep their books and the way their taxes are being calculated is very
            different. There is no more possibility for fixed amount tax base and you will be taxed
            on your full income. But there is a way to optimize this.
          </p>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            The basis of this optimization is in paying lower social contributions. So if you pay
            yourself a salary, and every salary demands social contributions, you would be exempt
            from paying social contributions on the rest of your income. So entrepreneurs usually
            pay themselves a minimal salary, treat it like a business expense and wait till the end
            of the tax period so they can pay only profit tax on the rest of the income. Let's see
            how this looks like.
          </p>
          <div className="mb-4">
            <ResponsiveTable headers={headers1} data={table2} />
          </div>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            Let me explain what is documented in the table above. So, entrepreneur that is keeping
            the books decided to pay himself a minimal salary. On that salary he is paying income
            tax and mandatory social contributions. The salary is treated as a business expense and
            pre tax income, is in fact gross income reduced by the gross salary expenses. In reality
            business will have more expenses that would be used for personal matters, like
            accounting cost, rent, utilities, maybe some piece of equipment, transportation, meals,
            etc. All those personal expenses can be recorded as business expenses. Personal expenses
            that can be recorded as business expenses will add more benefits. But in this scenario
            we have included minimal business expense which is the salary.
          </p>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            Part of your income that is not spent on business expenses or salary will be treated as
            your profit and you will have to pay 10% of tax on it. At the end, you will collect your
            minimal salary that would have been taxed at about 40% effective rate and all the rest
            would be taxed as profit at 10%. In the end your effective tax would be around 12.7%
          </p>
          <p className="text-sm md:text-base font-bold leading-relaxed mb-4">
            Important things for this tax format
          </p>
          <div className="mb-4">
            {list1.map((item) => (
              <p className="text-sm md:text-base text-gray-800 mb-4 pb-2 border-b border-gray-200">
                ✅ {item}
              </p>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h4 className="text-lg md:text-xl font-semibold mb-2">Pros and Cons</h4>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            If you are not planning to cross annual income of (€51,200), flat tax option is ideal
            for you cause you do not have additional cost for accounting and you are able to spend
            money from you business account as your private money. Only obligation you have is to
            pay, each month the amount that tax authority has defined. Also, you can start with this
            tax format and then as soon as you surpass the limit hire an accountant to help you with
            future structure.
          </p>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            The bookkeeping tax option has little bit more regulations but on the other hand if you
            are certain that your annual income will be more than (€51,200), starting with this tax
            format will give you more structure from the beginning.
          </p>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            In general both tax formats are offering very low effective tax rates, it all depends on
            your annual income level.
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
            states and countries. For simplicity reasons, projections are done on $100K annual
            income without deductibles like IRA, business expenses or private healthcare premiums.
          </p>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            As you can see, effective tax rate in Serbia for self-employed and freelancers are a lot
            lower than those in US states and these European countries. For the entrepreneurs that
            are making bellow €70,000 this can be a good opportunity to lower their tax costs and
            net more of their earnings.
          </p>
          <div className="mb-4">
            <ResponsiveTable headers={headers4} data={spare} />
          </div>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            Serbia is much cheaper than US. Some living costs can be up to 2-3 times cheaper, in the
            smaller towns especially. Entrepreneurs in US that are making equivalent of €50,000
            would not be able to have a comfortable life. In Serbia with flat tax rate, that income
            would lead to €45.5K net which would allow you to live very comfortably and save half of
            that sum. Maybe that is just the motivation you need to grow your business.
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
            Serbia is a place where self-employed can have very small effective tax rates and they
            can enjoy low cost of living. That is putting them into great place for saving more. US
            citizens especially, can use the opportunity to save in Serbia and invest in US stock
            market or put money in retirement funds through US brokerage. There can be obstacles
            especially with the bureaucracy, but with little local help everything can be resolved.
            The most important thing is to have valid information and realistic expectations about
            what you will face.
          </p>
        </section>
      </div>
    </>
  );
}

export default SerbiaBlog;
