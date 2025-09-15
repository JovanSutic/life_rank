import { XMarkIcon } from '@heroicons/react/24/solid';
import type { ReactNode } from 'react';

function Modal({
  show,
  children,
  close,
}: {
  show: boolean;
  children: ReactNode[] | ReactNode;
  close: () => void;
}) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-top justify-center bg-white backdrop-blur-sm m-0 z-1002 border border-gray-50">
      <div className="absolute z-50 bg-white rounded-lg p-6 w-full md:max-w-3xl m-2">
        <div className="flex flex-col items-end mb-6">
          <button onClick={close} className="cursor-pointer">
            <XMarkIcon className="h-7 w-7" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
