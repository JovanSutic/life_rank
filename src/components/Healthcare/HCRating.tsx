type HCRatingProps = {
  score: number;
  city: string;
};

const HCRating = ({ score, city }: HCRatingProps) => {
  const percent = Math.min(Math.max(score, 0), 10) * 10; // Clamp between 0–100

  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm md:text-base font-semibold text-gray-800">
          {`${city} Healthcare Rating`}
        </span>
        <span className="text-sm md:text-base font-bold text-gray-900">{score}/10</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded">
        <div className="h-2 bg-green-500 rounded" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
};

export default HCRating;
