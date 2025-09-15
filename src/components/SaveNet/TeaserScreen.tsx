import { useEffect } from 'react';
import { trackEvent } from '../../utils/analytics';
import type { City, DefValue, ReportDto } from '../../types/api.types';
import ReportResult from './ReportResult';
import { Link } from 'react-router-dom';

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
      <h1 className="text-xl md:text-2xl text-center font-bold text-blue-500 mb-6 md:mb-8">
        Your Net Calculation for {city?.name}
      </h1>
      <div className="mb-8">
        <ReportResult data={data} city={city} capitalGains={capitalGains} />
        <div className="w-full mt-10 flex flex-col items-center justify-center gap-6">
          <button
            onClick={reset}
            className="w-full block md:w-[320px] py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white cursor-pointer"
          >
            Reset calculator for {city?.name}
          </button>

          <Link
            to={`/cities/${city?.country}`}
            className="cursor-pointer font-semibold text-center text-base text-gray-500 hover:underline "
          >
            Back to cities in {city?.country}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TeaserScreen;
