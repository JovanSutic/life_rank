import { useEffect } from 'react';
import { trackEvent } from '../../utils/analytics';
import type { City, DefValue, ReportDto } from '../../types/api.types';
import ReportResult from './ReportResult';
import { Link } from 'react-router-dom';
import { Button } from '../Basic/Button';

function TeaserScreen({
  city,
  data,
  capitalGains,
  reset,
}: {
  city: City | undefined;
  data: ReportDto;
  capitalGains?: DefValue[];
  reset: () => void;
}) {
  useEffect(() => {
    trackEvent('net-flow-finish');
  }, []);

  return (
    <div className="w-full py-6 bg-white rounded-xl pt-6">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900 text-center mb-6 leading-snug">
        Your Net Calculation for {city?.name}
      </h1>
      <div className="mb-8">
        <ReportResult data={data} city={city} capitalGains={capitalGains} />
        <div className="w-full mt-10 flex flex-col items-center justify-center">
          <Button onClick={reset} className="w-full block md:w-[320px]">
            Reset calculator for {city?.name}
          </Button>

          <Link
            to={`/cities/${city?.country}`}
            className="inline-flex mt-8 items-center text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Go Back to Cities in {city?.country}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TeaserScreen;
