import React, { forwardRef } from 'react';

/**
 * Switch Component
 *
 * A custom toggle switch component that uses a hidden checkbox for accessibility.
 *
 * Props:
 * - checked: Boolean indicating if the switch is on.
 * - onChange: Callback function when the switch is toggled.
 * - name: The name attribute for the hidden checkbox.
 * - id: The ID for the hidden checkbox (passed from FormFieldWrapper).
 * - aria-describedby: Passed from FormFieldWrapper for helper/error text association.
 * - aria-invalid: Passed from FormFieldWrapper to indicate error state.
 * - className: Optional Tailwind CSS classes for the overall switch container.
 * - labelClassName: Optional Tailwind CSS classes for the switch label.
 */
export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  labelClassName?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ checked, onChange, name, id, 'aria-describedby': describedBy, 'aria-invalid': isInvalid, className = '', labelClassName = '', ...props }, ref) => {
    return (
      <div className={`flex items-center ${className}`}>
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          className="sr-only"
          role="switch"
          aria-checked={checked}
          aria-describedby={describedBy}
          aria-invalid={isInvalid}
          ref={ref}
          {...props}
        />
        <label
          htmlFor={id}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${checked ? 'bg-indigo-600' : 'bg-gray-200'}`}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`}
          />
        </label>
      </div>
    );
  }
);
Switch.displayName = 'Switch';
