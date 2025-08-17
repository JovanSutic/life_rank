import { useEffect } from 'react';
import { trackEvent } from '../../utils/analytics';
import type { City, DefValue, ReportDto } from '../../types/api.types';
import ReportResult from './ReportResult';

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
      <div className="mb-8">
        <ReportResult data={data} city={city} capitalGains={capitalGains} />
        <div className="w-full mt-10 flex flex-col items-center justify-center">
          <button
            onClick={reset}
            className="w-full block md:w-[300px] cursor-pointer bg-gray-300 hover:bg-gray-200 text-black font-semibold text-center py-2 px-6 rounded-lg transition-colors"
          >
            Back to Form
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeaserScreen;
