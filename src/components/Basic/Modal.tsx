import type { ReactNode } from 'react';

function Modal({ show, children }: { show: boolean; children: ReactNode[] }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm m-0 z-1002">
      <div className="absolute z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-6 max-w-md m-2">
        {children}
      </div>
    </div>
  );
}

export default Modal;
