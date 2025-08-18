import { regionalWealthTaxDetails } from '../../data/spain';
import { useMapStore } from '../../stores/mapStore';
import type { DefValue } from '../../types/api.types';
import { convertCurrencyInString } from '../../utils/city';
import DisplayBox from '../Basic/DisplayBox';

const OtherTaxes = ({
  regionName,
  capitalGainsData,
}: {
  regionName: keyof typeof regionalWealthTaxDetails;
  capitalGainsData: DefValue[];
}) => {
  const { currency, currencyIndex } = useMapStore();
  const wealthTaxDetails =
    regionalWealthTaxDetails[regionName] || 'Details for this region are not available.';

  const renderTaxCard = (definitionValues: DefValue[]) => (
    <div className="bg-gray-100 p-4 rounded-2xl shadow-inner mt-4">
      <h4 className="text-xl font-semibold text-gray-800 mb-2">Key Rates</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {definitionValues
          .filter((item) => item.note?.includes('Tax Bracket'))
          .map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
              <p className="text-lg font-bold text-blue-500">{item.value}</p>
              <p className="text-sm text-gray-600 mt-1">
                {convertCurrencyInString(item.comment || '', currencyIndex, currency)}
              </p>
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white overflow-hidden space-y-6">
      <div className="">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Wealth Tax ({regionName})</h2>
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <div className="flex-1 space-y-4">
            <DisplayBox
              message="The Spanish Wealth Tax is an annual tax levied on the net value of a person's assets
              as of December 31st. Net worth is calculated by adding the value of all assets (e.g.,
              real estate, investments, bank accounts) and then deducting any debts or liabilities
              (e.g., mortgages). Each Spanish region, or Autonomous Community, can set its own
              rules, rates, and exemptions, which can result in significant differences in tax
              liability depending on where you reside."
              color="yellow"
            />
            <DisplayBox
              message={convertCurrencyInString(wealthTaxDetails, currencyIndex, currency)}
              color="yellow"
            />
            <DisplayBox
              title={'The 60% Rule: The Tax Cap'}
              message={
                'This rule caps your total tax burden. The combined amount of your income tax and wealth tax cannot exceed 60% of your taxable income for the year. This prevents a high wealth tax from becoming overwhelming, especially if your income is low.'
              }
            />
            <DisplayBox
              title={'The 20% Rule: The Minimum Payment'}
              message={
                "This rule is the flip side. While the 60% cap can reduce your wealth tax, it has a limit. You're always required to pay a minimum of 20% of your original wealth tax liability, even if the 60% cap would otherwise bring it lower or to zero."
              }
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Capital Gains Tax</h2>

        <div>
          {renderTaxCard(capitalGainsData)}

          <div className="mt-8 pb-6">
            <h4 className="text-base font-semibold text-gray-800 mb-4">Additional Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {capitalGainsData
                .filter((item) => !item.note?.includes('Tax'))
                .map((detail) => (
                  <div
                    key={detail.id}
                    className="bg-white p-5 rounded-xl shadow-md border border-gray-200"
                  >
                    <p className="font-bold text-gray-800 mb-1">{detail.note}</p>
                    <p className="text-gray-600 text-sm">{detail.comment}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherTaxes;
