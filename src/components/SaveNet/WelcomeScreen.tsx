import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../utils/analytics';
import type { City } from '../../types/api.types';

function WelcomeScreen({ city, onStart }: { city?: City; onStart: () => void }) {
  useEffect(() => {
    trackEvent('net-flow-welcome');
  }, []);
  return (
    <div className="flex flex-col items-center justify-center pt-16">
      <h1 className="text-xl text-center font-bold text-gray-800 mb-8">
        Discover Your Tax Residency Effects in {city?.name}
      </h1>

      <ul className="text-left space-y-3 mb-6">
        <li className="flex items-start">
          <span className="text-green-600 text-lg mr-2">✅</span>
          <span className="text-gray-700">
            Follow the simple <strong>3 step</strong> form
          </span>
        </li>
        <li className="flex items-start">
          <span className="text-green-600 text-lg mr-2">✅</span>
          <span className="text-gray-700">
            Apply <strong>individual, couple or family</strong> scenario — so you get results that
            match your life.
          </span>
        </li>
        <li className="flex items-start">
          <span className="text-green-600 text-lg mr-2">✅</span>
          <span className="text-gray-700">
            It takes <strong>only 1 minute</strong>
          </span>
        </li>
        <li className="flex items-start">
          <span className="text-green-600 text-lg mr-2">✅</span>
          <span className="text-gray-700">
            Instantly get <strong>comprehensive data</strong> that will describe your potential
            financial situation in {city?.name}
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
        to={`/cities/${city?.country}`}
        className="w-full block md:w-[300px] cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-6 rounded-lg transition-colors mt-4"
      >
        Go to Cities
      </Link>
    </div>
  );
}

export default WelcomeScreen;
