type SizeOption = {
  label: string;
  value: number | null; // null for "All Sizes"
};

const sizeOptions: SizeOption[] = [
  { label: 'Up to 200k people', value: 200000 },
  { label: 'Up to 500k people', value: 500000 },
  { label: 'All sizes', value: null },
];

type CitySizeSelectorProps = {
  selectedSize: number | null;
  onChange: (size: number | null) => void;
};

export default function CitySizeSelector({ selectedSize, onChange }: CitySizeSelectorProps) {
  return (
    <div className="flex flex-col md:flex-row gap-2 flex-wrap">
      {sizeOptions.map(({ label, value }) => {
        const isSelected = selectedSize === value;

        return (
          <button
            key={label}
            onClick={() => onChange(value)}
            className={`px-4 py-2 cursor-pointer rounded-lg border transition text-sm font-medium
              ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-800 border-gray-300 hover:border-blue-400 hover:text-blue-600'
              }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
