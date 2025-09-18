import { Link } from 'react-router-dom';
import clsx from 'clsx';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  to?: string;
  variant?: 'primary' | 'secondary' | 'neutral' | 'danger';
  isTarget?: boolean;
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const baseStyles =
  'cursor-pointer inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

const variantStyles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400',
  neutral: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300',
  danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400',
};

export function Button({
  children,
  onClick,
  to,
  variant = 'primary',
  fullWidth = false,
  className = '',
  isTarget = false,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const sharedClasses = clsx(
    baseStyles,
    variantStyles[variant],
    fullWidth ? 'w-full' : 'px-5',
    'py-2.5 text-sm',
    disabled && 'opacity-60 disabled:cursor-not-allowed',
    className
  );

  if (to) {
    return (
      <Link
        to={to}
        className={sharedClasses}
        aria-disabled={disabled}
        target={isTarget ? '_blank' : '_self'}
        rel={isTarget ? 'noopener noreferrer' : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={sharedClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
