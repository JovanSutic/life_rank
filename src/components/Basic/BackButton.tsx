import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();
  return (
    <div className="absolute left-2 top-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm text-white bg-gray-700 hover:bg-gray-600 transition cursor-pointer p-2 rounded-lg"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back
      </button>
    </div>
  );
}

export default BackButton;
