import React, { forwardRef, InputHTMLAttributes } from 'react';

/**
 * Input Component
 *
 * A basic input component. It accepts standard HTML input props.
 *
 * Props:
 * - type: The HTML input type (e.g., 'text', 'email', 'password').
 * - placeholder: The placeholder text for the input.
 * - className: Optional Tailwind CSS classes for the input.
 * - All other standard input props (including those from react-hook-form's field) are passed through.
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', placeholder, className = '', ...props }, ref) => (
    <input
      type={type}
      placeholder={placeholder}
      className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = 'Input';
