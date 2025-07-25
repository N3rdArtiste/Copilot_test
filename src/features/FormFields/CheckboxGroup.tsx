import React, { useId } from 'react';

/**
 * CheckboxGroup Component
 *
 * A component for rendering a group of checkboxes. It manages its own internal IDs
 * and accessibility attributes for each checkbox.
 *
 * Props:
 * - options: An array of objects, e.g., [{ value: 'option1', label: 'Option 1' }].
 * - value: An array of currently selected values.
 * - onChange: Callback function when a checkbox is changed (receives the new array of selected values).
 * - name: The name attribute for the checkbox group (important for form submission).
 * - legendText: The text to be used for the <legend> element. Can be string or { primary: string, secondary?: string }.
 * - aria-describedby: Passed from FormFieldWrapper for helper/error text association.
 * - aria-invalid: Passed from FormFieldWrapper to indicate error state for the group.
 * - className: Optional Tailwind CSS classes for the overall group div.
 * - checkboxClassName: Optional Tailwind CSS classes for individual checkboxes.
 * - labelClassName: Optional Tailwind CSS classes for individual checkbox labels.
 * - id: The ID for the legend (passed from FormFieldWrapper).
 */
export interface CheckboxOption {
  value: string;
  label: string;
}

export interface CheckboxGroupProps {
  options: CheckboxOption[];
  value: string[];
  onChange: (value: string[]) => void;
  name: string;
  legendText: string | { primary: string; secondary?: string };
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  className?: string;
  checkboxClassName?: string;
  labelClassName?: string;
  id?: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  value,
  onChange,
  name,
  legendText,
  'aria-describedby': describedBy,
  'aria-invalid': isInvalid,
  className = '',
  checkboxClassName = '',
  labelClassName = '',
  id,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: itemValue, checked } = e.target;
    if (checked) {
      onChange([...value, itemValue]);
    } else {
      onChange(value.filter((val) => val !== itemValue));
    }
  };

  const primaryLegend = typeof legendText === 'object' ? legendText.primary : legendText;
  const secondaryLegend = typeof legendText === 'object' ? legendText.secondary : undefined;

  return (
    <fieldset
      className={`space-y-2 ${className}`}
      aria-describedby={describedBy}
      aria-invalid={isInvalid}
      aria-labelledby={id}
    >
      <legend id={id} className="text-sm font-medium text-gray-700 mb-1">
        <span className="font-bold">{primaryLegend}</span>
        {secondaryLegend && <span className="block text-gray-500 text-xs mt-0.5">{secondaryLegend}</span>}
      </legend>
      {options.map((option) => {
        const uniqueCheckboxId = useId();
        const checkboxId = `${name}-${option.value}-${uniqueCheckboxId}`;
        return (
          <div key={option.value} className="flex items-center">
            <input
              type="checkbox"
              id={checkboxId}
              name={name}
              value={option.value}
              checked={value.includes(option.value)}
              onChange={handleCheckboxChange}
              className={`h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 ${checkboxClassName}`}
            />
            <label htmlFor={checkboxId} className={`ml-2 block text-sm text-gray-900 ${labelClassName}`}>
              {option.label}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
};
