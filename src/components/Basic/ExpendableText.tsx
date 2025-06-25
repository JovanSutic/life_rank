import { useState } from 'react';

const ExpandableText = ({ text, limit = 100 }: { text: string; limit?: number }) => {
  const [expanded, setExpanded] = useState(false);

  const isLong = text.length > limit;
  const displayedText = expanded || !isLong ? text : text.slice(0, limit) + '...';

  return (
    <div className="text-sm text-gray-800">
      <p className="text-sm md:text-base">{displayedText}</p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 text-blue-600 underline focus:outline-none cursor-pointer"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
};

export default ExpandableText;
