import type { HCTiersListProps } from '../../types/city.types';

const HCTiersList = ({ data }: HCTiersListProps) => {
  const colors: string[] = ['border-green-500', 'border-amber-500', 'border-red-500'];

  if (data.length === 1) {
    const tier = data[0];
    return (
      <div className="space-y-6">
        <div className={`border-l-4 pl-4 border-blue-500 bg-white shadow-md p-4 rounded-md`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{tier.title}</h3>
          <ul className="list-disc text-sm md:text-base list-inside text-gray-700 space-y-1">
            {tier.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {data.map((tier, index) => (
        <div
          key={index}
          className={`border-l-4 pl-4 ${colors[index]} bg-white shadow-md p-4 rounded-md`}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{tier.title}</h3>
          <ul className="list-disc text-sm md:text-base list-inside text-gray-700 space-y-1">
            {tier.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default HCTiersList;
