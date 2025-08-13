import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../utils/analytics';

function TeaserScreen({
  cityName,
  netIncome,
  savings,
}: {
  cityName: string;
  netIncome: number;
  savings: number;
}) {
  useEffect(() => {
    trackEvent('net-flow-finish');
  }, []);
  return (
    <div className="max-w-md mx-auto py-6 bg-white rounded-xl text-center pt-10">
      <h1 className="text-xl font-bold text-gray-900 mb-8">
        Your <span className="text-blue-600">Net & Save</span> in {cityName}
      </h1>

      <div className="mb-8">
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Estimated Net:</span>{' '}
          <span className="text-green-700 font-bold">€{netIncome.toLocaleString()}</span>
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Potential Savings:</span>{' '}
          <span className="text-blue-700 font-bold">€{savings.toLocaleString()}</span>
        </p>
      </div>

      <ul className="text-left space-y-2 mb-6">
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✅</span>
          Get a detailed breakdown
        </li>
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✅</span>
          See more save options
        </li>
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✅</span>
          Save and access your results securely
        </li>
      </ul>

      <div className="w-full mt-6 flex flex-col items-center justify-center">
        <Link
          to="/login?type=signup"
          className="w-full block md:w-[300px] cursor-pointer bg-green-500 hover:bg-green-600 text-white  py-2 px-6 rounded-lg transition-colors"
        >
          Get Full Report for Free
        </Link>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Log in or create an account to save your results and it is 100% free.
      </p>

      <div className="w-full mt-6 flex flex-col items-center justify-center">
        <Link
          to="/europe?layerTypeId=1&centerLat=48.07649&centerLng=16.32731&north=58.40171&south=35.13787&east=40.73730&west=-8.04199&zoom=5&budget=7000&size=9007199254740991&sea=false&rank=false"
          className="w-full block md:w-[300px] cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-6 rounded-lg transition-colors"
        >
          Back on the Map
        </Link>
      </div>
    </div>
  );
}

export default TeaserScreen;
