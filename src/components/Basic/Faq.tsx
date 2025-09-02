import { useState } from 'react';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline';
import type { FaqItem } from '../../types/flow.types';

function FaqElement({ data }: { data: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<null | number>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 bg-gray-50 p-6 py-10 rounded-2xl">
      {data.map((item, index) => (
        <div key={index} className="border-b border-gray-300 pb-4">
          <button
            onClick={() => toggle(index)}
            className="flex justify-between cursor-pointer w-full text-left text-lg font-medium text-gray-700 hover:text-blue-600 transition"
          >
            <span>{item.question}</span>
            {openIndex === index ? (
              <ChevronDownIcon className="w-5 h-5 text-gray-500" />
            ) : (
              <PlusIcon className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {openIndex === index && (
            <div className="mt-2 text-gray-600 text-base leading-relaxed text-left">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FaqElement;
