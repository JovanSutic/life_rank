import { ArrowPathIcon } from '@heroicons/react/24/outline';

function LoadingOverlay({
  isFixed = false,
  isHidden = false,
}: {
  isFixed?: boolean;
  isHidden?: boolean;
}) {
  return (
    <div
      className={`${isFixed ? 'fixed' : 'absolute'} ${isHidden ? 'hidden' : 'flex'} h-full inset-0 z-50 items-center justify-center bg-white/40 backdrop-blur-sm m-0 z-1002`}
    >
      <ArrowPathIcon className="h-10 w-10 animate-spin text-gray-700" />
      <span className="ml-3 text-lg text-gray-700">Loading...</span>
    </div>
  );
}

export default LoadingOverlay;
