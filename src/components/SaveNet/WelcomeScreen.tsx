import { Link } from 'react-router-dom';

function WelcomeScreen({ cityName, onStart }: { cityName: string; onStart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center pt-16">
      <h1 className="text-xl text-center font-bold text-gray-800 mb-8">
        Find Your Net & Savings in {cityName}
      </h1>

      <ul className="text-left space-y-3 mb-6">
        <li className="flex items-start">
          <span className="text-green-600 text-lg mr-2">✅</span>
          <span className="text-gray-700">
            Simple <strong>3 step</strong> form
          </span>
        </li>
        <li className="flex items-start">
          <span className="text-green-600 text-lg mr-2">✅</span>
          <span className="text-gray-700">
            For <strong>individuals, couples and families</strong> alike — so you get results that
            match your life.
          </span>
        </li>
        <li className="flex items-start">
          <span className="text-green-600 text-lg mr-2">✅</span>
          <span className="text-gray-700">
            Takes <strong>about 1 minute</strong> to complete
          </span>
        </li>
      </ul>

      <button
        onClick={onStart}
        className="w-full md:w-[300px] mt-6 py-2 cursor-pointer text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
      >
        Start Now
      </button>
      <Link
        to="/europe?layerTypeId=1&centerLat=48.07649&centerLng=16.32731&north=58.40171&south=35.13787&east=40.73730&west=-8.04199&zoom=5&budget=7000&size=9007199254740991&sea=false&rank=false"
        className="w-full block md:w-[300px] cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-6 rounded-lg transition-colors mt-4"
      >
        Back on the Map
      </Link>
    </div>
  );
}

export default WelcomeScreen;
