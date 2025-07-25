import React, { forwardRef, InputHTMLAttributes } from 'react';

/**
 * DateField Component
 *
 * An input component specifically for date selection.
 *
 * Props:
 * - className: Optional Tailwind CSS classes for the input.
 * - All other standard input props (including those from field) are passed through.
 */
export interface DateFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const DateField = forwardRef<HTMLInputElement, DateFieldProps>(
  ({ className = '', ...props }, ref) => (
    <input
      type="date"
      className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
      ref={ref}
      {...props}
    />
  )
);
DateField.displayName = 'DateField';
