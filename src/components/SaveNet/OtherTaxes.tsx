import { otherTaxesInitial, otherTaxTitles, regionalWealthTaxDetails } from '../../data/taxes';
import { useMapStore } from '../../stores/mapStore';
import type { DefValue } from '../../types/api.types';
import { convertCurrencyInString } from '../../utils/city';
import DisplayBox from '../Basic/DisplayBox';

const OtherTaxes = ({
  regionName,
  capitalGainsData,
  country,
}: {
  regionName: keyof typeof regionalWealthTaxDetails;
  capitalGainsData: DefValue[];
  country: string;
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
              <p className="text-sm md:text-base text-gray-600 mt-1">
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
        <h2 className="text-lg font-semibold text-gray-800 mb-6">{otherTaxTitles[country]}</h2>
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <div className="flex-1 space-y-4">
            {wealthTaxDetails !== 'Details for this region are not available.' && (
              <DisplayBox
                message={convertCurrencyInString(wealthTaxDetails, currencyIndex, currency)}
                color="yellow"
              />
            )}
            {otherTaxesInitial[country].map((item) => (
              <DisplayBox
                key={item.id}
                title={item.title}
                message={item.message}
                color={item.title ? 'gray' : 'yellow'}
              />
            ))}
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
                    <p className="font-bold md:text-lg text-gray-800 mb-1">{detail.note}</p>
                    <p className="text-gray-600 text-sm md:text-base">{detail.comment}</p>
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
