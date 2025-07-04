import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState, type ReactNode } from 'react';

function MoreData({ title, children }: { title: string; children: ReactNode }) {
  const [open, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <div className="w-full">
        {!open && (
          <button
            onClick={() => setIsOpen(true)}
            className="w-full text-sm md:text-base flex cursor-pointer items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg"
          >
            <ChevronDownIcon className="w-5 md:w-6 h-5 md:h-6 mr-2" />
            {title}
          </button>
        )}
      </div>
      {open && <div>{children}</div>}
    </div>
  );
}

export default MoreData;
