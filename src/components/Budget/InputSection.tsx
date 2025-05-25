type InputSectionProps = {
  name: string;
  description?: string;
  amount?: number;
  children: React.ReactNode;
  className?: string;
};

function InputSection({ name, description, amount, children, className = '' }: InputSectionProps) {
  return (
    <div
      className={`relative flex flex-col w-full border border-gray-200 rounded-lg p-4 ${className}`}
    >
      {typeof amount === 'number' && (
        <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-2 rounded-full shadow-sm">
          {amount.toFixed(2)}€
        </div>
      )}

      <p className="text-md font-semibold text-center text-gray-800 mb-4">{name}</p>
      {description && <p className="text-sm text-center text-gray-500 mb-4">{description}</p>}
      <div className="flex flex-wrap justify-center lg:justify-around gap-4">{children}</div>
    </div>
  );
}

export default InputSection;
