import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../utils/analytics';
import type { City } from '../../types/api.types';
import { Button } from '../Basic/Button';

function WelcomeScreen({ city, onStart }: { city?: City; onStart: () => void }) {
  useEffect(() => {
    trackEvent('net-flow-welcome');
  }, []);
  return (
    <div className="flex flex-col items-center justify-center pt-16">
      <h1 className="text-xl text-center font-bold text-gray-800 mb-8">
        See What Living in {city?.name} Would Actually Cost You — Taxes Included.
      </h1>

      <ul className="text-left space-y-3 mb-6">
        <li className="flex items-start">
          <span className="text-green-600 text-lg mr-2">✅</span>
          <span className="text-gray-700">
            Personalized for <strong>your tax situation</strong> — whether you're solo, a couple, or
            family.
          </span>
        </li>
        <li className="flex items-start">
          <span className="text-green-600 text-lg mr-2">✅</span>
          <span className="text-gray-700">
            Includes <strong>income tax + cost of living</strong> — all in one easy estimate.
          </span>
        </li>
        <li className="flex items-start">
          <span className="text-green-600 text-lg mr-2">✅</span>
          <span className="text-gray-700">
            Takes <strong>under 60 seconds</strong> — no signup required.
          </span>
        </li>
        <li className="flex items-start">
          <span className="text-green-600 text-lg mr-2">✅</span>
          <span className="text-gray-700">
            Designed for <strong>remote workers and digital nomads</strong> like you.
          </span>
        </li>
      </ul>

      <Button onClick={onStart} className="w-full md:w-[320px] mt-6">
        Calculate My Net Income in {city?.name}
      </Button>
      <Link
        to={`/cities/${city?.country}`}
        className="inline-flex mt-8 items-center text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
      >
        ← Go Back to Cities
      </Link>
    </div>
  );
}

export default WelcomeScreen;
