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
    <div className="flex flex-col items-center justify-center pt-10 px-4 md:px-0">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900 text-center mb-6 leading-snug">
        Understand the True Cost of Living in {city?.name}
      </h1>

      <p className="text-gray-600 text-sm text-center max-w-2xl mb-10">
        Get a personalized breakdown of your potential income, local taxes, and cost of living — all
        in under a minute. Whether you're solo, a couple, or a family, we tailor the insights to
        your situation.
      </p>

      <div className="grid gap-4 md:gap-5 mb-12 max-w-2xl w-full">
        <div className="flex items-start space-x-3">
          <div className="text-blue-600">✔</div>
          <div className="text-gray-700">
            Fully customized for <strong>your tax profile</strong> and lifestyle setup.
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="text-blue-600">✔</div>
          <div className="text-gray-700">
            Includes <strong>net income, taxes, and cost of living</strong> — all in one view.
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="text-blue-600">✔</div>
          <div className="text-gray-700">
            No signup required — <strong>60 seconds or less</strong> to complete.
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="text-blue-600">✔</div>
          <div className="text-gray-700">
            Built specifically for <strong>remote workers and self-employed pros</strong>.
          </div>
        </div>
      </div>

      <Button onClick={onStart} className="w-full md:w-[320px] mt-4">
        Calculate My Net Income in {city?.name}
      </Button>

      <Link
        to={`/cities/${city?.country}`}
        className="inline-flex mt-8 items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
      >
        ← Back to City Overview
      </Link>
    </div>
  );
}

export default WelcomeScreen;
