type BooleanSwitchProps = {
  label: string;
  value: boolean;
  onChange: (newValue: boolean) => void;
};

export default function BooleanSwitch({ label, value, onChange }: BooleanSwitchProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-gray-700 font-medium text-sm">{label}</span>
      <button
        type="button"
        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${
          value ? 'bg-blue-600' : 'bg-gray-300'
        }`}
        onClick={() => onChange(!value)}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            value ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}
