import { useMemo } from 'react';

type HCRatingProps = {
  score: number;
  title: string;
};

const HCRating = ({ score, title }: HCRatingProps) => {
  const percent = Math.min(Math.max(score, 0), 10) * 10;
  const color = useMemo(() => {
    if (score < 6) {
      return 'bg-red-500';
    }

    if (score < 7.5) {
      return 'bg-yellow-500';
    }

    return 'bg-green-500';
  }, [score]);

  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm md:text-base font-semibold text-gray-800">{title}</span>
        <span className="text-sm md:text-base font-bold text-gray-900">{score}/10</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded">
        <div className={`h-2 ${color} rounded`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
};

export default HCRating;
