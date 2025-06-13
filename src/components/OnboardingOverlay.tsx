import { useState } from 'react';
import {
  MapIcon,
  MagnifyingGlassPlusIcon,
  MapPinIcon,
  CursorArrowRaysIcon,
} from '@heroicons/react/24/outline';

function MapSteps({
  onClose,
  step,
  nextStep,
}: {
  onClose: () => void;
  nextStep: () => void;
  step: number;
}) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
      <div className="flex flex-col items-center text-center">
        <div className="flex flex-col space-x-4 mb-4">
          <div className="mb-4">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="rounded-lg shadow-md w-full"
              onLoadedData={() => setIsLoaded(true)}
            >
              <source src="/onboard-map.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {step === 1 ? (
            <div className="flex justify-center gap-4">
              <MapIcon className="w-10 h-10 text-blue-500" />
              <MagnifyingGlassPlusIcon className="w-10 h-10 text-blue-500" />
            </div>
          ) : step === 2 ? (
            <div className="flex justify-center gap-4">
              <CursorArrowRaysIcon className="w-10 h-10 text-purple-500" />
              <MagnifyingGlassPlusIcon className="w-10 h-10 text-purple-500" />
            </div>
          ) : (
            <div className="flex justify-center gap-4">
              <MapPinIcon className="w-10 h-10 text-green-500" />
              <CursorArrowRaysIcon className="w-10 h-10 text-green-500" />
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-2">
          {step === 1 ? 'Explore the Map' : step === 2 ? 'Filter Your Search' : 'Get City Insights'}
        </h2>
        <p className="text-gray-700 mb-6">
          {step === 1
            ? 'Move or zoom the map to discover more cities. New pins will load as you explore!'
            : step === 2
              ? 'Use filters to tailor your search based on budget, population, sea exposure and more.'
              : 'Click on any pin to learn more about that city’s quality of life.'}
        </p>
      </div>

      <div className="flex justify-end space-x-2">
        {step === 3 && (
          <button
            disabled={!isLoaded}
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 px-4 py-2"
          >
            Skip
          </button>
        )}
        <button
          onClick={nextStep}
          disabled={!isLoaded}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer disabled:bg-gray-200"
        >
          {step === 3 ? 'Got it!' : 'Next'}
        </button>
      </div>
    </div>
  );
}

function OnboardingOverlay({
  onClose,
  type = 'map',
}: {
  onClose: () => void;
  type?: 'map' | 'budget';
}) {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm m-0 z-1005 p-2">
      {type === 'map' && <MapSteps step={step} onClose={onClose} nextStep={nextStep} />}
    </div>
  );
}

export default OnboardingOverlay;
