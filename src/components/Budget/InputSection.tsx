type InputSectionProps = {
  name: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

function InputSection({ name, description, children, className = '' }: InputSectionProps) {
  return (
    <div className={`flex flex-col w-full border border-gray-200 rounded-lg p-4 ${className}`}>
      <p className="text-md font-semibold text-center text-gray-800 mb-1">{name}</p>
      {description && <p className="text-sm text-center text-gray-500 mb-4">{description}</p>}
      <div className="flex flex-wrap justify-center gap-4">{children}</div>
    </div>
  );
}

export default InputSection;
