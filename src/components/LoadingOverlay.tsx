import { ArrowPathIcon } from '@heroicons/react/24/outline';

function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm m-0 z-1002">
      <ArrowPathIcon className="h-10 w-10 animate-spin text-gray-700" />
      <span className="ml-3 text-lg text-gray-700">Loading...</span>
    </div>
  );
}

export default LoadingOverlay;
