// src/components/desembolsos/reutilizables/Button.jsx
import React from 'react';

const buttonVariants = {
  primary: 'bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800',
  secondary: 'bg-gray-600 hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-800',
  success: 'bg-green-600 hover:bg-green-700 focus:bg-green-700 active:bg-green-800',
  danger: 'bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-800',
};

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  isLoading = false,
  ...props
}) {
  const baseClasses = 'px-6 py-2.5 text-white font-medium text-sm rounded-lg shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out disabled:opacity-70 disabled:hover:bg-blue-600 flex items-center justify-center';
  const variantClasses = buttonVariants[variant] || buttonVariants.primary;

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses} ${className} ${isLoading ? 'opacity-70' : ''}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Procesando...
        </span>
      ) : (
        children
      )}
    </button>
  );
}