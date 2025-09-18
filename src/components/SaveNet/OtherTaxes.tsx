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
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-6">
      <h4 className="text-base font-semibold text-gray-800 mb-4">Key Tax Rates</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {definitionValues
          .filter((item) => item.note?.includes('Tax Bracket'))
          .map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-blue-400 hover:shadow transition"
            >
              <p className="text-base font-semibold text-blue-600">{item.value}</p>
              <p className="text-sm text-gray-600 mt-1 leading-snug">
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

          <div className="mt-10 pb-8">
            <h4 className="text-base font-semibold text-gray-800 mb-4">Additional Details</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {capitalGainsData
                .filter((item) => !item.note?.includes('Tax'))
                .map((detail) => (
                  <div
                    key={detail.id}
                    className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:border-blue-400 hover:shadow-sm transition"
                  >
                    <p className="text-sm font-medium text-gray-700 mb-1">{detail.note}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {convertCurrencyInString(detail.comment || '', currencyIndex, currency)}
                    </p>
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
