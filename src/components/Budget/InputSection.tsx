import { InformationCircleIcon } from '@heroicons/react/24/solid';

type InputSectionProps = {
  name: string;
  description?: string;
  amount?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

function InputSection({
  name,
  description,
  amount,
  children,
  className = '',
  onClick,
}: InputSectionProps) {
  return (
    <div
      className={`relative flex flex-col w-full border border-gray-200 rounded-lg p-4 ${className}`}
    >
      {amount && (
        <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-2 rounded-full shadow-sm">
          {amount}
        </div>
      )}

      <p className="flex self-start lg:self-center text-[18px] ml-0 lg:ml-[-14px] lg:text-lg lg:text-center font-semibold text-gray-800 mb-2 lg:mb-4">
        {name}
        <button
          onClick={onClick}
          className="w-6 h-6 flex items-center ml-1 justify-center rounded-full transition text-xs font-bold cursor-pointer"
          aria-label="Open budget info"
        >
          <InformationCircleIcon className="h-7 w-7 stroke-white" />
        </button>
      </p>
      {description && (
        <p className="text-xs lg:text-sm text-center text-gray-500 mb-4">{description}</p>
      )}
      <div className="flex flex-wrap justify-center lg:justify-around gap-4 pt-4">{children}</div>
    </div>
  );
}

export default InputSection;
