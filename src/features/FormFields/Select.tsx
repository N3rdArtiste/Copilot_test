import React, { forwardRef, SelectHTMLAttributes } from 'react';

/**
 * Select Component
 *
 * A standard HTML select dropdown component.
 *
 * Props:
 * - options: An array of objects, e.g., [{ value: 'option1', label: 'Option 1' }].
 * - value: The currently selected value.
 * - onChange: Callback function when the selection changes.
 * - name: The name attribute for the select element.
 * - placeholder: Optional placeholder text for the first option (if value is empty).
 * - className: Optional Tailwind CSS classes for the select element.
 * - All other standard select props (including those from field) are passed through.
 */
export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'options'> {
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, placeholder, className = '', ...props }, ref) => (
    <select
      className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
      ref={ref}
      {...props}
    >
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
);
Select.displayName = 'Select';
