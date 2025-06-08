import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function ErrorOverlay({ message = 'Something went wrong.' }: { message?: string }) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm m-0 z-1002">
      <ExclamationTriangleIcon className="h-12 w-12 text-red-600 mb-4" />
      <p className="text-lg font-semibold text-gray-800">{message}</p>
    </div>
  );
}

export default ErrorOverlay;
